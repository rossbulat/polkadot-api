import { expect, describe, test, it } from "vitest"
import { getComponentBuilder } from "./component-builder"
import RawMetadata from "./polkadot-metadata.json"
import { getDynamicBuilder } from "./dynamic-builder"

describe("component-builder", () => {
  const componentBuilder = getComponentBuilder(RawMetadata.metadata.value)
  describe("primitives", () => {
    it("u8", () => {
      const componentRenderer = componentBuilder.buildDefinition(2)
      const result = componentRenderer("0x08")
      expect(result).toBe("<u8>8</u8>")
    })

    it("u32", () => {
      const componentRenderer = componentBuilder.buildDefinition(4)
      const result = componentRenderer("0xd2040000")
      expect(result).toBe("<u32>1234</u32>")
    })
  })
  it("sequence(u8) / bytes", () => {
    const componentRenderer = componentBuilder.buildDefinition(13)
    const result = componentRenderer("0x1001020304")
    expect(result).toBe("<Bytes>0x01020304</Bytes>")
  })

  it("[u8; 4]", () => {
    const componentRenderer = componentBuilder.buildDefinition(17)
    const result = componentRenderer("0x01020304")

    expect(result).toBe("<Array>0x01020304</Array>")
  })

  it.skip("tuple(u8, u8)", () => {
    const componentRenderer = componentBuilder.buildDefinition(82)
    const result = componentRenderer("0x0102")
    expect(result).toBe("<Tuple><u8>01</u8><u8>02<u8></Tuple>")
  })
})

describe.skip("dynamic-builder", () => {
  it("development", () => {
    const dynamicBuilder = getDynamicBuilder(RawMetadata.metadata.value)
    expect(dynamicBuilder).toBeDefined()
    const codec = dynamicBuilder.buildDefinition(80)
    expect(codec).toBeDefined()
  })
})
