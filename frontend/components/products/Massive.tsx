import React, { useState, useCallback, useRef } from 'react'
import xlsx from 'xlsx'
import { downloadFile } from 'utils/download'
import { Button } from 'components/ui'
import styles from './Massive.module.css'

interface Props {
  onSubmit: (v: Product[]) => void | Promise<void>
}

const Massive: React.FC<Props> = ({ onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [parsedData, setParsedData] = useState<Product[]>([])
  const ref = useRef(null)

  const download = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const res = await fetch(`${process.env.WEB_URL}/api/xlsx?template=products`)
    const blob = await res.blob()
    downloadFile(blob, 'products.xlsx')
  }, [])

  const upload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target.result
      const workbook = xlsx.read(data, { type: 'binary' })
      const parsed = xlsx.utils.sheet_to_json<Product>(
        workbook.Sheets[workbook.SheetNames[0]]
      )
      setParsedData(parsed)
    }
    reader.readAsBinaryString(files[0])
  }, [])

  const handleClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    ref.current.click()
  }, [])

  const publish = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault()
      setLoading(true)
      try {
        await onSubmit(parsedData)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    },
    [parsedData, onSubmit]
  )

  return (
    <div>
      <p className={styles.info}>
        You can publish multiple items using an Excel file.
      </p>
      <ul className={styles.steps}>
        <li>
          First, click{' '}
          <a className={styles.action} onClick={download}>
            here
          </a>{' '}
          to get the Excel spreadsheet.
        </li>
        <li>Complete it with the items you want to publish.</li>
        <li>
          <input
            type="file"
            ref={ref}
            className={styles.hidden}
            onChange={upload}
          />
          <a className={styles.action} onClick={handleClick}>
            Upload
          </a>{' '}
          the edited file.
        </li>
      </ul>
      <div className={styles.submit}>
        <Button loading={loading} onClick={publish}>
          Publish
        </Button>
      </div>
    </div>
  )
}

export default Massive
