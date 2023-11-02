import type { Meta, StoryObj } from "@storybook/react"

import { TupleView } from "../components/TupleView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Complex/TupleView",
  component: TupleView,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof TupleView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.tuple([
      mockDecoded.bool(true),
      mockDecoded.str("Hello World"),
    ]),
  },
}
