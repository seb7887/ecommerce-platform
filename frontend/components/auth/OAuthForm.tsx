import React from 'react'
import { GrGoogle } from 'react-icons/gr'
import { Button } from 'components/ui'
import styles from './auth.module.css'

interface Props {
  provider?: string
  csrfToken: string
  callbackPath?: string
}

const ICON = {
  google: <GrGoogle />,
}

export const OAuthForm: React.FC<Props> = ({
  provider = 'Google',
  csrfToken,
  callbackPath,
}) => {
  const callbackUrl = `${process.env.NEXTAUTH_URL}${callbackPath}`

  return (
    <form
      className={styles.oauth}
      action={`${
        process.env.NEXTAUTH_URL
      }/api/auth/signin/${provider.toLowerCase()}`}
      method="POST"
    >
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <input type="hidden" name="callbackUrl" defaultValue={callbackUrl} />
      <Button type="submit" icon={ICON[provider.toLowerCase()]} fullWidth>
        Continue with {`${provider}`}
      </Button>
    </form>
  )
}
