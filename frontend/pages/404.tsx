import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { PageTitle } from 'components/PageTitle'
import { Button, Empty } from 'components/ui'
import { AdminLayout } from 'layouts'

const NotFoundPage: NextPage = () => {
  return (
    <>
      <PageTitle />
      <AdminLayout>
        <div className="h-full flex flex-col items-center justify-center px-10">
          <Empty size="large">
            <div className="flex flex-col items-center text-center">
              <h1>404</h1>
              <p className="mb-4">
                The page you requested does not exist. Please check to make sure
                you visited the correct URL, and that you have the proper
                permission levels to the content you’re trying to access.
              </p>
              <Link href="/">
                <Button>Go Home</Button>
              </Link>
            </div>
          </Empty>
        </div>
      </AdminLayout>
    </>
  )
}

export default NotFoundPage
