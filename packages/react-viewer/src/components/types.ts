import { Decoded } from "@polkadot-api/substrate-codegen"

export type ViewerProps<T extends Decoded> = {
  decoded: T
  level?: number
}
