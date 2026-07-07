import { Link } from 'react-router-dom'
import {
  Sprout,
  BarChart3,
  IndianRupee,
  ShieldAlert,
  FlaskConical,
  Bot,
  User,
  TrendingUp,
  CloudRain,
  Thermometer,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import Card from '../components/ui/Card'

// Demo data for dashboard charts (will be replaced with real API data later)
const yieldData = [
  { crop: 'Rice', yield: 42 },
  { crop: 'Wheat', yield: 35 },
  { crop: 'Maize', yield: 28 },
  { crop: 'Cotton', yield: 18 },
  { crop: 'Sugarcane', yield: 55 },
]

const quickLinks = [
  { to: '/profile', label: 'Set Up Profile', icon: User, color: 'bg-blue-500' },
  { to: '/recommendation', label: 'Get Crop Advice', icon: Sprout, color: 'bg-primary-500' },
  { to: '/simulator', label: 'Run Simulation', icon: FlaskConical, color: 'bg-purple-500' },
  { to: '/assistant', label: 'Ask AI', icon: Bot, color: 'bg-amber-500' },
]

const stats = [
  { label: 'Recommended Crop', value: '—', icon: Sprout, color: 'text-primary-600 bg-primary-50' },
  { label: 'Est. Yield', value: '—', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
  { label: 'Est. Profit', value: '—', icon: IndianRupee, color: 'text-amber-600 bg-amber-50' },
  { label: 'Risk Level', value: '—', icon: ShieldAlert, color: 'text-red-600 bg-red-50' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Welcome to AgriMind AI</h2>
        <p className="mt-2 max-w-2xl text-primary-100">
          Your intelligent farming companion. Set up your farmer profile, get ML-powered
          crop recommendations, predict yields, and simulate what-if scenarios.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Yield comparison chart */}
        <Card title="Sample Yield Comparison (quintals/acre)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={yieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="crop" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="yield" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-xs text-gray-400">
            * Demo data — will update after ML models are connected
          </p>
        </Card>

        {/* Quick actions */}
        <Card title="Quick Actions">
          <div className="space-y-3">
            {quickLinks.map(({ to, label, icon: Icon, color }) => (
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
      </div>

      {/* Weather summary placeholder */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="flex items-center gap-3">
            <Thermometer className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-lg font-semibold">28°C</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <CloudRain className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Rainfall</p>
              <p className="text-lg font-semibold">120 mm</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary-500" />
            <div>
              <p className="text-sm text-gray-500">Soil pH</p>
              <p className="text-lg font-semibold">6.5</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
