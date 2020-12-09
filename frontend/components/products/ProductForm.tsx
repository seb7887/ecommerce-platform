import React, { useCallback } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, TextArea, Button, Switch } from 'components/ui'
import { Uploader } from 'components/uploader'
import styles from './ProductForm.module.css'

interface Props {
  initialState?: Product
  onSubmit: (t: Product) => void | Promise<void>
}

const schema = Yup.object().shape<Product>({
  name: Yup.string().required(),
  author: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().positive().required(),
  cost: Yup.number().positive().required(),
  stock: Yup.number().min(1).required(),
})

const ProductForm: React.FC<Props> = ({ initialState, onSubmit }) => {
  const defaultState: Product = {
    name: '',
    author: '',
    description: '',
    price: 1,
    cost: 1,
    stock: 1,
    image: '',
    active: true,
  }
  const formik = useFormik({
    initialValues: initialState || defaultState,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      await onSubmit(values)
      setSubmitting(false)
    },
  })

  const toggleSwitch = useCallback(
    (v: boolean) => {
      formik.setFieldValue('active', v)
    },
    [formik]
  )

  const changeImage = useCallback(
    (img: string) => {
      formik.setFieldValue('image', img)
    },
    [formik]
  )

  return (
    <form className={styles.root}>
      <div className={styles.fields}>
        <Input
          name="name"
          label="Name"
          value={formik.values.name}
          error={!!formik.errors.name}
          caption={formik.errors.name}
          onChange={formik.handleChange}
          data-testid="name"
        />
        <Input
          name="author"
          label="Author"
          value={formik.values.author}
          error={!!formik.errors.author}
          caption={formik.errors.author}
          onChange={formik.handleChange}
          data-testid="author"
        />
        <TextArea
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          data-testid="description"
        />
        <div className={styles.row}>
          <Input
            name="price"
            type="number"
            label="Price"
            value={formik.values.price}
            prefix={<>$</>}
            onChange={formik.handleChange}
            error={!!formik.errors.price}
            caption={formik.errors.price}
            data-testid="price"
          />
          <Input
            name="cost"
            type="number"
            label="Cost"
            value={formik.values.cost}
            prefix={<>$</>}
            onChange={formik.handleChange}
            error={!!formik.errors.cost}
            caption={formik.errors.cost}
            data-testid="cost"
          />
        </div>
        <div className={styles.row}>
          <Input
            name="stock"
            type="number"
            label="Stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={!!formik.errors.stock}
            caption={formik.errors.stock}
            data-testid="stock"
          />
          <div className={styles.field}>
            <label>Active</label>
            <Switch
              label="active"
              checked={formik.values.active}
              onChange={toggleSwitch}
              data-testid="active"
            />
          </div>
        </div>
        <Uploader
          label="Image"
          image={formik.values.image}
          onChange={changeImage}
        />
      </div>
      <div className={styles.submit}>
        <Button
          onClick={formik.handleSubmit}
          loading={formik.isSubmitting}
          disabled={!formik.isValid}
          testId="submit"
        >
          {initialState ? 'Save' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default ProductForm
