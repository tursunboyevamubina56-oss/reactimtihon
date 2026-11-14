import { useState } from 'react'
import SafeImage from './SafeImage'

// Katta rasm + pastda kichik rasmlar. Bitta rasm bo'lsa kichiklari ko'rsatilmaydi.
// Mahsulot almashganda sahifa key={product.id} bilan qayta yaratadi, shuning uchun tanlov boshiga qaytadi.
export default function ProductGallery({ images, title }) {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <SafeImage src={images[selected]} alt={title} className="h-full w-full object-contain p-6" />
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                aria-label={`${index + 1}-rasm`}
                aria-current={index === selected ? 'true' : undefined}
                className={`aspect-square w-full overflow-hidden rounded-lg border-2 bg-slate-100 transition-colors dark:bg-slate-800 ${
                  index === selected
                    ? 'border-indigo-600 dark:border-indigo-400'
                    : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <SafeImage src={src} alt="" loading="lazy" className="h-full w-full object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
