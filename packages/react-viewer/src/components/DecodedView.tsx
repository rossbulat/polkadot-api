import { Decoded } from "@polkadot-api/substrate-codegen"
import React from "react"
import { BoolView } from "./BoolView"
import { StructView } from "./StructView"
import { AccountIdView } from "./AccountIdView"
import { ArrayView } from "./ArrayView"
import { SequenceView } from "./SequenceView"
import { TupleView } from "./TupleView"
import { StringView } from "./StringView"
import { NumberView } from "./NumberView"
import { BigNumberView } from "./BigNumberView"
import { EnumView } from "./EnumView"

interface DecodedViewProps {
  decoded: Decoded
}

export const DecodedView: React.FC<DecodedViewProps> = ({ decoded }) => {
  switch (decoded.codec) {
    case "_void":
      return null

    case "bool":
      return <BoolView decoded={decoded} />

    case "str":
    case "char":
      return <StringView decoded={decoded} />

    case "u8":
    case "u16":
    case "u32":
    case "i8":
    case "i16":
    case "i32":
    case "compactNumber":
      return <NumberView decoded={decoded} />
    case "u64":
    case "u128":
    case "u256":
    case "i64":
    case "i128":
    case "i256":
    case "compactBn":
      return <BigNumberView decoded={decoded} />

    // case "Bytes":
    //   return BytesComponent(props)
    case "AccountId":
      return <AccountIdView decoded={decoded} />
    case "Sequence":
      return <SequenceView decoded={decoded} />
    case "Array":
      return <ArrayView decoded={decoded} />
    case "Tuple":
      return <TupleView decoded={decoded} />
    case "Struct":
      return <StructView decoded={decoded} />
    case "Enum":
      return <EnumView decoded={decoded} />

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
