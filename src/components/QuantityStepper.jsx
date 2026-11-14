const buttonClass =
  'inline-flex h-10 w-10 items-center justify-center text-lg transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent dark:hover:bg-slate-800 dark:disabled:text-slate-600'

// Miqdorni − va + tugmalari bilan o'zgartirish (min va max chegaralari ichida)
export default function QuantityStepper({ value, onChange, min = 1, max = Infinity, label = 'Miqdor' }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Kamaytirish"
        className={buttonClass}
      >
        −
      </button>
      <span aria-live="polite" className="w-10 text-center text-sm font-semibold">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Ko'paytirish"
        className={buttonClass}
      >
        +
      </button>
    </div>
  )
}
