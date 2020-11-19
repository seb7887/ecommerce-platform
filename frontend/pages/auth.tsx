import React from 'react'
import { NextPage, NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { csrfToken } from 'next-auth/client'
import { getSessionOrRedirect } from 'lib/auth'
import { PageTitle } from 'components/PageTitle'
import { LoadingDots, useUI } from 'components/ui'
import { AdminLayout } from 'layouts'

interface Props {
  csrfToken: string
}

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots color="primary" />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const LoginView = dynamic(
  () => import('components/auth/LoginView'),
  dynamicProps
)
const SignUpView = dynamic(
  () => import('components/auth/SignUpView'),
  dynamicProps
)

const AuthPage: NextPage<Props> = ({ csrfToken }) => {
  const { authView } = useUI()

  return (
    <>
      <PageTitle title="Authenticate" />
      <AdminLayout>
        {authView === 'LOGIN_VIEW' && <LoginView csrfToken={csrfToken} />}
        {authView === 'SIGNUP_VIEW' && <SignUpView csrfToken={csrfToken} />}
      </AdminLayout>
    </>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSessionOrRedirect(ctx)

  return {
    props: {
      session,
      csrfToken: await csrfToken(ctx),
    },
  }
}

export default AuthPage
