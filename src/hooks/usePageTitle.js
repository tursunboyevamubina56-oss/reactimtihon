import { useEffect } from 'react'

// Brauzer yorlig'idagi sarlavhani o'rnatadi: usePageTitle('Katalog') -> "Katalog — Do'kon".
// Sarlavha berilmasa (yoki undefined) — faqat "Do'kon".
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Do'kon` : "Do'kon"
  }, [title])
}
