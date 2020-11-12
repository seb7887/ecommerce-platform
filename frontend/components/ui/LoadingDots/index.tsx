import React from 'react'
import clsx from 'clsx'
import styles from './LoadingDots.module.css'

export type ColorType = Color | 'transparent'

interface Props {
  color: ColorType
}

export const LoadingDots: React.FC<Props> = ({ color = 'transparent' }) => {
  const className = clsx(styles.root, {
    [styles.primary]: color === 'primary',
    [styles.secondary]: color === 'secondary',
    [styles.danger]: color === 'danger',
    [styles.transparent]: color === 'transparent',
  })

  return (
    <span className={className}>
      <span />
      <span />
      <span />
    </span>
  )
}
