import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

// Boshlang'ich mavzu: avval saqlangani, bo'lmasa qurilma sozlamasi (prefers-color-scheme)
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // localStorage yopiq bo'lsa (maxfiy rejim) — qurilma sozlamasiga o'tamiz
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Yorug' / qorong'i rejim: <html> ga "dark" klassini qo'shadi va tanlovni eslab qoladi.
// (index.html dagi kichik skript sahifa chizilishidan oldin shu klassni qo'yadi — miltillamaslik uchun.)
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // saqlab bo'lmasa ham sayt ishlayveradi
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
