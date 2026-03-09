export default function TriggerBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-[12px] border border-seafoam-200 p-5 shadow-card">
        <p className="text-sm font-medium text-sage-700 mb-3">Trigger frequency (last 7 days)</p>
        <p className="text-sage-500 text-sm py-6 text-center">No triggers logged in the last 7 days</p>
      </div>
    )
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1)

  return (
    <div className="bg-white rounded-[12px] border border-seafoam-200 p-5 shadow-card">
      <p className="text-sm font-medium text-sage-700 mb-3">Top 5 triggers (last 7 days)</p>
      <div className="space-y-3">
        {data.map(({ name, count }) => (
          <div key={name} className="flex items-center gap-3">
            <span className="text-sm text-sage-700 w-24 flex-shrink-0 truncate" title={name}>
              {name}
            </span>
            <div className="flex-1 h-6 bg-seafoam-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all min-w-[4px]"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-sage-600 w-6 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
