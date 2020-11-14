import React from 'react'
import useDarkMode from 'use-dark-mode'
import { HiSun, HiMoon } from 'react-icons/hi'
import styles from './DarkModeToggle.module.css'

function withMounted<Props>(Component: (props: Props) => JSX.Element) {
  return (props: Props) => {
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
      setIsMounted(true);
      return () => setIsMounted(false);
    }, []);
    if (!isMounted) return null;
    return <Component {...props} />;
  };
}

export const DarkModeToggle = withMounted(() => {
  const { value, toggle } = useDarkMode(
    window.matchMedia('(preferred-color-scheme: dark)').matches,
    {
      classNameDark: 'scheme-dark',
      classNameLight: 'scheme-light',
    }
  )

  const label = value ? 'Disable dark mode': 'Enable dark mode'
  
  return (
    <button arial-label={label} className={styles.button} onClick={toggle}>
      <HiSun color="#f6e05e" />
      <HiMoon color="#f605e" />
      <span
        style={{ transform: value ? 'translateX(0px)' : 'translateX(28px)' }}
      />
    </button>
  )
})
