import { Decoded, DecodedCall } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "./DecodedViewer"

interface CallViewerProps {
  decoded: DecodedCall
}

export const CallDecodedViewer: React.FC<CallViewerProps> = ({ decoded }) => {
  const argStrings = Object.entries(decoded.args.value).map(
    ([key, value]: [string, Decoded]) => {
      return `${key}: ${value.codec}`
    },
  )
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <b>
          {`${decoded.pallet.value.name}.${
            decoded.call.value.name
          }(${argStrings.join(", ")})`}
        </b>
      </div>
      <DecodedViewer decoded={decoded.args} />
    </div>
  )
}
