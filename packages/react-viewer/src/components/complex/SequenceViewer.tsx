import { SequenceDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "../../DecodedViewer"
import { ViewerProps } from "../types"

export const SequenceViewer: React.FC<ViewerProps<SequenceDecoded>> = (
  props,
) => {
  return (
    <div className="pl-1">
      {props.decoded.value.map((innerDecoded, index) => (
        <div key={"sequence_" + index} className="flex flex-row align-top">
          <div className="text-index">{index}</div>
          <DecodedViewer {...props} decoded={innerDecoded} />
        </div>
      ))}
    </div>
  )
}
