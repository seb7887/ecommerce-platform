import React from 'react'
import clsx from 'clsx'
import styles from './IconButton.module.css'

interface Props {
  color?: Color | 'default'
  size?: Size
  disabled?: boolean
}

export const IconButton: React.FC<Props> = ({
  children,
  color = 'default',
  size = 'medium',
  disabled,
}) => {
  const classes = clsx(styles.root, {
    [styles.default]: color === 'default',
    [styles.primary]: color === 'primary',
    [styles.secondary]: color === 'secondary',
    [styles.danger]: color === 'danger',
    [styles.disabled]: disabled,
    [styles.sm]: size === 'small',
    [styles.md]: size === 'medium',
    [styles.lg]: size === 'large',
  })

  return <div className={classes}>{children}</div>
}
