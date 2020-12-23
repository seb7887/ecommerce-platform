import React from 'react'
import { NextPageContext, NextPage } from 'next'
import { getSessionOrRedirect } from 'lib/auth'
import { fetcher } from 'lib/api'
import { Header } from 'components/header'
import { PageTitle } from 'components/PageTitle'
import { AdminProduct } from 'components/products'
import { AdminLayout } from 'layouts'

interface Props {
  session: string
  product: Product
}

const AdminProductPage: NextPage<Props> = ({ session, product }) => {
  const isLoggedIn = session != null
  return (
    <>
      <PageTitle title={product.name} />
      <AdminLayout isLoggedIn={isLoggedIn}>
        <Header title={product.name} />
        <AdminProduct product={product} />
      </AdminLayout>
    </>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSessionOrRedirect(ctx, true)
  const { id } = ctx.query

  const product = await fetcher<Product>(`products/${id}`, session)

  return {
    props: {
      session,
      product,
    },
  }
}

export default AdminProductPage
