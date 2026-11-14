import { useEffect, useMemo, useState } from 'react'
import { loadList, saveJson } from '../utils/storage'
import { FavoritesContext } from './FavoritesContext'

const STORAGE_KEY = 'favorites'

// Sevimlilar sahifasi kartochkalarni qayta yuklamasdan chizishi uchun kartochka maydonlari saqlanadi
function pickCardFields(product) {
  return {
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    category: product.category,
    brand: product.brand, // ba'zi mahsulotlarda brend yo'q
  }
}

// localStorage'dagi ma'lumot buzilgan bo'lishi mumkin — kartochka chizish uchun kerakli maydonlar tekshiriladi
function isValidItem(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    Number.isInteger(item.id) &&
    typeof item.title === 'string' &&
    typeof item.thumbnail === 'string' &&
    typeof item.category === 'string' &&
    Number.isFinite(item.price) &&
    Number.isFinite(item.discountPercentage) &&
    Number.isFinite(item.rating) &&
    Number.isFinite(item.stock)
  )
}

const loadItems = () => loadList(STORAGE_KEY, isValidItem)

// Sevimlilar: brauzerda saqlanadi (sahifa yangilansa yo'qolmaydi). Yangi qo'shilgani ro'yxat boshida turadi.
export default function FavoritesProvider({ children }) {
  const [items, setItems] = useState(loadItems)

  useEffect(() => {
    saveJson(STORAGE_KEY, items)
  }, [items])

  const value = useMemo(() => {
    const ids = new Set(items.map((item) => item.id))

    // Bor bo'lsa olib tashlaydi, yo'q bo'lsa qo'shadi
    function toggleFavorite(product) {
      setItems((prev) =>
        prev.some((item) => item.id === product.id)
          ? prev.filter((item) => item.id !== product.id)
          : [pickCardFields(product), ...prev],
      )
    }

    function clearFavorites() {
      setItems([])
    }

    return {
      items,
      count: items.length,
      isFavorite: (id) => ids.has(id),
      toggleFavorite,
      clearFavorites,
    }
  }, [items])

  return <FavoritesContext value={value}>{children}</FavoritesContext>
}
