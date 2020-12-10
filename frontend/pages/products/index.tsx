import React, { useCallback, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { HiOutlinePlus } from 'react-icons/hi'
import { getSessionOrRedirect } from 'lib/auth'
import { Header } from 'components/header'
import { PageTitle } from 'components/PageTitle'
import { ModalHeader } from 'components/products'
import {
  IconButton,
  Tooltip,
  Modal,
  LoadingDots,
  Snackbar,
  useUI,
} from 'components/ui'
import { AdminLayout } from 'layouts'

const Loading = () => (
  <div className="w-screen h-full flex items-center text-center justify-center p-3">
    <LoadingDots color="primary" />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const ProductFormView = dynamic(
  () => import('components/products/ProductForm'),
  dynamicProps
)

const MassiveView = dynamic(
  () => import('components/products/Massive'),
  dynamicProps
)

interface Props {
  session: any
}

const AdminProductsPage: NextPage<Props> = ({ session }) => {
  const isLoggedIn = session != null
  const {
    openModal,
    closeModal,
    displayModal,
    modalView,
    setModalView,
  } = useUI()
  const [severity, setSeverity] = useState<'success' | 'error' | null>(null)
  const single = modalView !== 'PRODUCT_MASSIVE'

  const changeModalView = useCallback(
    (single: boolean) => {
      setModalView(single ? 'PRODUCT_FORM' : 'PRODUCT_MASSIVE')
    },
    [setModalView]
  )

  const create = useCallback(
    async (v: Product) => {
      try {
        await fetch(`${process.env.API_URL}/products`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(v),
        })
        setSeverity('success')
        closeModal()
      } catch (err) {
        setSeverity('error')
      }
    },
    [session, closeModal]
  )

  return (
    <>
      <PageTitle title="Products" />
      <AdminLayout isLoggedIn={isLoggedIn}>
        <Header
          title="Products"
          actions={
            <Tooltip content="Add Product">
              <IconButton onClick={() => openModal()}>
                <HiOutlinePlus />
              </IconButton>
            </Tooltip>
          }
        />
        <Snackbar
          open={!!severity}
          message={
            severity === 'error'
              ? 'Error during creation. Try again.'
              : 'Product created'
          }
          severity={severity}
          onClose={() => setSeverity(null)}
        />
        <Modal open={displayModal} onClose={() => closeModal()}>
          <ModalHeader single={single} onClick={changeModalView} />
          {modalView === 'PRODUCT_FORM' && (
            <ProductFormView onSubmit={create} />
          )}
          {modalView === 'PRODUCT_MASSIVE' && <MassiveView />}
        </Modal>
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
