import { NumberDecoded } from "@polkadot-api/substrate-codegen"

interface NumberViewProps {
  decoded: NumberDecoded
}

export const NumberView: React.FC<NumberViewProps> = ({ decoded }) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
