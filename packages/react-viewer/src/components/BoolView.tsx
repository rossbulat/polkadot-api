import { BoolDecoded } from "@polkadot-api/substrate-codegen"

interface BoolViewProps {
  decoded: BoolDecoded
}

export const BoolView: React.FC<BoolViewProps> = ({ decoded }) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
