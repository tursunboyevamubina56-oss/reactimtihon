// DummyJSON "products" API bilan ishlash qatlami.
// Hujjat: https://dummyjson.com/docs/products
// Eslatma: POST/PUT/DELETE so'rovlari serverga saqlanmaydi, shuning uchun
// savat va sevimlilar brauzerda (localStorage) saqlanadi.

export const BASE_URL = 'https://dummyjson.com'

// Bir sahifada nechta mahsulot ko'rsatiladi (pagination uchun)
export const PAGE_SIZE = 12

// Kartochka uchun kerakli maydonlar (select orqali faqat shularni olamiz — javob yengil bo'ladi)
export const CARD_FIELDS = 'title,price,discountPercentage,rating,thumbnail,brand,category,stock'

// 404 xatosining matni: sahifalar "mahsulot topilmadi" holatini shu bilan taniydi
export const NOT_FOUND_MESSAGE = 'Topilmadi'

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
  let response
  try {
    response = await fetch(`${BASE_URL}${path}${buildQuery(params)}`, { signal })
  } catch (error) {
    // Bekor qilingan so'rov xato emas — useFetch uni o'zi e'tiborsiz qoldiradi
    if (error.name === 'AbortError') throw error
    throw new Error("Serverga ulanib bo'lmadi. Internet aloqasini tekshirib, qayta urinib ko'ring.")
  }
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? NOT_FOUND_MESSAGE
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

// Katalog sahifasi uchun: qidiruv, kategoriya, saralash va sahifalashni birlashtiradi.
// Qaytadi: { products, total } — products faqat shu sahifadagi mahsulotlar.
export async function getCatalogPage({ q, category, sortBy, order, page = 1 }, signal) {
  const skip = (page - 1) * PAGE_SIZE
  const base = { select: CARD_FIELDS, sortBy, order }

  if (q) {
    // API qidiruv va kategoriyani birga qo'llamaydi, shuning uchun hamma natijani olamiz
    // (limit=0) va kategoriyani o'zimiz filtrlab, sahifalarga bo'lamiz.
    const data = await searchProducts(q, { ...base, limit: 0 }, signal)
    const list = category ? data.products.filter((p) => p.category === category) : data.products
    return { products: list.slice(skip, skip + PAGE_SIZE), total: list.length }
  }

  const params = { ...base, limit: PAGE_SIZE, skip }
  const data = category
    ? await getProductsByCategory(category, params, signal)
    : await getProducts(params, signal)
  return { products: data.products, total: data.total }
}
