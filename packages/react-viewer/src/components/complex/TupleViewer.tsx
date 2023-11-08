import { TupleDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "../../DecodedViewer"
import { ViewerProps } from "../types"
import { getTypeLabelForDecoded } from "../../helpers"

export const TupleViewer: React.FC<ViewerProps<TupleDecoded>> = (props) => {
  return (
    <div>
      <div>
        <i className="text-slate-400">
          {getTypeLabelForDecoded(props.decoded)}
        </i>
      </div>

      {props.decoded.value.map((innerDecoded, index) => (
        <div key={"tuple" + index} className="flex flex-row align-top">
          <div className="text-index">{index}</div>
          <DecodedViewer {...props} decoded={innerDecoded} />
        </div>
      ))}
    </div>
  )
}
