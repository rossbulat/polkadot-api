import type { Meta, StoryObj } from "@storybook/react"

import { EnumView } from "../components/EnumView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Primitives/EnumView",
  component: EnumView,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof EnumView>

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
