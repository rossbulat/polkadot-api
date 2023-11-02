import { Decoded, StructDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedView } from "./DecodedView"

interface StructViewProps {
  decoded: StructDecoded
}

export const StructView: React.FC<StructViewProps> = ({ decoded }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {Object.entries(decoded.value).map(([key, value]) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>{`${key}:`}</div>
          <div style={{ paddingLeft: "1rem" }}>
            <DecodedView decoded={value as Decoded} />
          </div>
        </div>
      ))}
    </div>
  )
}
