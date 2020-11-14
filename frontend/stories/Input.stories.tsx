import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs'
import { Form, Formik } from 'formik'
import { HiKey, HiOutlineCurrencyDollar } from 'react-icons/hi'
import { Input } from '../components/ui'

const sizeOptions: Record<string, Size> = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
}

const stories = storiesOf('Input', module)
stories.addDecorator(withKnobs)

stories.add('Default', () => {
  return (
    <Formik initialValues={{ test: '' }} onSubmit={(values, actions) => {}}>
      <Form>
        <Input
          name="test"
          label="Text"
          size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
          placeholder={text('Placeholder', 'Example placeholder')}
          disabled={boolean('Disabled', false)}
        />
      </Form>
    </Formik>
  )
})

stories.add('Password', () => {
  return (
    <Formik initialValues={{ test: '' }} onSubmit={(values, actions) => {}}>
      <Form>
        <Input
          name="password"
          label="Password"
          type="password"
          size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
          placeholder={text('Placeholder', 'Example placeholder')}
          disabled={boolean('Disabled', false)}
        />
      </Form>
    </Formik>
  )
})

stories.add('With Icon', () => {
  return (
    <Formik initialValues={{ test: '' }} onSubmit={(values, actions) => {}}>
      <Form>
        <Input
          name="test"
          label="Text"
          size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
          placeholder={text('Placeholder', 'Example placeholder')}
          disabled={boolean('Disabled', false)}
          prefix={<HiKey />}
        />
      </Form>
    </Formik>
  )
})

stories.add('Currency', () => {
  return (
    <Formik initialValues={{ test: '' }} onSubmit={(values, actions) => {}}>
      <Form>
        <Input
          name="test"
          label="Text"
          type="number"
          size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
          placeholder={text('Placeholder', 'Example placeholder')}
          disabled={boolean('Disabled', false)}
          prefix={<>$</>}
        />
      </Form>
    </Formik>
  )
})

stories.add('With Caption', () => {
  return (
    <Formik initialValues={{ test: '' }} onSubmit={(values, actions) => {}}>
      <Form>
        <Input
          name="test"
          label="Text"
          size={select('Size', sizeOptions, sizeOptions.Medium) as Size}
          placeholder={text('Placeholder', 'Example placeholder')}
          disabled={boolean('Disabled', false)}
          prefix={<HiKey />}
          caption="Some useful text"
        />
      </Form>
    </Formik>
  )
})
