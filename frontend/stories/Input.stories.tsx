import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs'
import { HiKey } from 'react-icons/hi'
import { Input } from '../components/ui'

const sizeOptions: Record<string, Size> = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
}

const stories = storiesOf('Input', module)
stories.addDecorator(withKnobs)

stories.add('Default', () => {
  return (
    <Input
      name="test"
      label="Text"
      size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
      placeholder={text('Placeholder', 'Example placeholder')}
      disabled={boolean('Disabled', false)}
      error={boolean('Error', false)}
    />
  )
})

stories.add('Password', () => {
  return (
    <Input
      name="password"
      label="Password"
      type="password"
      size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
      placeholder={text('Placeholder', 'Example placeholder')}
      disabled={boolean('Disabled', false)}
      error={boolean('Error', false)}
    />
  )
})

stories.add('With Icon', () => {
  return (
    <Input
      name="test"
      label="Text"
      size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
      placeholder={text('Placeholder', 'Example placeholder')}
      disabled={boolean('Disabled', false)}
      error={boolean('Error', false)}
      prefix={<HiKey />}
    />
  )
})

stories.add('Currency', () => {
  return (
    <Input
      name="test"
      label="Text"
      type="number"
      size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
      placeholder={text('Placeholder', 'Example placeholder')}
      disabled={boolean('Disabled', false)}
      error={boolean('Error', false)}
      prefix={<>$</>}
    />
  )
})

stories.add('With Caption', () => {
  return (
    <Input
      name="test"
      label="Text"
      size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
      placeholder={text('Placeholder', 'Example placeholder')}
      disabled={boolean('Disabled', false)}
      prefix={<HiKey />}
      caption="Some useful text"
      error={boolean('Error', false)}
    />
  )
})
