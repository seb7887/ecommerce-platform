import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import styles from './Header.module.css'

interface Props {
  title: string
  actions?: JSX.Element
  goBack?: boolean
}

export const Header: React.FC<Props> = ({ title, actions, goBack }) => {
  const router = useRouter()

  const back = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      router.back()
    },
    [router]
  )

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {goBack && <HiOutlineArrowLeft onClick={back} />}
        <span>{title}</span>
      </div>
      <div className={styles.actions}>{actions}</div>
    </div>
  )
}
