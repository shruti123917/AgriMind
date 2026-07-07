import { BarChart3, Construction } from 'lucide-react'
import Card from '../components/ui/Card'

export default function YieldPrediction() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <div className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Yield Prediction Module</h3>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Predict approximate crop yield based on crop type, farm area, weather
            conditions, and soil information.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm text-amber-700">
            <Construction className="h-4 w-4" />
            Coming in Phase 3
          </div>
        </div>
      </Card>
    </div>
  )
}
