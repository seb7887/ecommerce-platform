import React from 'react'
import styles from './TextArea.module.css'

interface Props {
  label?: string
  name: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void | Promise<void>
}

export const TextArea: React.FC<Props> = ({ label, name, value, onChange }) => {
  return (
    <div className={styles.root}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        className={styles.textarea}
        id={name}
        name={name}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  )
}
