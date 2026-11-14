import { formatDate } from '../utils/format'
import StarRating from './StarRating'

export default function ReviewList({ reviews, rating }) {
  return (
    <section>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <h2 className="text-2xl font-bold">Sharhlar ({reviews.length})</h2>
        <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <StarRating value={rating} />
          O'rtacha {rating.toFixed(1)}
        </span>
      </div>

      {reviews.length === 0 ? (
        <p className="mt-4 text-slate-500 dark:text-slate-400">Hozircha sharhlar yo'q.</p>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {reviews.map((review, index) => (
            <li
              key={`${review.reviewerName}-${review.date}-${index}`}
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <div className="flex items-center justify-between gap-2">
                <StarRating value={review.rating} />
                <time dateTime={review.date} className="text-xs text-slate-500 dark:text-slate-400">
                  {formatDate(review.date)}
                </time>
              </div>
              <p className="mt-2">{review.comment}</p>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{review.reviewerName}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
