import type { Meta, StoryObj } from "@storybook/react"

import { StructViewer } from "../components/complex/StructViewer"
import mockDecoded from "../helpers/mockDecoded"

const meta = {
  title: "Complex/StructViewer",
  component: StructViewer,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof StructViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.struct({
      foo: mockDecoded.struct({
        isFez: mockDecoded.bool(false),
        name: mockDecoded.str("foo"),
      }),
      bar: mockDecoded.struct({
        isFez: mockDecoded.bool(false),
        name: mockDecoded.str("bar"),
      }),
      fez: mockDecoded.struct({
        isFez: mockDecoded.bool(true),
        name: mockDecoded.str("fez"),
        address: mockDecoded.struct({
          street: mockDecoded.str("1234 Main St."),
          city: mockDecoded.str("Anytown"),
          state: mockDecoded.str("CA"),
        }),
      }),
    }),
  },
}
