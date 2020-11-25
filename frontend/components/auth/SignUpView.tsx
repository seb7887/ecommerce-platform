import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { HiAtSymbol, HiOutlineKey, HiOutlineUserCircle } from 'react-icons/hi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../lib/auth'
import { Button, Divider, Input, useUI } from 'components/ui'
import { OAuthForm } from './OAuthForm'
import styles from './auth.module.css'

const schema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

const SignUpView: React.FC = () => {
  const { setAuthView } = useUI()
  const { signUp } = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState<string>('')
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        await signUp(values)
        router.push('/')
      } catch (err) {
        setMessage(err.message)
      }
      setSubmitting(false)
    },
    validationSchema: schema,
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
          <OAuthForm />

          <Divider>OR</Divider>

          {message && (
            <div className={styles.error} data-testid="error">
              Something wrong happened. Try again please.
            </div>
          )}

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
        </div>
      </div>
    </>
  )
}

export default SignUpView
