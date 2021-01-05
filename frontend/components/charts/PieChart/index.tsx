import React, { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { ChartData, CHART_COLORS } from '..'

export interface PieChartProps {
  data: ChartData[]
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = useMemo(
    () => ({
      labels: data.map(d => d.name),
      datasets: [
        {
          data: data.map(d => d.value),
          backgroundColor: CHART_COLORS,
          fill: false,
        },
      ],
    }),
    [data]
  )
  const options = {
    legend: {
      display: false,
    },
  }

  return <Pie data={chartData} options={options} />
}
