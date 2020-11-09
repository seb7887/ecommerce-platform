import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { getSessionOrRedirect } from 'lib/auth'
import { PageTitle } from 'components/PageTitle'
import { AdminLayout } from 'layouts/AdminLayout'

const SignUpForm: React.FC = () => (
  <h1>Authenticate yourself!</h1>
)

const AuthPage: NextPage = () => {
  return (
    <>
      <PageTitle title="Authenticate" />
      <AdminLayout>
        <div className="flex flex-col items-center content-center h-full">
          <h3>Sign up and start using the platform</h3>
          <p>Upgrade or downgrade anytime. No credit card required.</p>
          <SignUpForm />
        </div>

      </AdminLayout>
    </>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const sessionPromise = getSessionOrRedirect()
  const session = await sessionPromise(ctx)

  return {
    props: {
      session,
    },
  }
}

export default AuthPage
