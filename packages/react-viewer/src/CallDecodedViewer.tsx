import { Decoded, DecodedCall } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "./DecodedViewer"

interface CallViewerProps {
  decoded: DecodedCall
}

export const CallDecodedViewer: React.FC<CallViewerProps> = (props) => {
  return (
    <div>
      <CallHeader {...props} />

      <SectionHeader title="Arguments" />
      <DecodedViewer decoded={props.decoded.args} />
    </div>
  )
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h3 className="mb-1 mt-2 p-0 text-sm font-normal uppercase text-slate-400">
      {title}
    </h3>
  )
}

const CallHeader = ({ decoded }: CallViewerProps) => {
  const argStrings = Object.entries(decoded.args.value).map(
    ([key]: [string, Decoded]) => {
      return `${key}`
    },
  )
  return (
    <div>
      <SectionHeader title="Pallet" />
      <div>{decoded.pallet.value.name}</div>

      <SectionHeader title="Method" />
      <div>{`${decoded.call.value.name}(${argStrings.join(", ")})`}</div>
    </div>
  )
}
