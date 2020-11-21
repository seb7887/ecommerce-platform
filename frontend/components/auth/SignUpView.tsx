import React, { useState } from 'react'
import { HiAtSymbol, HiOutlineKey, HiOutlineUserCircle } from 'react-icons/hi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Divider, Input, useUI } from 'components/ui'
import { OAuthForm } from './OAuthForm'
import styles from './auth.module.css'

interface Props {
  csrfToken: string
}

const signUpSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

const SignUpView: React.FC<Props> = ({ csrfToken }) => {
  const { setAuthView } = useUI()
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true)
      try {
        const { username, email, password } = values
        const res = await fetch(`${process.env.API_URL}/auth/local/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        })
        const data = await res.json()
        setSuccess(!!data.user)
      } catch (err) {
        setMessage(err.message)
      }
      actions.setSubmitting(false)
    },
    validationSchema: signUpSchema,
  })

  return (
    <>
      <div className={styles.link}>
        <p>
          Already have an account?{' '}
          <a onClick={() => setAuthView('LOGIN_VIEW')} data-testid="link">
            Sign in
          </a>
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className="text-2xl font-bold" data-testid="form-title">
            Sign up and start using the Platform
          </h1>
          <p className="text-base" data-testid="form-message">
            Upgrade or downgrade anytime. No credit card required.
          </p>
          <OAuthForm csrfToken={csrfToken} callbackPath="/auth" />

          <Divider>OR</Divider>

          {message && (
            <div className={styles.error} data-testid="error">
              Something wrong happened. Try again please.
            </div>
          )}
          {success ? (
            <div className={styles.success} data-testid="success">
              User successfully created. You can sign in now.
            </div>
          ) : (
            <form className={styles.form}>
              <Input
                placeholder="Username"
                name="username"
                prefix={<HiOutlineUserCircle />}
                error={!!formik.errors.username}
                caption={formik.errors.username}
                onChange={formik.handleChange}
              />
              <Input
                placeholder="Email Address"
                name="email"
                prefix={<HiAtSymbol />}
                error={!!formik.errors.email}
                caption={formik.errors.email}
                onChange={formik.handleChange}
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                prefix={<HiOutlineKey />}
                error={!!formik.errors.password}
                caption={formik.errors.password}
                onChange={formik.handleChange}
              />
              <Button
                disabled={!formik.isValid}
                loading={formik.isSubmitting}
                onClick={formik.handleSubmit}
                fullWidth
                testId="submit"
              >
                Sign up
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default SignUpView
