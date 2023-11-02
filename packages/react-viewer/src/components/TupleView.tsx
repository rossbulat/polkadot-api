import { TupleDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedView } from "./DecodedView"

interface TupleViewProps {
  decoded: TupleDecoded
}

export const TupleView: React.FC<TupleViewProps> = ({ decoded }) => {
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
          <DecodedView decoded={v} />
        ))}
      </div>
      <div>]</div>
    </div>
  )
}
