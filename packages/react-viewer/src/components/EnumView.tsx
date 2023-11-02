import { Decoded, EnumDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedView } from "./DecodedView"

interface EnumViewProps {
  decoded: EnumDecoded
}

export const EnumView: React.FC<EnumViewProps> = ({ decoded }) => {
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
          <DecodedView decoded={decoded.value.value as Decoded} />
        </div>
      </div>
    </div>
  )
}
