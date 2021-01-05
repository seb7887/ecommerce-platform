import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { TimelineData, CHART_COLORS } from '..'

export interface LineChartProps {
  xAxis: string[]
  data: TimelineData[]
  colors?: string[]
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xAxis,
  colors = CHART_COLORS,
}) => {
  const chartData = useMemo(
    () => ({
      labels: xAxis,
      datasets: data.map((d, index) => ({
        label: d.name,
        data: d.values,
        backgroundColor: 'transparent',
        borderColor: colors[index],
      })),
    }),
    [data, xAxis, colors]
  )
  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  }

  return <Line data={chartData} options={options} />
}
