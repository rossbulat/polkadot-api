import { Decoded, EnumDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "./DecodedViewer"

interface EnumViewerProps {
  decoded: EnumDecoded
}

export const EnumViewer: React.FC<EnumViewerProps> = ({ decoded }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>{`${decoded.value.tag}:`}</div>
        <div style={{ paddingLeft: "1rem" }}>
          <DecodedViewer decoded={decoded.value.value as Decoded} />
        </div>
      </div>
    </div>
  )
}
