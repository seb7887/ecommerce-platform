import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import { PageTitle } from 'components/PageTitle'
import { MainLayout } from 'layouts/MainLayout'

const IndexPage: NextPage = () => {
  return (
    <>
      <PageTitle title="Home" />
      <MainLayout>
        <h3 className="text-4xl font-extrabold">Hello World!</h3>
        <p className="mb-4">Reality is what you can get away with.</p>
        <Image
          alt="Next.js logo"
          src="/vercel.png"
          width={400}
          height={400}
        />
      </MainLayout>
    </>
  )
}

export default IndexPage