import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { HiOutlinePlus } from 'react-icons/hi'
import { Tooltip, IconButton } from '../components/ui'

const stories = storiesOf('Tooltip', module)
stories.addDecorator(withKnobs)

const effects = {
  Float: 'float',
  Solid: 'solid',
}

const placements = {
  Top: 'top',
  Right: 'right',
  Bottom: 'bottom',
  Left: 'left',
}

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
      <Tooltip
        content="New Element"
        effect={select('Effect', effects, effects.Float) as any}
        place={select('Placement', placements, placements.Bottom) as any}
      >
        <IconButton>
          <HiOutlinePlus />
        </IconButton>
      </Tooltip>
    </div>
  )
})
