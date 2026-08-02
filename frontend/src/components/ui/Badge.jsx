const variants = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
  default: 'bg-gray-100 text-gray-600',
  primary: 'bg-primary-100 text-primary-700',
}

export default function Badge({ label, variant = 'default' }) {
  if (!label) return null
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant] || variants.default}`}>
      {label}
    </span>
  )
}

export function riskVariant(risk) {
  if (!risk) return 'default'
  const map = { Low: 'low', Medium: 'medium', High: 'high' }
  return map[risk] || 'default'
}
