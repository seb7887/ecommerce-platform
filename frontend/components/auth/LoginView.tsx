import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { HiAtSymbol, HiOutlineKey } from 'react-icons/hi'
import { useAuth } from 'lib/auth'
import { Button, Divider, Input, useUI } from 'components/ui'
import { OAuthForm } from './OAuthForm'
import styles from './auth.module.css'

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required(),
  password: Yup.string().required(),
})

const LoginView: React.FC = () => {
  const [error, setError] = useState<string>('')
  const { setAuthView } = useUI()
  const { login } = useAuth()
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        await login(values)
        router.push('/')
      } catch (err) {
        setError(err.message)
      }
      setSubmitting(false)
    },
    validationSchema: schema,
  })

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
          <OAuthForm />

          <Divider>OR</Divider>

          {error && (
            <div className={styles.error} data-testid="error">
              Incorrect credentials. Did you{' '}
              <a className={styles.reset}>forgot your password?</a>
            </div>
          )}
          <form className={styles.form}>
            <Input
              placeholder="Email Address"
              name="email"
              type="email"
              prefix={<HiAtSymbol />}
              error={!!formik.errors.email}
              caption={formik.errors.email}
              onChange={formik.handleChange}
              data-testid="email"
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              prefix={<HiOutlineKey />}
              error={!!formik.errors.password}
              caption={formik.errors.password}
              onChange={formik.handleChange}
              data-testid="password"
            />
            <Button
              fullWidth
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
              testId="submit"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginView
