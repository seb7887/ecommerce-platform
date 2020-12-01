import React, { useMemo } from 'react'
import clsx from 'clsx'
import { NotFound } from './NotFound'
import { NoData } from './NoData'
import { NoDataChart } from './NoDataChart'
import styles from './Empty.module.css'

type IllustrationType = '404' | 'no-data' | 'no-data-chart'

interface Props {
  size?: Size
  variant?: IllustrationType
}

const ILLUSTRATIONS: Record<IllustrationType, JSX.Element> = {
  '404': <NotFound />,
  'no-data': <NoData />,
  'no-data-chart': <NoDataChart />,
}

export const Empty: React.FC<Props> = ({
  children,
  size = 'medium',
  variant = '404',
}) => {
  const illustration = useMemo(() => {
    return ILLUSTRATIONS[variant]
  }, [variant])
  const classes = clsx(styles.root, {
    [styles.sm]: size === 'small',
    [styles.md]: size === 'medium',
    [styles.lg]: size === 'large',
  })

  return (
    <div className={classes}>
      {illustration}
      {children}
    </div>
  )
}
