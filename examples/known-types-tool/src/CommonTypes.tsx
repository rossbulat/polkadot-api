import { useStateObservable } from "@react-rxjs/core"
import { CommonType } from "./CommonType"
import { commonTypes$ } from "./commonTypes.state"
import { Components, Virtuoso } from "react-virtuoso"
import { ForwardedRef, forwardRef } from "react"

export function CommonTypes({ className }: { className?: string }) {
  const commonTypes = useStateObservable(commonTypes$)

  return (
    <Virtuoso
      className={className}
      useWindowScroll
      data={commonTypes}
      components={{ Item }}
      itemContent={(idx) => (
        <CommonType key={commonTypes[idx].checksum} {...commonTypes[idx]} />
      )}
    />
  )
}

const Item: Components["Item"] = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      {...props}
      className="border first:rounded-t last:rounded-b overflow-hidden"
      ref={ref}
    />
  ),
)
