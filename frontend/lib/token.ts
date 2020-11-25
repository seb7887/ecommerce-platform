import { NextPageContext } from 'next'
import Cookies from 'universal-cookie'

export const saveToken = async (token: string) => {
  const cookies = new Cookies()
  cookies.set('jwt', token, { path: '/', maxAge: 31536000 })
  return Promise.resolve()
}

export const getToken = (ctx?: NextPageContext) => {
  const cookies = new Cookies(ctx?.req ? ctx.req.headers.cookie : null)
  return cookies.get('jwt')
}

export const clearToken = () => {
  const cookies = new Cookies()
  cookies.remove('jwt')
}

export const authenticateSsr = async (ctx: NextPageContext) => {
  const token = await getToken(ctx)

  if (!token) {
    return null
  }

  return token
}
