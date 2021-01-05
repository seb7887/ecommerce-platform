export interface ChartData {
  name: string
  value: number
}

export interface TimelineData extends Omit<ChartData, 'value'> {
  values: number[]
}

export const CHART_COLORS = [
  '#34D399',
  '#FBBF24',
  '#F87171',
  '#60A5FA',
  '#A78BFA',
  '#F472B6',
  '#818CF8',
  '#A7F3D0',
  '#FDE68A',
  '#FECACA',
  '#BFDBFE',
  '#DDD6FE',
  '#FBCFE8',
  '#C7D2FE',
  '#9CA3AF',
]

export * from './BarChart'
export * from './PieChart'
export * from './LineChart'
export * from './AreaChart'
export * from './Chart'
