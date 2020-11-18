import React from 'react'
import clsx from 'clsx'
import { LoadingDots } from '../LoadingDots'
import styles from './Button.module.css'

interface Props {
  variant?: Variant
  size?: Size
  color?: Color
  disabled?: boolean
  icon?: JSX.Element
  loading?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void | Promise<void>
}

export const Button: React.FC<Props> = ({
  children,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  disabled,
  icon,
  loading,
  fullWidth,
  type = 'button',
  onClick,
}) => {
  const classes = clsx(styles.root, {
    [styles.primaryContained]: variant === 'contained' && color === 'primary',
    [styles.primaryOutlined]: variant === 'outlined' && color === 'primary',
    [styles.secondaryContained]:
      variant === 'contained' && color === 'secondary',
    [styles.secondaryOutlined]: variant === 'outlined' && color === 'secondary',
    [styles.dangerContained]: variant === 'contained' && color === 'danger',
    [styles.dangerOutlined]: variant === 'outlined' && color === 'danger',
    [styles.disabledContained]: variant === 'contained' && disabled,
    [styles.disabledOutlined]: variant === 'outlined' && disabled,
    [styles.sm]: size === 'small',
    [styles.md]: size === 'medium',
    [styles.lg]: size === 'large',
    [styles.fullWidth]: fullWidth,
  })
  const contentClasses = clsx(styles.content, {
    [styles.spaced]: fullWidth,
  })
  const loadingColor = variant === 'contained' ? 'transparent' : color

  return (
    <button
      type={type}
      role="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={contentClasses}>
        {icon}
        <span>{children}</span>
        {loading && (
          <i className="pl-2 m-0 flex">
            <LoadingDots color={loadingColor} />
          </i>
        )}
      </div>
    </button>
  )
}
