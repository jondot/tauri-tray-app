import { Meta} from '@storybook/react';
import type { StoryObj } from '@storybook/react'

import { Button } from '../components/button'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    v: 'primary',
    children: 'Save',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Save',
  },
}

