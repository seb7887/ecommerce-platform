import React from 'react'
import clsx from 'clsx'
import styles from './Preview.module.css'

interface Props {
  action?: JSX.Element
  size?: Size
}

export const Preview: React.FC<Props> = ({
  action,
  children,
  size = 'medium',
}) => {
  const classes = clsx(styles.root, {
    [styles[size]]: true,
  })

  return (
    <div className={classes}>
      {action && <div className={styles.action}>{action}</div>}
      <div className={styles.child}>{children}</div>
    </div>
  )
}
