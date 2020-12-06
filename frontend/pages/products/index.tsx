import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { HiOutlinePlus } from 'react-icons/hi'
import { getSessionOrRedirect } from 'lib/auth'
import { Header } from 'components/header'
import { PageTitle } from 'components/PageTitle'
import { IconButton } from 'components/ui'
import { AdminLayout } from 'layouts'

interface Props {
  session: any
}

const AdminProductsPage: NextPage<Props> = ({ session }) => {
  const isLoggedIn = session != null
  return (
    <>
      <PageTitle title="Products" />
      <AdminLayout isLoggedIn={isLoggedIn}>
        <Header
          title="Products"
          actions={
            <IconButton>
              <HiOutlinePlus />
            </IconButton>
          }
        />
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

export default AdminProductsPage
