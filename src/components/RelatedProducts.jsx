import { CARD_FIELDS, getProductsByCategory } from '../api/products'
import { useFetch } from '../hooks/useFetch'
import ErrorMessage from './ErrorMessage'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

const COUNT = 4

// Shu kategoriyadagi boshqa mahsulotlar (joriy mahsulotning o'zi chiqarib tashlanadi)
export default function RelatedProducts({ category, currentId }) {
  const { data, loading, error, retry } = useFetch(
    // Joriy mahsulot ham chiqishi mumkin, shuning uchun bittasini ortiqcha so'raymiz
    (signal) => getProductsByCategory(category, { limit: COUNT + 1, select: CARD_FIELDS }, signal),
    [category],
  )

  const items = data?.products.filter((product) => product.id !== currentId).slice(0, COUNT) ?? []

  // Kategoriyada boshqa mahsulot yo'q bo'lsa, bo'lim umuman ko'rsatilmaydi
  if (!loading && !error && items.length === 0) return null

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">O'xshash mahsulotlar</h2>
      {error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {loading
            ? Array.from({ length: COUNT }, (_, index) => <ProductCardSkeleton key={index} />)
            : items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  )
}
