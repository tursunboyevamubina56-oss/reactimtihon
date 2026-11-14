import { useEffect, useState } from 'react'

// Qiymat o'zgargandan keyin delay millisekund kutib, so'ng yangilaydi.
// Qidiruvda har bir harfga alohida so'rov yubormaslik uchun kerak.
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
