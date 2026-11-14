import { Link } from 'react-router'

// Yil sahifa yuklanganda bir marta hisoblanadi (har renderda emas)
const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
        <p>© {CURRENT_YEAR} Do'kon. Barcha huquqlar himoyalangan.</p>
        <p>
          Mahsulotlar ma'lumoti:{' '}
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            DummyJSON
          </a>
          {' · '}
          <Link to="/products" className="hover:underline">
            Katalog
          </Link>
        </p>
      </div>
    </footer>
  )
}
