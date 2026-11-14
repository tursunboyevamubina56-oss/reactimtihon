import { useState } from 'react'
import { ImageOffIcon } from './icons'

// Oddiy <img> kabi ishlaydi, lekin rasm yuklanmasa (tarmoq uzilishi, CDN xatosi) buzilgan rasm belgisi
// o'rniga bir xil o'lchamdagi toza joy va belgi ko'rsatadi. src o'zgarsa, yana urinib ko'riladi.
export default function SafeImage({ src, alt, className = '', ...props }) {
  const [failedSrc, setFailedSrc] = useState(null)

  if (failedSrc === src) {
    // alt bo'sh bo'lsa rasm bezak hisoblanadi — ekran o'qigichlarga ko'rsatilmaydi
    const a11yProps = alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true }
    return (
      <div {...a11yProps} className={`flex items-center justify-center text-slate-400 dark:text-slate-500 ${className}`}>
        <ImageOffIcon className="h-1/3 w-1/3 max-h-10 max-w-10" />
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailedSrc(src)} {...props} />
}
