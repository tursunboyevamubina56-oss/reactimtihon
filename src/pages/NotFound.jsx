import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="py-16 text-center">
      <p className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Sahifa topilmadi</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Siz izlagan sahifa mavjud emas yoki ko'chirilgan.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Bosh sahifaga qaytish
      </Link>
    </section>
  )
}
