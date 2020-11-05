import React from 'react'
import Head from 'next/head'

interface Props {
  title?: string
}

export const PageTitle: React.FC<Props> = ({ title }) => (
  <Head>
    <title>{title}</title>
  </Head>
)
