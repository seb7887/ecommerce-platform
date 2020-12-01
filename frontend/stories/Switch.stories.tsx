import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { Switch } from '../components/ui'

const stories = storiesOf('Switch', module)
stories.addDecorator(withKnobs)

stories.add('Two-state', () => {
  return (
    <Switch
      checked={boolean('Checked', false)}
      disabled={boolean('Disabled', false)}
      onChange={(v: boolean) => console.log('key', v)}
    />
  )
})
