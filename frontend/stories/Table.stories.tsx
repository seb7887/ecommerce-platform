import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { SortingRule } from 'react-table'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import faker from 'faker'
import { Table, TableColumn } from '../components/ui'

interface Person {
  id: string
  name: string
  email: string
  age: number
}

const generatePeople = (): Person[] => {
  const people: Person[] = []
  for (let i = 0; i < 18; i++) {
    people.push({
      id: faker.random.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      age: faker.random.number(),
    })
  }
  return people
}

const data = generatePeople()

const columns: TableColumn<Person>[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
]

const stories = storiesOf('Table', module)
stories.addDecorator(withKnobs)

stories.add('Example', () => {
  const [people, setPeople] = useState<Person[]>([])
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    setPeople(data)
  }, [])

  const handleSort = useCallback((sortBy: SortingRule<Person>[]) => {
    if (sortBy.length > 0) {
      const sorted = data.slice()
      sorted.sort((a, b) => {
        if (a[sortBy[0].id] > b[sortBy[0].id]) {
          return sortBy[0].desc ? 1 : -1
        }
        if (a[sortBy[0].id] < b[sortBy[0].id]) {
          return sortBy[0].desc ? -1 : 1
        }
        return 0
      })
      setPeople(sorted)
    } else {
      setPeople(data)
    }
  }, [])

  const handlePagination = useCallback((p: number) => {
    setPage(p)
  }, [])

  const tableData = useMemo(() => people.slice(page * 6, page * 6 + 6), [
    people,
    page,
  ])

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Table
        columns={columns}
        data={tableData}
        total={18}
        pageNumber={page}
        pageSize={6}
        onSort={handleSort}
        onChangePage={handlePagination}
      />
    </div>
  )
})
