import { Link, isRouteErrorResponse, useRouteError } from 'react-router'
import { usePageTitle } from '../hooks/usePageTitle'

// Kutilmagan xatolik (dastur ichida) bo'lganda oq ekran o'rniga shu sahifa ko'rinadi
export default function ErrorPage() {
  usePageTitle('Xatolik')
  const error = useRouteError()

  // Texnik tafsilot faqat dasturlash vaqtida ko'rsatiladi, foydalanuvchiga emas
  const details = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : null

  return (
    <section className="mx-auto max-w-lg px-4 py-16 text-center">
      <p className="text-6xl font-bold text-rose-600 dark:text-rose-400">!</p>
      <h1 className="mt-4 text-2xl font-semibold">Kutilmagan xatolik yuz berdi</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Sahifani yangilab ko'ring. Muammo takrorlansa, bosh sahifaga qaytib qayta urinib ko'ring.
      </p>
      {import.meta.env.DEV && details && (
        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-100 p-3 text-left text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {details}
        </pre>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Sahifani yangilash
        </button>
        <Link
          to="/"
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Bosh sahifaga
        </Link>
      </div>
    </section>
  )
}
