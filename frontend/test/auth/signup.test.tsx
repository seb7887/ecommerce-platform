import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { SignUpView } from '../../components/auth'

beforeEach(() => fetch.resetMocks())

test('loads and displays sign up info', () => {
  render(<SignUpView csrfToken="test" />)

  expect(screen.getByTestId('link').textContent).toBe('Sign in')
  expect(screen.getByTestId('form-title').textContent).toBe(
    'Sign up and start using the Platform'
  )
  expect(screen.getByTestId('form-message').textContent).toBe(
    'Upgrade or downgrade anytime. No credit card required.'
  )
})

test('signs up a new user', async () => {
  render(<SignUpView csrfToken="test" />)

  fetch.mockResponseOnce(JSON.stringify({ user: { name: 'test' } }))

  fireEvent.change(screen.getByTestId('username'), {
    target: { value: 'test' },
  })
  fireEvent.change(screen.getByTestId('email'), {
    target: { value: 'test@test.com' },
  })
  fireEvent.change(screen.getByTestId('password'), {
    target: { value: 'test1234' },
  })
  fireEvent.click(screen.getByTestId('submit'))

  await waitFor(() => screen.findByTestId('success'))

  expect(screen.getByTestId('success').textContent).toBe(
    'User successfully created. You can sign in now.'
  )
})

test('shows error', async () => {
  render(<SignUpView csrfToken="test" />)

  fetch.mockRejectOnce(new Error('test error'))

  fireEvent.change(screen.getByTestId('username'), {
    target: { value: 'test' },
  })
  fireEvent.change(screen.getByTestId('email'), {
    target: { value: 'test@test.com' },
  })
  fireEvent.change(screen.getByTestId('password'), {
    target: { value: 'test1234' },
  })
  fireEvent.click(screen.getByTestId('submit'))

  await waitFor(() => screen.findByTestId('error'))

  expect(screen.getByTestId('error').textContent).toBe(
    'Something wrong happened. Try again please.'
  )
})
