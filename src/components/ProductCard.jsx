import { Link } from 'react-router'
import { formatPrice, getFinalPrice } from '../utils/format'
import AddToCartButton from './AddToCartButton'
import { StarIcon } from './icons'

export default function ProductCard({ product }) {
  const { id, title, price, discountPercentage, rating, thumbnail, brand, category } = product
  const discount = Math.round(discountPercentage ?? 0)
  const hasDiscount = discount >= 1
  const finalPrice = getFinalPrice(price, discountPercentage)

  // Kartochka ikki qismdan iborat: tepasi havola (mahsulot sahifasiga), pastida alohida tugma.
  // Tugmani havola ichiga qo'yib bo'lmaydi (interaktiv element ichida interaktiv element).
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <Link to={`/products/${id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square bg-slate-100 dark:bg-slate-800">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          {hasDiscount && (
            <span className="absolute left-2 top-2 rounded-full bg-rose-600 px-2 py-0.5 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1 p-3 pb-2">
          <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
            {brand || category.replace(/-/g, ' ')}
          </p>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug">{title}</h3>

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-base font-bold">{formatPrice(finalPrice)}</span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">{formatPrice(price)}</span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
              <StarIcon className="h-4 w-4" />
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-3 pb-3">
        <AddToCartButton product={product} className="w-full" />
      </div>
    </div>
  )
}
