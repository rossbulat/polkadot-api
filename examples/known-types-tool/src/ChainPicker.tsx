import { state, useStateObservable } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import { defer, map, scan, startWith } from "rxjs"
import { chains } from "./api/smoldot"
import { FC } from "react"
import { LoadStatus, metadataLoadStatus$ } from "./api/metadatas"
import { Checkbox, Spinner } from "@radix-ui/themes"
import { CircleX } from "lucide-react"

export const [toggleSelectedChain$, toggleSelectedChain] =
  createSignal<string>()
export const selectedChains$ = state(
  defer(() => {
    const initialValue: Set<string> = new Set()
    return toggleSelectedChain$.pipe(
      scan((acc, chain) => {
        const newState = new Set(acc)
        if (acc.has(chain)) {
          newState.delete(chain)
        } else {
          newState.add(chain)
        }
        return newState
      }, initialValue),
      startWith(initialValue),
    )
  }),
  new Set(),
)

export function ChainPicker() {
  return (
    <ul className="flex flex-row gap-2 flex-wrap justify-center">
      {Object.keys(chains).map((chain) => (
        <ChainOption key={chain} chain={chain} />
      ))}
    </ul>
  )
}

const chainIsSelected$ = state(
  (chain: string) =>
    selectedChains$.pipe(map((selection) => selection.has(chain))),
  false,
)
const ChainOption: FC<{ chain: string }> = ({ chain }) => {
  const loadStatus = useStateObservable(metadataLoadStatus$(chain))
  const checked = useStateObservable(chainIsSelected$(chain))

  return (
    <li
      key={chain}
      className="flex items-center p-2 border rounded gap-2"
      onClick={() => toggleSelectedChain(chain)}
    >
      {checked && loadStatus === LoadStatus.Loading ? (
        <Spinner />
      ) : checked && loadStatus === LoadStatus.Error ? (
        <CircleX size={16} className="text-red-700" />
      ) : (
        <Checkbox checked={checked} />
      )}
      {chain}
    </li>
  )
}
