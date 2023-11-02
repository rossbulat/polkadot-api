import type { Meta, StoryObj } from "@storybook/react"

import { StringView } from "../components/StringView"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Primitives/StringView",
  component: StringView,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof StringView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.str("Hello, world!"),
  },
}
