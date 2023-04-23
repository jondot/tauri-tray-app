import type { Meta, StoryObj } from '@storybook/react'

import { SignupForm } from '../components/signup'

const meta: Meta<typeof SignupForm> = {
  title: 'Example/Signup',
  component: SignupForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [(Story) => <Story />],
}

export default meta
type Story = StoryObj<typeof SignupForm>

export const Signup: Story = {}
