import type { Meta, StoryObj } from "@storybook/react"

import { TupleViewer } from "../components/TupleViewer"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Complex/TupleViewer",
  component: TupleViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof TupleViewer>

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
