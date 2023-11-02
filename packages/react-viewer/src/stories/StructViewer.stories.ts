import type { Meta, StoryObj } from "@storybook/react"

import { StructViewer } from "../components/StructViewer"
import mockDecoded from "./helpers/mockDecoded"

const meta = {
  title: "Complex/StructViewer",
  component: StructViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof StructViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decoded: mockDecoded.struct({
      foo: mockDecoded.bool(true),
      bar: mockDecoded.bool(false),
      fez: mockDecoded.struct({
        boolean: mockDecoded.bool(true),
        string: mockDecoded.bool(false),
      }),
    }),
  },
}
