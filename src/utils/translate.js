// API'dan inglizcha matnlar keladi ("3 months warranty"). Interfeys o'zbekcha bo'lishi uchun
// ularni o'giramiz. Tanilmagan matn bo'lsa — asl holicha qaytaramiz (sahifa buzilmaydi).

const WARRANTY_UNITS = { week: 'hafta', month: 'oy', year: 'yil' }
const SHIPPING_UNITS = { 'business days': 'ish kuni', week: 'hafta', weeks: 'hafta', month: 'oy', months: 'oy' }

// "3 months warranty" -> "3 oy kafolat"
export function translateWarranty(text) {
  if (text === 'No warranty') return "Kafolat yo'q"
  if (text === 'Lifetime warranty') return 'Umrbod kafolat'
  const match = text.match(/^(\d+) (week|month|year)s? warranty$/)
  return match ? `${match[1]} ${WARRANTY_UNITS[match[2]]} kafolat` : text
}

// "Ships in 1-2 business days" -> "1-2 ish kuni ichida yetkaziladi"
export function translateShipping(text) {
  if (text === 'Ships overnight') return 'Ertasi kuni yetkaziladi'
  const match = text.match(/^Ships in (\d+(?:-\d+)?) (business days|weeks?|months?)$/)
  return match ? `${match[1]} ${SHIPPING_UNITS[match[2]]} ichida yetkaziladi` : text
}

// "30 days return policy" -> "30 kun ichida qaytarish mumkin"
export function translateReturnPolicy(text) {
  if (text === 'No return policy') return "Qaytarib bo'lmaydi"
  const match = text.match(/^(\d+) days return policy$/)
  return match ? `${match[1]} kun ichida qaytarish mumkin` : text
}

// Mavjudlik holati: rang (Tailwind klasslari) va matn
export function getAvailability(status, stock) {
  switch (status) {
    case 'In Stock':
      return {
        label: `Sotuvda mavjud (${stock} dona)`,
        className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      }
    case 'Low Stock':
      return {
        label: `Oz qolgan (${stock} dona)`,
        className: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      }
    case 'Out of Stock':
      return {
        label: "Sotuvda yo'q",
        className: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
      }
    default:
      return { label: status, className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' }
  }
}
