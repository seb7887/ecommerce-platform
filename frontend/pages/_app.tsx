import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { UIProvider } from 'components/ui/context'
import 'styles.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  const { session } = pageProps

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>

      <NextAuthProvider session={session}>
        <UIProvider>
          <main role="document">
            <Component {...pageProps} />
          </main>
        </UIProvider>
      </NextAuthProvider>
    </>
  )
}
