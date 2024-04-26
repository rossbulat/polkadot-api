import { state, useStateObservable } from "@react-rxjs/core"
import { selectedChains$ } from "./ChainPicker"
import { metadatas } from "./api/metadatas"
import { EMPTY, catchError, map } from "rxjs"
import { getChecksumBuilder } from "@polkadot-api/metadata-builders"
import { V14, V15 } from "@polkadot-api/substrate-bindings"
import { combineKeys } from "@react-rxjs/utils"
import { knownTypesRepository } from "@polkadot-api/codegen"

type LookupEntry =
  V14["lookup"] | V15["lookup"] extends Array<infer R> ? R : never

const chainTypes$ = state(
  (chain: string) =>
    metadatas[chain].pipe(
      catchError(() => EMPTY),
      map((metadata) => {
        const checksumBuilder = getChecksumBuilder(metadata)

        const result: Record<string, LookupEntry[]> = {}
        for (let i = 0; i < metadata.lookup.length; i++) {
          const checksum = checksumBuilder.buildDefinition(i)
          if (!checksum) {
            throw new Error("unreachable")
          }

          result[checksum] = result[checksum] ?? []
          result[checksum].push(metadata.lookup[i])
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
          type: LookupEntry
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

export function CommonTypes() {
  const commonTypes = useStateObservable(commonTypes$)

  const getCurrentKnownType = (checksum: string) => {
    const entry = knownTypesRepository[checksum]
    if (!entry) return null
    return typeof entry === "string" ? entry : entry.name
  }

  return (
    <ol>
      {commonTypes.map(({ checksum, types }) => (
        <li key={checksum}>
          {checksum} {types.length} {getCurrentKnownType(checksum)}
        </li>
      ))}
    </ol>
  )
}
