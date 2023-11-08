import type { Meta, StoryObj } from "@storybook/react"

import { ArrayViewer } from "../components/complex/ArrayViewer"
import mockDecoded from "../helpers/mockDecoded"

const decoded = mockDecoded.array(
  [42, 23].map((v) => mockDecoded.int(v, "u32")),
)

const meta = {
  title: "Complex/ArrayViewer",
  component: ArrayViewer,
  parameters: {},
  args: {
    decoded,
  },
} satisfies Meta<typeof ArrayViewer>

export default meta
type Story = StoryObj<typeof ArrayViewer>

export const Default: Story = {}
