import { Calendar, ArrowRight } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

export default function CropStatusSection({ cropStatus, currentCrop }) {
  if (!cropStatus) return null

  const { current_stage, days_since_sowing, next_task, days_until_task } = cropStatus

  return (
    <Card title="Crop Status" subtitle={`Tracking ${currentCrop} lifecycle`}>
      <div className="space-y-5">
        {/* Stage indicator */}
        <div className="flex items-center gap-4 rounded-xl bg-primary-50 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
              Current Stage
            </p>
            <p className="text-lg font-bold text-gray-900">{current_stage}</p>
          </div>
          <Badge label={`Day ${days_since_sowing}`} variant="primary" />
        </div>

        {/* Days since sowing progress bar (visual, capped at 120 days) */}
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-gray-500">
            <span>Days since sowing</span>
            <span>{days_since_sowing} days</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-primary-500 transition-all"
              style={{ width: `${Math.min((days_since_sowing / 120) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Next task */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-xs font-medium text-amber-700">Upcoming Activity</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {next_task}
              {days_until_task > 0 && (
                <span className="font-normal text-gray-500">
                  {' '}— in {days_until_task} day{days_until_task !== 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
