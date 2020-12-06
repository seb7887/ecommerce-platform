import React from 'react'
import ReactTooltip, { TooltipProps } from 'react-tooltip'

interface Props extends TooltipProps {
  content: string
}

export const Tooltip: React.FC<Props> = ({
  children,
  content,
  backgroundColor = '#312E81',
  ...props
}) => {
  return (
    <span data-tip={content}>
      {children}
      <ReactTooltip backgroundColor={backgroundColor} {...props} />
    </span>
  )
}
