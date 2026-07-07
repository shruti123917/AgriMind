import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

// Map routes to page titles
const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Overview of your farm insights' },
  '/profile': { title: 'Farmer Profile', subtitle: 'Manage your farm details' },
  '/recommendation': { title: 'Crop Recommendation', subtitle: 'ML-powered crop suggestions' },
  '/yield': { title: 'Yield Prediction', subtitle: 'Estimate your crop production' },
  '/profit': { title: 'Profit Estimation', subtitle: 'Compare crop profitability' },
  '/risk': { title: 'Risk Analysis', subtitle: 'Assess farming risks' },
  '/simulator': { title: 'What-If Simulator', subtitle: 'Test different farming scenarios' },
  '/assistant': { title: 'AI Farming Assistant', subtitle: 'Ask farming questions' },
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const page = pageTitles[pathname] || { title: 'AgriMind AI', subtitle: '' }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile unless toggled */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="lg:ml-64">
        <Header
          title={page.title}
          subtitle={page.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
