import { AccountIdDecoded } from "@polkadot-api/substrate-codegen"
import { ViewerProps } from "./types"

type AccountIdViewerProps = ViewerProps<AccountIdDecoded>

export const AccountIdViewer: React.FC<AccountIdViewerProps> = ({
  decoded,
}) => {
  return <div>{JSON.stringify(decoded.value.address)}</div>
}
