import { Link } from 'react-router'
import { getCategories } from '../api/products'
import { useFetch } from '../hooks/useFetch'
import ErrorMessage from './ErrorMessage'

// Kategoriyalar ro'yxati: bosilganda katalogda shu kategoriya tanlanadi
export default function CategoryChips() {
  const { data, loading, error, retry } = useFetch((signal) => getCategories(signal), [])

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Kategoriyalar</h2>

      {error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : loading || !data ? (
        <div className="flex flex-wrap gap-2" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="h-9 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {data.map((category) => (
            <li key={category.slug}>
              <Link
                to={`/products?category=${category.slug}`}
                className="inline-block rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition-colors hover:border-indigo-600 hover:text-indigo-600 dark:border-slate-700 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
