import {
  LookupEntry,
  getChecksumBuilder,
  getLookupFn,
} from "@polkadot-api/metadata-builders"
import { state, useStateObservable } from "@react-rxjs/core"
import { combineKeys } from "@react-rxjs/utils"
import { EMPTY, catchError, map } from "rxjs"
import { selectedChains$ } from "./ChainPicker"
import { CommonType } from "./CommonType"
import { metadatas } from "./api/metadatas"
import { V14, V15 } from "@polkadot-api/substrate-bindings"

type MetadataEntry = (V15 | V14)["lookup"] extends Array<infer R> ? R : never
type EnumEntry = LookupEntry & { type: "enum"; entry: MetadataEntry }
const chainTypes$ = state(
  (chain: string) =>
    metadatas[chain].pipe(
      catchError(() => EMPTY),
      map((metadata) => {
        const lookup = getLookupFn(metadata.lookup)
        const checksumBuilder = getChecksumBuilder(metadata)

        const result: Record<string, EnumEntry[]> = {}
        for (let i = 0; i < metadata.lookup.length; i++) {
          if (metadata.lookup[i].def.tag !== "variant") continue

          const def = lookup(i)
          if (def.type !== "enum") continue

          const checksum = checksumBuilder.buildDefinition(i)
          if (!checksum) {
            throw new Error("unreachable")
          }

          result[checksum] = result[checksum] ?? []
          result[checksum].push({ ...def, entry: metadata.lookup[i] })
        }

        return result
      }),
    ),
  {},
)

const commonTypes$ = state(
  combineKeys(selectedChains$, chainTypes$).pipe(
    map((chains) => {
      const result: Record<
        string,
        Array<{
          chain: string
          type: EnumEntry
        }>
      > = {}

      for (let entry of chains.entries()) {
        const [chain, types] = entry
        for (let checksum of Object.keys(types)) {
          result[checksum] = [
            ...(result[checksum] ?? []),
            ...types[checksum].map((type) => ({ chain, type })),
          ]
        }
      }

      return Object.entries(result)
        .map(([checksum, types]) => ({
          checksum,
          types,
        }))
        .filter((a) => new Set(a.types.map((type) => type.chain)).size > 1)
        .sort((a, b) => b.types.length - a.types.length)
    }),
  ),
  [],
)

export function CommonTypes({ className }: { className?: string }) {
  const commonTypes = useStateObservable(commonTypes$)

  return (
    <ol className={className}>
      {commonTypes.map(({ checksum, types }) => (
        <CommonType key={checksum} checksum={checksum} types={types} />
      ))}
    </ol>
  )
}
