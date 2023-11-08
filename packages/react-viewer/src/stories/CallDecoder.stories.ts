import type { Meta, StoryObj } from "@storybook/react"

import { CallDecoder } from "../CallDecoder"

const meta = {
  title: "Components/CallDecoder",
  component: CallDecoder,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof CallDecoder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    callData: "0x00040c041104220433044404550466",
  },
}
