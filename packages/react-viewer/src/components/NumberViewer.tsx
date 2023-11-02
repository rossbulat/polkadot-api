import { NumberDecoded } from "@polkadot-api/substrate-codegen"

interface NumberViewerProps {
  decoded: NumberDecoded
}

export const NumberViewer: React.FC<NumberViewerProps> = ({ decoded }) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
