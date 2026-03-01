import { NavLink, Link, Outlet } from 'react-router-dom'
import { Home, Tag, Calendar, Camera, TrendingUp, Settings } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/triggers', label: 'Triggers', Icon: Tag },
  { to: '/history', label: 'History', Icon: Calendar },
  { to: '/insights', label: 'Insights', Icon: TrendingUp },
  { to: '/photos', label: 'Photos', Icon: Camera },
]

export default function Layout() {
  return (
    <div className="relative h-screen h-screen-mobile bg-seafoam-50 overflow-hidden">
      <header className="h-14 flex-shrink-0 z-10 bg-white border-b border-seafoam-200 shadow-soft flex items-center justify-between px-4">
        <div>
          <h1 className="text-xl font-bold text-sage-800 tracking-tight">EczemaEase</h1>
          <p className="text-xs text-sage-600">Symptom Tracker</p>
        </div>
        <Link
          to="/settings"
          className="p-2 rounded-button text-sage-600 hover:bg-seafoam-100 hover:text-primary-600 transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" strokeWidth={1.5} />
        </Link>
      </header>

      <main
        className="absolute left-0 right-0 top-14 bottom-20 overflow-y-auto overflow-x-hidden px-4 pt-4 pb-12 max-w-lg mx-auto w-full scroll-content"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-seafoam-200 safe-bottom z-20 flex items-center">
        <div className="flex justify-around w-full py-2">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-2 rounded-button text-[10px] font-medium transition-colors duration-150 min-w-[44px] min-h-[44px] justify-center ${
                  isActive
                    ? 'text-primary-600 bg-seafoam-100'
                    : 'text-sage-600 hover:text-primary-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 1.5} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
