import { useStateObservable } from "@react-rxjs/core"
import { CommonType } from "./CommonType"
import { commonTypes$ } from "./commonTypes.state"

export function CommonTypes({ className }: { className?: string }) {
  const commonTypes = useStateObservable(commonTypes$)

  return (
    <ol className={className}>
      {commonTypes.map(({ checksum, types }) => (
        <CommonType key={checksum} checksum={checksum} types={types} />
      ))}
    </ol>
  )
}
