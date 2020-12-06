import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import { HiKey } from 'react-icons/hi'
import { Button } from '../components/ui'

const variantOptions: Record<string, Variant> = {
  Contained: 'contained',
  Outlined: 'outlined',
}

const sizeOptions: Record<string, Size> = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
}

const colorOptions: Record<string, Color> = {
  Primary: 'primary',
  Secondary: 'secondary',
  Danger: 'danger',
}

const stories = storiesOf('Button', module)
stories.addDecorator(withKnobs)

stories.add('Default', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant={
          select('Variant', variantOptions, variantOptions.Contained) as Variant
        }
        size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
        color={select('Color', colorOptions, colorOptions.Primary) as Color}
        disabled={boolean('Disabled', false)}
        loading={boolean('Loading', false)}
      >
        Button
      </Button>
    </div>
  )
})

stories.add('With icon and text', () => {
  return (
    <Button
      icon={<HiKey />}
      variant={
        select('Variant', variantOptions, variantOptions.Contained) as Variant
      }
      size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
      color={select('Color', colorOptions, colorOptions.Primary) as Color}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)}
    >
      Button
    </Button>
  )
})
