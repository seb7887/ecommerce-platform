import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider } from '../../lib/auth'
import { SignUpView } from '../../components/auth'

const push = jest.fn()

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

beforeEach(() => fetch.resetMocks())

test('loads and displays sign up info', () => {
  render(
    <AuthProvider>
      <SignUpView />
    </AuthProvider>
  )

  expect(screen.getByTestId('link').textContent).toBe('Sign in')
  expect(screen.getByTestId('form-title').textContent).toBe(
    'Sign up and start using the Platform'
  )
  expect(screen.getByTestId('form-message').textContent).toBe(
    'Upgrade or downgrade anytime. No credit card required.'
  )
})

test('signs up a new user', async () => {
  useRouter.mockImplementation(() => ({
    push,
  }))

  render(
    <AuthProvider>
      <SignUpView />
    </AuthProvider>
  )

  fetch.mockResponseOnce(
    JSON.stringify({ jwt: 'testJwt', user: { id: 'test' } })
  )

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

  await waitFor(() => expect(push).toHaveBeenCalledTimes(1))

  expect(push).toHaveBeenCalledWith('/')
})

test('shows error', async () => {
  render(
    <AuthProvider>
      <SignUpView />
    </AuthProvider>
  )

  fetch.mockRejectOnce(new Error('Test error'))

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
