import React from 'react'
import { GrGoogle } from 'react-icons/gr'
import { Button } from 'components/ui'
import styles from './auth.module.css'

interface Props {
  provider?: string
}

const ICON = {
  google: <GrGoogle />,
}

export const OAuthForm: React.FC<Props> = ({ provider = 'Google' }) => {
  return (
    <form className={styles.oauth}>
      <a href={`${process.env.API_URL}/connect/google`}>
        <Button icon={ICON[provider.toLowerCase()]} fullWidth>
          Continue with Google
        </Button>
      </a>
    </form>
  )
}
