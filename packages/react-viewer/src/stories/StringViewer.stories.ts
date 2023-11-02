import type { Meta, StoryObj } from "@storybook/react"

import { StringViewer } from "../components/StringViewer"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Primitives/StringViewer",
  component: StringViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof StringViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.str("Hello, world!"),
  },
}
