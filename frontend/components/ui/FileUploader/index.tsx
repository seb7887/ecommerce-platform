import React, { useRef, useState, useCallback } from 'react'
import {
  HiOutlineCloudUpload,
  HiOutlineExclamationCircle,
  HiOutlinePaperClip,
  HiOutlineX,
} from 'react-icons/hi'
import { Button } from 'components/ui'
import styles from './FileUploader.module.css'

interface Props {
  message?: string
  limit?: number
  onUpload?: (file: FileList) => void | Promise<void>
  onRemove?: (files: string[]) => void | Promise<void>
}

export const FileUploader: React.FC<Props> = ({
  message = 'Upload file',
  limit = 1,
  onUpload,
  onRemove,
}) => {
  const ref = useRef(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>(null)
  const [filesToUpload, setFilesToUpload] = useState<string[]>([])

  const upload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target
      setLoading(true)
      try {
        if (onUpload) {
          await onUpload(files)
        }
        setFilesToUpload(filesToUpload.concat(files[0].name))
      } catch (err) {
        setError('An error has occurred. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    [onUpload, filesToUpload]
  )

  const handleClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    ref.current.click()
  }, [])

  const remove = useCallback(
    (filename: string) => {
      const newArray = filesToUpload.filter(f => f !== filename)
      if (onRemove) {
        onRemove(newArray)
      }
      setFilesToUpload(newArray)
    },
    [onRemove, filesToUpload]
  )

  return (
    <div className={styles.root}>
      <input
        type="file"
        ref={ref}
        className={styles.hidden}
        onChange={upload}
      />
      {filesToUpload.length < limit && (
        <Button
          size="small"
          variant="outlined"
          icon={<HiOutlineCloudUpload />}
          loading={loading}
          onClick={handleClick}
        >
          {message}
        </Button>
      )}
      <ul className={styles.files}>
        {filesToUpload.map((file, index) => (
          <li className={styles.file} key={`file-${index}`}>
            <div className={styles.container}>
              <HiOutlinePaperClip />
              <span className={styles.filename}>{file}</span>
            </div>
            <HiOutlineX
              className={styles.remove}
              onClick={() => remove(file)}
            />
          </li>
        ))}
      </ul>
      {error && (
        <p className={styles.error}>
          <HiOutlineExclamationCircle /> Error message
        </p>
      )}
    </div>
  )
}
