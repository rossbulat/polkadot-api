import type { Meta, StoryObj } from "@storybook/react"

import { BoolView } from "../components/BoolView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Primitives/BoolView",
  component: BoolView,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof BoolView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.bool(true),
  },
}
