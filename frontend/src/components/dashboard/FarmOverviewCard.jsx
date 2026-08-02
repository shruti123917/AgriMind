import { MapPin, Ruler, Layers, Sprout, Droplets } from 'lucide-react'
import Card from '../ui/Card'

const fields = [
  { key: 'location', label: 'Location', icon: MapPin },
  { key: 'farm_size', label: 'Farm Size', icon: Ruler, format: (v) => `${v} acres` },
  { key: 'soil_type', label: 'Soil Type', icon: Layers },
  { key: 'current_crop', label: 'Current Crop', icon: Sprout },
  { key: 'water_availability', label: 'Water', icon: Droplets },
]

export default function FarmOverviewCard({ dashboard }) {
  if (!dashboard) return null

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-5 text-white">
        <p className="text-sm text-primary-200">Farm Overview</p>
        <h2 className="mt-1 text-2xl font-bold">{dashboard.name}</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
        {fields.map(({ key, label, icon: Icon, format }) => (
          <div key={key} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
              <Icon className="h-4 w-4 text-primary-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-semibold text-gray-800">
                {format ? format(dashboard[key]) : dashboard[key]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
