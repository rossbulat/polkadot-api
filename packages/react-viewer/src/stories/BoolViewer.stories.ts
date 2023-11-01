import type { Meta, StoryObj } from "@storybook/react"

import { HexString } from "@polkadot-api/substrate-bindings"
import { BoolViewer } from "../components/BoolViewer"

const meta = {
  title: "Primitives/BoolViewer",
  component: BoolViewer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BoolViewer>

export default meta
type Story = StoryObj<typeof meta>

export const True: Story = {
  args: {
    codec: "bool",
    value: true,
    input: "0x01" as HexString,
  },
}
