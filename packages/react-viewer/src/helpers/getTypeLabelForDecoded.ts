import { Decoded } from "@polkadot-api/substrate-codegen"

export const getTypeLabelForDecoded = (decoded: Decoded): string => {
  switch (decoded.codec) {
    case "Tuple":
      return `(${decoded.shape.map((v) => v.codec).join(", ")})`
    case "Array":
      return `[${decoded.shape.codec}; ${decoded.len}]`
    case "Sequence":
      return `Vec<${decoded.shape.codec}>`
    case "str":
      return "String"
    case "char":
      return "Char"
    default:
      return decoded.codec
  }
}
