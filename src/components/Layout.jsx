import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/triggers', label: 'Triggers', icon: '📋' },
  { to: '/history', label: 'History', icon: '📅' },
  { to: '/insights', label: 'Insights', icon: '📊' },
  { to: '/photos', label: 'Photos', icon: '📷' },
]

export default function Layout() {
  return (
    <div className="relative h-screen h-screen-mobile bg-slate-50 overflow-hidden">
      <header className="h-14 flex-shrink-0 z-10 bg-white border-b border-slate-200 shadow-sm flex items-center">
        <div className="px-4">
          <h1 className="text-xl font-semibold text-primary-600">EczemaEase</h1>
          <p className="text-xs text-slate-500">Symptom Tracker</p>
        </div>
      </header>

      <main
        className="absolute left-0 right-0 top-14 bottom-20 overflow-y-auto overflow-x-hidden px-4 pt-4 pb-12 max-w-lg mx-auto w-full scroll-content"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200 safe-bottom z-20 flex items-center">
        <div className="flex justify-around py-2">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-slate-500 hover:text-primary-500'
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
