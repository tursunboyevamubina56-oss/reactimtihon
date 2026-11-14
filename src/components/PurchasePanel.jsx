import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'
import AddToCartButton from './AddToCartButton'
import QuantityStepper from './QuantityStepper'

// Mahsulot sahifasidagi xarid bloki: miqdor + "Savatga qo'shish".
// Sahifa key={product.id} bilan chiziladi, shuning uchun boshqa mahsulotga o'tganda miqdor 1 ga qaytadi.
export default function PurchasePanel({ product }) {
  const { items } = useCart()
  const [quantity, setQuantity] = useState(1)

  const inCart = items.find((item) => item.id === product.id)?.quantity ?? 0
  // Savatdagisini hisobga olganda yana nechta qo'shish mumkin
  const available = Math.max(product.stock - inCart, 0)
  // Savatga qo'shilgach mavjud soni kamayadi — tanlangan miqdor undan oshib ketmasin
  const shownQuantity = Math.min(quantity, Math.max(available, 1))

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        {available > 0 && (
          <QuantityStepper value={shownQuantity} onChange={setQuantity} max={available} />
        )}
        <AddToCartButton
          product={product}
          quantity={shownQuantity}
          onAdded={() => setQuantity(1)}
          className="min-w-48 flex-1 sm:flex-none"
        />
      </div>

      {inCart > 0 && (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Savatda: <span className="font-semibold">{inCart} dona</span> ·{' '}
          <Link to="/cart" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Savatga o'tish →
          </Link>
        </p>
      )}
    </div>
  )
}
