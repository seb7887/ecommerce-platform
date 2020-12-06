import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
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
  for (let i = 0; i < 6; i++) {
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
        data={data}
        total={number('Total Items', data.length)}
        pageNumber={number('Page', 1)}
        pageSize={number('Page Size', 6)}
        onSort={(f: string, order: any) => console.log(`${f}:${order}`)}
      />
    </div>
  )
})
