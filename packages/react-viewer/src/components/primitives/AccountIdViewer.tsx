import { AccountIdDecoded } from "@polkadot-api/substrate-codegen"
import { ViewerProps } from "../types"

export const AccountIdViewer: React.FC<ViewerProps<AccountIdDecoded>> = ({
  decoded,
}) => {
  return <div>{decoded.value.address}</div>
}
