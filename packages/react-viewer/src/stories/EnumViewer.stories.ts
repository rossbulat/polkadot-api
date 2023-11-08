import type { Meta, StoryObj } from "@storybook/react"

import { EnumViewer } from "../components/complex/EnumViewer"
import mockDecoded from "../helpers/mockDecoded"

const meta = {
  title: "Primitives/EnumViewer",
  component: EnumViewer,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof EnumViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.enum(
      {
        A: mockDecoded.str("Hello"),
        B: mockDecoded.int(123),
        C: mockDecoded.bool(true),
      },
      "A",
      mockDecoded.str("Hello"),
    ),
  },
}
