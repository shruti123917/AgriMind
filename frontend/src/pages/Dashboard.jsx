import { User, Loader2 } from 'lucide-react'
import { useFarmer } from '../context/FarmerContext'
import FarmOverviewCard from '../components/dashboard/FarmOverviewCard'
import CropStatusSection from '../components/dashboard/CropStatusSection'
import AIInsightsGrid from '../components/dashboard/AIInsightsGrid'
import QuickActions from '../components/dashboard/QuickActions'
import EmptyState from '../components/ui/EmptyState'

export default function Dashboard() {
  const { dashboard, loading, error, hasProfile } = useFarmer()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!hasProfile) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <EmptyState
            icon={User}
            title="No farm profile yet"
            description="Create your farmer profile with crop and sowing details to unlock the crop lifecycle dashboard."
            actionLabel="Set Up Profile"
            actionTo="/profile"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Top row: Farm overview + Crop status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FarmOverviewCard dashboard={dashboard} />
        <CropStatusSection
          cropStatus={dashboard.crop_status}
          currentCrop={dashboard.current_crop}
        />
      </div>

      {/* AI Insights */}
      <AIInsightsGrid insights={dashboard.insights} />

      {/* Quick actions sidebar-style row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Lifecycle mini summary — real data from timeline */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Lifecycle Progress</h3>
            <div className="space-y-3">
              {dashboard.timeline.map((stage) => (
                <div
                  key={stage.stage}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                    stage.is_current
                      ? 'bg-primary-50 ring-1 ring-primary-200'
                      : stage.is_completed
                        ? 'text-gray-400 line-through'
                        : 'text-gray-600'
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      stage.is_current
                        ? 'bg-primary-500'
                        : stage.is_completed
                          ? 'bg-gray-300'
                          : 'bg-gray-200'
                    }`}
                  />
                  <span className="flex-1 font-medium">{stage.stage}</span>
                  {stage.is_current && (
                    <span className="text-xs font-semibold text-primary-600">Current</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <QuickActions />
      </div>
    </div>
  )
}
