import { NavLink, Outlet } from 'react-router-dom'
import {
  HomeIcon,
  TriggersIcon,
  HistoryIcon,
  InsightsIcon,
  PhotosIcon,
  SettingsIcon,
} from './NavIcons'

const navItems = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/triggers', label: 'Triggers', Icon: TriggersIcon },
  { to: '/history', label: 'History', Icon: HistoryIcon },
  { to: '/insights', label: 'Insights', Icon: InsightsIcon },
  { to: '/photos', label: 'Photos', Icon: PhotosIcon },
  { to: '/settings', label: 'Settings', Icon: SettingsIcon },
]

export default function Layout() {
  return (
    <div className="relative h-screen h-screen-mobile bg-seafoam-50 overflow-hidden">
      <header className="h-14 flex-shrink-0 z-10 bg-white border-b border-seafoam-200 shadow-sm flex items-center">
        <div className="px-4">
          <h1 className="text-xl font-semibold text-primary-600">EczemaEase</h1>
          <p className="text-xs text-sage-600">Symptom Tracker</p>
        </div>
      </header>

      <main
        className="absolute left-0 right-0 top-14 bottom-16 overflow-y-auto overflow-x-hidden px-4 pt-6 pb-12 max-w-lg mx-auto w-full scroll-content animate-fadeIn"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-seafoam-200 safe-bottom z-20 flex items-center">
        <div className="flex justify-around items-center w-full h-full py-3">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 px-2 py-3 rounded-full min-w-[48px] transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-seafoam-100'
                    : 'text-gray-500 hover:text-sage-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center justify-center w-6 h-6">
                    <Icon filled={isActive} className="w-6 h-6" />
                  </span>
                  <span className="text-[11px] font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
