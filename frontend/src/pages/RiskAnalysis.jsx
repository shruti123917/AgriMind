import { ShieldAlert, Construction } from 'lucide-react'
import Card from '../components/ui/Card'

export default function RiskAnalysis() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <div className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Crop Risk Analysis</h3>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Analyze low rainfall risk, high temperature risk, and disease possibility.
            Get a simple risk score: Low, Medium, or High.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm text-amber-700">
            <Construction className="h-4 w-4" />
            Coming in Phase 4
          </div>
        </div>
      </Card>
    </div>
  )
}
