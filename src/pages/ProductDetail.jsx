import { useParams } from 'react-router'

export default function ProductDetail() {
  const { id } = useParams()

  return (
    <section>
      <h1 className="text-3xl font-bold">Mahsulot #{id}</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Tez orada: rasmlar, narx, sharhlar va o'xshash mahsulotlar.</p>
    </section>
  )
}
