import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import { HiKey } from 'react-icons/hi'
import { IconButton } from '../components/ui'

const options: Record<string, string> = {
  Default: 'default',
  Primary: 'primary',
  Secondary: 'secondary',
  Danger: 'danger',
}

const sizeOptions: Record<string, Size> = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
}

const stories = storiesOf('IconButton', module)
stories.addDecorator(withKnobs)

stories.add('Example', () => {
  return (
    <IconButton
      color={select('Color', options, options.Default) as Color | 'default'}
      size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
      disabled={boolean('Disabled', false)}
    >
      <HiKey />
    </IconButton>
  )
})
