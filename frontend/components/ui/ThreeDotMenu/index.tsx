import React, { useState, useRef } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { IconButton } from '../IconButton'
import styles from './ThreeDotMenu.module.css'

export interface ThreeDotMenuItem {
  label: string
  icon: JSX.Element
  action: (e?: React.SyntheticEvent) => void | Promise<void>
  disabled?: boolean
}

interface Props {
  size?: Size
  items: ThreeDotMenuItem[]
}

export const ThreeDotMenu: React.FC<Props> = ({ size = 'medium', items }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const ref = useRef(null)

  const toggle = () => {
    setOpenMenu(!openMenu)
  }

  const handleItemClick = (index: number) => {
    items[index].action()
    setOpenMenu(false)
  }

  useClickOutside(ref, () => setOpenMenu(false))

  return (
    <div className={styles.root}>
      <IconButton size={size} onClick={toggle}>
        <HiOutlineDotsVertical />
      </IconButton>

      {openMenu && (
        <ul className={styles.menu} ref={ref}>
          {items.map((item, index) => (
            <li
              key={`item-${index}`}
              className={`${styles.item} ${
                item.disabled ? styles.disabled : ''
              }`}
              onClick={() => handleItemClick(index)}
            >
              {item.icon} <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
