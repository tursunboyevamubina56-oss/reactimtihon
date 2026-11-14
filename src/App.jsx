import { Outlet, ScrollRestoration } from 'react-router'
import Footer from './components/Footer'
import Header from './components/Header'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      {/* Sahifa almashganda tepaga qaytaradi, orqaga qaytganda joyini eslaydi */}
      <ScrollRestoration />
    </div>
  )
}
