import React from 'react'
import clsx from 'clsx'
import styles from './Divider.module.css'

export const Divider: React.FC = ({ children }) => {
  const count = React.Children.count(children)
  const classes = clsx(styles.root, {
    [styles.content]: count !== 0,
    [styles.hr]: count === 0,
  })

  return (
    <div className={classes}>
      {count === 0 ? (
        <hr />
      ) : (
        <>
          <hr />
          <span>{children}</span>
        </>
      )}
    </div>
  )
}
