import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  Sprout,
  Calendar,
  Bug,
  ShieldAlert,
  FlaskConical,
  Bot,
  Leaf,
  BarChart3,
} from 'lucide-react'
import { History } from "lucide-react";


const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Farmer Profile', icon: User },
  { to: '/recommendation', label: 'Crop Recommendation', icon: Sprout },

  { to: '/yield-prediction', label: 'Yield Prediction', icon: BarChart3 },

  { to: '/calendar', label: 'Crop Calendar', icon: Calendar },
  { to: '/risk', label: 'Risk Analysis', icon: ShieldAlert },
  { to: '/assistant', label: 'AI Assistant', icon: Bot },
  { to: "/disease-detection", label: "Disease Detection",icon: Bug,},
  {to: "/history",label: "Prediction History",icon: History,
},
]
export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-primary-900 text-white shadow-xl">
      <div className="flex items-center gap-3 border-b border-primary-700 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500">
          <Leaf className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">AgriMind AI</h1>
          <p className="text-xs text-primary-300">Crop Lifecycle Assistant</p>
        </div>
      </div>

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

      <div className="border-t border-primary-700 px-6 py-4">
        <p className="text-xs text-primary-400">Final Year Project</p>
        <p className="text-xs text-primary-500">Computer Engineering</p>
      </div>
    </aside>
  )
}
