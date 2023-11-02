import { SequenceDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "./DecodedViewer"

interface SequenceViewerProps {
  decoded: SequenceDecoded
}

export const SequenceViewer: React.FC<SequenceViewerProps> = ({ decoded }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>Sequence [</div>
      <div style={{ paddingLeft: "1rem" }}>
        {decoded.value.map((v) => (
          <DecodedViewer decoded={v} />
        ))}
      </div>

      <div>]</div>
    </div>
  )
}
