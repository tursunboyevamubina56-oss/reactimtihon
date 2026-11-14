import { useState } from 'react'
import { Link } from 'react-router'
import OrderTotals from '../components/OrderTotals'
import QuantityStepper from '../components/QuantityStepper'
import { useCart } from '../hooks/useCart'
import { formatPrice, getFinalPrice, roundMoney } from '../utils/format'

export default function Cart() {
  const { items, count, originalTotal, savings, total, setQuantity, removeItem, clearCart } = useCart()
  const [confirmingClear, setConfirmingClear] = useState(false)

  if (items.length === 0) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-3xl font-bold">Savat bo'sh</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Hali hech narsa tanlanmagan.</p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Xarid qilishni boshlash
        </Link>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold">Savat</h1>

        {confirmingClear ? (
          <p className="flex items-center gap-3 text-sm">
            <span>Hammasini o'chirasizmi?</span>
            <button
              type="button"
              onClick={() => {
                clearCart()
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
            Savatni tozalash
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {items.map((item) => {
            const unitPrice = getFinalPrice(item.price, item.discountPercentage)
            const hasDiscount = unitPrice < item.price

            return (
              <li key={item.id} className="flex gap-4 p-4">
                <Link
                  to={`/products/${item.id}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800"
                >
                  <img src={item.thumbnail} alt={item.title} className="h-full w-full object-contain p-2" />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex justify-between gap-4">
                    <Link to={`/products/${item.id}`} className="line-clamp-2 font-medium hover:underline">
                      {item.title}
                    </Link>
                    <p className="shrink-0 font-bold">{formatPrice(roundMoney(unitPrice * item.quantity))}</p>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatPrice(unitPrice)} / dona
                    {hasDiscount && <span className="ml-2 line-through">{formatPrice(item.price)}</span>}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                    <QuantityStepper
                      value={item.quantity}
                      max={item.stock}
                      onChange={(quantity) => setQuantity(item.id, quantity)}
                      label={`${item.title} miqdori`}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-sm font-medium text-rose-600 hover:underline dark:text-rose-400"
                    >
                      O'chirish
                    </button>
                  </div>
                  {item.quantity >= item.stock && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Omborda faqat {item.stock} dona bor
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>

        <aside className="h-fit rounded-xl border border-slate-200 p-5 lg:sticky lg:top-24 dark:border-slate-800">
          <h2 className="mb-4 text-lg font-semibold">Buyurtma</h2>
          <OrderTotals count={count} originalTotal={originalTotal} savings={savings} total={total} />
          <Link
            to="/checkout"
            className="mt-5 block rounded-lg bg-indigo-600 px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Buyurtma berish
          </Link>
          <Link
            to="/products"
            className="mt-3 block text-center text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Xaridni davom ettirish
          </Link>
        </aside>
      </div>
    </section>
  )
}
