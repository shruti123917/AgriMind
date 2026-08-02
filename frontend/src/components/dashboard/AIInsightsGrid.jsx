import {
  HeartPulse,
  CloudRain,
  Bug,
  TrendingUp,
  IndianRupee,
} from 'lucide-react'
import InsightCard from '../ui/InsightCard'
import Card from '../ui/Card'

export default function AIInsightsGrid({ insights }) {
  const items = [
    {
      icon: HeartPulse,
      label: 'Crop Health Score',
      value: insights?.crop_health_score != null ? `${insights.crop_health_score}%` : null,
      hint: insights?.crop_health_score == null ? 'Requires sensor / ML data' : null,
      variant: 'green',
      linkTo: '/disease',
    },
    {
      icon: CloudRain,
      label: 'Weather Risk',
      value: insights?.weather_risk,
      hint: insights?.weather_risk ? 'Based on water availability' : null,
      variant: insights?.weather_risk === 'High' ? 'red' : insights?.weather_risk === 'Medium' ? 'amber' : 'blue',
      linkTo: '/risk',
    },
    {
      icon: Bug,
      label: 'Disease Risk',
      value: insights?.disease_risk,
      hint: insights?.disease_risk == null ? 'Use Disease Detection module' : null,
      variant: 'red',
      linkTo: '/disease',
    },
    {
      icon: TrendingUp,
      label: 'Expected Yield',
      value: insights?.expected_yield,
      hint: insights?.expected_yield == null ? 'Run Yield Prediction' : null,
      variant: 'blue',
      linkTo: '/recommendation',
    },
    {
      icon: IndianRupee,
      label: 'Estimated Profit',
      value: insights?.estimated_profit,
      hint: insights?.estimated_profit == null ? 'Available after yield estimate' : null,
      variant: 'purple',
      linkTo: '/simulator',
    },
  ]

  return (
    <Card title="AI Insights" subtitle="Smart metrics for your farm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <InsightCard key={item.label} {...item} />
        ))}
      </div>
    </Card>
  )
}
