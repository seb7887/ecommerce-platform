import React from 'react'
import clsx from 'clsx'
import styles from './IconButton.module.css'

interface Props {
  color?: Color | 'default'
  size?: Size
  disabled?: boolean
  onClick?: (e?: React.SyntheticEvent) => void | Promise<void>
  testId?: string
}

export const IconButton: React.FC<Props> = ({
  children,
  color = 'default',
  size = 'medium',
  disabled,
  onClick,
  testId,
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

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (onClick) {
      onClick()
    }
  }

  return (
    <div className={classes} onClick={handleClick} data-testid={testId}>
      {children}
    </div>
  )
}
