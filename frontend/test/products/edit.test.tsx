import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProductForm } from '../../components/products'

const submit = jest.fn()

const initialValue: Product = {
  name: 'test',
  description: 'test description',
  author: 'somebody',
  price: 100,
  cost: 80,
  stock: 2,
  image: '',
  active: true,
}

test('edit a product', async () => {
  render(<ProductForm onSubmit={submit} initialState={initialValue} />)

  fireEvent.change(screen.getByTestId('name'), {
    target: { value: 'changed!' },
  })

  fireEvent.change(screen.getByTestId('price'), {
    target: { value: 200 },
  })

  fireEvent.click(screen.getByTestId('submit'))

  await waitFor(() => expect(submit).toHaveBeenCalledTimes(1))

  expect(submit).toHaveBeenLastCalledWith({
    name: 'changed!',
    author: 'somebody',
    description: 'test description',
    price: 200,
    cost: 80,
    stock: 2,
    image: '',
    active: true,
  })
})
