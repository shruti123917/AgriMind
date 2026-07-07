import { Menu } from 'lucide-react'

export default function Header({ title, subtitle, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 sm:flex">
        <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
        <span className="text-xs font-medium text-primary-700">System Online</span>
      </div>
    </header>
  )
}
