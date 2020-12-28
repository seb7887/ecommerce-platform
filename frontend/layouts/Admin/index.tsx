import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  HiOutlineChartPie,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineArchive,
  HiOutlineCog,
  HiOutlineTicket,
  HiOutlineLogout,
} from 'react-icons/hi'
import { useAuth } from 'lib/auth'
import styles from './AdminLayout.module.css'

interface Props {
  isLoggedIn?: boolean
}

interface MenuItem {
  name: string
  path?: string
  icon: JSX.Element
}

interface MenuProps {
  items: MenuItem[]
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      logout()
      router.push('/')
    },
    [logout, router]
  )

  return (
    <ul className={styles.menu}>
      {items.map(item => {
        let isActive = false
        if (item.path) {
          const pathname = router.pathname.split('/')[1]
          isActive =
            pathname === '' ? item.path === '/' : item.path.includes(pathname)
        }
        const makeItem = (item: MenuItem) => (
          <li className={`${styles.item} ${isActive ? styles.active : ''}`}>
            {item.icon} {item.name}
          </li>
        )
        if (item.path) {
          return (
            <Link href={item.path} key={`item-${item.name}`}>
              {makeItem(item)}
            </Link>
          )
        }
        return (
          <a key={`item-${item.name}`} onClick={handleLogout}>
            {makeItem(item)}
          </a>
        )
      })}
    </ul>
  )
}

const menuItems: MenuItem[] = [
  {
    name: 'Insights',
    path: '/',
    icon: <HiOutlineChartPie />,
  },
  {
    name: 'Products',
    path: '/products',
    icon: <HiOutlineArchive />,
  },
  {
    name: 'Orders',
    path: '/orders',
    icon: <HiOutlineTicket />,
  },
  {
    name: 'Incomes',
    path: '/incomes',
    icon: <HiOutlineTrendingUp />,
  },
  {
    name: 'Outcomes',
    path: '/outcomes',
    icon: <HiOutlineTrendingDown />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <HiOutlineCog />,
  },
  {
    name: 'Sign Out',
    icon: <HiOutlineLogout />,
  },
]

export const AdminLayout: React.FC<Props> = ({ children, isLoggedIn }) => (
  <div className={styles.layout}>
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Image alt="logo" src="/logo.svg" width={80} height={60} />
      </div>

      {isLoggedIn && <Menu items={menuItems} />}
    </aside>
    <section className={styles.content}>{children}</section>
  </div>
)
