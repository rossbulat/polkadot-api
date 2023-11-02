import type { Meta, StoryObj } from "@storybook/react"

import { CallDecodedViewer } from "../components/CallDecodedViewer"

import { getViewBuilder } from "@polkadot-api/substrate-codegen"
import rawMetadata from "./polkadot.json"
const { callDecoder } = getViewBuilder(rawMetadata.metadata.value)

const meta = {
  title: "Components/CallDecodedViewer",
  component: CallDecodedViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof CallDecodedViewer>

export default meta
type Story = StoryObj<typeof meta>

export const StakingKick: Story = {
  args: {
    decoded: callDecoder(
      "0x071504006cb03c6140592ec09e885993c26786d9bd6cd02fa1109c4da32fa2ee8fae9e28",
    ),
  },
}

export const SystemSetStorage: Story = {
  args: {
    decoded: callDecoder("0x00040c041104220433044404550466"),
  },
}
