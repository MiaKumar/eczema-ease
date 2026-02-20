const FLARE_OPTIONS = [
  { value: 'none', label: 'None', color: 'bg-seafoam-100 text-sage-700 border-seafoam-300' },
  { value: 'mild', label: 'Mild', color: 'bg-yellow-50 text-yellow-700 border-yellow-300' },
  { value: 'moderate', label: 'Moderate', color: 'bg-orange-50 text-orange-700 border-orange-300' },
  { value: 'severe', label: 'Severe', color: 'bg-red-50 text-red-700 border-red-300' },
]

export default function FlareSeveritySelector({ value, onChange }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-seafoam-200 p-4 shadow-sm">
      <p className="text-sm font-semibold text-sage-800 mb-3">Overall Flare Severity</p>
      <div className="grid grid-cols-2 gap-3">
        {FLARE_OPTIONS.map(({ value: optValue, label, color }) => (
          <button
            key={optValue}
            type="button"
            onClick={() => onChange(optValue)}
            className={`py-4 px-3 rounded-xl border-2 font-medium text-sm transition-all ${
              value === optValue
                ? `${color} border-opacity-100 scale-105 shadow-md`
                : 'bg-seafoam-50 text-sage-600 border-seafoam-200 border-opacity-50 hover:border-opacity-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
