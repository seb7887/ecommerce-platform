import React, { useCallback, ThHTMLAttributes, useMemo, useState } from 'react'
import { Column, ColumnInterfaceBasedOnValue, useTable } from 'react-table'
import {
  HiArrowDown,
  HiArrowUp,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi'
import { IconButton } from '../IconButton'
import styles from './Table.module.css'

export type TableColumn<T extends Record<string, any>> = Column<T>
export type SortType = 'asc' | 'desc'

export interface SortBy {
  column: string
  order: SortType | null
}

export interface Props<T extends Record<string, any>>
  extends ColumnInterfaceBasedOnValue<T> {
  columns: TableColumn<T>[]
  data: T[]
  pageSize?: number
  pageNumber?: number
  total?: number
  onRowClick?: (item: T, row: number) => void | Promise<void>
  onChangePage?: (p: number) => void | Promise<void>
  onSort?: (filter: string, order: SortType) => void | Promise<void>
}

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  onChangePage,
  onSort,
  pageSize = 6,
  pageNumber = 1,
  total = data.length,
}: Props<T>) => {
  const [sortBy, setSortBy] = useState<SortBy>({
    column: '',
    order: null,
  })
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable<T>({ columns, data })

  const handleRowClick = useCallback(
    (value: T, index: number) => {
      if (onRowClick) {
        onRowClick(value, index)
      }
    },
    [onRowClick]
  )

  const handleChangePage = useCallback(
    (page: number, canExecute: boolean) => {
      if (canExecute) {
        onChangePage(page)
      }
    },
    [onChangePage]
  )

  const changeSortOrder = useCallback((): SortType | null => {
    switch (sortBy.order) {
      case null:
        return 'desc'
      case 'desc':
        return 'asc'
      default:
        return null
    }
  }, [sortBy.order])

  const handleSort = useCallback(
    (column: string) => {
      if (onSort) {
        const newOrder = changeSortOrder()
        setSortBy({ column, order: newOrder })
        onSort(column, newOrder)
      }
    },
    [onSort, changeSortOrder]
  )

  return (
    <>
      <table {...getTableProps()} className={styles.root}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()} className={styles.th}>
                  <div onClick={() => handleSort(column.id)}>
                    {column.render('Header')}
                    {sortBy.order && sortBy.column === column.id ? (
                      sortBy.order === 'desc' ? (
                        <HiArrowDown />
                      ) : (
                        <HiArrowUp />
                      )
                    ) : (
                      ''
                    )}
                  </div>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            const rowProps = row.getRowProps()
            return (
              <Tr
                {...rowProps}
                key={rowProps.key}
                onClick={() => handleRowClick(row.original, i)}
                className={styles.row}
              >
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()} className={styles.td}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </table>
      <Pagination
        total={total}
        pageNumber={pageNumber}
        pageSize={pageSize}
        onChangePage={handleChangePage}
      />
    </>
  )
}

const Thead: React.FC<React.ThHTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => {
  return <thead {...props}>{children}</thead>
}

const Tbody: React.FC<ThHTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => {
  return <tbody {...props}>{children}</tbody>
}

const Tr: React.FC<React.ThHTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...props
}) => {
  return <tr {...props}>{children}</tr>
}

const Th: React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = ({
  children,
  ...props
}) => {
  return <th {...props}>{children}</th>
}

const Td: React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = ({
  children,
  ...props
}) => {
  return <td {...props}>{children}</td>
}

interface PaginationProps {
  total: number
  pageSize: number
  pageNumber: number
  onChangePage?: (p: number, execute: boolean) => void
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  pageSize,
  pageNumber,
  onChangePage,
}) => {
  const pageLimit = useMemo(() => {
    return Math.ceil(Math.abs(total / pageSize - 1))
  }, [total, pageSize])
  const canPrev = useMemo(() => {
    return pageNumber !== 1
  }, [pageNumber])
  const canNext = useMemo(() => {
    return pageLimit > 1 && pageNumber !== pageLimit
  }, [pageLimit, pageNumber])

  return (
    <>
      {pageLimit > 0 && (
        <div className={styles.pagination}>
          <span>
            Page {pageNumber} of {pageLimit}
          </span>
          <div className={styles.actions}>
            <IconButton
              onClick={() => onChangePage(pageNumber - 1, canPrev)}
              disabled={!canPrev}
            >
              <HiChevronLeft />
            </IconButton>
            <IconButton
              onClick={() => onChangePage(pageNumber + 1, canNext)}
              disabled={!canNext}
            >
              <HiChevronRight />
            </IconButton>
          </div>
        </div>
      )}
    </>
  )
}
