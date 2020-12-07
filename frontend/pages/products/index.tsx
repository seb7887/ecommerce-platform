import React, { useCallback } from 'react'
import { NextPage, NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { HiOutlinePlus } from 'react-icons/hi'
import { getSessionOrRedirect } from 'lib/auth'
import { Header } from 'components/header'
import { PageTitle } from 'components/PageTitle'
import { ModalHeader } from 'components/products'
import { IconButton, Tooltip, Modal, LoadingDots, useUI } from 'components/ui'
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

const BatchView = dynamic(
  () => import('components/products/Batch'),
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
  const single = modalView !== 'PRODUCT_BATCH'

  const changeModalView = useCallback(
    (single: boolean) => {
      setModalView(single ? 'PRODUCT_FORM' : 'PRODUCT_BATCH')
    },
    [setModalView]
  )

  const create = useCallback((v: Product) => {
    console.log(v)
  }, [])

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
        <Modal open={displayModal} onClose={() => closeModal()}>
          <ModalHeader single={single} onClick={changeModalView} />
          {modalView === 'PRODUCT_FORM' && (
            <ProductFormView onSubmit={create} />
          )}
          {modalView === 'PRODUCT_BATCH' && <BatchView />}
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
