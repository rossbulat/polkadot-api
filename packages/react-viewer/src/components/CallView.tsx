import { Decoded, DecodedCall } from "@polkadot-api/substrate-codegen"
import { DecodedView } from "./DecodedView"

interface CallViewProps {
  decoded: DecodedCall
}

export const CallView: React.FC<CallViewProps> = ({ decoded }) => {
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
      <DecodedView decoded={decoded.args} />
    </div>
  )
}
