import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Your farm at a glance' },
  '/profile': { title: 'Farmer Profile', subtitle: 'Manage farm and crop details' },
  '/recommendation': { title: 'Crop Recommendation', subtitle: 'ML-powered crop suggestions' },
  '/calendar': { title: 'Crop Calendar', subtitle: 'Lifecycle stages and tasks' },
  '/disease': { title: 'Disease Detection', subtitle: 'Identify crop diseases' },
  '/risk': { title: 'Risk Analysis', subtitle: 'Assess farming risks' },
  '/simulator': { title: 'What-If Simulator', subtitle: 'Test farming scenarios' },
  '/assistant': { title: 'AI Assistant', subtitle: 'Ask farming questions' },
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const page = pageTitles[pathname] || { title: 'AgriMind AI', subtitle: '' }

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

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
