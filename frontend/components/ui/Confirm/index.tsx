import React from 'react'
import { Button } from 'components/ui'
import styles from './Confirm.module.css'

interface Props {
  title?: string
  message?: string
  onCancel: () => void
  onConfirm: () => void | Promise<void>
}

export const Confirm: React.FC<Props> = ({
  onCancel,
  onConfirm,
  title,
  message,
}) => (
  <div className={styles.root}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.message}>{message}</p>
    <div className={styles.actions}>
      <Button variant="outlined" size="small" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="small" onClick={onConfirm}>
        OK
      </Button>
    </div>
  </div>
)
