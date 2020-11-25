import React, { useContext, useMemo, useCallback } from 'react'
import { saveToken, clearToken } from 'lib/token'
import { ERROR_MESSAGES } from 'utils/error-codes'

type NewUser = Credentials & { username: string }

interface AuthContext {
  googleLogin: () => Promise<void>
  login: (credentials: Credentials) => Promise<void>
  signUp: (credentials: NewUser) => Promise<void>
  logout: () => void
}

const AuthContext = React.createContext<AuthContext | null>(null)

export const AuthProvider: React.FC = props => {
  const makeSession = useCallback(async (data: Record<string, any>) => {
    await saveToken(data.jwt)
    localStorage.setItem('user', data.user.id)
    return Promise.resolve()
  }, [])

  const googleLogin = useCallback(async () => {
    const res = await fetch(
      `${process.env.API_URL}/auth/google/callback${location.search}`
    )

    if (!res.ok) {
      throw new Error(ERROR_MESSAGES[res.status])
    }

    const data = await res.json()
    return await makeSession(data)
  }, [makeSession])

  const login = useCallback(
    async (credentials: Credentials) => {
      const { email, password } = credentials
      const res = await fetch(`${process.env.API_URL}/auth/local/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      })

      if (!res.ok) {
        throw new Error(ERROR_MESSAGES[res.status])
      }

      const data = await res.json()

      return await makeSession(data)
    },
    [makeSession]
  )

  const signUp = useCallback(
    async (credentials: NewUser) => {
      const { username, email, password } = credentials

      const res = await fetch(`${process.env.API_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (!res.ok) {
        throw new Error(ERROR_MESSAGES[res.status])
      }

      const data = await res.json()

      return await makeSession(data)
    },
    [makeSession]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    return clearToken()
  }, [])

  const value = useMemo(() => ({ googleLogin, login, signUp, logout }), [
    googleLogin,
    login,
    signUp,
    logout,
  ])

  return <AuthContext.Provider value={value} {...props} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
