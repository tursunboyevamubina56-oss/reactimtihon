import { Outlet, ScrollRestoration } from 'react-router'
import Footer from './components/Footer'
import Header from './components/Header'

// Sahifa yangi yuklanganda tarix yozuvining kaliti hamma sahifada bir xil ("default") bo'ladi
// va boshqa sahifaning aylantirish joyi tiklanib qolardi — shuning uchun unga manzilni qo'shamiz.
function getScrollKey(location) {
  return location.key === 'default' ? `${location.pathname}${location.search}` : location.key
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Klaviatura bilan ishlaydiganlar uchun: Tab bosilganda birinchi bo'lib shu havola chiqadi */}
      <a
        href="#asosiy"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Asosiy qismga o'tish
      </a>
      <Header />
      <main id="asosiy" tabIndex={-1} className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      {/* Sahifa almashganda tepaga qaytaradi, orqaga qaytganda joyini eslaydi */}
      <ScrollRestoration getKey={getScrollKey} />
    </div>
  )
}
