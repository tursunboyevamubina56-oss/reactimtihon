import { StarIcon } from './icons'

// 5 ta yulduzcha: reytingga qarab to'ldiriladi (4.6 -> 5 ta sariq yulduz)
export default function StarRating({ value, className = 'h-4 w-4' }) {
  const filled = Math.round(value)

  return (
    <span className="inline-flex" role="img" aria-label={`Reyting: 5 dan ${value}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          className={`${className} ${n <= filled ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'}`}
        />
      ))}
    </span>
  )
}
