import Router from 'next/router'
import { NextPageContext } from 'next'

export const redirectUser = (ctx: NextPageContext, destination: string) => {
  const res = ctx.res

  if (res) {
    res.writeHead(302, { Location: destination })
    res.end()
  } else {
    Router.push(destination)
  }
}
