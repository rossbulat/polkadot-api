import { Decoded, StructDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "./DecodedViewer"

interface StructViewerProps {
  decoded: StructDecoded
}

export const StructViewer: React.FC<StructViewerProps> = ({ decoded }) => {
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
            <DecodedViewer decoded={value as Decoded} />
          </div>
        </div>
      ))}
    </div>
  )
}
