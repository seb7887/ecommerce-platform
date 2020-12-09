import React, { useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { LoadingDots } from 'components/ui'
import styles from './Uploader.module.css'

interface Props {
  label?: string
  image?: string
  onChange: (v: string) => void | Promise<void>
}

export const Uploader: React.FC<Props> = ({ label, image, onChange }) => {
  const ref = useRef(null)
  const [fileInput, setFileInput] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    ref.current.click()
  }, [])

  const upload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target
      setLoading(true)
      const data = new FormData()
      data.append('file', files[0])
      data.append('upload_preset', 'aym_dev')

      try {
        const res = await fetch(`${process.env.CLOUDINARY_URL}`, {
          method: 'POST',
          body: data,
        })
        const file = await res.json()
        onChange(file.secure_url)
        setFileInput(new Date().toISOString())
      } catch (err) {
        setError('An error has occurred. Try again.')
      } finally {
        setLoading(false)
      }
    },
    [onChange]
  )

  const remove = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      onChange('')
    },
    [onChange]
  )

  return (
    <div className={styles.root}>
      {label && <label>{label}</label>}
      <input
        type="file"
        ref={ref}
        key={fileInput}
        onChange={upload}
        className={styles.hidden}
      />
      {loading ? (
        <LoadingDots color="primary" />
      ) : !image || image === '' ? (
        <a className={styles.action} onClick={handleClick}>
          + Add image
        </a>
      ) : (
        <div className={styles.image}>
          <Image width={40} height={50} src={image} />
          <p className={styles.action} onClick={remove}>
            Remove
          </p>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
