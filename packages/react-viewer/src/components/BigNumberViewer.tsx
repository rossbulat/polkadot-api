import { BigNumberDecoded } from "@polkadot-api/substrate-codegen"
import { ViewerProps } from "./types"

export const BigNumberViewer: React.FC<ViewerProps<BigNumberDecoded>> = ({
  decoded,
}) => {
  return <div>{decoded.value.toString()}</div>
}
