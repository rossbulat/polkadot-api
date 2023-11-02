import { SequenceDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedView } from "./DecodedView"

interface SequenceViewProps {
  decoded: SequenceDecoded
}

export const SequenceView: React.FC<SequenceViewProps> = ({ decoded }) => {
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
          <DecodedView decoded={v} />
        ))}
      </div>

      <div>]</div>
    </div>
  )
}
