import React from 'react'
import { storiesOf } from '@storybook/react'
import { Switch } from '../components/ui'

const stories = storiesOf('Switch', module)

stories.add('Two-state', () => {
  return <Switch />
})
