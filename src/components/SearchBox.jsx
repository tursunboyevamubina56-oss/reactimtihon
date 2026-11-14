import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { SearchIcon } from './icons'

// Qidiruv maydoni. `value` — URL'dagi joriy qidiruv so'zi, onSearch(text) — yozish to'xtagach
// (400 ms) chaqiriladi, shunda har bir harfga alohida so'rov ketmaydi.
export default function SearchBox({ value, onSearch }) {
  // draft: foydalanuvchi yozayotgan matn. null bo'lsa — URL'dagi qiymat ko'rsatiladi.
  const [draft, setDraft] = useState(null)
  const [prevValue, setPrevValue] = useState(value)

  // URL boshqa joydan o'zgarsa (orqaga tugmasi, "Tozalash") — yozilayotgan matnni tashlaymiz
  if (value !== prevValue) {
    setPrevValue(value)
    if (draft !== null && draft !== value) setDraft(null)
  }

  const debounced = useDebounce(draft, 400)

  // Effect faqat debounced o'zgarganda ishlashi uchun, eng so'nggi props'ni ref'da saqlaymiz
  const latest = useRef({ value, onSearch })
  useEffect(() => {
    latest.current = { value, onSearch }
  })

  useEffect(() => {
    const { value: current, onSearch: search } = latest.current
    if (debounced !== null && debounced !== current) search(debounced)
  }, [debounced])

  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={draft ?? value}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Mahsulot qidirish…"
        aria-label="Mahsulot qidirish"
        className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-indigo-400"
      />
    </div>
  )
}
