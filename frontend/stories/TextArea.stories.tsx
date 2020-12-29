import React from 'react'
import { storiesOf } from '@storybook/react'
import { TextArea } from '../components/ui'

const stories = storiesOf('TextArea', module)

stories.add('Example', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextArea
        label="TextArea"
        name="test"
        onChange={() => console.log('hey')}
      />
    </div>
  )
})
