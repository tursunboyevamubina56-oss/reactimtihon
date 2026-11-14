import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'

// Sevimlilarni olish: const { items, count, isFavorite, toggleFavorite } = useFavorites()
export function useFavorites() {
  const favorites = useContext(FavoritesContext)
  if (!favorites) throw new Error('useFavorites faqat <FavoritesProvider> ichida ishlaydi')
  return favorites
}
