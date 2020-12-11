import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { FileUploader } from '../components/ui'

const stories = storiesOf('FileUploader', module)
stories.addDecorator(withKnobs)

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
      <FileUploader />
    </div>
  )
})
