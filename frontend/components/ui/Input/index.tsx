import React, { useState } from 'react'
import { useField } from 'formik'
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineInformationCircle,
} from 'react-icons/hi'
import clsx from 'clsx'
import styles from './Input.module.css'

type InputType = 'text' | 'password' | 'number'

interface Props {
  label?: string
  caption?: string
  name: string
  type?: InputType
  size?: Size
  placeholder?: string
  disabled?: boolean
  prefix?: JSX.Element
  onChange?: () => void
}

export const Input: React.FC<Props> = ({
  label,
  caption,
  name,
  type = 'text',
  size = 'medium',
  placeholder,
  disabled,
  prefix,
}) => {
  const [inputType, setInputType] = useState<InputType>(type)
  const [reveal, setReveal] = useState<boolean>(false)
  const [field, meta] = useField(name)
  const classes = clsx(styles.field, {
    [styles.error]: meta.error,
    [styles.sm]: size === 'small',
    [styles.md]: size === 'medium',
    [styles.lg]: size === 'large',
  })
  const captionClasses = clsx(styles.caption, {
    [styles.captionError]: meta.error,
    [styles.captionSm]: size === 'small',
    [styles.captionMd]: size === 'medium',
    [styles.captionLg]: size === 'large',
  })
  const toggleRevealPassword = () => {
    setReveal(!reveal)
    if (!reveal) {
      setInputType('text')
    } else {
      setInputType('password')
    }
  }

  const revealIcon = reveal ? (
    <HiOutlineEye
      className={styles.passwordIcon}
      onClick={() => toggleRevealPassword()}
    />
  ) : (
    <HiOutlineEyeOff
      className={styles.passwordIcon}
      onClick={() => toggleRevealPassword()}
    />
  )

  return (
    <div className={styles.root}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={classes}>
        {<span className={styles.prefix}>{prefix}</span>}
        <input
          id={field.name}
          name={field.name}
          placeholder={placeholder}
          type={inputType}
          value={field.value}
          onChange={field.onChange}
          disabled={disabled}
        />
        {type === 'password' && revealIcon}
      </div>
      {caption && (
        <p className={captionClasses}>
          <HiOutlineInformationCircle />
          {caption}
        </p>
      )}
    </div>
  )
}
