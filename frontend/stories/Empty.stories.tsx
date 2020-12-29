import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { Empty } from '../components/ui'

const variantOptions = {
  NotFound: '404',
  NoData: 'no-data',
  NoDataChart: 'no-data-chart',
}

const sizeOptions: Record<string, Size> = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
}

const stories = storiesOf('Empty', module)
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
      <Empty
        variant={
          select('Variant', variantOptions, variantOptions.NotFound) as any
        }
        size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
      >
        There is no data to fill up this table yet
      </Empty>
    </div>
  )
})
