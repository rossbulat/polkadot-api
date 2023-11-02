import type { Meta, StoryObj } from "@storybook/react"

import { ArrayViewer } from "../components/ArrayViewer"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Complex/ArrayViewer",
  component: ArrayViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof ArrayViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.array([true, false].map(mockDecoded.bool)),
  },
}
