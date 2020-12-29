import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Modal, Button } from '../components/ui'

const stories = storiesOf('Modal', module)

stories.add('Example', () => {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Hello World!</h2>
      </Modal>
    </div>
  )
})
