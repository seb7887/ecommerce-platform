import React, { useMemo, useCallback } from 'react'
import { SortingRule } from 'react-table'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash.debounce'
import { Table, TableColumn, Input, Empty } from 'components/ui'
import styles from './ProductList.module.css'

interface Props {
  products: Product[]
  count: number
  initialSortBy?: SortingRule<Product>[]
  page: number
  onRowClick: (item: Product, row: number) => void | Promise<void>
  onChangePage: (p: number) => void | Promise<void>
  onSort: (sortBy: SortingRule<Product>[]) => void | Promise<void>
  onSearch: (searchTerm: string) => void | Promise<void>
}

export const ProductList: React.FC<Props> = ({
  products,
  count,
  initialSortBy,
  page,
  onChangePage,
  onRowClick,
  onSort,
  onSearch,
}) => {
  const columns: TableColumn<Product>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Cost',
        accessor: 'cost',
        Cell: ({ cell: { value } }) => `$${value}`,
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ cell: { value } }) => `$${value}`,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
      {
        Header: 'Status',
        accessor: 'active',
        Cell: ({ cell: { value } }) => `${value ? 'ACTIVE' : 'INACTIVE'}`,
      },
    ],
    []
  )

  const tableData = useMemo(() => products, [products])

  const debouncedSearch = debounce((v: string) => {
    onSearch(v)
  }, 350)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    debouncedSearch(value)
  }, [])

  return (
    <>
      {!tableData && tableData.length === 0 ? (
        <div className={styles.empty}>
          <Empty variant="no-data" size="large">
            There is no data to fill up this section yet. Try to publish some
            products.
          </Empty>
        </div>
      ) : (
        <div className={styles.root}>
          <div className={styles.search}>
            <p className={styles.total} data-testid="count">
              Showing 6 of {count} products
            </p>
            <Input
              name="search"
              prefix={<HiOutlineSearch />}
              placeholder="Search a product by name"
              size="small"
              onChange={handleChange}
            />
          </div>
          <Table
            columns={columns}
            data={tableData}
            initialSortBy={initialSortBy}
            total={count}
            pageNumber={page}
            onChangePage={onChangePage}
            onRowClick={onRowClick}
            onSort={onSort}
          />
        </div>
      )}
    </>
  )
}
