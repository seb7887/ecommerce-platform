import React, { useEffect, useCallback, useMemo } from 'react'
import { Portal } from '@reach/portal'
import {
  HiOutlineX,
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineExclamationCircle,
} from 'react-icons/hi'
import clsx from 'clsx'
import styles from './Snackbar.module.css'

interface Props {
  open?: boolean
  message: string
  severity?: 'info' | 'success' | 'warning' | 'error'
  delay?: number
  onClose: () => void
}

const ICONS: Record<string, JSX.Element> = {
  info: <HiOutlineInformationCircle />,
  success: <HiOutlineCheckCircle />,
  warning: <HiOutlineExclamation />,
  error: <HiOutlineExclamationCircle />,
}

export const Snackbar: React.FC<Props> = ({
  open,
  message,
  onClose,
  severity = 'info',
  delay = 5000,
}) => {
  const classes = clsx(styles.root, {
    [styles.info]: severity === 'info',
    [styles.success]: severity === 'success',
    [styles.warning]: severity === 'warning',
    [styles.error]: severity === 'error',
  })
  const icon = useMemo(() => ICONS[severity], [severity])

  const handleClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      setTimeout(() => onClose(), delay)
    }
  }, [open, onClose, delay])

  return open ? (
    <Portal>
      <div className={classes}>
        <div className={styles.message}>
          {icon}
          <span>{message}</span>
        </div>
        <HiOutlineX onClick={handleClick} />
      </div>
    </Portal>
  ) : null
}
