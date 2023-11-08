import type { Meta, StoryObj } from "@storybook/react"

import { DecodedViewer } from "../DecodedViewer"

import mockDecoded from "../helpers/mockDecoded"

const mockData = {
  "Tuple(bool, bool)": mockDecoded.tuple([
    mockDecoded.bool(true),
    mockDecoded.bool(false),
  ]),
  "Array()": mockDecoded.array([
    mockDecoded.int(32, "u32"),
    mockDecoded.int(32, "u32"),
    mockDecoded.int(32, "u32"),
  ]),
}

const meta = {
  title: "Components/DecodedViewer",
  component: DecodedViewer,
  parameters: {},
  args: {
    decoded: mockDecoded.str("Hello, world!"),
  },
  argTypes: {
    decoded: {
      options: Object.keys(mockData),
      mapping: mockData,
    },
  },
} satisfies Meta<typeof DecodedViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
