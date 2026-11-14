import { Link } from 'react-router'
import CategoryChips from '../components/CategoryChips'
import ProductSection from '../components/ProductSection'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle()

  return (
    <div className="space-y-12">
      {/* Banner */}
      <section className="rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 px-6 py-12 text-white sm:px-12 sm:py-16">
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-100">Do'kon</p>
        <h1 className="mt-2 max-w-xl text-3xl font-bold leading-tight sm:text-5xl">
          Kerakli hamma narsa — bir joyda
        </h1>
        <p className="mt-4 max-w-lg text-indigo-100">
          Go'zallik, texnika, kiyim, uy jihozlari va yana yuzlab mahsulotlar qulay narxlarda.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
        >
          Xaridni boshlash
        </Link>
      </section>

      <CategoryChips />

      <ProductSection title="Eng yuqori reytingli" sortBy="rating" order="desc" linkTo="/products?sortBy=rating&order=desc" />
      <ProductSection
        title="Eng katta chegirmalar"
        sortBy="discountPercentage"
        order="desc"
        linkTo="/products?sortBy=discountPercentage&order=desc"
      />
    </div>
  )
}
