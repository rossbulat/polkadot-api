import { AccountIdDecoded } from "@polkadot-api/substrate-codegen"

interface AccountIdViewProps {
  decoded: AccountIdDecoded
}

export const AccountIdView: React.FC<AccountIdViewProps> = ({ decoded }) => {
  return <div>{JSON.stringify(decoded.value.address)}</div>
}
