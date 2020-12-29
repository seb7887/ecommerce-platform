import { RefObject, useEffect, useState } from 'react'

export const useHover = (ref: RefObject<Element>, enabled = true) => {
  const [value, setValue] = useState<boolean>(false)

  useEffect(() => {
    const onMouseOver = () => setValue(true)
    const onMouseOut = () => setValue(false)

    if (enabled && ref && ref.current) {
      ref.current.addEventListener('mouseover', onMouseOver)
      ref.current.addEventListener('mouseout', onMouseOut)
    }

    const { current } = ref

    return () => {
      if (enabled && current) {
        current.removeEventListener('mouseover', onMouseOver)
        current.removeEventListener('mouseout', onMouseOut)
      }
    }
  }, [enabled, ref])

  return value
}
