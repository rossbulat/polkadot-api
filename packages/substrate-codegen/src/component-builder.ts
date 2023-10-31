import type { Codec, StringRecord, V14 } from "@polkadot-api/substrate-bindings"
import * as scale from "@polkadot-api/substrate-bindings"
import type {
  BitSequenceVar,
  CompactVar,
  LookupEntry,
  PrimitiveVar,
  SequenceVar,
  TupleVar,
} from "./lookups"
import { getLookupFn } from "./lookups"
import { HexString } from "@polkadot-api/substrate-bindings"

const _bytes = scale.Hex()

const isBytes = (input: LookupEntry) =>
  input.type === "primitive" && input.value === "u8"

type DummyComponent = (data: HexString | Uint8Array) => string

// Terminal Types
const PrimitiveComponent =
  (info: PrimitiveVar): DummyComponent =>
  (data) => {
    switch (info.value) {
      case "u8":
        return `<u8>${scale[info.value].dec(data)}</u8>`
      case "u32":
        return `<u32>${scale[info.value].dec(data)}</u32>`
      default:
        return `<DefaultPrimitive>${scale[info.value].dec(
          data,
        )}</DefaultPrimitive>`
    }
  }

const CompactComponent =
  (info: CompactVar): DummyComponent =>
  (data) => {
    const codec = scale.compact

    return `<Compact>${codec.dec(data)}</Compact>`
  }

const BitSequence =
  (info: BitSequenceVar): DummyComponent =>
  (data) => {
    const codec = scale.bitSequence

    return `<BitSequenceComponent>${codec.dec(data)}</BitSequenceComponent>`
  }

const BytesComponent =
  (info: SequenceVar): DummyComponent =>
  (data) => {
    if (!isBytes(info.value)) throw new Error("Not bytes")
    console.log({ data })
    const codec = _bytes
    return `<Bytes>${codec.dec(data)}</Bytes>`
  }

const TupleComponent =
  (info: TupleVar): DummyComponent =>
  (data) => {
    return `<Tuple>
      ${data}
    </Tuple>`
  }

const NotImplemented =
  (name: string, info?: LookupEntry): DummyComponent =>
  (data) => {
    return `<NotImplemented${name}>${data}</NotImplemented${name}>`
  }

const _buildComponent = (
  input: LookupEntry,
  stack: Set<LookupEntry>,
  circularCodecs: Map<LookupEntry, Codec<any>>,
): DummyComponent => {
  // console.log({ input, stack, circularCodecs })

  // Terminal Types
  if (input.type === "primitive") return PrimitiveComponent(input)
  if (input.type === "compact") return CompactComponent(input)
  if (input.type === "bitSequence") return BitSequence(input)

  if (input.type === "sequence" && isBytes(input.value)) {
    return BytesComponent(input)
  }

  const buildNextComponent = (nextInput: LookupEntry): Codec<any> => {
    if (!stack.has(nextInput)) {
      const nextStack = new Set(stack)
      nextStack.add(input)
      const result = _buildComponent(nextInput, nextStack, circularCodecs)
      if (circularCodecs.has(input)) circularCodecs.set(input, result)
      return result
    }

    circularCodecs.set(input, scale._void)

    return scale.Self(() => circularCodecs.get(input)!)
  }

  const buildArray =
    (inner: LookupEntry, len: number): DummyComponent =>
    (bytes) => {
      const innerComponent = buildNextComponent(inner)

      // TODO, this is the right track?
      // chop `bytes` into `len` pieces
      // and render each piece with `innerComponent`

      return `<Array>${innerComponent.join("")}</Array>`
    }

  const buildVector = (inner: LookupEntry, len?: number) => {
    const innerCodec = buildNextComponent(inner)
    return len ? scale.Vector(innerCodec, len) : scale.Vector(innerCodec)
  }

  const buildTuple = (value: LookupEntry[]) => (data: HexString) => {
    console.log("Build Tuple", value, data)
    return (data: HexString) => {
      return `<Tuple>
        ${value.map((item) => buildNextComponent(item))}
      </Tuple>`
    }
  }

  const buildStruct = (value: StringRecord<LookupEntry>) => {
    const inner = Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        buildNextComponent(value),
      ]),
    ) as StringRecord<Codec<any>>
    return scale.Struct(inner)
  }

  if (input.type === "array") {
    // I don't think we always want this
    // // Bytes case
    // if (isBytes(input.value)) {
    //   return scale.Hex(input.len)
    // }

    return buildArray(input.value, input.len)
  }

  if (input.type === "sequence") return buildVector(input.value)
  if (input.type === "tuple") return buildTuple(input.value)
  if (input.type === "struct") return buildStruct(input.value)

  // it has to be an enum by now
  const dependencies = Object.entries(input.value).map(([k, v]) => {
    if (v.type === "primitive") return scale._void
    if (v.type === "tuple" && v.value.length === 1) {
      const innerVal = v.value[0]
      return k.startsWith("Raw") &&
        innerVal.type === "array" &&
        isBytes(innerVal.value)
        ? scale.fixedStr(innerVal.len)
        : buildNextComponent(innerVal)
    }
    return v.type === "tuple" ? buildTuple(v.value) : buildStruct(v.value)
  })

  const inner = Object.fromEntries(
    Object.keys(input.value).map((key, idx) => {
      return [key, dependencies[idx]]
    }),
  ) as StringRecord<Codec<any>>

  const indexes = Object.values(input.value).map((x) => x.idx)
  const areIndexesSorted = indexes.every((idx, i) => idx === i)

  return areIndexesSorted
    ? scale.Enum(inner)
    : scale.Enum(inner, indexes as any)
}

export const getComponentBuilder = (metadata: V14) => {
  // Constructor parts
  const lookupData = metadata.lookup
  const getLookupEntryDef = getLookupFn(lookupData)

  const buildDefinition = (id: number): Codec<any> =>
    _buildComponent(getLookupEntryDef(id), new Set(), new Map())

  return { buildDefinition }
}
