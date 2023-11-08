import { ComplexDecoded, Decoded } from "@polkadot-api/substrate-codegen"

export const isComplexDecoded = (input: Decoded): input is ComplexDecoded => {
  return ["Sequence", "Array", "Tuple", "Struct", "Enum"].includes(input.codec)
}
