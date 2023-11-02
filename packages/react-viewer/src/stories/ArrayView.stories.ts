import type { Meta, StoryObj } from "@storybook/react"

import { ArrayView } from "../components/ArrayView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Complex/ArrayView",
  component: ArrayView,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof ArrayView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.array([true, false].map(mockDecoded.bool)),
  },
}
