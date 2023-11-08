import { Decoded } from "@polkadot-api/substrate-codegen"
import { ViewerProps } from "./components/types"

export type Enhancer = <T extends ViewerProps<Decoded>>(
  ViewerComponent: React.FC<T>,
) => React.FC<T>
