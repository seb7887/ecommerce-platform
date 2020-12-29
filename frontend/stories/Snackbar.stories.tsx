import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { Button, Snackbar } from '../components/ui'

const stories = storiesOf('Snackbar', module)
stories.addDecorator(withKnobs)

const severities = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
}

stories.add('Example', () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button variant="outlined" onClick={handleOpen}>
        Open Snackbar
      </Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Hello World!"
        severity={select('Severity', severities, severities.Info) as any}
      />
    </div>
  )
})
