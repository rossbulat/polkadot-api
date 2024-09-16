import type Transport from "@ledgerhq/hw-transport"
import { merkleizeMetadata } from "@polkadot-api/merkleize-metadata"
import type { PolkadotSigner } from "@polkadot-api/polkadot-signer"
import {
  Binary,
  compact,
  enhanceEncoder,
  u16,
  u32,
  u8,
} from "@polkadot-api/substrate-bindings"
import { mergeUint8 } from "@polkadot-api/utils"
import { getMetadata } from "./get-metadata"

const METADATA_IDENTIFIER = "CheckMetadataHash"
const versionCodec = enhanceEncoder(
  u8.enc,
  (value: { signed: boolean; version: number }) =>
    (+!!value.signed << 7) | value.version,
)

export const getLedgerSigner = async (
  transportFactory: typeof Transport,
): Promise<LedgerSigner> => {
  const transport = await transportFactory.create()
  return new LedgerSigner(transport)
}

const CLA = 0xf9
const INS = {
  getVersion: 0,
  getAddress: 1,
  signTx: 2,
  signRaw: 3,
}
const P1 = {
  // sign
  init: 0,
  continue: 1,
  end: 2,

  // addr
  getAddress: 0,
  showAddress: 1,
}
const P2 = 0
const DEFAULT_SS58 = 0

// 44'/354'
const START_PATH = Uint8Array.from([44, 0, 0, 128, 98, 1, 0, 128])
// 0'
const MID_PATH = Uint8Array.from([0, 0, 0, 128])
const HARDENED = 0x80000000 // 1 << 31
const encodePath = (path1: number, path2: number) => {
  if (
    !Number.isInteger(path1) ||
    path1 < 0 ||
    path1 >= HARDENED ||
    !Number.isInteger(path2) ||
    path2 < 0 ||
    path2 >= HARDENED
  )
    throw new Error(`Invalid path segments ${path1}, ${path2}`)

  return mergeUint8(
    START_PATH,
    u32.enc(HARDENED + path1),
    MID_PATH,
    u32.enc(HARDENED + path2),
  )
}

const [preBytes, postBytes] = ["<Bytes>", "</Bytes>"].map((str) =>
  Binary.fromText(str).asBytes(),
)

export class LedgerSigner {
  #transport: Transport
  #pubkeys: Map<string, Uint8Array> // `${path1}:${path2}`
  #deviceId: number | undefined
  constructor(transport: Transport) {
    this.#transport = transport
    this.#pubkeys = new Map()
    this.deviceId()
  }

