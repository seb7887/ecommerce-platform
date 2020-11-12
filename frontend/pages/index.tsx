import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { getSessionOrRedirect } from 'lib/auth'
import { PageTitle } from 'components/PageTitle'
import { AdminLayout } from 'layouts'

interface Props {
  session: any
}

const AdminIndexPage: NextPage<Props> = ({ session }) => {
  return (
    <>
      <PageTitle title="Home" />
      <AdminLayout>
        <h3 className="text-4xl font-extrabold">Hello World!</h3>
        <p className="mb-4">Reality is what you can get away with.</p>
      </AdminLayout>
    </>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSessionOrRedirect(ctx, true)

  return {
    props: {
      session,
    },
  }
}

export default AdminIndexPage
