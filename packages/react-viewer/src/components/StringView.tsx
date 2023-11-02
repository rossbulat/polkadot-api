import { StringDecoded } from "@polkadot-api/substrate-codegen"

interface StringViewProps {
  decoded: StringDecoded
}

export const StringView: React.FC<StringViewProps> = ({ decoded }) => {
  return <div>{JSON.stringify(decoded.value)}</div>
}
