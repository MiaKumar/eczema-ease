const CHART_HEIGHT = 100
const MAX_VAL = 10

export default function InsightsLineChart({ data, valueKey, label }) {
  const values = data.map((d) => d[valueKey] ?? null).filter((v) => v != null)
  const hasData = values.length > 0
  const max = Math.max(MAX_VAL, ...values)
  const min = 0

  const scaleY = (v) => CHART_HEIGHT - ((v - min) / (max - min)) * CHART_HEIGHT

  const points = data
    .map((d, i) => {
      const v = d[valueKey]
      if (v == null) return null
      const x = (i / (data.length - 1 || 1)) * 100
      const y = scaleY(v)
      return `${x},${y}`
    })
    .filter(Boolean)
    .join(' ')

  if (!hasData) {
    return (
      <div className="bg-white rounded-[12px] border border-seafoam-200 p-5 shadow-card">
        <p className="text-sm font-medium text-sage-700 mb-2">{label}</p>
        <p className="text-sage-500 text-sm py-6 text-center">No data for this period</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[12px] border border-seafoam-200 p-5 shadow-card">
      <p className="text-sm font-medium text-sage-700 mb-3">{label}</p>
      <div className="relative w-full" style={{ height: CHART_HEIGHT + 24 }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-[100px] text-primary-500">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
          {data.map((d, i) => {
            const v = d[valueKey]
            if (v == null) return null
            const x = (i / (data.length - 1 || 1)) * 100
            const y = scaleY(v)
            return (
              <circle
                key={d.date}
                cx={x}
                cy={y}
                r="3"
                fill="currentColor"
              />
            )
          })}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-sage-500">
          {data.map((d) => (
            <span key={d.date} className="flex-1 text-center truncate min-w-0" title={d.label}>
              {d.label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-sage-400 mt-1">
        <span>0</span>
        <span>10</span>
      </div>
    </div>
  )
}
