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
      icon: CloudRain,
      label: 'Weather Risk',
      value: insights?.weather_risk,
      hint: insights?.weather_risk ? 'Based on water availability' : null,
      variant: insights?.weather_risk === 'High' ? 'red' : insights?.weather_risk === 'Medium' ? 'amber' : 'blue',
      linkTo: '/risk',
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
