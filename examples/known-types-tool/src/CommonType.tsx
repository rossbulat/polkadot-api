import { TextField } from "@radix-ui/themes"
import { useStateObservable } from "@react-rxjs/core"
import { FC, useMemo } from "react"
import {
  EnumEntry,
  currentName$,
  getCurrentKnownType,
  setTypeName,
} from "./commonTypes.state"
import { useViewTransition } from "./lib/useViewTransition"

export const CommonType: FC<{
  checksum: string
  types: Array<{
    chain: string
    type: EnumEntry
  }>
}> = ({ checksum, types }) => {
  const [expanded, setExpanded] = useViewTransition(false)
  const name = useStateObservable(currentName$(checksum))

  const groupedTypes = useMemo(() => {
    const result: Record<string, EnumEntry[]> = {}
    types.forEach(({ chain, type }) => {
      result[chain] = result[chain] ?? []
      result[chain].push(type)
    })
    return result
  }, [types])

  return (
    <li
      key={checksum}
      className="border first:rounded-t last:rounded-b"
      style={{
        viewTransitionName: `t${checksum}`,
      }}
    >
      <div
        className="flex gap-1 cursor-pointer px-2 py-1 bg-slate-50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-slate-400 font-mono">
          {checksum.padStart(13, "\xa0")}
        </div>
        <code className="flex-1">{name}</code>
        <div>{types.length}</div>
      </div>
      {expanded ? (
        <div className="px-2 py-2 flex flex-col gap-2">
          <div>
            <h2 className="text-2xl">Name</h2>
            <div>
              Current: <code>{getCurrentKnownType(checksum)}</code>
            </div>
            <label className="flex items-center gap-1">
              New name:
              <TextField.Root
                className="flex-1"
                value={name ?? ""}
                onChange={(evt) =>
                  setTypeName({ checksum, name: evt.target.value })
                }
              />
            </label>
          </div>
          <div>
            <h2 className="text-2xl">Variants</h2>
            <ul className="flex flex-wrap gap-2">
              {Object.keys(types[0].type.value).map((key) => (
                <li key={key} className="px-2 py-1 border rounded">
                  <code>{key}</code>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">References</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(groupedTypes).map(([chain, types]) => (
                <ChainTypes key={chain} chain={chain} types={types} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </li>
  )
}

const ChainTypes: FC<{
  chain: string
  types: EnumEntry[]
}> = ({ chain, types }) => {
  return (
    <div className="border rounded p-2 flex flex-col gap-1">
      <h3 className="text-xl font-bold">{chain}</h3>
      <div>
        <div className="font-bold">Types</div>
        <ul>
          {types.map((type) => (
            <li key={type.id} className="flex gap-2">
              <span className="text-slate-400">{type.id}</span>
              <code>{type.entry.path.join(".") || "N/A"}</code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
