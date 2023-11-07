import { Decoded } from "@polkadot-api/substrate-codegen"
import React from "react"
import { BoolViewer } from "./BoolViewer"
import { StructViewer } from "./StructViewer"
import { AccountIdViewer } from "./AccountIdViewer"
import { ArrayViewer } from "./ArrayViewer"
import { SequenceViewer } from "./SequenceViewer"
import { TupleViewer } from "./TupleViewer"
import { StrViewer } from "./StrViewer"
import { NumberViewer } from "./NumberViewer"
import { BigNumberViewer } from "./BigNumberViewer"
import { EnumViewer } from "./EnumViewer"
import { ViewerProps } from "./types"

export const DecodedViewer: React.FC<ViewerProps<Decoded>> = ({ decoded }) => {
  switch (decoded.codec) {
    case "_void":
      return null

    case "bool":
      return <BoolViewer decoded={decoded} />

    case "str":
    case "char":
      return <StrViewer decoded={decoded} />

    case "u8":
    case "u16":
    case "u32":
    case "i8":
    case "i16":
    case "i32":
    case "compactNumber":
      return <NumberViewer decoded={decoded} />
    case "u64":
    case "u128":
    case "u256":
    case "i64":
    case "i128":
    case "i256":
    case "compactBn":
      return <BigNumberViewer decoded={decoded} />

    // case "Bytes":
    //   return BytesComponent(props)
    case "AccountId":
      return <AccountIdViewer decoded={decoded} />
    case "Sequence":
      return <SequenceViewer decoded={decoded} />
    case "Array":
      return <ArrayViewer decoded={decoded} />
    case "Tuple":
      return <TupleViewer decoded={decoded} />
    case "Struct":
      return <StructViewer decoded={decoded} />
    case "Enum":
      return <EnumViewer decoded={decoded} />

    default:
      return <NotImplemented decoded={decoded} />
  }
}

interface NotImplementedProps {
  decoded: Decoded
}

export const NotImplemented: React.FC<NotImplementedProps> = ({ decoded }) => {
  return <div>NotImplemented({JSON.stringify(decoded.codec)})</div>
}
