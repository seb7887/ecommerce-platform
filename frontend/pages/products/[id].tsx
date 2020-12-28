import React, { useCallback, useMemo, useState } from 'react'
import { NextPageContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { getSessionOrRedirect } from 'lib/auth'
import { fetcher } from 'lib/api'
import { Header } from 'components/header'
import { PageTitle } from 'components/PageTitle'
import { AdminProduct, ProductForm } from 'components/products'
import {
  ThreeDotMenu,
  ThreeDotMenuItem,
  Modal,
  Snackbar,
  useUI,
} from 'components/ui'
import { AdminLayout } from 'layouts'

interface Props {
  session: string
  product: Product
}

const AdminProductPage: NextPage<Props> = ({ session, product }) => {
  const isLoggedIn = session != null
  const [currentProduct, setCurrentProduct] = useState<Product>(product)
  const [severity, setSeverity] = useState<'success' | 'error' | null>(null)
  const { openModal, displayModal, closeModal } = useUI()
  const { push } = useRouter()

  const editProduct = useCallback(
    async (v: Product) => {
      try {
        const product = await fetcher<Product>(
          `products/${currentProduct.id}`,
          session,
          {
            method: 'PUT',
            body: JSON.stringify(v),
          }
        )
        setSeverity('success')
        setCurrentProduct(product)
        closeModal()
      } catch (err) {
        setSeverity('error')
      }
    },
    [closeModal, currentProduct, session]
  )

  const deleteProduct = useCallback(async () => {
    try {
      await fetcher(`products/${currentProduct.id}`, session, {
        method: 'DELETE',
      })
      setSeverity('success')
      push('/products')
    } catch (err) {
      setSeverity('error')
    }
  }, [currentProduct, session, push])

  const menuItems: ThreeDotMenuItem[] = useMemo(
    () => [
      {
        label: 'Edit',
        action: () => openModal(),
        icon: <HiOutlinePencil />,
      },
      {
        label: 'Delete',
        action: deleteProduct,
        icon: <HiOutlineTrash />,
      },
    ],
    [openModal, deleteProduct]
  )

  const initialValues: Product = useMemo(
    () => ({
      name: currentProduct.name,
      author: currentProduct.author,
      description: currentProduct.description,
      active: currentProduct.active,
      image: currentProduct.image,
      cost: currentProduct.cost,
      price: currentProduct.price,
      stock: currentProduct.stock,
    }),
    [currentProduct]
  )

  return (
    <>
      <PageTitle title={product.name} />
      <AdminLayout isLoggedIn={isLoggedIn}>
        <Header
          title={currentProduct.name}
          actions={<ThreeDotMenu items={menuItems} />}
        />
        <AdminProduct product={currentProduct} />
        <Snackbar
          open={!!severity}
          message={severity === 'error' ? 'Try again' : 'Success!'}
          severity={severity}
          onClose={() => setSeverity(null)}
        />
        <Modal open={displayModal} onClose={() => closeModal()}>
          <ProductForm onSubmit={editProduct} initialState={initialValues} />
        </Modal>
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
