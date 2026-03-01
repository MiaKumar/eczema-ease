import { Flame } from 'lucide-react'

const FLARE_OPTIONS = [
  { value: 'none', label: 'None', color: 'bg-seafoam-100 text-sage-700 border-seafoam-300' },
  { value: 'mild', label: 'Mild', color: 'bg-amber-50 text-amber-700 border-amber-300' },
  { value: 'moderate', label: 'Moderate', color: 'bg-orange-50 text-orange-700 border-orange-300' },
  { value: 'severe', label: 'Severe', color: 'bg-red-50 text-red-700 border-red-300' },
]

export default function FlareSeveritySelector({ value, onChange }) {
  return (
    <div className="bg-white rounded-card border-2 border-seafoam-200 p-5 shadow-soft">
      <p className="text-sm font-semibold text-sage-800 mb-3">Overall Flare Severity</p>
      <div className="grid grid-cols-2 gap-3">
        {FLARE_OPTIONS.map(({ value: optValue, label, color }) => (
          <button
            key={optValue}
            type="button"
            onClick={() => onChange(optValue)}
            className={`min-h-touch py-4 px-3 rounded-button border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] ${
              value === optValue
                ? `${color} border-opacity-100 shadow-soft`
                : 'bg-seafoam-50 text-sage-600 border-seafoam-200 border-opacity-50 hover:border-opacity-100'
            }`}
          >
            <Flame className="w-5 h-5" strokeWidth={value === optValue ? 2.5 : 1.5} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
