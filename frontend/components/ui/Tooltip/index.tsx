import React from 'react'
import ReactTooltip, { TooltipProps } from 'react-tooltip'
import { withMounted } from '../../../hocs'

interface Props extends TooltipProps {
  content: string
}

export const Tooltip: React.FC<Props> = withMounted(
  ({ children, content, backgroundColor = '#312E81', ...props }) => {
    return (
      <span data-tip={content}>
        {children}
        <ReactTooltip backgroundColor={backgroundColor} {...props} />
      </span>
    )
  }
)
