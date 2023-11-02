import { AccountIdDecoded } from "@polkadot-api/substrate-codegen"

interface AccountIdViewerProps {
  decoded: AccountIdDecoded
}

export const AccountIdViewer: React.FC<AccountIdViewerProps> = ({
  decoded,
}) => {
  return <div>{JSON.stringify(decoded.value.address)}</div>
}
