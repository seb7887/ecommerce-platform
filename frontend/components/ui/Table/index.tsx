import React, { useCallback, ThHTMLAttributes, useMemo, useEffect } from 'react'
import {
  Column,
  TableOptions,
  useTable,
  usePagination,
  useSortBy,
  SortingRule,
} from 'react-table'
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

export interface Props<T extends Record<string, any>> extends TableOptions<T> {
  columns: TableColumn<T>[]
  data: T[]
  rowsPerPage?: number
  pageNumber?: number
  total?: number
  onRowClick?: (item: T, row: number) => void | Promise<void>
  onChangePage?: (p: number) => void | Promise<void>
  onSort?: (sortBy: SortingRule<T>[]) => void | Promise<void>
}

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  onChangePage,
  onSort,
  rowsPerPage = 6,
  pageNumber = 1,
  total = data.length,
  disableSortBy,
}: Props<T>) => {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    pageCount,
    state: { pageIndex, sortBy },
    canPreviousPage,
    canNextPage,
  } = useTable<T>(
    {
      columns,
      data,
      manualSortBy: true,
      disableSortBy,
      manualPagination: true,
      pageCount: Math.ceil(Math.abs(total / rowsPerPage - 1)) + 1,
      useControlledState: state => {
        return useMemo(
          () => ({
            ...state,
            pageIndex: pageNumber,
            pageSize: rowsPerPage,
          }),
          [state, pageNumber, rowsPerPage]
        )
      },
    },
    useSortBy,
    usePagination
  )

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

  useEffect(() => {
    if (onSort) {
      onSort(sortBy)
    }
  }, [sortBy, onSort])

  return (
    <div className={styles.root}>
      <table {...getTableProps()} className={styles.table}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
              {headerGroup.headers.map(column => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={styles.th}
                >
                  <div>
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
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
        pageCount={pageCount}
        pageIndex={pageIndex}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        onChangePage={handleChangePage}
      />
    </div>
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
  pageCount: number
  pageIndex: number
  canPreviousPage: boolean
  canNextPage: boolean
  onChangePage?: (p: number, execute: boolean) => void
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  pageIndex,
  canPreviousPage,
  canNextPage,
  onChangePage,
}) => {
  return (
    <>
      {pageCount > 0 && (
        <div className={styles.pagination}>
          <span>
            Page {pageIndex + 1} of {pageCount}
          </span>
          <div className={styles.actions}>
            <IconButton
              onClick={() => onChangePage(pageIndex - 1, canPreviousPage)}
              disabled={!canPreviousPage}
            >
              <HiChevronLeft />
            </IconButton>
            <IconButton
              onClick={() => onChangePage(pageIndex + 1, canNextPage)}
              disabled={!canNextPage}
            >
              <HiChevronRight />
            </IconButton>
          </div>
        </div>
      )}
    </>
  )
}
