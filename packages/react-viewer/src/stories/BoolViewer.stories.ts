import type { Meta, StoryObj } from "@storybook/react"

import { BoolViewer } from "../components/BoolViewer"
import mockDecoded from "../helpers/mockDecoded"

const meta = {
  title: "Primitives/BoolViewer",
  component: BoolViewer,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof BoolViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.bool(true),
  },
}
