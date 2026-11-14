import { useState } from 'react'
import { Link } from 'react-router'
import ProductCard from '../components/ProductCard'
import { useFavorites } from '../hooks/useFavorites'

export default function Favorites() {
  const { items, count, clearFavorites } = useFavorites()
  const [confirmingClear, setConfirmingClear] = useState(false)

  if (count === 0) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-3xl font-bold">Sevimlilar bo'sh</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Yoqqan mahsulotdagi ♡ tugmasini bossangiz, u shu yerga qo'shiladi.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Katalogga o'tish
        </Link>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold">
          Sevimlilar <span className="text-xl font-medium text-slate-500 dark:text-slate-400">({count})</span>
        </h1>

        {confirmingClear ? (
          <p className="flex items-center gap-3 text-sm">
            <span>Hammasini o'chirasizmi?</span>
            <button
              type="button"
              onClick={() => {
                clearFavorites()
                setConfirmingClear(false)
              }}
              className="font-semibold text-rose-600 hover:underline dark:text-rose-400"
            >
              Ha
            </button>
            <button
              type="button"
              onClick={() => setConfirmingClear(false)}
              className="font-medium text-slate-500 hover:underline dark:text-slate-400"
            >
              Yo'q
            </button>
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingClear(true)}
            className="text-sm font-medium text-slate-500 hover:text-rose-600 hover:underline dark:text-slate-400 dark:hover:text-rose-400"
          >
            Hammasini tozalash
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
