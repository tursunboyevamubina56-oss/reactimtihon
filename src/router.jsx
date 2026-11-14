import { createBrowserRouter } from 'react-router'
import App from './App'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import ErrorPage from './pages/ErrorPage'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import OrderSuccess from './pages/OrderSuccess'
import ProductDetail from './pages/ProductDetail'

// App — umumiy qobiq (Header + sahifa + Footer), sahifalar uning ichidagi <Outlet /> ga tushadi.
// Sahifa ichida xatolik bo'lsa, xato sahifasi qobiq ichida ko'rinadi (Header va Footer saqlanadi);
// qobiqning o'zida xatolik bo'lsa — butun ekranda.
export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    ErrorBoundary: ErrorPage,
    children: [
      {
        ErrorBoundary: ErrorPage,
        children: [
          { index: true, Component: Home },
          { path: 'products', Component: Catalog },
          { path: 'products/:id', Component: ProductDetail },
          { path: 'cart', Component: Cart },
          { path: 'checkout', Component: Checkout },
          { path: 'order-success', Component: OrderSuccess },
          { path: 'favorites', Component: Favorites },
          { path: '*', Component: NotFound },
        ],
      },
    ],
  },
])
