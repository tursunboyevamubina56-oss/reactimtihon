// DummyJSON "products" API bilan ishlash qatlami.
// Hujjat: https://dummyjson.com/docs/products
// Eslatma: POST/PUT/DELETE so'rovlari serverga saqlanmaydi, shuning uchun
// savat va sevimlilar brauzerda (localStorage) saqlanadi.

export const BASE_URL = 'https://dummyjson.com'

// Bir sahifada nechta mahsulot ko'rsatiladi (pagination uchun)
export const PAGE_SIZE = 12

// Parametrlar obyektini "?a=1&b=2" ko'rinishiga o'tkazadi, bo'sh qiymatlarni tashlab ketadi
function buildQuery(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value)
    }
  }
  const text = query.toString()
  return text ? `?${text}` : ''
}

// Umumiy so'rov funksiyasi: xatoni tushunarli matn bilan tashlaydi
async function request(path, params, signal) {
  const response = await fetch(`${BASE_URL}${path}${buildQuery(params)}`, { signal })
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? 'Topilmadi'
        : `Serverda xatolik yuz berdi (${response.status})`,
    )
  }
  return response.json()
}

// Barcha mahsulotlar: { products, total, skip, limit }
// params: { limit, skip, select, sortBy, order }
export function getProducts(params = {}, signal) {
  return request('/products', params, signal)
}

// Qidiruv: q so'zi bo'yicha
export function searchProducts(q, params = {}, signal) {
  return request('/products/search', { q, ...params }, signal)
}

// Bitta mahsulot (o'ralmagan obyekt qaytadi)
export function getProduct(id, signal) {
  return request(`/products/${id}`, {}, signal)
}

// Kategoriyalar: [{ slug, name, url }]
export function getCategories(signal) {
  return request('/products/categories', {}, signal)
}

// Kategoriya bo'yicha mahsulotlar
export function getProductsByCategory(slug, params = {}, signal) {
  return request(`/products/category/${slug}`, params, signal)
}
