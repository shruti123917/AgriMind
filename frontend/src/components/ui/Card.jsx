/**
 * Reusable card wrapper used across dashboard pages.
 */
export default function Card({ title, subtitle, children, className = '', action }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={title || action ? 'p-6' : 'p-6'}>{children}</div>
    </div>
  )
}
