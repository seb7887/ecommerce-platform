import React from 'react'
import styles from './ModalHeader.module.css'

interface Props {
  single?: boolean
  onClick: (v: boolean) => void
}

export const ModalHeader: React.FC<Props> = ({ single, onClick }) => {
  return (
    <div className={styles.root}>
      <h1>Add Product{!single ? 's' : ''}</h1>
      <p>
        or you can add{' '}
        <a className={styles.link} onClick={() => onClick(!single)}>
          {single ? 'multiple items' : 'a single item'}
        </a>
      </p>
    </div>
  )
}
