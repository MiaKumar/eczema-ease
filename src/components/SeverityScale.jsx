export default function SeverityScale({ label, value, onChange }) {
  const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const num = value ?? null

  return (
    <div className="bg-white rounded-xl border border-seafoam-200 p-4 shadow-sm">
      <p className="text-sm font-medium text-sage-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-1">
        {scale.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              num === n
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-seafoam-100 text-sage-600 hover:bg-seafoam-200 hover:text-primary-600'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      {num !== null && (
        <p className="text-xs text-sage-500 mt-2">
          Selected: {num}/10
        </p>
      )}
    </div>
  )
}
