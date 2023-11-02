import type { Meta, StoryObj } from "@storybook/react"

import { SequenceView } from "../components/SequenceView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Complex/SequenceView",
  component: SequenceView,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof SequenceView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.sequence([true, false].map(mockDecoded.bool)),
  },
}
