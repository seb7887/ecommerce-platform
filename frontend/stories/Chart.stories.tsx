import React, { useEffect, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { HiChartPie } from 'react-icons/hi'
import { ChartData, TimelineData, Chart } from '../components/charts'

const stories = storiesOf('Chart Component', module)

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

stories.add('Default-Area', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={timelineData}
        chartType="area"
        xAxis={['1', '2', '3']}
      />
    </div>
  )
})

stories.add('Default-Line', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={timelineData}
        chartType="line"
        xAxis={['1', '2', '3']}
      />
    </div>
  )
})

stories.add('Default-Bar', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={demoData}
        chartType="bar"
      />
    </div>
  )
})

stories.add('Default-Pie', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={demoData}
        chartType="pie"
        showLegends
      />
    </div>
  )
})

stories.add('Small-Area', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={timelineData}
        chartType="area"
        xAxis={['1', '2', '3']}
        size="small"
      />
    </div>
  )
})

stories.add('Small-Line', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={timelineData}
        chartType="line"
        xAxis={['1', '2', '3']}
        size="small"
      />
    </div>
  )
})

stories.add('Small-Bar', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={demoData}
        chartType="bar"
        size="small"
      />
    </div>
  )
})

stories.add('Small-Pie', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={demoData}
        chartType="pie"
        showLegends
        size="small"
      />
    </div>
  )
})

stories.add('Default-No-Data', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={[]}
        chartType="pie"
        showLegends
      />
    </div>
  )
})

stories.add('Small-No-Data', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={[]}
        chartType="pie"
        showLegends
        size="small"
      />
    </div>
  )
})

stories.add('Default-Loading', () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={demoData}
        chartType="pie"
        showLegends
        loading={loading}
      />
    </div>
  )
})

stories.add('Small-Loading', () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        icon={<HiChartPie />}
        title="Example Chart"
        data={demoData}
        chartType="pie"
        showLegends
        size="small"
        loading={loading}
      />
    </div>
  )
})
