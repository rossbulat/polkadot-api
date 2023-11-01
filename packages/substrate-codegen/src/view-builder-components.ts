import {
  AccountIdDecoded,
  ArrayDecoded,
  BigNumberDecoded,
  BoolDecoded,
  BytesDecoded,
  Decoded,
  EnumDecoded,
  NumberDecoded,
  SequenceDecoded,
  StringDecoded,
  StructDecoded,
  TupleDecoded,
  VoidDecoded,
} from "./view-builder"

declare namespace React {
  type ReactNode = string
  type FC<T> = (props: T) => ReactNode
}

/**
 * Primitive Components
 */

const VoidComponent: React.FC<VoidDecoded> = (props) => {
  return `${props.codec}(${props.value})`
}

const BoolComponent: React.FC<BoolDecoded> = (props) => {
  return `${props.codec}(${props.value})`
}

const StringComponent: React.FC<StringDecoded> = (props) => {
  return `${props.codec}(${props.value})`
}

const NumberComponent: React.FC<NumberDecoded> = (props) => {
  return `${props.codec}(${props.value})`
}

const BigNumberComponent: React.FC<BigNumberDecoded> = (props) => {
  return `${props.codec}(${props.value})`
}

const BytesComponent: React.FC<BytesDecoded> = (props) => {
  const hex = Buffer.from(props.value).toString("hex")

  return `${props.codec}(0x${hex})`
}

const AccountIdComponent: React.FC<AccountIdDecoded> = (props) => {
  return `${props.codec}(${props.value.address})`
}

/**
 * Complex Components
 */

const SequenceComponent: React.FC<SequenceDecoded> = (props) => {
  return `${props.codec}([${props.value
    .map((v) => DecodedComponent(v))
    .join(", ")}])`
}

const ArrayComponent: React.FC<ArrayDecoded> = (props) => {
  return `${props.codec}([${props.value
    .map((v) => DecodedComponent(v))
    .join(", ")}])`
}

const TupleComponent: React.FC<TupleDecoded> = (props) => {
  return `${props.codec}([${props.value
    .map((v) => DecodedComponent(v))
    .join(", ")}])`
}

const StructComponent: React.FC<StructDecoded> = (props) => {
  return `${props.codec}({${Object.entries(props.value)
    .map(([k, v]) => `${k}: ${DecodedComponent(v)}`)
    .join(", ")}})`
}

const EnumComponent: React.FC<EnumDecoded> = (props) => {
  return `${props.codec}.${props.value.tag}(${DecodedComponent(
    props.value.value,
  )})`
}

const DecodedComponent: React.FC<Decoded> = (props) => {
  switch (props.codec) {
    case "_void":
      return VoidComponent(props)

    case "bool":
      return BoolComponent(props)

    case "str":
    case "char":
      return StringComponent(props)

    case "u8":
    case "u16":
    case "u32":
    case "i8":
    case "i16":
    case "i32":
    case "compactNumber":
      return NumberComponent(props)
    case "u64":
    case "u128":
    case "u256":
    case "i64":
    case "i128":
    case "i256":
    case "compactBn":
      return BigNumberComponent(props)

    case "Bytes":
      return BytesComponent(props)
    case "AccountId":
      return AccountIdComponent(props)

    case "Sequence":
      return SequenceComponent(props)
    case "Array":
      return ArrayComponent(props)
    case "Tuple":
      return TupleComponent(props)
    case "Struct":
      return StructComponent(props)
    case "Enum":
      return EnumComponent(props)

    default:
      throw `Not Implemented ${props.codec}`
  }
}

export {
  AccountIdComponent,
  ArrayComponent,
  BigNumberComponent,
  BoolComponent,
  BytesComponent,
  EnumComponent,
  NumberComponent,
  SequenceComponent,
  StringComponent,
  StructComponent,
  TupleComponent,
  VoidComponent,
}
