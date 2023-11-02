import { TupleDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "./DecodedViewer"

interface TupleViewerProps {
  decoded: TupleDecoded
}

export const TupleViewer: React.FC<TupleViewerProps> = ({ decoded }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>Tuple [</div>
      <div style={{ paddingLeft: "1rem" }}>
        {decoded.value.map((v) => (
          <DecodedViewer decoded={v} />
        ))}
      </div>
      <div>]</div>
    </div>
  )
}
