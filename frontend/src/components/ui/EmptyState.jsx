import { Link } from 'react-router-dom'

/**
 * Shown when data is missing or a feature is not yet configured.
 */
export default function EmptyState({ icon: Icon, title, description, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      {Icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
          <Icon className="h-7 w-7 text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-5 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
