import React, { useState, useCallback } from 'react'
import xlsx from 'xlsx'
import { downloadFile } from 'utils/download'
import { Button, FileUploader } from 'components/ui'
import styles from './Massive.module.css'

interface Props {
  onSubmit: (v: Product[]) => void | Promise<void>
}

const Massive: React.FC<Props> = ({ onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [parsedData, setParsedData] = useState<Product[]>([])

  const download = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const res = await fetch(`${process.env.WEB_URL}/api/xlsx?template=products`)
    const blob = await res.blob()
    downloadFile(blob, 'products.xlsx')
  }, [])

  const upload = useCallback((files: FileList) => {
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

  const remove = useCallback((files: string[]) => {
    setParsedData([])
  }, [])

  const publish = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault()
      setLoading(true)
      await onSubmit(parsedData)
      setLoading(false)
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
        <li>Upload the edited file.</li>
      </ul>
      <FileUploader onUpload={upload} onRemove={remove} />
      <div className={styles.submit}>
        <Button loading={loading} onClick={publish}>
          Publish
        </Button>
      </div>
    </div>
  )
}

export default Massive
