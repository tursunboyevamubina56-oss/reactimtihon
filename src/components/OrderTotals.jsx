import { formatPrice } from '../utils/format'

// Savat va buyurtma sahifalaridagi jami summa bloki
export default function OrderTotals({ count, originalTotal, savings, total }) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between gap-4">
        <dt className="text-slate-500 dark:text-slate-400">Mahsulotlar ({count} dona)</dt>
        <dd>{formatPrice(originalTotal)}</dd>
      </div>
      {savings > 0 && (
        <div className="flex justify-between gap-4 text-emerald-600 dark:text-emerald-400">
          <dt>Chegirma</dt>
          <dd>−{formatPrice(savings)}</dd>
        </div>
      )}
      <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 text-lg font-bold dark:border-slate-800">
        <dt>Jami</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
    </dl>
  )
}
