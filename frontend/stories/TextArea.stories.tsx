import React from 'react'
import { storiesOf } from '@storybook/react'
import { TextArea } from '../components/ui'

const stories = storiesOf('TextArea', module)

stories.add('Example', () => {
  return (
    <TextArea
      label="TextArea"
      name="test"
      onChange={() => console.log('hey')}
    />
  )
})
