import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { getSessionOrRedirect } from 'lib/auth'
import { Header } from 'components/header'
import { PageTitle } from 'components/PageTitle'
import { AdminLayout } from 'layouts'

interface Props {
  session: any
}

const AdminIndexPage: NextPage<Props> = ({ session }) => {
  const isLoggedIn = session != null
  return (
    <>
      <PageTitle title="Home" />
      <AdminLayout isLoggedIn={isLoggedIn}>
        <Header title="Overview" />
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
