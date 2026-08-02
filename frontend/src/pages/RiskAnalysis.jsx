import { ShieldAlert } from 'lucide-react'
import { useFarmer } from '../context/FarmerContext'
import Card from '../components/ui/Card'
import Badge, { riskVariant } from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'

export default function RiskAnalysis() {
  const { dashboard, hasProfile } = useFarmer()

  if (!hasProfile) {
    return (
      <div className="mx-auto max-w-lg">
        <Card>
          <EmptyState
            icon={ShieldAlert}
            title="No risk data available"
            description="Create a farmer profile first. Weather risk is derived from your water availability setting."
            actionLabel="Create Profile"
            actionTo="/profile"
          />
        </Card>
      </div>
    )
  }

  const { weather_risk, disease_risk } = dashboard.insights

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card title="Risk Analysis" subtitle={`For ${dashboard.current_crop} at ${dashboard.location}`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <RiskItem label="Weather Risk" value={weather_risk} hint="Derived from water availability" />
          <RiskItem label="Disease Risk" value={disease_risk} hint="Requires disease detection module" />
          <RiskItem label="Low Rainfall Risk" value={weather_risk === 'High' ? 'High' : weather_risk === 'Medium' ? 'Medium' : 'Low'} hint="Based on water availability profile" />
        </div>
      </Card>

      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
        Advanced risk scoring with temperature trends and disease probability will be added in Phase 4.
      </div>
    </div>
  )
}

function RiskItem({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      {value ? (
        <div className="mt-2">
          <Badge label={value} variant={riskVariant(value)} />
        </div>
      ) : (
        <p className="mt-2 text-2xl font-bold text-gray-300">—</p>
      )}
      <p className="mt-2 text-xs text-gray-400">{hint}</p>
    </div>
  )
}
