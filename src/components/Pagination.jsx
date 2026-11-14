// Sahifalar ro'yxati: 1 ... 4 5 6 ... 20 ko'rinishida (birinchi, oxirgi va joriy sahifa atrofi)
function getPageItems(page, totalPages) {
  const wanted = [1, page - 1, page, page + 1, totalPages]
  const pages = [...new Set(wanted)]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b)

  const items = []
  pages.forEach((p, index) => {
    // Raqamlar orasida bo'shliq bo'lsa "..." qo'yamiz
    if (index > 0 && p - pages[index - 1] > 1) items.push(`gap-${p}`)
    items.push(p)
  })
  return items
}

const baseButton =
  'inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors'
const idleButton =
  'border-slate-200 hover:border-indigo-600 hover:text-indigo-600 dark:border-slate-700 dark:hover:border-indigo-400 dark:hover:text-indigo-400'
const disabledButton = 'cursor-not-allowed border-slate-200 text-slate-300 dark:border-slate-800 dark:text-slate-600'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Sahifalar" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={`${baseButton} ${page <= 1 ? disabledButton : idleButton}`}
      >
        ← Oldingi
      </button>

      {getPageItems(page, totalPages).map((item) =>
        typeof item === 'string' ? (
          <span key={item} className="px-1 text-slate-400" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-label={`${item}-sahifa`}
            aria-current={item === page ? 'page' : undefined}
            className={`${baseButton} ${
              item === page ? 'border-indigo-600 bg-indigo-600 text-white' : idleButton
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={`${baseButton} ${page >= totalPages ? disabledButton : idleButton}`}
      >
        Keyingi →
      </button>
    </nav>
  )
}
