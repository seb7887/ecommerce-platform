import React, { useCallback, useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { SortingRule } from 'react-table'
import { HiOutlinePlus } from 'react-icons/hi'
import { getSessionOrRedirect } from 'lib/auth'
import { fetcher } from 'lib/api'
import { formatQueryParams, formatSortBy, formatSortStr } from 'utils/format'
import { Header } from 'components/header'
import { PageTitle } from 'components/PageTitle'
import { ModalHeader, ProductList } from 'components/products'
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
  session: string
  products: Product[]
  count: number
  initialSortBy?: SortingRule<Product>[]
  page?: string
}

interface State {
  products: Product[]
  count: number
}

const AdminProductsPage: NextPage<Props> = ({
  session,
  products: initialData,
  count,
  initialSortBy = [],
  page: initialPage,
}) => {
  const isLoggedIn = session != null
  const {
    openModal,
    closeModal,
    displayModal,
    modalView,
    setModalView,
  } = useUI()
  const [severity, setSeverity] = useState<'success' | 'error' | null>(null)
  const [state, setState] = useState<State>({
    products: initialData,
    count,
  })
  const [sortBy, setSortBy] = useState<string>(
    initialSortBy.length > 0 ? formatSortStr(initialSortBy[0]) : null
  )
  const [page, setPage] = useState<number>(
    initialPage ? parseInt(initialPage) : 0
  )
  const [filterValue, setFilterValue] = useState<string>('')
  const [queryParams, setQueryParams] = useState<string>('')
  const { push } = useRouter()
  const single = modalView !== 'PRODUCT_MASSIVE'

  const changeModalView = useCallback(
    (single: boolean) => {
      setModalView(single ? 'PRODUCT_FORM' : 'PRODUCT_MASSIVE')
    },
    [setModalView]
  )

  const refetch = useCallback(async () => {
    const count = await fetcher<number>('products/count', session)
    const products = await fetcher<Product[]>(
      `products?${queryParams}`,
      session
    )

    setState({
      products,
      count,
    })
  }, [session, queryParams])

  const create = useCallback(
    async (v: Product) => {
      try {
        await fetcher<Product>('products', session, {
          method: 'POST',
          body: JSON.stringify(v),
        })
        setSeverity('success')
        closeModal()
        await refetch()
      } catch (err) {
        setSeverity('error')
      }
    },
    [session, closeModal, refetch]
  )

  const massivePublish = useCallback(
    async (v: Product[]) => {
      try {
        const res = await fetch(`${process.env.API_URL}/products/bulk`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(v),
        })

        if (!res.ok) {
          throw new Error()
        }
        setSeverity('success')
        await refetch()
      } catch (err) {
        setSeverity('error')
      } finally {
        closeModal()
      }
    },
    [session, closeModal, refetch]
  )

  useEffect(() => {
    ;(async () => {
      const products = await fetcher<Product[]>(
        `products?${queryParams}`,
        session
      )

      setState(prev => ({
        ...prev,
        products,
      }))
    })()
  }, [queryParams, session])

  useEffect(() => {
    let filter = null
    if (filterValue !== '') {
      filter = {
        field: 'name',
        value: filterValue,
      }
    }
    setQueryParams(formatQueryParams(page, sortBy, filter))
  }, [page, sortBy, filterValue])

  const handleChangePage = useCallback((p: number) => {
    setPage(p)
  }, [])

  const handleRowClick = useCallback(
    (item: Product, _: number) => {
      push(`/products/${item.id}`)
    },
    [push]
  )

  const handleSort = useCallback((sortBy: SortingRule<Product>[]) => {
    const sortByStr =
      sortBy.length > 0 ? formatSortStr<Product>(sortBy[0]) : null
    setSortBy(sortByStr)
  }, [])

  const handleSearch = useCallback((searchTerm: string) => {
    setFilterValue(searchTerm)
  }, [])

  return (
    <>
      <PageTitle title="Products" />
      <AdminLayout isLoggedIn={isLoggedIn}>
        <Header
          title="Products"
          actions={
            <Tooltip content="Publish Product">
              <IconButton onClick={() => openModal()} testId="action">
                <HiOutlinePlus />
              </IconButton>
            </Tooltip>
          }
        />

        <ProductList
          products={state.products}
          count={state.count}
          initialSortBy={initialSortBy}
          page={page}
          onChangePage={handleChangePage}
          onRowClick={handleRowClick}
          onSort={handleSort}
          onSearch={handleSearch}
        />

        <Snackbar
          open={!!severity}
          message={severity === 'error' ? 'Try again' : 'Published!'}
          severity={severity}
          onClose={() => setSeverity(null)}
        />
        <Modal open={displayModal} onClose={() => closeModal()}>
          <ModalHeader single={single} onClick={changeModalView} />
          {modalView === 'PRODUCT_FORM' && (
            <ProductFormView onSubmit={create} />
          )}
          {modalView === 'PRODUCT_MASSIVE' && (
            <MassiveView onSubmit={massivePublish} />
          )}
        </Modal>
      </AdminLayout>
    </>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSessionOrRedirect(ctx, true)
  const { page, sort } = ctx.query
  const queryParams = formatQueryParams(page, sort)
  const initialSortBy = sort ? formatSortBy(sort) : null

  const products = await fetcher<Product[]>(`products?${queryParams}`, session)
  const count = await fetcher('products/count', session)

  return {
    props: {
      session,
      products,
      count,
      ...(initialSortBy && { initialSortBy }),
      ...(page && { page }),
    },
  }
}

export default AdminProductsPage
