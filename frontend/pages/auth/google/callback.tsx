import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAuth } from 'lib/auth'
import { LoadingDots } from 'components/ui'

const CallbackPage: NextPage = () => {
  const { googleLogin } = useAuth()
  const [text, setText] = useState<string>('Authenticating...')
  const router = useRouter()

  useEffect(() => {
    const auth = async () => {
      try {
        await googleLogin()
        setText('Authenticated. Redirecting')
        setTimeout(() => router.push('/'), 3000)
      } catch (err) {
        setText(err.message)
      }
    }
    auth()
  }, [googleLogin, router])

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="font-bold">{text}</h2>
      <LoadingDots color="primary" />
    </div>
  )
}

export default CallbackPage
