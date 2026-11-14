// localStorage bilan xavfsiz ishlash (savat va sevimlilar uchun umumiy).
// Brauzer maxfiy rejimda yoki joy tugagan bo'lsa localStorage xato berishi mumkin —
// bunda sayt buzilmaydi, faqat ma'lumot saqlanmaydi.

// Kalit bo'yicha ro'yxatni o'qiydi. Buzilgan JSON bo'lsa yoki ro'yxat bo'lmasa — bo'sh ro'yxat;
// isValid(item) = false bo'lgan yozuvlar tashlab yuboriladi.
export function loadList(key, isValid) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key))
    return Array.isArray(parsed) ? parsed.filter(isValid) : []
  } catch {
    return []
  }
}

export function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // saqlab bo'lmasa ham sayt sessiya davomida ishlayveradi
  }
}
