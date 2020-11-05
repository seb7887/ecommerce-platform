import React from 'react'
import { storiesOf } from '@storybook/react'
import { DarkModeToggle } from '../components/DarkModeToggle'

storiesOf('DarkModeToggle', module).add('Example', () => {
  return (
    <DarkModeToggle />
  )
})