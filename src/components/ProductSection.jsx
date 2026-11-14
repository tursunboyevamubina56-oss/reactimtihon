import { Link } from 'react-router'
import { CARD_FIELDS, getProducts } from '../api/products'
import { useFetch } from '../hooks/useFetch'
import ErrorMessage from './ErrorMessage'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

// Sarlavha + mahsulotlar to'ri. sortBy/order bo'yicha saralangan birinchi `limit` ta mahsulotni yuklaydi.
export default function ProductSection({ title, sortBy, order, limit = 8, linkTo = '/products' }) {
  const { data, loading, error, retry } = useFetch(
    (signal) => getProducts({ limit, sortBy, order, select: CARD_FIELDS }, signal),
    [limit, sortBy, order],
  )

  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          to={linkTo}
          className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Hammasini ko'rish →
        </Link>
      </div>

      {error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {loading || !data
            ? Array.from({ length: limit }, (_, index) => <ProductCardSkeleton key={index} />)
            : data.products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  )
}
