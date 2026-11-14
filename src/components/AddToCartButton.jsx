import { useEffect, useRef, useState } from 'react'
import { useCart } from '../hooks/useCart'

// "Savatga qo'shish" tugmasi. Bosilganda 2 soniya "Qo'shildi" deb turadi.
// Ombordagidan ko'p qo'shib bo'lmaydi: hammasi savatda bo'lsa yoki mahsulot qolmagan bo'lsa tugma o'chiq.
export default function AddToCartButton({ product, quantity = 1, onAdded, className = '' }) {
  const { items, addItem } = useCart()
  const [added, setAdded] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const inCart = items.find((item) => item.id === product.id)?.quantity ?? 0
  const soldOut = product.stock < 1
  const allInCart = !soldOut && inCart >= product.stock
  const disabled = soldOut || allInCart

  function handleClick() {
    addItem(product, quantity)
    onAdded?.()
    setAdded(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setAdded(false), 2000)
  }

  let label = "Savatga qo'shish"
  if (soldOut) label = "Sotuvda yo'q"
  else if (allInCart) label = 'Hammasi savatda'
  else if (added) label = "✓ Qo'shildi"

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 ${
        added && !disabled ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
      } ${className}`}
    >
      {label}
    </button>
  )
}
