import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import OrderTotals from '../components/OrderTotals'
import { useCart } from '../hooks/useCart'
import { formatPrice, getFinalPrice, roundMoney } from '../utils/format'

const inputClass =
  'h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none transition-colors focus:border-indigo-600 dark:bg-slate-900 dark:focus:border-indigo-400'

const PAYMENT_OPTIONS = [
  { value: 'cash', label: 'Naqd pul (yetkazib berilganda)' },
  { value: 'card', label: 'Karta orqali (yetkazib berilganda)' },
]

// Har bir maydonni tekshiradi, xato bor maydonlar uchun matn qaytaradi
function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Ismingizni kiriting'
  const phoneDigits = values.phone.replace(/\D/g, '')
  if (phoneDigits.length < 9 || phoneDigits.length > 12) {
    errors.phone = "Telefon raqamni to'g'ri kiriting (masalan, +998 90 123 45 67)"
  }
  if (values.city.trim().length < 2) errors.city = 'Shaharni kiriting'
  if (values.address.trim().length < 5) errors.address = "To'liq manzilni kiriting (ko'cha, uy)"
  return errors
}

// Yorlig'i, matn maydoni va xato xabari bitta blokda
function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Checkout() {
  const { items, count, originalTotal, savings, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [values, setValues] = useState({ name: '', phone: '', city: '', address: '', payment: 'cash', note: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  if (items.length === 0) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-3xl font-bold">Savat bo'sh</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Buyurtma berish uchun avval mahsulot tanlang.</p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Katalogga o'tish
        </Link>
      </section>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Maydon tuzatila boshlansa, uning xato xabari yo'qoladi
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Buyurtma serverga yuborilmaydi (o'quv loyihasi): qisqa kutish va muvaffaqiyat sahifasi
    setSubmitting(true)
    timerRef.current = setTimeout(() => {
      navigate('/order-success', {
        replace: true,
        state: {
          orderId: Math.floor(100000 + Math.random() * 900000),
          name: values.name.trim(),
          count,
          total,
          payment: values.payment,
        },
      })
      clearCart()
    }, 800)
  }

  const fieldClass = (name) =>
    `${inputClass} ${errors[name] ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'}`
  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: fieldClass(name),
  })

  return (
    <section>
      <h1 className="text-3xl font-bold">Buyurtmani rasmiylashtirish</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Ismingiz" error={errors.name}>
              <input type="text" autoComplete="name" {...fieldProps('name')} />
            </Field>
            <Field id="phone" label="Telefon raqam" error={errors.phone}>
              <input type="tel" autoComplete="tel" placeholder="+998 90 123 45 67" {...fieldProps('phone')} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-[14rem_1fr]">
            <Field id="city" label="Shahar" error={errors.city}>
              <input type="text" autoComplete="address-level2" {...fieldProps('city')} />
            </Field>
            <Field id="address" label="Manzil" error={errors.address}>
              <input type="text" autoComplete="street-address" placeholder="Ko'cha, uy, xonadon" {...fieldProps('address')} />
            </Field>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium">To'lov usuli</legend>
            <div className="space-y-2">
              {PAYMENT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm has-checked:border-indigo-600 dark:border-slate-700 dark:has-checked:border-indigo-400"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={values.payment === option.value}
                    onChange={handleChange}
                    className="accent-indigo-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Karta ma'lumotlari so'ralmaydi: to'lov yetkazib berilganda amalga oshiriladi.
            </p>
          </fieldset>

          <div>
            <label htmlFor="note" className="mb-1 block text-sm font-medium">
              Izoh <span className="font-normal text-slate-500 dark:text-slate-400">(ixtiyoriy)</span>
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              value={values.note}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-indigo-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
          >
            {submitting ? 'Yuborilmoqda…' : `Buyurtma berish · ${formatPrice(total)}`}
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-slate-200 p-5 lg:sticky lg:top-24 dark:border-slate-800">
          <h2 className="mb-4 text-lg font-semibold">Buyurtmangiz</h2>
          <ul className="mb-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-sm">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-md bg-slate-100 object-contain p-1 dark:bg-slate-800"
                />
                <span className="line-clamp-2 flex-1">
                  {item.title} <span className="text-slate-500 dark:text-slate-400">× {item.quantity}</span>
                </span>
                <span className="font-medium">
                  {formatPrice(roundMoney(getFinalPrice(item.price, item.discountPercentage) * item.quantity))}
                </span>
              </li>
            ))}
          </ul>
          <OrderTotals count={count} originalTotal={originalTotal} savings={savings} total={total} />
          <Link
            to="/cart"
            className="mt-4 block text-center text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            ← Savatga qaytish
          </Link>
        </aside>
      </div>
    </section>
  )
}
