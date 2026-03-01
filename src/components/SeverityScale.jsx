export default function SeverityScale({ label, value, onChange, icon: Icon }) {
  const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const num = value ?? null

  return (
    <div className="bg-white rounded-card border-2 border-seafoam-200 p-4 shadow-soft">
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className="w-5 h-5 text-primary-500 flex-shrink-0" strokeWidth={1.5} />}
        <p className="text-sm font-medium text-sage-700">{label}</p>
      </div>
      <div className="flex flex-wrap gap-1">
        {scale.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`min-w-[36px] min-h-touch rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.98] ${
              num === n
                ? 'bg-primary-500 text-white shadow-soft'
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
