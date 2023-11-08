import { SequenceDecoded } from "@polkadot-api/substrate-codegen"
import { InternalDecodedViewer } from "../DecodedViewer"
import { ViewerProps } from "./types"

export const SequenceViewer: React.FC<ViewerProps<SequenceDecoded>> = ({
  decoded,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="pl-1">
        {decoded.value.map((v, index) => (
          <div key={"sequence_" + index} className="flex flex-row align-top">
            <div>{index + ": "}</div>
            <InternalDecodedViewer decoded={v} />
          </div>
        ))}
      </div>
    </div>
  )
}
