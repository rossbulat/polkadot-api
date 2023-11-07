import type { Meta, StoryObj } from "@storybook/react"

import { AccountIdViewer } from "../components/AccountIdViewer"
import mockDecoded from "./helpers/mockDecoded"
import { SS58String } from "@polkadot-api/substrate-bindings"
import withLabel from "../components/enhancers/withLabel"

const meta = {
  title: "Primitives/AccountIdViewer",
  component: AccountIdViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof AccountIdViewer>

export default meta
type Story = StoryObj<typeof AccountIdViewer>

const decoded = mockDecoded.accountId(
  "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5" as SS58String,
)
export const Default: Story = {
  args: {
    decoded,
  },
}

export const WithLabel: Story = {
  args: {},
  render: () => {
    const Enhanced = withLabel(AccountIdViewer)
    return <Enhanced decoded={decoded} />
  },
}
