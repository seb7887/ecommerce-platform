import React, { useState } from 'react'
import { NextPage } from 'next'
import { useFormik } from 'formik'
import { PageTitle } from 'components/PageTitle'
import { MainLayout } from 'layouts/MainLayout'

const TestPage: NextPage = () => {
  const [greetingMsg, setGreetingMsg] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async values => {
      return await testApi(values.name)
    }
  })

  const testApi = async (name: string) => {
    const res = await fetch('/api/test', {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
    const { message, date } = await res.json()
    setGreetingMsg(message)
    setCurrentDate(date)
  }

  return (
    <>
      <PageTitle title="Test API" />
      <MainLayout>
        <h3 className="text-4xl font-extrabold">Test API</h3>
        <p className="mb-4">We all see only that which we are trained to see.</p>

        <form
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={formik.handleSubmit}
        >
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Your name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6"
            type="text"
            name="name"
            onChange={formik.handleChange}
          />
          <button
            className="w-full shadow bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Go!
          </button>
        </form>
        <h3>{greetingMsg}</h3>
        <p>{currentDate}</p>
      </MainLayout>
    </>
  )
}

export default TestPage