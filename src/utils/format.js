const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

// 9.99 -> "$9.99"
export function formatPrice(value) {
  return priceFormatter.format(value)
}

// Chegirmadan keyingi narx. API'dagi price — asl narx, discountPercentage — chegirma foizi.
export function getDiscountedPrice(price, discountPercentage = 0) {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100
}
