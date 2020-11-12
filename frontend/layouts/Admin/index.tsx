import React from 'react'
import Image from 'next/image'
import styles from './AdminLayout.module.css'

export const AdminLayout: React.FC = ({ children }) => (
  <div className={styles.layout}>
    <aside className={styles.sidebar}>
      <Image
        className={styles.logo}
        alt="logo"
        src="/logo.svg"
        width={80}
        height={60}
      />
    </aside>
    <section className={styles.content}>
      {children}
    </section>
  </div>
)
