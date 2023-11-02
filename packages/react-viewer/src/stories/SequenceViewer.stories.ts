import type { Meta, StoryObj } from "@storybook/react"

import { SequenceViewer } from "../components/SequenceViewer"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Complex/SequenceViewer",
  component: SequenceViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof SequenceViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.sequence([true, false].map(mockDecoded.bool)),
  },
}
