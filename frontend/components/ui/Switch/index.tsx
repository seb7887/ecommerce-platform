import React, { useState } from 'react'
import styles from './Switch.module.css'

interface Props {
  label?: string
  defaultValue?: boolean
  onChange?: (value: boolean) => void | Promise<void>
}

export const Switch: React.FC<Props> = ({
  onChange,
  label = 'switch',
  defaultValue = false,
}) => {
  const [enabled, setEnabled] = useState<boolean>(defaultValue)
  console.log('enabled', enabled)

  const toggle = () => {
    setEnabled(!enabled)
    if (onChange) {
      onChange(!enabled)
    }
  }

  return (
    <button
      aria-label={label}
      onClick={toggle}
      className={`${styles.root} ${enabled ? styles.enabled : ''}`}
    >
      <span />
    </button>
  )
}
