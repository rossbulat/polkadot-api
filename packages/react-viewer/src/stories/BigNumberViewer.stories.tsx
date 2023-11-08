import type { Meta, StoryObj } from "@storybook/react"

import { BigNumberViewer } from "../components/BigNumberViewer"
import mockDecoded from "../helpers/mockDecoded"

const meta = {
  title: "Primitives/BigNumberViewer",
  component: BigNumberViewer,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BigNumberViewer>

export default meta
type Story = StoryObj<typeof BigNumberViewer>

export const Default: Story = {
  render: () => {
    return <BigNumberViewer decoded={mockDecoded.bigInt(BigInt(1234567890))} />
  },
}
