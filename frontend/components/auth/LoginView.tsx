import React from 'react'
import { GrGoogle } from 'react-icons/gr'
import { HiAtSymbol, HiOutlineKey } from 'react-icons/hi'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { Button, Divider, Input, useUI } from 'components/ui'
import styles from './auth.module.css'

interface Values {
  email: string
  password: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

const LoginView: React.FC = () => {
  const { setAuthView } = useUI()

  return (
    <>
      <div className={styles.link}>
        <p>
          Don't have an account yet?{' '}
          <a onClick={() => setAuthView('SIGNUP_VIEW')}>Sign up</a>
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className="text-2xl font-bold">Sign in to the Platform</h1>
          <p className="text-base">
            You can authenticate using your email address or Google account.
          </p>
          <div className={styles.google}>
            <Button icon={<GrGoogle />} fullWidth>
              Continue with Google
            </Button>
          </div>

          <Divider>OR</Divider>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values, actions) => {
              console.log(values)
            }}
            validationSchema={loginSchema}
          >
            {({ errors }: FormikProps<Values>) => (
              <Form className={styles.form}>
                <Input
                  placeholder="Email Address"
                  name="email"
                  prefix={<HiAtSymbol />}
                  caption={errors.email}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  prefix={<HiOutlineKey />}
                  caption={errors.password}
                />
                <Button type="submit" fullWidth>Sign in</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default LoginView
