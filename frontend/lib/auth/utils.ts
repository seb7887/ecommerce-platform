import { NextPageContext } from 'next'
import { redirectUser } from 'lib/nav'
import { authenticateSsr } from 'lib/token'

export const getSessionOrRedirectPromise = (
  isProtectedRoute?: boolean
) => async (ctx: NextPageContext) => {
  const session = await authenticateSsr(ctx)
  const currentPath = ctx.req ? ctx.req.url : window.location.pathname

  if (
    isProtectedRoute &&
    !session &&
    currentPath !== '/auth' &&
    currentPath !== '/reset-password'
  ) {
    redirectUser(ctx, '/auth')
  }

  if (
    session &&
    (currentPath === '/auth' ||
      currentPath === '/callback' ||
      currentPath === '/reset-password')
  ) {
    redirectUser(ctx, '/')
  }

  return session
}

export const getSessionOrRedirect = async (
  ctx: NextPageContext,
  isProtectedRoute?: boolean
) => {
  const sessionPromise = getSessionOrRedirectPromise(isProtectedRoute)
  return await sessionPromise(ctx)
}
