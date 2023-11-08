import type { Meta, StoryObj } from "@storybook/react"

import { NumberViewer } from "../components/primitives/NumberViewer"
import mockDecoded from "../helpers/mockDecoded"

const meta = {
  title: "Primitives/NumberViewer",
  component: NumberViewer,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof NumberViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.int(42),
  },
}
