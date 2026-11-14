import { createBrowserRouter } from 'react-router'
import App from './App'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import OrderSuccess from './pages/OrderSuccess'
import ProductDetail from './pages/ProductDetail'

// App — umumiy qobiq (Header + sahifa + Footer), sahifalar uning ichidagi <Outlet /> ga tushadi
export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
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
])
