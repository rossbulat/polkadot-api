import { Decoded, EnumDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "../../DecodedViewer"
import { ViewerProps } from "../types"

const getEnumLabelForDecoded = (decoded: EnumDecoded): string => {
  if (decoded.path && decoded.path.length > 0) {
    return `${decoded.path.at(-1)}::${decoded.value.tag}(${
      decoded.shape[decoded.value.tag].codec
    })`
  }
  return decoded.value.tag
}

export const EnumViewer: React.FC<ViewerProps<EnumDecoded>> = (props) => {
  return (
    <div>
      <div>
        <div className="text-type">{getEnumLabelForDecoded(props.decoded)}</div>

        <DecodedViewer
          {...props}
          decoded={props.decoded.value.value as Decoded}
        />
      </div>
    </div>
  )
}
