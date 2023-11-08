import { BoolDecoded } from "@polkadot-api/substrate-codegen"
import { ViewerProps } from "../types"

export const BoolViewer: React.FC<ViewerProps<BoolDecoded>> = ({ decoded }) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
