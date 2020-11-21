import React from 'react'
import { useRouter } from 'next/router'
import { HiAtSymbol, HiOutlineKey } from 'react-icons/hi'
import { Button, Divider, Input, useUI } from 'components/ui'
import { OAuthForm } from './OAuthForm'
import styles from './auth.module.css'

interface Props {
  csrfToken: string
}

const LoginView: React.FC<Props> = ({ csrfToken }) => {
  const { setAuthView } = useUI()
  const router = useRouter()
  const { error } = router.query

  return (
    <>
      <div className={styles.link}>
        <p>
          Don't have an account yet?{' '}
          <a onClick={() => setAuthView('SIGNUP_VIEW')} data-testid="link">
            Sign up
          </a>
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className="text-2xl font-bold" data-testid="form-title">
            Sign in to the Platform
          </h1>
          <p className="text-base" data-testid="form-message">
            You can authenticate using your email address or Google account.
          </p>
          <OAuthForm csrfToken={csrfToken} callbackPath="/auth" />

          <Divider>OR</Divider>

          {error && (
            <div className={styles.error} data-testid="error">
              Incorrect credentials. Did you{' '}
              <a className={styles.reset}>forgot your password?</a>
            </div>
          )}
          <form
            className={styles.form}
            action={`${process.env.NEXTAUTH_URL}/api/auth/callback/credentials`}
            method="POST"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Input
              placeholder="Email Address"
              name="email"
              type="email"
              prefix={<HiAtSymbol />}
              data-testid="email"
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              prefix={<HiOutlineKey />}
              data-testid="password"
            />
            <Button type="submit" fullWidth data-testid="submit">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginView
