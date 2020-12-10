import React, { useState, useCallback } from 'react'
import { Button } from 'components/ui'
import styles from './Massive.module.css'

// 1 - User select massive
// 2 - Display message w/link to download excel file
// 3 - Generate excel file on click
// 4 - Download excel file
// 5 - Upload excel file
// 6 - Parse excel file
// 7 - Call backend (make new endpoint)
// 8 - Insert multiple items

const Massive: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const download = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const res = await fetch(`${process.env.WEB_URL}/api/xlsx?template=products`)
    const json = await res.json()
    console.log(json)
  }, [])

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
          <a className={styles.action}>Upload</a> the edited file.
        </li>
      </ul>
      <div className={styles.submit}>
        <Button loading={loading}>Publish</Button>
      </div>
    </div>
  )
}

export default Massive
