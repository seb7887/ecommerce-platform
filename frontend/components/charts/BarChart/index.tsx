import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { ChartData, CHART_COLORS } from '..'

export interface BarChartProps {
  data: ChartData[]
  tooltipLegend?: string
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  tooltipLegend = '# of units',
}) => {
  const chartData = useMemo(
    () => ({
      labels: data.map(d => d.name),
      datasets: [
        {
          label: tooltipLegend,
          data: data.map(d => d.value),
          backgroundColor: CHART_COLORS,
          fill: false,
        },
      ],
    }),
    [data, tooltipLegend]
  )
  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{ gridLines: { display: false }, stacked: true }],
      yAxes: [
        {
          gridLines: { display: false },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return <Bar data={chartData} options={options} />
}
