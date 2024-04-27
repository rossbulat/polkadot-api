import {
  LookupEntry,
  getChecksumBuilder,
  getLookupFn,
} from "@polkadot-api/metadata-builders"
import { V14, V15 } from "@polkadot-api/substrate-bindings"
import { state } from "@react-rxjs/core"
import { combineKeys, createSignal, mergeWithKey } from "@react-rxjs/utils"
import { EMPTY, catchError, map, scan } from "rxjs"
import { selectedChains$ } from "./ChainPicker"
import { metadatas } from "./api/metadatas"
import { knownTypesRepository } from "@polkadot-api/codegen"

export type MetadataEntry =
  (V15 | V14)["lookup"] extends Array<infer R> ? R : never
export type EnumEntry = LookupEntry & { type: "enum"; entry: MetadataEntry }
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

export const commonTypes$ = state(
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

export const getCurrentKnownType = (checksum: string) => {
  const entry = knownTypesRepository[checksum]
  if (!entry) return null
  return typeof entry === "string" ? entry : entry.name
}

export const [nameChange$, setTypeName] = createSignal<{
  checksum: string
  name: string
}>()
const commonTypeNames$ = state(
  mergeWithKey({
    types: combineKeys(selectedChains$, chainTypes$),
    name: nameChange$,
  }).pipe(
    scan((acc: Record<string, string>, value) => {
      const result = { ...acc }
      if (value.type === "types") {
        for (const chain of value.payload.changes) {
          if (!value.payload.has(chain)) continue
          const checksums = Object.keys(value.payload.get(chain)!)
          checksums.forEach((checksum) => {
            result[checksum] = result[checksum] ?? getCurrentKnownType(checksum)
          })
        }
      } else {
        result[value.payload.checksum] = value.payload.name
      }

      return result
    }, {}),
  ),
  {},
)

export const currentName$ = state(
  (checksum: string) => commonTypeNames$.pipe(map((v) => v[checksum])),
  "",
)
