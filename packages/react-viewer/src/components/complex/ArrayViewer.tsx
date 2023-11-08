import { ArrayDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "../../DecodedViewer"
import { ViewerProps } from "../types"

export const ArrayViewer: React.FC<ViewerProps<ArrayDecoded>> = ({
  decoded,
}) => {
  return (
    <div className="pl-1">
      {decoded.value.map((v, index) => (
        <div key={"array" + index} className="flex flex-row align-top">
          <div className="text-index">{index}</div>

          <DecodedViewer decoded={v} />
        </div>
      ))}
    </div>
  )
}
