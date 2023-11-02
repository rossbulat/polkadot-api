import { ArrayDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedView } from "./DecodedView"

interface ArrayViewProps {
  decoded: ArrayDecoded
}

export const ArrayView: React.FC<ArrayViewProps> = ({ decoded }) => {
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
          <DecodedView decoded={v} />
        ))}
      </div>
      <div>]</div>
    </div>
  )
}
