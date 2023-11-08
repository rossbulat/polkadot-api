import { StringDecoded } from "@polkadot-api/substrate-codegen"
import { ViewerProps } from "./types"

export const StrViewer: React.FC<ViewerProps<StringDecoded>> = ({
  decoded,
}) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
