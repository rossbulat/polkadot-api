import { Decoded, EnumDecoded } from "@polkadot-api/substrate-codegen"
import { InternalDecodedViewer } from "../DecodedViewer"
import { ViewerProps } from "./types"

const getEnumLabelForDecoded = (decoded: EnumDecoded): string => {
  if (decoded.path && decoded.path.length > 0) {
    return `${decoded.path.at(-1)}.${decoded.value.tag}`
  }
  return decoded.value.tag
}

export const EnumViewer: React.FC<ViewerProps<EnumDecoded>> = ({ decoded }) => {
  return (
    <div>
      <div>
        <div className="bg-orange-500">{getEnumLabelForDecoded(decoded)}</div>

        <div className="pl-2">
          <InternalDecodedViewer decoded={decoded.value.value as Decoded} />
        </div>
      </div>
    </div>
  )
}
