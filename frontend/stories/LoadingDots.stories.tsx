import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, withKnobs } from '@storybook/addon-knobs'
import { LoadingDots } from '../components/ui'
import { ColorType } from '../components/ui/LoadingDots'

const options: Record<string, ColorType> = {
  Primary: 'primary',
  Secondary: 'secondary',
  Danger: 'danger',
  Transparent: 'transparent',
}

const stories = storiesOf('LoadingDots', module)
stories.addDecorator(withKnobs)

stories.add('Example', () => {
  return (
    <LoadingDots
      color={select('Color', options, options.Transparent) as ColorType}
    />
  )
})
