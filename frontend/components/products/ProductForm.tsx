import React, { useCallback, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, TextArea, Button, Switch } from 'components/ui'
import styles from './ProductForm.module.css'

interface Props {
  initialState?: Product
  onSubmit: (t: Product) => void | Promise<void>
}

const schema = Yup.object().shape<Product>({
  name: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().positive().required(),
  cost: Yup.number().positive().required(),
  stock: Yup.number().min(1).required(),
})

const ProductForm: React.FC<Props> = ({ initialState, onSubmit }) => {
  const defaultState: Product = {
    name: '',
    description: '',
    price: 1,
    cost: 1,
    stock: 1,
    image: '',
    active: true,
  }
  const hiddenFileInput = useRef(null)
  const [fileInput, setFileInput] = useState<string>('')
  const formik = useFormik({
    initialValues: initialState || defaultState,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        await onSubmit(values)
      } catch (err) {
        console.log(err)
      } finally {
        setSubmitting(false)
      }
    },
  })

  const toggleSwitch = useCallback(
    (v: boolean) => {
      formik.setFieldValue('active', v)
    },
    [formik]
  )

  const uploadPic = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }, [])

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
        <div className={styles.field}>
          <label>Image</label>
          <input
            type="file"
            ref={hiddenFileInput}
            key={fileInput}
            onChange={uploadPic}
            style={{ display: 'none' }}
          />
          {formik.values.image === '' ? <a>+ Add image</a> : <p>Images here</p>}
        </div>
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
