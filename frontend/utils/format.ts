import { SortingRule } from 'react-table'

export interface Filter {
  field: string
  value: string
}

export const formatQueryParams = (
  page: any,
  sort: any,
  filter?: Filter,
  limit = 6
) => {
  const pageStr = page ? `_start=${parseInt(page) * limit}` : ''
  const sortStr = sort ? `_sort=${sort}` : ''
  const filterStr = filter ? `${filter.field}_contains=${filter.value}` : ''
  return `_limit=${limit}${pageStr !== '' ? `&${pageStr}` : ''}${
    sortStr !== '' ? `&${sortStr}` : ''
  }${filterStr !== '' ? `&${filterStr}` : ''}`
}

export const formatSortBy = <T>(sort: any): SortingRule<T>[] => {
  const parsed = sort.split(':')

  return [
    {
      id: parsed[0],
      desc: parsed[1] === 'desc',
    },
  ]
}

export const formatSortStr = <T>(sortBy: SortingRule<T>): string => {
  return `${sortBy.id}:${sortBy.desc ? 'desc' : 'asc'}`
}