  async #send(
    ...params: Parameters<Transport["send"]>
  ): ReturnType<Transport["send"]> {
    while (this.#transport.exchangeBusyPromise)
      await this.#transport.exchangeBusyPromise
    return await this.#transport.send(...params)
  }

  async deviceId(): Promise<number> {
    return this.#deviceId == null
      ? (this.#deviceId = u32.dec((await this.#getPublicKey(0, 0)).slice(0, 4)))
      : this.#deviceId
  }

  #getPubkeyMapKey(path1: number, path2: number): string {
    return `${path1}:${path2}`
  }

  async #getPublicKey(
    path1: number,
    path2: number,
    seeAddressInDevice?: boolean,
    ss58Prefix?: number,
  ): Promise<Uint8Array> {
    const key = this.#getPubkeyMapKey(path1, path2)
    if (!seeAddressInDevice && this.#pubkeys.has(key))
      return this.#pubkeys.get(key)!
    if (
      ss58Prefix != null &&
      (!Number.isInteger(ss58Prefix) || ss58Prefix < 0 || ss58Prefix >= 1 << 16) // u16 max value
    )
      throw new Error(`Invalid ss58Prefix ${ss58Prefix}`)
    const bufToSend = Buffer.from(
      // id + ss58 prefix
      mergeUint8(
        encodePath(path1, path2),
        Uint8Array.from(u16.enc(ss58Prefix ?? DEFAULT_SS58)),
      ),
    )
    const res = Uint8Array.from(
      await this.#send(
        CLA,
        INS.getAddress,
        seeAddressInDevice ? P1.showAddress : P1.getAddress,
        P2,
        bufToSend,
      ),
    )
    const pubkey = res.slice(0, 32)
    this.#pubkeys.set(this.#getPubkeyMapKey(path1, path2), pubkey)
    return pubkey.slice()
  }

  async getPubkey(path1: number, path2?: number): Promise<Uint8Array> {
    return await this.#getPublicKey(path1, path2 ?? 0)
  }

  async seeAddressInDevice(
    ss58Prefix: number,
    path1: number,
    path2?: number,
  ): Promise<Uint8Array> {
    return await this.#getPublicKey(path1, path2 ?? 0, true, ss58Prefix)
  }

  async #sign(
    path1: number,
    path2: number,
    payload: Uint8Array,
    // without shortMetadata indicates signBytes
    shortMetadata?: Uint8Array,
  ): Promise<Uint8Array> {
    const path = encodePath(path1, path2)
    const chunks: Buffer[] = []
    chunks.push(Buffer.from(mergeUint8(path, u16.enc(payload.length))))
    const combinedPayload =
      shortMetadata == null ? payload : mergeUint8(payload, shortMetadata)
    let offset = 0
    while (offset < combinedPayload.length) {
      const chunkEnd = Math.min(offset + 250, combinedPayload.length)
      chunks.push(Buffer.from(combinedPayload.slice(offset, chunkEnd)))
      offset = chunkEnd
    }
    let result
    for (let i = 0; i < chunks.length; i++) {
      result = await this.#send(
        CLA,
        shortMetadata == null ? INS.signRaw : INS.signTx,
        i === 0 ? P1.init : i === chunks.length - 1 ? P1.end : P1.continue,
        P2,
        chunks[i],
      )
    }
    if (result == null) throw null

    return Uint8Array.from(result).slice(0, result.length - 2)
  }

  async getPolkadotSigner(
    networkInfo: { decimals: number; tokenSymbol: string },
    path1: number,
    path2?: number,
  ): Promise<PolkadotSigner> {
    const publicKey = await this.#getPublicKey(path1, path2 ?? 0)

    const signBytes: PolkadotSigner["signBytes"] = async (data: Uint8Array) => {
      let isPadded = true
      let i: number

      for (i = 0; isPadded && i < preBytes.length; i++)
        isPadded = preBytes[i] === data[i]
      isPadded = isPadded && i === preBytes.length

      const postDataStart = data.length - postBytes.length
      for (i = 0; isPadded && i < postBytes.length; i++)
        isPadded = postBytes[i] === data[postDataStart + i]
      isPadded = isPadded && i === postBytes.length

      return await this.#sign(
        path1,
        path2 ?? 0,
        isPadded ? data : mergeUint8(preBytes, data, postBytes),
      )
    }

    const signTx: PolkadotSigner["signTx"] = async (
      callData,
      signedExtensions,
      metadata,
    ) => {
      const merkleizer = merkleizeMetadata(metadata, networkInfo)
      const digest = merkleizer.digest()
      const v15 = getMetadata(metadata)
      if (
        v15.extrinsic.signedExtensions.find(
          ({ identifier }) => identifier === METADATA_IDENTIFIER,
        ) == null
      )
        throw new Error("No `CheckMetadataHash` sigExt found")
      const extra: Array<Uint8Array> = []
      const additionalSigned: Array<Uint8Array> = []
      v15.extrinsic.signedExtensions.map(({ identifier }) => {
        if (identifier === METADATA_IDENTIFIER) {
          extra.push(Uint8Array.from([1]))
          additionalSigned.push(mergeUint8(Uint8Array.from([1]), digest))
          return
        }
        const signedExtension = signedExtensions[identifier]
        if (!signedExtension)
          throw new Error(`Missing ${identifier} signed extension`)
        extra.push(signedExtension.value)
        additionalSigned.push(signedExtension.additionalSigned)
      })
      const toSign = mergeUint8(callData, ...extra, ...additionalSigned)
      const signature = await this.#sign(
        path1,
        path2 ?? 0,
        toSign,
        merkleizer.getProofForExtrinsicPayload(toSign),
      )
      const preResult = mergeUint8(
        versionCodec({ signed: true, version: v15.extrinsic.version }),
        // converting it to a `MultiAddress` enum, where the index 0 is `Id(AccountId)`
        new Uint8Array([0, ...publicKey]),
        signature,
        ...extra,
        callData,
      )

      return mergeUint8(compact.enc(preResult.length), preResult)
    }

    return {
      publicKey,
      signTx,
      signBytes,
    }
  }
}
