import { getObservableClient } from "@polkadot-api/observable-client"
import { createClient } from "@polkadot-api/substrate-client"
import { getSmProvider } from "polkadot-api/sm-provider"
import { mapObject } from "polkadot-api/utils"
import {
  catchError,
  filter,
  finalize,
  from,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  take,
} from "rxjs"
import { chains } from "./smoldot"
import { state } from "@react-rxjs/core"
import { selectedChains$ } from "../ChainPicker"
import { withLogsRecorder } from "polkadot-api/logs-provider"

export const metadatas = mapObject(chains, (chain, key) =>
  from(chain).pipe(
    map(getSmProvider),
    map((provider) =>
      withLogsRecorder((log) => console.log(key, log), provider),
    ),
    map(createClient),
    map(getObservableClient),
    switchMap((observableClient) => {
      const chainHead = observableClient.chainHead$()

      return chainHead.getRuntimeContext$(null).pipe(
        map((v) => v.metadata),
        take(1),
        finalize(() => {
          chainHead.unfollow()
        }),
      )
    }),
    shareReplay(1),
  ),
)

export enum LoadStatus {
  Idle = "Idle",
  Loading = "Loading",
  Error = "Error",
  Loaded = "Loaded",
}
export const metadataLoadStatus$ = state(
  (chain: string) =>
    selectedChains$.pipe(
      filter((selection) => selection.has(chain)),
      take(1),
      switchMap(() =>
        metadatas[chain].pipe(
          map(() => LoadStatus.Loaded),
          startWith(LoadStatus.Loading),
          catchError((err) => {
            console.error(err)
            return of(LoadStatus.Error)
          }),
        ),
      ),
    ),
  LoadStatus.Idle,
)
