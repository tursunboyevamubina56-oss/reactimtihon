import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { getProduct, NOT_FOUND_MESSAGE } from '../api/products'
import ErrorMessage from '../components/ErrorMessage'
import ProductGallery from '../components/ProductGallery'
import RelatedProducts from '../components/RelatedProducts'
import ReviewList from '../components/ReviewList'
import StarRating from '../components/StarRating'
import { useFetch } from '../hooks/useFetch'
import { formatCategory, formatPrice, getDiscountedPrice } from '../utils/format'
import {
  getAvailability,
  translateReturnPolicy,
  translateShipping,
  translateWarranty,
} from '../utils/translate'

// Yuklanayotganda ko'rinadigan bo'sh joy
function ProductSkeleton() {
  return (
    <div aria-hidden="true" className="grid animate-pulse gap-8 lg:grid-cols-2">
      <div className="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-4">
        <div className="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-5 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-24 w-full rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const { data: product, loading, error, retry } = useFetch((signal) => getProduct(id, signal), [id])

  // Brauzer yorlig'ida mahsulot nomi ko'rinadi
  useEffect(() => {
    document.title = product && !loading ? `${product.title} — Do'kon` : "Do'kon"
    return () => {
      document.title = "Do'kon"
    }
  }, [product, loading])

  if (error === NOT_FOUND_MESSAGE) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-2xl font-semibold">Mahsulot topilmadi</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Bunday raqamli mahsulot yo'q yoki u o'chirilgan.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Katalogga qaytish
        </Link>
      </section>
    )
  }

  if (error) return <ErrorMessage message={error} onRetry={retry} />

  // Boshqa mahsulotga o'tilganda eski ma'lumot emas, skelet ko'rsatiladi
  if (loading || !product) return <ProductSkeleton />

  const discount = Math.round(product.discountPercentage)
  const hasDiscount = discount >= 1
  const finalPrice = hasDiscount ? getDiscountedPrice(product.price, product.discountPercentage) : product.price
  const availability = getAvailability(product.availabilityStatus, product.stock)

  const details = [
    product.brand && ['Brend', product.brand],
    ['Kategoriya', formatCategory(product.category)],
    ['Artikul (SKU)', product.sku],
    ['Kafolat', translateWarranty(product.warrantyInformation)],
    ['Yetkazib berish', translateShipping(product.shippingInformation)],
    ['Qaytarish', translateReturnPolicy(product.returnPolicy)],
    ['Minimal buyurtma', `${product.minimumOrderQuantity} dona`],
  ].filter(Boolean)

  return (
    <article className="space-y-12">
      {/* Yo'l ko'rsatkich */}
      <nav aria-label="Joylashuv" className="text-sm text-slate-500 dark:text-slate-400">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link to="/" className="hover:underline">Bosh sahifa</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/products" className="hover:underline">Katalog</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to={`/products?category=${product.category}`} className="hover:underline">
              {formatCategory(product.category)}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery key={product.id} images={product.images} title={product.title} />

        <div>
          {product.brand && (
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{product.brand}</p>
          )}
          <h1 className="mt-1 text-3xl font-bold leading-tight">{product.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <StarRating value={product.rating} className="h-5 w-5" />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-slate-500 dark:text-slate-400">({product.reviews.length} ta sharh)</span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-4xl font-bold">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-slate-400 line-through">{formatPrice(product.price)}</span>
                <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-sm font-semibold text-white">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-medium ${availability.className}`}>
            {availability.label}
          </p>

          <p className="mt-6 leading-relaxed text-slate-700 dark:text-slate-300">{product.description}</p>

          {product.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Teglar">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 text-sm dark:divide-slate-800 dark:border-slate-800">
            {details.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-4 py-3">
                <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ReviewList reviews={product.reviews} rating={product.rating} />
      <RelatedProducts category={product.category} currentId={product.id} />
    </article>
  )
}
