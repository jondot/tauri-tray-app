import { useEffect, useState } from 'react'

export const useDark = () => {
  const [isDark, setDark] = useState(localStorage.getItem('dark') || '0')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('dark')

    if (isDark === '1') {
      root.classList.add('dark')
    }

    localStorage.setItem('dark', isDark)
  }, [isDark])

  const toggleDark = () => setDark(isDark === '1' ? '0' : '1')

  return { isDark: isDark === '1', toggleDark }
}
