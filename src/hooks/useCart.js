import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

// Savat ma'lumotini olish: const { items, count, total, addItem, ... } = useCart()
export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart faqat <CartProvider> ichida ishlaydi')
  return cart
}
