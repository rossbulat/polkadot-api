import { Decoded, StructDecoded } from "@polkadot-api/substrate-codegen"
import { DecodedViewer } from "../../DecodedViewer"
import { ViewerProps } from "../types"
import { useState } from "react"
import { getTypeLabelForDecoded } from "../../helpers"
import clsx from "clsx"

interface StructValueProps extends ViewerProps<StructDecoded> {
  name: string
  value: Decoded
}

const StructValue: React.FC<StructValueProps> = ({ name, value, level }) => {
  const [open, setOpen] = useState(level ? level === 0 : false)

  return (
    <div>
      <div
        className={clsx(
          "w-full cursor-pointer px-2 py-1 ",
          open && "bg-slate-200 hover:bg-slate-100",
          !open && "hover:bg-slate-200",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{name}</span>
        <span className="text-type ml-2">{getTypeLabelForDecoded(value)}</span>
      </div>
      <div
        className={clsx(
          "overflow-hidden border-l-2 border-slate-200 pl-3",
          open && "h-full",
          !open && "h-0",
        )}
      >
        <DecodedViewer decoded={value} />
      </div>
    </div>
  )
}

export const StructViewer: React.FC<ViewerProps<StructDecoded>> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(props.decoded.value).map(([key, value]) => (
        <StructValue
          name={key}
          value={value}
          key={"struct_" + key}
          {...props}
        />
      ))}
    </div>
  )
}
