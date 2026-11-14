// Xato xabari va "Qayta urinish" tugmasi
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
    >
      <p className="font-medium">Ma'lumotni yuklab bo'lmadi</p>
      {message && <p className="mt-1 opacity-80">{message}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg bg-rose-600 px-4 py-2 font-medium text-white transition-colors hover:bg-rose-700"
        >
          Qayta urinish
        </button>
      )}
    </div>
  )
}
