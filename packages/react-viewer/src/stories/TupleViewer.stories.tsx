import type { Meta, StoryObj } from "@storybook/react"

import { TupleViewer } from "../components/complex/TupleViewer"
import mockDecoded from "../helpers/mockDecoded"

const flat = mockDecoded.tuple([
  mockDecoded.bool(true),
  mockDecoded.str("Hello World"),
])

const nested = mockDecoded.tuple([flat, flat])
const meta = {
  title: "Complex/TupleViewer",
  component: TupleViewer,
  parameters: {},
  args: {
    decoded: flat,
  },
  argTypes: {
    decoded: {
      options: ["flat", "nested"],
      mapping: {
        flat,
        nested,
      },
    },
  },
} satisfies Meta<typeof TupleViewer>

export default meta
type Story = StoryObj<typeof TupleViewer>

export const Default: Story = {}
