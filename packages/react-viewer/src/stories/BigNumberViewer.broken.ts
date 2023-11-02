import type { Meta, StoryObj } from "@storybook/react"

import { BigNumberViewer } from "../components/BigNumberViewer"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Primitives/BigNumberViewer",
  component: BigNumberViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof BigNumberViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.bigInt(BigInt(1234567890)),
  },
}
