import { Link } from 'react-router-dom'
import { Sprout, Calendar, Bug, ShieldAlert, FlaskConical, Bot } from 'lucide-react'
import Card from '../ui/Card'

const actions = [
  { to: '/recommendation', label: 'Crop Recommendation', icon: Sprout, color: 'bg-primary-500' },
  { to: '/calendar', label: 'Crop Calendar', icon: Calendar, color: 'bg-blue-500' },
  { to: '/disease', label: 'Disease Detection', icon: Bug, color: 'bg-red-500' },
  { to: '/simulator', label: 'What-If Simulator', icon: FlaskConical, color: 'bg-purple-500' },
  { to: '/assistant', label: 'AI Assistant', icon: Bot, color: 'bg-amber-500' },
]

export default function QuickActions() {
  return (
    <Card title="Quick Actions">
      <div className="space-y-2">
        {actions.map(({ to, label, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition-colors hover:bg-gray-50"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color} text-white`}>
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </Link>
        ))}
      </div>
    </Card>
  )
}
