const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

// 9.99 -> "$9.99"
export function formatPrice(value) {
  return priceFormatter.format(value)
}

const MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
]

// "2025-04-30T09:41:02.053Z" -> "30-aprel, 2025"
// (Intl 'uz' formati brauzerda noto'g'ri chiqadi, shuning uchun o'zimiz yozdik. UTC — vaqt zonasiga bog'liq bo'lmasligi uchun.)
export function formatDate(isoString) {
  const date = new Date(isoString)
  return `${date.getUTCDate()}-${MONTHS[date.getUTCMonth()]}, ${date.getUTCFullYear()}`
}

// "mobile-accessories" -> "Mobile accessories"
export function formatCategory(slug) {
  const text = slug.replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Chegirmadan keyingi narx. API'dagi price — asl narx, discountPercentage — chegirma foizi.
export function getDiscountedPrice(price, discountPercentage = 0) {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100
}

// Mahsulotning haqiqiy sotuv narxi. Chegirma 1% dan kam bo'lsa (kartochkada "-0%" chiqmasligi uchun)
// u hisobga olinmaydi — savat, kartochka va mahsulot sahifasi bir xil narx ko'rsatishi uchun shu funksiya.
export function getFinalPrice(price, discountPercentage = 0) {
  return Math.round(discountPercentage) >= 1 ? getDiscountedPrice(price, discountPercentage) : price
}

// Yig'indi hisoblarda suzuvchi nuqta xatosi (0.1 + 0.2) chiqmasligi uchun tiyinlargacha yaxlitlaydi
export function roundMoney(value) {
  return Math.round(value * 100) / 100
}
