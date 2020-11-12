import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { getSessionOrRedirect } from 'lib/auth'
import { PageTitle } from 'components/PageTitle'
import { Button } from 'components/ui'
import { AdminLayout } from 'layouts'

const SignUpForm: React.FC = () => <h1>Authenticate yourself!</h1>

const AuthPage: NextPage = () => {
  return (
    <>
      <PageTitle title="Authenticate" />
      <AdminLayout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div>
            <h1 className="text-2xl font-bold">
              Sign up and start using the platform
            </h1>
            <p className="text-base">
              Upgrade or downgrade anytime. No credit card required.
            </p>
            <Button>Continue with Google</Button>
            <SignUpForm />
          </div>
        </div>
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
