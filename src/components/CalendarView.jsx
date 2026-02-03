import { useMemo } from 'react'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarView({ entries, currentMonth, onSelectDay }) {
  const { days, monthLabel } = useMemo(() => {
    const [y, m] = currentMonth.split('-').map(Number)
    const first = new Date(y, m - 1, 1)
    const last = new Date(y, m, 0)
    const startPad = first.getDay()
    const daysInMonth = last.getDate()
    const days = []
    for (let i = 0; i < startPad; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      days.push({ key, hasData: !!entries[key] })
    }
    const monthLabel = first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    return { days, monthLabel }
  }, [currentMonth, entries])

  const prevMonth = () => {
    const [y, m] = currentMonth.split('-').map(Number)
    const d = new Date(y, m - 2, 1)
    onSelectDay(null, `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  const nextMonth = () => {
    const [y, m] = currentMonth.split('-').map(Number)
    const d = new Date(y, m, 1)
    onSelectDay(null, `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <button type="button" onClick={prevMonth} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="font-medium text-slate-800">{monthLabel}</span>
        <button type="button" onClick={nextMonth} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 font-medium mb-2">
          {WEEKDAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((cell, i) =>
            cell === null ? (
              <div key={`empty-${i}`} />
            ) : (
              <button
                key={cell.key}
                type="button"
                onClick={() => onSelectDay(cell.key)}
                className={`aspect-square rounded-lg text-sm font-medium flex items-center justify-center ${
                  cell.hasData
                    ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cell.key.slice(-2).replace(/^0/, '')}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
