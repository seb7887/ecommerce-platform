import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email Address' },
        password: { label: 'Password', type: 'text' },
      },
      authorize: async credentials => {
        const { email, password } = credentials
        const response = await fetch(`${process.env.API_URL}/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: email,
            password,
          }),
        })
        const data = await response.json()
        if (data.user) {
          const user: User = {
            jwt: data.jwt,
            id: data.user.id,
            username: data.user.username,
          }
          return Promise.resolve(user)
        }
        console.log('acaa')
        return Promise.reject(`${process.env.NEXTAUTH_URL}/auth?error=true`)
      },
    }),
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
      const isOauth = user && account.type !== 'credentials' ? true : false

      if (isOauth) {
        const response = await fetch(
          `${process.env.API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        )
        const data = await response.json()

        token.jwt = data.jwt
        token.id = data.user.id
      }

      if (!isOauth && user) {
        token.jwt = user.jwt
        token.id = user.id
      }

      return Promise.resolve(token)
    },
  },
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  NextAuth(req, res, options as any)
}
