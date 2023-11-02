import { StringDecoded } from "@polkadot-api/substrate-codegen"

interface StringViewerProps {
  decoded: StringDecoded
}

export const StringViewer: React.FC<StringViewerProps> = ({ decoded }) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
