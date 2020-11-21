import React from 'react'
import { render, screen } from '@testing-library/react'
import { LoginView } from '../../components/auth'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: {},
    }
  },
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

test('loads and displays sign in info', () => {
  render(<LoginView csrfToken="test" />)

  expect(screen.getByTestId('link').textContent).toBe('Sign up')
  expect(screen.getByTestId('form-title').textContent).toBe(
    'Sign in to the Platform'
  )
  expect(screen.getByTestId('form-message').textContent).toBe(
    'You can authenticate using your email address or Google account.'
  )
})

test('displays error message', () => {
  useRouter.mockImplementation(() => ({
    query: {
      error: 'true',
    },
  }))
  render(<LoginView csrfToken="test" />)

  expect(screen.getByTestId('error').textContent).toBe(
    'Incorrect credentials. Did you forgot your password?'
  )
})
