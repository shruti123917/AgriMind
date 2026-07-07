/**
 * Reusable card wrapper used across dashboard pages.
 */
export default function Card({ title, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
      )}
      {children}
    </div>
  )
}
