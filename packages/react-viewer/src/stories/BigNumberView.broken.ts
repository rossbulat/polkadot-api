import type { Meta, StoryObj } from "@storybook/react"

import { BigNumberView } from "../components/BigNumberView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Primitives/BigNumberView",
  component: BigNumberView,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof BigNumberView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.bigInt(BigInt(1234567890)),
  },
}
