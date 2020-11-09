import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  session: {
    jwt: true,
  },
  debug: process.env.NODE_ENV !== 'production',
  callbacks: {
    session: async (session: Session, user: User) => {
      session.jwt = user.jwt
      session.id = user.id

      return Promise.resolve(session)
    },
    jwt: async (token: Token, user: User, account: Account) => {
      const isSignIn = user ? true : false

      if (isSignIn) {
        const response = await fetch(
          `${process.env.API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        )
        const data = await response.json()

        token.jwt = data.jwt
        token.id = data.user.id
      }

      return Promise.resolve(token)
    },
  },
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  NextAuth(req, res, options)
}
