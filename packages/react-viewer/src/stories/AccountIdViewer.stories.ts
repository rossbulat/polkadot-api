import type { Meta, StoryObj } from "@storybook/react"

import { AccountIdViewer } from "../components/AccountIdViewer"
import mockDecoded from "./helpers/mockDecoded"
import { SS58String } from "@polkadot-api/substrate-bindings"

const meta = {
  title: "Primitives/AccountIdViewer",
  component: AccountIdViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof AccountIdViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.accountId(
      "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5" as SS58String,
    ),
  },
}
