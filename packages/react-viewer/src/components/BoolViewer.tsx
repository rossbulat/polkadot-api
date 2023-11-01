import { BoolDecoded } from "@polkadot-api/substrate-codegen"

interface BoolViewerProps extends BoolDecoded {}

export const BoolViewer = (props: BoolViewerProps) => {
  return <div>{JSON.stringify(props.value)}</div>
}
