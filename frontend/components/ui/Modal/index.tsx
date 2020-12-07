import React, { useRef } from 'react'
import { Portal } from '@reach/portal'
import { HiOutlineX } from 'react-icons/hi'
import { useClickOutside } from 'hooks'
import { IconButton } from 'components/ui'
import styles from './Modal.module.css'

interface Props {
  open?: boolean
  onClose: () => void
}

export const Modal: React.FC<Props> = ({ open, onClose, children }) => {
  const ref = useRef(null)

  useClickOutside(ref, () => onClose())

  return (
    <Portal>
      {open ? (
        <div className={styles.root}>
          <div className={styles.modal} ref={ref}>
            <div className={styles.x}>
              <IconButton onClick={() => onClose()}>
                <HiOutlineX />
              </IconButton>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </Portal>
  )
}
