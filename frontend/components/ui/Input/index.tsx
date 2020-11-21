import React, { useState } from 'react'
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineInformationCircle,
} from 'react-icons/hi'
import clsx from 'clsx'
import styles from './Input.module.css'

type InputType = 'text' | 'password' | 'number' | 'email'

interface Props {
  label?: string
  caption?: string
  name: string
  value?: string | number
  error?: boolean
  type?: InputType
  size?: Size
  placeholder?: string
  disabled?: boolean
  prefix?: JSX.Element
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<Props> = ({
  label,
  caption,
  name,
  value,
  error,
  type = 'text',
  size = 'medium',
  placeholder,
  disabled,
  prefix,
  onChange,
}) => {
  const [inputType, setInputType] = useState<InputType>(type)
  const [reveal, setReveal] = useState<boolean>(false)
  const classes = clsx(styles.field, {
    [styles.error]: error,
    [styles.sm]: size === 'small',
    [styles.md]: size === 'medium',
    [styles.lg]: size === 'large',
  })
  const captionClasses = clsx(styles.caption, {
    [styles.captionError]: error,
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
          id={name}
          name={name}
          placeholder={placeholder}
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          data-testid={name}
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
