import React from 'react'
import { NextPage, NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { getSessionOrRedirect } from 'lib/auth'
import { PageTitle } from 'components/PageTitle'
import { LoadingDots, useUI } from 'components/ui'
import { AdminLayout } from 'layouts'

const Loading = () => (
  <div className="w-screen h-full flex items-center text-center justify-center p-3">
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

const AuthPage: NextPage = () => {
  const { authView } = useUI()

  return (
    <>
      <PageTitle title="Authenticate" />
      <AdminLayout>
        {authView === 'LOGIN_VIEW' && <LoginView />}
        {authView === 'SIGNUP_VIEW' && <SignUpView />}
      </AdminLayout>
    </>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSessionOrRedirect(ctx)

  return {
    props: {
      session,
    },
  }
}

export default AuthPage
