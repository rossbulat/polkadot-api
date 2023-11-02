import { ArrayDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "./DecodedViewer"

interface ArrayViewerProps {
  decoded: ArrayDecoded
}

export const ArrayViewer: React.FC<ArrayViewerProps> = ({ decoded }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>Array [</div>
      <div style={{ paddingLeft: "1rem" }}>
        {decoded.value.map((v) => (
          <DecodedViewer decoded={v} />
        ))}
      </div>
      <div>]</div>
    </div>
  )
}
