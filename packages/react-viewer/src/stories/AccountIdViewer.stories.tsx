import type { Meta, StoryObj } from "@storybook/react"

import { SS58String } from "@polkadot-api/substrate-bindings"
import { AccountIdViewer } from "../components/primitives/AccountIdViewer"
import mockDecoded from "../helpers/mockDecoded"

const decoded = mockDecoded.accountId(
  "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5" as SS58String,
)

const meta = {
  title: "Primitives/AccountIdViewer",
  component: AccountIdViewer,
  parameters: {},
  args: {
    decoded,
  },
} satisfies Meta<typeof AccountIdViewer>

export default meta
type Story = StoryObj<typeof AccountIdViewer>

export const Default: Story = {
  args: {
    decoded,
  },
}
