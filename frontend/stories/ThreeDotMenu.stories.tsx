import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi'
import { ThreeDotMenu, ThreeDotMenuItem } from '../components/ui'

const stories = storiesOf('ThreeDotMenu', module)

const items: ThreeDotMenuItem[] = [
  {
    label: 'Edit',
    action: () => console.log('edit'),
    icon: <HiOutlinePencil />,
  },
  {
    label: 'Delete',
    action: () => console.log('delete'),
    icon: <HiOutlineTrash />,
  },
  {
    label: 'Disabled',
    action: () => console.log('disabled'),
    icon: <HiOutlineQuestionMarkCircle />,
    disabled: true,
  },
]

stories.add('Example', () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThreeDotMenu items={items} />
    </div>
  )
})
