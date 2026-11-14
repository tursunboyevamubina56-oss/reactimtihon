// Kartochka yuklanayotganda ko'rinadigan bo'sh joy (skelet)
export default function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
    >
      <div className="aspect-square bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-5 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  )
}
