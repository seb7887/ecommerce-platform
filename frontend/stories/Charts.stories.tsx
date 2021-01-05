import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  BarChart,
  ChartData,
  TimelineData,
  PieChart,
  LineChart,
  AreaChart,
} from '../components/charts'

const stories = storiesOf('Charts', module)

const demoData: ChartData[] = [
  {
    name: 'Grant Morrison',
    value: 4,
  },
  {
    name: 'Robert Anton Wilson',
    value: 3,
  },
  {
    name: 'Timothy Leary',
    value: 2,
  },
  {
    name: 'Aleister Crowley',
    value: 2,
  },
  {
    name: 'John Carter',
    value: 1,
  },
]

const timelineData: TimelineData[] = [
  {
    name: 'Robert Anton Wilson',
    values: [1, 1, 0],
  },
  {
    name: 'Aleister Crowley',
    values: [0, 2, 1],
  },
]

stories.add('BarChart', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BarChart data={demoData} />
    </div>
  )
})

stories.add('PieChart', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PieChart data={demoData} />
    </div>
  )
})

stories.add('LineChart', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LineChart data={timelineData} xAxis={['1', '2', '3']} />
    </div>
  )
})

stories.add('AreaChart', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AreaChart data={timelineData} xAxis={['1', '2', '3']} />
    </div>
  )
})
