import React, { useCallback } from 'react'
import clsx from 'clsx'
import styles from './Switch.module.css'

interface Props {
  label?: string
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void | Promise<void>
}

export const Switch: React.FC<Props> = ({
  onChange,
  label = 'switch',
  checked,
  disabled,
}) => {
  const classes = clsx(styles.root, {
    [styles.enabled]: checked,
    [styles.disabled]: disabled,
  })

  const handleChange = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      onChange(!checked)
    },
    [onChange, checked]
  )

  return (
    <button aria-label={label} onClick={handleChange} className={classes}>
      <span />
    </button>
  )
}
