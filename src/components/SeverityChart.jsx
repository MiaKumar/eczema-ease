import { useMemo } from 'react'

export default function SeverityChart({ entries, limit = 14, timeframeLabel = '' }) {
  const data = useMemo(() => {
    const keys = Object.keys(entries).sort().slice(-limit)
    return keys.map((key) => {
      const e = entries[key]
      const itch = e?.itch ?? null
      const pain = e?.pain ?? null
      const label = key.slice(5) // MM-DD
      return { key, label, itch, pain }
    }).filter((d) => d.itch != null || d.pain != null)
  }, [entries, limit])

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border-2 border-seafoam-200 p-6 shadow-sm text-center text-sage-500 text-sm">
        Log itch or pain on the Home screen to see trends here.
      </div>
    )
  }

  const maxVal = 10
  const chartHeight = 120

  return (
    <div className="bg-white rounded-xl border-2 border-seafoam-200 p-4 shadow-sm">
      <p className="text-sm font-medium text-sage-700 mb-3">
        Severity trend{timeframeLabel ? ` (${timeframeLabel})` : ` (last ${limit} days)`}
      </p>
      <div className="flex items-end gap-1 h-[140px] overflow-x-auto pb-8">
        {data.map(({ key, label, itch, pain }) => {
          const itchH = itch != null ? (itch / maxVal) * chartHeight : 0
          const painH = pain != null ? (pain / maxVal) * chartHeight : 0
          return (
            <div key={key} className="flex flex-col items-center flex-shrink-0 min-w-[28px]">
              <div className="flex gap-0.5 items-end h-[120px]">
                {itch != null && (
                  <div
                    className="w-3 rounded-t bg-primary-500"
                    style={{ height: Math.max(4, itchH) }}
                    title={`Itch: ${itch}`}
                  />
                )}
                {pain != null && (
                  <div
                    className="w-3 rounded-t bg-primary-300"
                    style={{ height: Math.max(4, painH) }}
                    title={`Pain: ${pain}`}
                  />
                )}
              </div>
              <span className="text-[10px] text-sage-500 mt-1">{label}</span>
            </div>
          )
        })}
      </div>
      <div className="flex gap-4 text-xs text-sage-500 mt-2">
        <span><span className="inline-block w-3 h-3 rounded bg-primary-500 mr-1" /> Itch</span>
        <span><span className="inline-block w-3 h-3 rounded bg-primary-300 mr-1" /> Pain</span>
      </div>
    </div>
  )
}
