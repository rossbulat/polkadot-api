import { Decoded } from "@polkadot-api/substrate-codegen"
import { ViewerProps } from "../types"

const withLabel =
  <P extends Decoded, T extends ViewerProps<P>>(
    Base: React.FC<T>,
  ): React.FC<T> =>
  ({ decoded, ...rest }) => (
    <div>
      <p>{decoded.codec}</p>
      <Base decoded={decoded} {...rest} />
    </div>
  )

export default withLabel
