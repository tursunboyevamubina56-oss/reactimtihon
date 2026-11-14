import { useEffect, useMemo, useState } from 'react'
import { getFinalPrice, roundMoney } from '../utils/format'
import { loadList, saveJson } from '../utils/storage'
import { CartContext } from './CartContext'

const STORAGE_KEY = 'cart'

// localStorage'dagi ma'lumot buzilgan bo'lishi mumkin (qo'lda o'zgartirilgan, eski versiya) —
// shuning uchun har bir yozuv tekshiriladi va yaroqsizlari tashlab yuboriladi
function isValidItem(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    Number.isInteger(item.id) &&
    typeof item.title === 'string' &&
    typeof item.thumbnail === 'string' &&
    Number.isFinite(item.price) &&
    Number.isFinite(item.discountPercentage) &&
    Number.isFinite(item.stock) &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1
  )
}

// Saqlangan ma'lumot o'qilmasa yoki localStorage yopiq bo'lsa — bo'sh savat bilan boshlaymiz
const loadItems = () => loadList(STORAGE_KEY, isValidItem)

// Savat: mahsulotlar ro'yxati + hisob-kitob + amallar. Brauzerda saqlanadi (sahifa yangilansa yo'qolmaydi).
export default function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems)

  useEffect(() => {
    saveJson(STORAGE_KEY, items)
  }, [items])

  const value = useMemo(() => {
    // Savatga faqat kartochkada ko'rinadigan maydonlar saqlanadi — savat sahifasi qayta yuklamasdan ishlaydi
    function addItem(product, quantity = 1) {
      if (product.stock < 1) return
      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id)
        if (existing) {
          const next = Math.min(existing.quantity + quantity, product.stock)
          return prev.map((item) => (item.id === product.id ? { ...item, quantity: next } : item))
        }
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            discountPercentage: product.discountPercentage,
            stock: product.stock,
            quantity: Math.min(quantity, product.stock),
          },
        ]
      })
    }

    // Miqdor 1 dan kam yoki ombordagidan ko'p bo'lmaydi
    function setQuantity(id, quantity) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stock) } : item,
        ),
      )
    }

    function removeItem(id) {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }

    function clearCart() {
      setItems([])
    }

    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const originalTotal = roundMoney(items.reduce((sum, item) => sum + item.price * item.quantity, 0))
    const total = roundMoney(
      items.reduce((sum, item) => sum + getFinalPrice(item.price, item.discountPercentage) * item.quantity, 0),
    )

    return {
      items,
      count,
      originalTotal,
      total,
      savings: roundMoney(originalTotal - total),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }
  }, [items])

  return <CartContext value={value}>{children}</CartContext>
}
