import { NumberDecoded } from "@polkadot-api/substrate-codegen"
import { ViewerProps } from "../types"

export const NumberViewer: React.FC<ViewerProps<NumberDecoded>> = ({
  decoded,
}) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
