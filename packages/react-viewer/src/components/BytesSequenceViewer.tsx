import { BytesSequenceDecoded } from "@polkadot-api/substrate-codegen"
import { ViewerProps } from "./types"

export const BytesSequenceViewer: React.FC<
  ViewerProps<BytesSequenceDecoded>
> = ({ decoded }) => {
  return <div className="overflow-scroll">{decoded.value}</div>
}
