import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { Select, SelectOptions } from '../components/ui'

const sizeOptions: Record<string, Size> = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
}

const stories = storiesOf('Select', module)
stories.addDecorator(withKnobs)

const options: SelectOptions[] = [
  {
    text: 'Do',
    value: 'do',
  },
  {
    text: 'What',
    value: 'what',
  },
  {
    text: 'Thou',
    value: 'thou',
  },
  {
    text: 'Wilt',
    value: 'wilt',
  },
]

stories.add('Example', () => {
  return (
    <Select
      name="test"
      options={options}
      label="Example"
      disabled={boolean('Disabled', false)}
      size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
    />
  )
})
