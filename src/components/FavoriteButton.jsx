import { useFavorites } from '../hooks/useFavorites'
import { HeartIcon } from './icons'

// card — kartochkadagi rasm ustida, panel — mahsulot sahifasidagi xarid bloki yonida
const VARIANTS = {
  card: 'absolute right-2 top-2 z-10 h-9 w-9 rounded-full bg-white/90 shadow hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-900',
  panel:
    'h-10 w-10 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800',
}

// Yurakcha tugmasi: bosilganda mahsulotni sevimlilarga qo'shadi yoki olib tashlaydi
export default function FavoriteButton({ product, variant = 'card', className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(product.id)

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(product)}
      aria-pressed={active}
      aria-label="Sevimlilarga qo'shish"
      className={`inline-flex items-center justify-center transition-colors ${VARIANTS[variant]} ${
        active ? 'text-rose-500' : 'text-slate-500 dark:text-slate-300'
      } ${className}`}
    >
      <HeartIcon filled={active} className="h-5 w-5" />
    </button>
  )
}
