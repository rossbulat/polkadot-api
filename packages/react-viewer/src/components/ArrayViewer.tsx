import { ArrayDecoded } from "@polkadot-api/substrate-codegen"
import { InternalDecodedViewer } from "../DecodedViewer"
import { ViewerProps } from "./types"

export const ArrayViewer: React.FC<ViewerProps<ArrayDecoded>> = ({
  decoded,
}) => {
  return (
    <div style={{ paddingLeft: "1rem" }}>
      {decoded.value.map((v, index) => (
        <div key={"array_" + index}>
          <div>{index + ": "}</div>
          <div style={{ paddingLeft: "1rem" }}>
            <InternalDecodedViewer decoded={v} />
          </div>
        </div>
      ))}
    </div>
  )
}
