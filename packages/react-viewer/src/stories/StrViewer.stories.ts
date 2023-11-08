import type { Meta, StoryObj } from "@storybook/react"

import { StrViewer } from "../components/primitives/StrViewer"
import mockDecoded from "../helpers/mockDecoded"

const meta = {
  title: "Primitives/StrViewer",
  component: StrViewer,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof StrViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.str("Hello, world!"),
  },
}
