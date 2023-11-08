import type { Meta, StoryObj } from "@storybook/react"

import { VoidViewer } from "../components/primitives/VoidViewer"
import mockDecoded from "../helpers/mockDecoded"

const meta = {
  title: "Primitives/VoidViewer",
  component: VoidViewer,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof VoidViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.void(),
  },
}
