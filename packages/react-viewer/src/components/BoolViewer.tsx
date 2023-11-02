import { BoolDecoded } from "@polkadot-api/substrate-codegen"

interface BoolViewerProps {
  decoded: BoolDecoded
}

export const BoolViewer: React.FC<BoolViewerProps> = ({ decoded }) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
