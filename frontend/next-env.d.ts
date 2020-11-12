/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'nprogress'

type Color = 'primary' | 'secondary' | 'danger'
type Size = 'small' | 'medium' | 'large'
type Variant = 'contained' | 'outlined'

interface Session {
  jwt: string
  user: {
    name: string
    email: string
    image: string
  }
  id: number
  expires: string
}

interface User {
  jwt: string
  id: number
  username: string
}

interface Token {
  jwt: string
  id: number
  email: string
  name: string
  picture: string
}

interface Account {
  id: number
  provider: string
  type: string
  refreshToken: string
  accessToken: string
  accessTokenExpires: string
}
