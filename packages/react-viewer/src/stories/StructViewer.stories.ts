import type { Meta, StoryObj } from "@storybook/react"

import { StructView } from "../components/StructView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Complex/StructView",
  component: StructView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StructView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.struct({
      foo: mockDecoded.bool(true),
      bar: mockDecoded.bool(false),
      fez: mockDecoded.struct({
        boolean: mockDecoded.bool(true),
        string: mockDecoded.bool(false),
      }),
    }),
  },
}
