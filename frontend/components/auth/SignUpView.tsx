import React from 'react'
import { HiAtSymbol, HiOutlineKey, HiOutlineUserCircle } from 'react-icons/hi'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { Button, Divider, Input, useUI } from 'components/ui'
import { OAuthForm } from './OAuthForm'
import styles from './auth.module.css'

interface Values {
  username: string
  email: string
  password: string
}

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

  return (
    <>
      <div className={styles.link}>
        <p>
          Already have an account?{' '}
          <a onClick={() => setAuthView('LOGIN_VIEW')}>Sign in</a>
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className="text-2xl font-bold">
            Sign up and start using the Platform
          </h1>
          <p className="text-base">
            Upgrade or downgrade anytime. No credit card required.
          </p>
          <OAuthForm csrfToken={csrfToken} callbackPath="/auth" />

          <Divider>OR</Divider>

          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            onSubmit={(values, actions) => {
              console.log(values)
            }}
            validationSchema={signUpSchema}
          >
            {({ errors }: FormikProps<Values>) => (
              <Form className={styles.form}>
                <Input
                  placeholder="Username"
                  name="username"
                  prefix={<HiOutlineUserCircle />}
                  caption={errors.username}
                />
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
                <Button type="submit" fullWidth>
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default SignUpView
