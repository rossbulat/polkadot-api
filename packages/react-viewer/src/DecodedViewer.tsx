import { Decoded } from "@polkadot-api/substrate-codegen"
import React from "react"
import { AccountIdViewer } from "./components/primitives/AccountIdViewer"
import { ArrayViewer } from "./components/complex/ArrayViewer"
import { BigNumberViewer } from "./components/primitives/BigNumberViewer"
import { BoolViewer } from "./components/primitives/BoolViewer"
import { BytesSequenceViewer } from "./components/primitives/BytesSequenceViewer"
import { EnumViewer } from "./components/complex/EnumViewer"
import { NumberViewer } from "./components/primitives/NumberViewer"
import { SequenceViewer } from "./components/complex/SequenceViewer"
import { StrViewer } from "./components/primitives/StrViewer"
import { StructViewer } from "./components/complex/StructViewer"
import { TupleViewer } from "./components/complex/TupleViewer"
import { VoidViewer } from "./components/primitives/VoidViewer"
import { ViewerProps } from "./components/types"

export type DecodedViewerProps = { decoded: Decoded }

export const DecodedViewer: React.FC<ViewerProps<Decoded>> = (props) => {
  switch (props.decoded.codec) {
    case "_void":
      return <VoidViewer {...props} decoded={props.decoded} />

    case "bool":
      return <BoolViewer {...props} decoded={props.decoded} />

    case "str":
    case "char":
      return <StrViewer {...props} decoded={props.decoded} />

    case "u8":
    case "u16":
    case "u32":
    case "i8":
    case "i16":
    case "i32":
    case "compactNumber":
      return <NumberViewer {...props} decoded={props.decoded} />

    case "u64":
    case "u128":
    case "u256":
    case "i64":
    case "i128":
    case "i256":
    case "compactBn":
      return <BigNumberViewer {...props} decoded={props.decoded} />

    case "Bytes":
      return <BytesSequenceViewer {...props} decoded={props.decoded} />
    case "AccountId":
      return <AccountIdViewer {...props} decoded={props.decoded} />
    case "Sequence":
      return <SequenceViewer {...props} decoded={props.decoded} />
    case "Array":
      return <ArrayViewer {...props} decoded={props.decoded} />
    case "Tuple":
      return <TupleViewer {...props} decoded={props.decoded} />
    case "Struct":
      return <StructViewer {...props} decoded={props.decoded} />
    case "Enum":
      return <EnumViewer {...props} decoded={props.decoded} />

    default:
      return <div>NotImplemented: {props.decoded.codec}</div>
  }
}
