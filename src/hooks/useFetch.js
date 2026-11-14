import { useEffect, useRef, useState } from 'react'

// Ma'lumotni yuklaydigan umumiy hook.
// fetcher(signal) — Promise qaytaradigan funksiya, deps (oddiy qiymatlar massivi) o'zgarsa
// qaytadan yuklanadi. Oldingi so'rov bekor qilinadi (tez-tez yozilgan qidiruvda eski javob
// yangisini bosib ketmasin).
//
// Qaytaradi: { data, loading, error }
// Yangi so'rov ketayotganda data — oldingi natija bo'lib qoladi (sahifa almashganda
// ekran bo'sh qolmasligi uchun), loading esa true bo'ladi.
export function useFetch(fetcher, deps = []) {
  // result qaysi so'rov (key) uchun kelganini ham eslab qoladi
  const [result, setResult] = useState({ key: null, data: null, error: null })

  // fetcher har renderda yangi funksiya bo'ladi, shuning uchun uni ref'da saqlaymiz
  const fetcherRef = useRef(fetcher)
  useEffect(() => {
    fetcherRef.current = fetcher
  })

  // deps ni bitta matnga aylantiramiz: faqat qiymat o'zgargandagina qayta yuklanadi
  const key = JSON.stringify(deps)

  useEffect(() => {
    const controller = new AbortController()

    fetcherRef.current(controller.signal)
      .then((data) => setResult({ key, data, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setResult({ key, data: null, error: error.message })
      })

    return () => controller.abort()
  }, [key])

  // Natija joriy so'rovga tegishli bo'lmasa — hali yuklanmoqda
  const loading = result.key !== key
  return {
    data: result.data,
    loading,
    error: loading ? null : result.error,
  }
}
