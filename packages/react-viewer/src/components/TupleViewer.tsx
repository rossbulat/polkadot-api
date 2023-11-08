import { TupleDecoded } from "@polkadot-api/substrate-codegen"
import { InternalDecodedViewer } from "../DecodedViewer"
import { ViewerProps } from "./types"
import { getTypeLabelForDecoded } from "../helpers"

export const TupleViewer: React.FC<ViewerProps<TupleDecoded>> = ({
  decoded,
}) => {
  return (
    <div>
      <div>
        <i className="text-slate-400">{getTypeLabelForDecoded(decoded)}</i>
      </div>

      {decoded.value.map((v, index) => (
        <InternalDecodedViewer key={"tuple_" + index} decoded={v} />
      ))}
    </div>
  )
}
