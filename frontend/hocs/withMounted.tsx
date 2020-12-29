import React from 'react'

export function withMounted<Props>(Component: (props: Props) => JSX.Element) {
  return (props: Props) => {
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(() => {
      setIsMounted(true)
      return () => setIsMounted(false)
    }, [])
    if (!isMounted) return null
    return <Component {...props} />
  }
}
