import { Link, NavLink } from 'react-router'
import { useTheme } from '../hooks/useTheme'
import { CartIcon, HeartIcon, MoonIcon, SunIcon } from './icons'

// Menyudagi havola: faol sahifa asosiy rangda ko'rinadi
function navLinkClass({ isActive }) {
  return [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'text-indigo-600 dark:text-indigo-400'
      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
  ].join(' ')
}

// O'ngdagi ikonkali tugma/havola uchun umumiy uslub
const iconButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 px-4 py-2">
        <Link to="/" className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
          Do'kon
        </Link>

        {/* Telefonda menyu pastki qatorga tushadi */}
        <nav aria-label="Asosiy menyu" className="order-last flex w-full gap-1 sm:order-none sm:w-auto">
          <NavLink to="/" end className={navLinkClass}>
            Bosh sahifa
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Katalog
          </NavLink>
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/favorites" aria-label="Sevimlilar" className={iconButtonClass}>
            <HeartIcon />
          </Link>
          <Link to="/cart" aria-label="Savat" className={iconButtonClass}>
            <CartIcon />
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
            className={iconButtonClass}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
