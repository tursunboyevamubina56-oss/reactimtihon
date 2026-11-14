import { Navigate, useSearchParams } from 'react-router'
import { getCatalogPage, getCategories, PAGE_SIZE } from '../api/products'
import ErrorMessage from '../components/ErrorMessage'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import SearchBox from '../components/SearchBox'
import { useFetch } from '../hooks/useFetch'
import { usePageTitle } from '../hooks/usePageTitle'

// Saralash variantlari. value — URL'dagi "sortBy:order" ko'rinishi
// (Bosh sahifadagi "Hammasini ko'rish" havolalari ham shu qiymatlarni ishlatadi).
const SORT_OPTIONS = [
  { value: '', label: 'Standart' },
  { value: 'price:asc', label: 'Narx: arzondan qimmatga' },
  { value: 'price:desc', label: 'Narx: qimmatdan arzonga' },
  { value: 'rating:desc', label: 'Reyting bo\'yicha' },
  { value: 'discountPercentage:desc', label: 'Chegirma bo\'yicha' },
  { value: 'title:asc', label: 'Nom: A–Z' },
]

const selectClass =
  'h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition-colors focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-indigo-400'

export default function Catalog() {
  usePageTitle('Katalog')
  const [searchParams, setSearchParams] = useSearchParams()

  // Hamma filtr URL'dan o'qiladi: /products?q=phone&category=smartphones&sortBy=price&order=asc&page=2
  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const sortValue = `${searchParams.get('sortBy')}:${searchParams.get('order')}`
  const sort = SORT_OPTIONS.find((option) => option.value === sortValue)?.value ?? ''
  const [sortBy, order] = sort ? sort.split(':') : [undefined, undefined]
  const parsedPage = Number.parseInt(searchParams.get('page'), 10)
  const page = Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1
  const searchText = q.trim()

  // URL parametrlarini o'zgartiradi: bo'sh qiymat — parametr olib tashlanadi
  function updateParams(changes, { replace = false } = {}) {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setSearchParams(next, { replace })
  }

  const categories = useFetch((signal) => getCategories(signal), [])
  const products = useFetch(
    (signal) => getCatalogPage({ q: searchText, category, sortBy, order, page }, signal),
    [searchText, category, sort, page],
  )

  const total = products.data?.total ?? 0
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const hasFilters = Boolean(searchText || category || sort)

  // Mavjud bo'lmagan sahifa so'ralsa (masalan ?page=99) — oxirgi sahifaga o'tkazamiz
  if (!products.loading && total > 0 && page > totalPages) {
    const next = new URLSearchParams(searchParams)
    if (totalPages > 1) next.set('page', String(totalPages))
    else next.delete('page')
    return <Navigate to={`?${next.toString()}`} replace />
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">Katalog</h1>

      {/* Filtrlar */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_16rem_16rem]">
        <div className="sm:col-span-2 lg:col-span-1">
          <SearchBox value={q} onSearch={(text) => updateParams({ q: text, page: '' }, { replace: true })} />
        </div>

        <select
          value={category}
          onChange={(event) => updateParams({ category: event.target.value, page: '' })}
          aria-label="Kategoriya"
          className={selectClass}
        >
          <option value="">Barcha kategoriyalar</option>
          {/* URL'da ro'yxatda yo'q kategoriya bo'lsa ham tanlov yo'qolmasin */}
          {category && !categories.data?.some((item) => item.slug === category) && (
            <option value={category}>{category}</option>
          )}
          {categories.data?.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => {
            const [newSortBy, newOrder] = event.target.value.split(':')
            updateParams({ sortBy: newSortBy, order: newOrder, page: '' })
          }}
          aria-label="Saralash"
          className={selectClass}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Natijalar soni va filtrlarni tozalash */}
      <div className="mt-4 flex min-h-6 items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <p aria-live="polite">
          {products.loading ? 'Yuklanmoqda…' : products.error ? '' : `${total} ta mahsulot topildi`}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Filtrlarni tozalash
          </button>
        )}
      </div>

      {/* Mahsulotlar */}
      <div className="mt-4">
        {products.error ? (
          <ErrorMessage message={products.error} onRetry={products.retry} />
        ) : products.loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: PAGE_SIZE }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : total === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold">Hech narsa topilmadi</p>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Boshqa so'z yoki kategoriya bilan qayta urinib ko'ring.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(newPage) => updateParams({ page: newPage === 1 ? '' : String(newPage) })}
      />
    </section>
  )
}
