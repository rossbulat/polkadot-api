import { StringDecoded } from "@polkadot-api/substrate-codegen"

interface StrViewerProps {
  decoded: StringDecoded
}

export const StrViewer: React.FC<StrViewerProps> = ({ decoded }) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
