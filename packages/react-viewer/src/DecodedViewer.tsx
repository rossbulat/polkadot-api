import { Decoded } from "@polkadot-api/substrate-codegen"
import React from "react"
import { AccountIdViewer } from "./components/AccountIdViewer"
import { ArrayViewer } from "./components/ArrayViewer"
import { BigNumberViewer } from "./components/BigNumberViewer"
import { BoolViewer } from "./components/BoolViewer"
import { BytesSequenceViewer } from "./components/BytesSequenceViewer"
import { EnumViewer } from "./components/EnumViewer"
import { NumberViewer } from "./components/NumberViewer"
import { SequenceViewer } from "./components/SequenceViewer"
import { StrViewer } from "./components/StrViewer"
import { StructViewer } from "./components/StructViewer"
import { TupleViewer } from "./components/TupleViewer"
import { VoidViewer } from "./components/VoidViewer"
import { ViewerProps } from "./components/types"

export type DecodedViewerProps = { decoded: Decoded }

export const DecodedViewer: React.FC<ViewerProps<Decoded>> = (props) => (
  <LabeledInternalDecodedViewer {...props} level={0} />
)

type InternalDecodedViewerProps = DecodedViewerProps & { level?: number }

export const InternalDecodedViewer: React.FC<InternalDecodedViewerProps> = ({
  decoded,
}) => {
  switch (decoded.codec) {
    case "_void":
      return <VoidViewer decoded={decoded} />

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

    case "Bytes":
      return <BytesSequenceViewer decoded={decoded} />
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
      return <div>NotImplemented: {decoded.codec}</div>
  }
}

const LabeledInternalDecodedViewer = InternalDecodedViewer
