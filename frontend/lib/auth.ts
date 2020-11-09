import { NextPageContext } from 'next'
import { getSession } from 'next-auth/client'
import { redirectUser } from 'lib/nav'

export const getSessionOrRedirect = (isProtectedRoute?: boolean) => async (
  ctx: NextPageContext
) => {
  const session = await getSession(ctx)
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
    session && (
      currentPath === '/auth' ||
      currentPath === '/callback' ||
      currentPath === '/reset-password'
    )
  ) {
    redirectUser(ctx, '/')
  }

  return session
}
