import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  Sprout,
  BarChart3,
  IndianRupee,
  ShieldAlert,
  FlaskConical,
  Bot,
  Leaf,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Farmer Profile', icon: User },
  { to: '/recommendation', label: 'Crop Recommendation', icon: Sprout },
  { to: '/yield', label: 'Yield Prediction', icon: BarChart3 },
  { to: '/profit', label: 'Profit Estimation', icon: IndianRupee },
  { to: '/risk', label: 'Risk Analysis', icon: ShieldAlert },
  { to: '/simulator', label: 'What-If Simulator', icon: FlaskConical },
  { to: '/assistant', label: 'AI Assistant', icon: Bot },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-primary-900 text-white shadow-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-primary-700 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500">
          <Leaf className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">AgriMind AI</h1>
          <p className="text-xs text-primary-300">Smart Farming Assistant</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-primary-700 px-6 py-4">
        <p className="text-xs text-primary-400">Final Year Project</p>
        <p className="text-xs text-primary-500">Computer Engineering</p>
      </div>
    </aside>
  )
}
