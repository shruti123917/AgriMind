import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/**
 * Single AI insight metric card for the dashboard grid.
 */
export default function InsightCard({ icon: Icon, label, value, hint, variant = 'default', linkTo }) {
  const iconColors = {
    default: 'bg-gray-100 text-gray-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  }

  const displayValue = value ?? '—'
  const isPending = value == null

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconColors[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {linkTo && (
          <Link to={linkTo} className="text-gray-400 hover:text-primary-600">
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${isPending ? 'text-gray-300' : 'text-gray-900'}`}>
        {displayValue}
      </p>
      {hint && (
        <p className="mt-2 text-xs text-gray-400">{hint}</p>
      )}
    </div>
  )
}
