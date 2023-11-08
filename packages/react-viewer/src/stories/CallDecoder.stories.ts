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
    callData:
      "0x0507006cb03c6140592ec09e885993c26786d9bd6cd02fa1109c4da32fa2ee8fae9e28070088526a74",
  },
}
