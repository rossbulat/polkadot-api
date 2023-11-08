import { Decoded, StructDecoded } from "@polkadot-api/substrate-codegen"
import { InternalDecodedViewer } from "../DecodedViewer"
import { ViewerProps } from "./types"
import { useState } from "react"
import { getTypeLabelForDecoded } from "../helpers"
import clsx from "clsx"

const StructValue: React.FC<{ name: string; value: Decoded }> = ({
  name,
  value,
}) => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <div
        className={clsx(
          "my-1 w-full cursor-pointer px-2 hover:bg-slate-200",
          open && "bg-slate-100",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{name}</span>
        <i className="ml-2 text-slate-400">{getTypeLabelForDecoded(value)}</i>
      </div>
      <div
        className={clsx(
          "overflow-hidden border-l-2 border-slate-200 pl-3",
          open && "h-full",
          !open && "h-0",
        )}
      >
        <InternalDecodedViewer decoded={value} />
      </div>
    </div>
  )
}

export const StructViewer: React.FC<ViewerProps<StructDecoded>> = ({
  decoded,
}) => {
  return (
    <>
      {Object.entries(decoded.value).map(([key, value]) => (
        <StructValue name={key} value={value} key={"struct_" + key} />
      ))}
    </>
  )
}
