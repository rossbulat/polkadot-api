import { knownTypesRepository } from "@polkadot-api/codegen"
import { LookupEntry } from "@polkadot-api/metadata-builders"
import { V14, V15 } from "@polkadot-api/substrate-bindings"
import { FC, useState } from "react"
import { TextField } from "@radix-ui/themes"

const getCurrentKnownType = (checksum: string) => {
  const entry = knownTypesRepository[checksum]
  if (!entry) return null
  return typeof entry === "string" ? entry : entry.name
}

type MetadataEntry = (V15 | V14)["lookup"] extends Array<infer R> ? R : never
type EnumEntry = LookupEntry & { type: "enum"; entry: MetadataEntry }
export const CommonType: FC<{
  checksum: string
  types: Array<{
    chain: string
    type: EnumEntry
  }>
}> = ({ checksum, types }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li
      key={checksum}
      className="border px-2 py-1 first:rounded-t last:rounded-b"
    >
      <div
        className="flex gap-1 cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="text-slate-400 font-mono">
          {checksum.padStart(13, "\xa0")}
        </div>
        <div className="flex-1">{getCurrentKnownType(checksum)}</div>
        <div>{types.length}</div>
      </div>
      {expanded ? (
        <div className="py-2">
          <div>
            <p>Current name: {getCurrentKnownType(checksum)}</p>
            <label className="flex items-center gap-1">
              New name:
              <TextField.Root
                className="flex-1"
                value={getCurrentKnownType(checksum) ?? ""}
              />
            </label>
          </div>
          <div>
            <h2 className="text-2xl">Types</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {types.map((type) => (
                <ChainType
                  key={type.chain + "-" + type.type.id}
                  chain={type.chain}
                  type={type.type}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </li>
  )
}

const ChainType: FC<{
  chain: string
  type: EnumEntry
}> = ({ chain, type }) => {
  return (
    <div className="border rounded p-2 flex flex-col gap-1">
      <h3 className="text-xl py-1">
        {chain} <span className="text-slate-400">({type.id})</span>
      </h3>
      <p>
        <div className="font-bold">Path:</div>
        <pre>
          <code>{type.entry.path.join(".") || "N/A"}</code>
        </pre>
      </p>
      <p>
        <div className="font-bold">Inner docs:</div>
        <pre>
          <code>
            {Object.entries(type.innerDocs)
              .filter(([, docs]) => docs.join(";") !== "")
              .map(([key, docs]) => `${key}: ${docs.join(";")}`)
              .join("\n") || "N/A"}
          </code>
        </pre>
      </p>
      <p>
        <div className="font-bold">Variants:</div>
        <pre>
          <code>
            {Object.entries(type.value)
              .map(([key, type]) => `${key}`)
              .join("\n")}
          </code>
        </pre>
      </p>
    </div>
  )
}
