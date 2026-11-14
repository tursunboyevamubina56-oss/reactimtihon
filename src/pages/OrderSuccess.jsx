import { Link, Navigate, useLocation } from 'react-router'
import { formatPrice } from '../utils/format'

const PAYMENT_LABELS = {
  cash: 'Naqd pul (yetkazib berilganda)',
  card: 'Karta orqali (yetkazib berilganda)',
}

// Buyurtma ma'lumoti Checkout sahifasidan navigate(state) orqali keladi.
// Sahifa to'g'ridan-to'g'ri ochilsa (state yo'q) — bosh sahifaga qaytariladi.
export default function OrderSuccess() {
  const { state } = useLocation()
  if (!state?.orderId) return <Navigate to="/" replace />

  return (
    <section className="mx-auto max-w-lg py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
        ✓
      </div>
      <h1 className="mt-6 text-3xl font-bold">Buyurtma qabul qilindi!</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Rahmat, {state.name}. Tez orada siz bilan bog'lanamiz.
      </p>

      <dl className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 text-left text-sm dark:divide-slate-800 dark:border-slate-800">
        <div className="flex justify-between gap-4 px-4 py-3">
          <dt className="text-slate-500 dark:text-slate-400">Buyurtma raqami</dt>
          <dd className="font-semibold">#{state.orderId}</dd>
        </div>
        <div className="flex justify-between gap-4 px-4 py-3">
          <dt className="text-slate-500 dark:text-slate-400">Mahsulotlar</dt>
          <dd className="font-semibold">{state.count} dona</dd>
        </div>
        <div className="flex justify-between gap-4 px-4 py-3">
          <dt className="text-slate-500 dark:text-slate-400">To'lov</dt>
          <dd className="text-right font-semibold">{PAYMENT_LABELS[state.payment]}</dd>
        </div>
        <div className="flex justify-between gap-4 px-4 py-3 text-base">
          <dt className="text-slate-500 dark:text-slate-400">Jami</dt>
          <dd className="font-bold">{formatPrice(state.total)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Bu o'quv loyihasi: buyurtma serverga yuborilmagan va ma'lumotlaringiz hech qayerda saqlanmaydi.
      </p>

      <Link
        to="/products"
        className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Xaridni davom ettirish
      </Link>
    </section>
  )
}
