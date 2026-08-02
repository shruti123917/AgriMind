import { Calendar, Loader2 } from 'lucide-react'
import { useFarmer } from '../context/FarmerContext'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function CropCalendar() {
  const { dashboard, loading, hasProfile } = useFarmer()

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!hasProfile) {
    return (
      <div className="mx-auto max-w-lg">
        <Card>
          <EmptyState
            icon={Calendar}
            title="No crop calendar yet"
            description="Set up your farmer profile with a sowing date to generate your crop lifecycle calendar."
            actionLabel="Create Profile"
            actionTo="/profile"
          />
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card
        title={`${dashboard.current_crop} — Growth Calendar`}
        subtitle={`Sown on ${formatDate(dashboard.sowing_date)} · ${dashboard.crop_status.days_since_sowing} days elapsed`}
      >
        <div className="relative space-y-0">
          {dashboard.timeline.map((stage, i) => (
            <div key={stage.stage} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Timeline line */}
              {i < dashboard.timeline.length - 1 && (
                <div className="absolute left-[11px] top-6 h-full w-0.5 bg-gray-200" />
              )}

              {/* Dot */}
              <div className={`relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full border-2 ${
                stage.is_current
                  ? 'border-primary-500 bg-primary-500'
                  : stage.is_completed
                    ? 'border-primary-300 bg-primary-100'
                    : 'border-gray-300 bg-white'
              }`} />

              {/* Content */}
              <div className={`flex-1 rounded-xl p-4 ${
                stage.is_current ? 'bg-primary-50 ring-1 ring-primary-200' : 'bg-gray-50'
              }`}>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-gray-800">{stage.stage}</h4>
                  {stage.is_current && <Badge label="Current" variant="primary" />}
                  {stage.is_completed && <Badge label="Completed" variant="low" />}
                </div>
                <p className="mt-1 text-sm text-gray-600">{stage.task}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {formatDate(stage.start_date)} — {formatDate(stage.end_date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
