import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider } from '../../lib/auth'
import { LoginView } from '../../components/auth'

const push = jest.fn()

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

beforeEach(() => fetch.resetMocks())

test('loads and displays sign in info', () => {
  render(
    <AuthProvider>
      <LoginView />
    </AuthProvider>
  )

  expect(screen.getByTestId('link').textContent).toBe('Sign up')
  expect(screen.getByTestId('form-title').textContent).toBe(
    'Sign in to the Platform'
  )
  expect(screen.getByTestId('form-message').textContent).toBe(
    'You can authenticate using your email address or Google account.'
  )
})

test('signs in a valid user', async () => {
  useRouter.mockImplementation(() => ({
    push,
  }))

  render(
    <AuthProvider>
      <LoginView />
    </AuthProvider>
  )

  fetch.mockResponseOnce(
    JSON.stringify({ jwt: 'testJwt', user: { id: 'test' } })
  )

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

test('displays error message', async () => {
  render(
    <AuthProvider>
      <LoginView />
    </AuthProvider>
  )

  fetch.mockRejectOnce(new Error('Test error'))

  fireEvent.change(screen.getByTestId('email'), {
    target: { value: 'test@test.com' },
  })
  fireEvent.change(screen.getByTestId('password'), {
    target: { value: 'test1234' },
  })
  fireEvent.click(screen.getByTestId('submit'))

  await waitFor(() => screen.findByTestId('error'))

  expect(screen.getByTestId('error').textContent).toBe(
    'Incorrect credentials. Did you forgot your password?'
  )
})
