import * as scale from "@polkadot-api/substrate-bindings"

import {
  AccountIdDecoded,
  ArrayDecoded,
  BigNumberDecoded,
  BitSequenceDecoded,
  BoolDecoded,
  Decoded,
  EnumDecoded,
  NumberDecoded,
  SequenceDecoded,
  Shape,
  StringDecoded,
  StringRecord,
  StructDecoded,
  TupleDecoded,
  VoidDecoded,
} from "@polkadot-api/substrate-codegen"

export const mockDecoded = {
  void: (): VoidDecoded => ({
    codec: "_void",
    value: undefined,
    input: "0x" as scale.HexString,
    path: [],
  }),

  bool: (value: boolean): BoolDecoded => ({
    codec: "bool",
    value,

    input: "0xMock" as scale.HexString,
    path: [],
  }),

  str: (value: string): StringDecoded => ({
    codec: "str",
    value,
    input: scale
      .Hex(new Blob([value]).size)
      .dec(scale.fixedStr(new Blob([value]).size).enc(value)),
    path: [],
  }),

  char: (value: string): StringDecoded => ({
    codec: "char",
    value,
    input: scale.Hex(1).dec(scale.char.enc(value)),
    path: [],
  }),

  int: (
    value: number,
    codec: NumberDecoded["codec"] = "u32",
  ): NumberDecoded => ({
    codec,
    value: Math.floor(value),
    input: scale.Hex(Infinity).dec(scale[codec].enc(value)),
    path: [],
  }),

  u8: (value: number): NumberDecoded => {
    const u8Value = Math.min(Math.abs(value), value, 255)

    return {
      codec: "u8",
      value: u8Value,
      input: scale.Hex(Infinity).dec(scale["u8"].enc(u8Value)),
      path: [],
    }
  },

  bigInt: (
    value: bigint,
    codec: BigNumberDecoded["codec"] = "u128",
  ): BigNumberDecoded => ({
    codec,
    value: value,
    input: scale.Hex(Infinity).dec(scale[codec].enc(value)),
    path: [],
  }),

  bitSequence: (_: BitSequenceDecoded["value"]): BitSequenceDecoded => {
    throw "Not Implemented BitSequence Mock"
  },

  //   bytes: (value: Uint8Array): BytesDecoded => ({
  //     codec: "Bytes",
  //     value,
  //     input: scale.Hex(value.length).dec(scale.Bytes(value.length).enc(value)),
  //   }),

  accountId: (value: scale.SS58String): AccountIdDecoded => ({
    codec: "AccountId",
    path: [],
    value: {
      ss58Prefix: 0,
      address: value,
    },
    input: scale.Hex(32).dec(scale.AccountId(0, 32).enc(value)),
  }),

  sequence: (values: Decoded[]): SequenceDecoded => ({
    codec: "Sequence",
    shape: toShape(values[0]),
    path: [],
    value: values,
    input: "0xMock" as scale.HexString, // probably need to reconstruct it from the inputs of the values
  }),

  array: (values: Decoded[]): ArrayDecoded => {
    if (values.length === 0)
      throw new Error("Array must have at least one value")

    return {
      codec: "Array",
      len: values.length,
      shape: toShape(values[0]),
      value: values,
      path: [],
      input: "0xMock" as scale.HexString, // probably need to reconstruct it from the inputs of the values
    }
  },

  tuple: (values: Decoded[]): TupleDecoded => ({
    codec: "Tuple",
    value: values,
    shape: values.map((value) => toShape(value)),
    path: [],
    input: "0xMock" as scale.HexString,
  }),

  enum: <
    I extends StringRecord<Decoded>,
    K extends keyof I extends string ? keyof I : never,
  >(
    shape: I,
    tag: K,
    value: I[K],
  ): EnumDecoded => ({
    codec: "Enum",
    value: {
      tag,
      value,
    },
    shape,
    path: [],
    input: "0xMock" as scale.HexString,
  }),

  struct: (value: StringRecord<Decoded>): StructDecoded => ({
    codec: "Struct",
    shape: value,
    input: "0xMock" as scale.HexString,
    path: [],
    value,
  }),
}
export default mockDecoded

const toShape = (decoded: Decoded): Shape => {
  switch (decoded.codec) {
    case "Tuple":
      return {
        codec: decoded.codec,
        shape: decoded.shape,
      }
    case "Enum":
    case "Struct":
      return {
        codec: decoded.codec,
        shape: decoded.shape,
      }
    case "Sequence":
      return {
        codec: decoded.codec,
        shape: decoded.shape,
      }
    case "Array":
      return {
        codec: decoded.codec,
        shape: decoded.shape,
        len: decoded.len,
      }
    default:
      return { codec: decoded.codec }
  }
}
