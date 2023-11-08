import type { Meta, StoryObj } from "@storybook/react"

import { CallDecodedViewer } from "../CallDecodedViewer"

import { V14, getViewBuilder } from "@polkadot-api/substrate-codegen"
import rawMetadata from "../polkadot.json"
const { callDecoder } = getViewBuilder(rawMetadata.metadata.value as V14)

const meta = {
  title: "Components/CallDecodedViewer",
  component: CallDecodedViewer,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof CallDecodedViewer>

export default meta
type Story = StoryObj<typeof meta>

export const StakingKick: Story = {
  name: "Staking.kick()",
  args: {
    decoded: callDecoder(
      "0x071504006cb03c6140592ec09e885993c26786d9bd6cd02fa1109c4da32fa2ee8fae9e28",
    ),
  },
}

export const SystemSetStorage: Story = {
  name: "Staking.set_storage()",
  args: {
    decoded: callDecoder("0x00040c041104220433044404550466"),
  },
}

export const ReferendaRoot: Story = {
  name: "Referenda Root",
  args: {
    decoded: callDecoder(
      "0x1500000001590100004901415050524f56455f52464328303030352c39636261626661383035393864323933353833306330396331386530613065346564383232376238633866373434663166346134316438353937626236643434290001000000",
    ),
  },
}

export const ReferendaSigned: Story = {
  name: "Referenda Signed",
  args: {
    decoded: callDecoder(
      "0x150000016cb03c6140592ec09e885993c26786d9bd6cd02fa1109c4da32fa2ee8fae9e2801590100004901415050524f56455f52464328303030352c39636261626661383035393864323933353833306330396331386530613065346564383232376238633866373434663166346134316438353937626236643434290001000000",
    ),
  },
}
