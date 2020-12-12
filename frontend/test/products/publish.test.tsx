import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProductForm } from '../../components/products'

const submit = jest.fn()

test('publish a product', async () => {
  render(<ProductForm onSubmit={submit} />)

  fireEvent.change(screen.getByTestId('name'), {
    target: { value: 'test' },
  })
  fireEvent.change(screen.getByTestId('description'), {
    target: { value: 'test description' },
  })
  fireEvent.change(screen.getByTestId('author'), {
    target: { value: 'somebody' },
  })
  fireEvent.change(screen.getByTestId('price'), {
    target: { value: 100 },
  })
  fireEvent.change(screen.getByTestId('cost'), {
    target: { value: 80 },
  })
  fireEvent.change(screen.getByTestId('stock'), {
    target: { value: 2 },
  })
  fireEvent.click(screen.getByTestId('submit'))

  await waitFor(() => expect(submit).toHaveBeenCalledTimes(1))

  expect(submit).toHaveBeenLastCalledWith({
    name: 'test',
    author: 'somebody',
    description: 'test description',
    price: 100,
    cost: 80,
    stock: 2,
    image: '',
    active: true,
  })
})
