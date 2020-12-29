import React from 'react'
import Image from 'next/image'
import { Empty } from 'components/ui'
import styles from './AdminProduct.module.css'

interface Props {
  product: Product
}

export const AdminProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.root}>
      {product.image ? (
        <Image src={product.image} width={300} height={400} />
      ) : (
        <div className={styles.empty}>
          <Empty variant="no-image" size="large">
            No Product Pic
          </Empty>
        </div>
      )}
      <div className={styles.info}>
        <p className={styles.author}>by {product.author}</p>
        <p className={styles.description}>{product.description}</p>
        <div className="flex justify-center">
          <div className={styles.money}>
            <div className="flex flex-col items-center">
              <p className={styles.label}>Price</p>
              <span className={styles.number}>${product.price}</span>
            </div>
            <div className="flex flex-col items-center">
              <p className={styles.label}>Cost</p>
              <span className={styles.number}>${product.cost}</span>
            </div>
          </div>
        </div>
        <p className={styles.stock}>Stock: {product.stock} units</p>
        <p className={styles.sold}>{product.sold} units sold</p>
      </div>
    </div>
  )
}
