# Do'kon

Onlayn do'kon sayti. Mahsulotlar [DummyJSON](https://dummyjson.com/docs/products) ochiq API'sidan olinadi.

## Imkoniyatlar

- **Bosh sahifa:** banner, kategoriyalar, "Eng yuqori reytingli" va "Eng katta chegirmalar" bo'limlari.
- **Katalog:** qidiruv, kategoriya filtri, saralash va sahifalash. Filtrlar manzilda saqlanadi (`/products?q=phone&category=smartphones&page=2`), shuning uchun havolani ulashish va orqaga tugmasi to'g'ri ishlaydi.
- **Mahsulot sahifasi:** rasm galereyasi, chegirmali narx, mavjudlik holati, sharhlar, o'xshash mahsulotlar.
- **Savat:** miqdorni o'zgartirish (ombordagi sondan oshmaydi), chegirma bilan jami summa.
- **Buyurtma:** forma tekshiruvlari bilan; buyurtma serverga yuborilmaydi.
- **Sevimlilar:** yurakcha tugmasi bilan.
- **Qorong'i va yorug' rejim** (tanlov eslab qolinadi), telefon va kompyuter uchun moslashgan ko'rinish.

## Ishga tushirish

```bash
npm install
npm run dev       # dasturlash serveri (http://localhost:5173)
npm run build     # ishlab chiqarish uchun yig'ish (dist/ papkasi)
npm run preview   # yig'ilgan versiyani ko'rish
npm run lint      # kodni tekshirish
```

## Texnologiyalar

React 19, Vite, Tailwind CSS 4, React Router 8. Qo'shimcha kutubxona ishlatilmagan: so'rovlar brauzerning `fetch` orqali yuboriladi.

## Papkalar tuzilishi

```
src/
  api/         DummyJSON so'rovlari (products.js)
  components/  qayta ishlatiladigan qismlar (kartochka, Header, Pagination, ...)
  context/     savat va sevimlilar holati (Provider'lar)
  hooks/       useFetch, useDebounce, useTheme, useCart, useFavorites, usePageTitle
  pages/       sahifalar (Home, Catalog, ProductDetail, Cart, Checkout, ...)
  utils/       narx va sana formatlash, matn tarjimasi, localStorage yordamchisi
  router.jsx   yo'nalishlar
```

## Muhim qarorlar

- **Savat va sevimlilar `localStorage`da saqlanadi.** DummyJSON'da qo'shish, o'zgartirish va o'chirish so'rovlari serverga saqlanmaydi (faqat natijani taqlid qiladi), shuning uchun bu ma'lumotlar brauzerning o'zida turadi.
- **Qidiruv va kategoriya birga:** API ularni birga qo'llamaydi, shuning uchun ikkalasi tanlanganda barcha qidiruv natijalari olinadi va kategoriya brauzerda filtrlanadi.
- **Buyurtma soxta:** ism, telefon va manzil hech qayerga yuborilmaydi va saqlanmaydi. Karta ma'lumotlari so'ralmaydi.
- **Minimal buyurtma miqdori** (`minimumOrderQuantity`) mahsulot sahifasida ma'lumot sifatida ko'rsatiladi, lekin savatda majburiy qilinmagan: API'da bu qiymat tasodifiy (1 dan 100 gacha).
- Mahsulot nomi, tavsifi va sharhlar API'dan inglizcha keladi; interfeysning o'zi (tugmalar, sarlavhalar, kafolat va yetkazib berish matnlari) o'zbekcha.
