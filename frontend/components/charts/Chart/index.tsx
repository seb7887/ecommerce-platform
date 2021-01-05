import React, { useMemo } from 'react'
import clsx from 'clsx'
import { Empty, Tooltip, LoadingDots } from 'components/ui'
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  ChartData,
  TimelineData,
  CHART_COLORS,
} from '..'
import { Dot } from './Dot'
import styles from './Chart.module.css'

export type ChartType = 'area' | 'bar' | 'line' | 'pie'

interface Props {
  data: ChartData[] | TimelineData[]
  xAxis?: string[]
  chartType: ChartType
  size?: 'small' | 'default'
  title?: string
  icon?: JSX.Element
  showLegends?: boolean
  colors?: string[]
  loading?: boolean
}

export const Chart: React.FC<Props> = ({
  data,
  chartType,
  xAxis = [],
  size = 'default',
  title,
  icon,
  showLegends,
  colors = CHART_COLORS,
  loading,
}) => {
  const classes = clsx(styles.root, {
    [styles.default]: size === 'default',
    [styles.small]: size === 'small',
  })
  const chartComponent = useMemo(() => {
    switch (chartType) {
      case 'area':
        return <AreaChart data={data as TimelineData[]} xAxis={xAxis} />
      case 'bar':
        return <BarChart data={data as ChartData[]} />
      case 'line':
        return <LineChart data={data as TimelineData[]} xAxis={xAxis} />
      case 'pie':
        return <PieChart data={data as ChartData[]} />
    }
  }, [data, chartType, xAxis])

  return (
    <div className={classes}>
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <p className={styles.title}>{title}</p>
      </div>
      {loading ? (
        <div className={styles.loading}>
          <LoadingDots color="primary" />
        </div>
      ) : data.length > 0 ? (
        chartComponent
      ) : (
        <div className={styles.empty}>
          <Empty variant="no-data-chart">
            There isn't enough data to fill up this chart yet
          </Empty>
        </div>
      )}
      {showLegends && data.length > 0 && !loading && (
        <div className={styles.legends}>
          {(data as any).map((d: ChartData | TimelineData, index: number) => (
            <Tooltip content={d.name} key={`dot-${index}`}>
              <div key={`dot-${index}`} className={styles.legend}>
                <Dot color={colors[index]} />
                {size === 'default' ? d.name : ''}
              </div>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  )
}
