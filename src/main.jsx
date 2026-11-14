import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import CartProvider from './context/CartProvider'
import FavoritesProvider from './context/FavoritesProvider'
import { router } from './router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </CartProvider>
  </StrictMode>,
)
