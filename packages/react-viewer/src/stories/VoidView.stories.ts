import type { Meta, StoryObj } from "@storybook/react"

import { VoidView } from "../components/VoidView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Primitives/VoidView",
  component: VoidView,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof VoidView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.void(),
  },
}
