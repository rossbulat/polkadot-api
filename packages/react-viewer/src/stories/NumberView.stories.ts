import type { Meta, StoryObj } from "@storybook/react"

import { NumberView } from "../components/NumberView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Primitives/NumberView",
  component: NumberView,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof NumberView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.int(42),
  },
}
