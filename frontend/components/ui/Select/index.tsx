import React from 'react'
import clsx from 'clsx'
import styles from './Select.module.css'

export interface SelectOptions {
  text: string
  value: string | number
}

interface Props {
  name: string
  label?: string
  options: SelectOptions[]
  disabled?: boolean
  size?: Size
  value?: string | number
}

export const Select: React.FC<Props> = ({
  label,
  options,
  disabled,
  value,
  size = 'medium',
}) => {
  const classes = clsx(styles.root, {
    [styles.md]: size === 'medium',
    [styles.sm]: size === 'small',
    [styles.lg]: size === 'large',
    [styles.disabled]: disabled,
  })

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        id={name}
        defaultValue={value}
        disabled={disabled}
        data-testid={name}
      >
        {options.map((option, i) => (
          <option key={`option-${i}`} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}
