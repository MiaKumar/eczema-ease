import { SymptomIcon } from './SymptomIcons'

const RATING_DEFINITION = '0 = None, 5 = Moderate, 10 = Severe'

export default function SeverityScale({ label, value, onChange, showDefinition = false, iconType }) {
  const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const num = value ?? null

  return (
    <div className="bg-white rounded-[12px] border border-seafoam-200 p-5 shadow-card transition-shadow duration-200">
      <p className="text-sm font-medium text-sage-700 mb-2 flex items-center gap-2">
        {iconType && (
          <span className="flex-shrink-0 flex items-center justify-center w-5 h-5">
            <SymptomIcon type={iconType} />
          </span>
        )}
        <span>{label}</span>
      </p>
      <div className="flex flex-wrap gap-1">
        {scale.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150 active:scale-95 ${
              num === n
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-seafoam-100 text-sage-600 hover:bg-seafoam-200 hover:text-primary-600'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      {showDefinition && (
        <p className="text-gray-500 mt-2" style={{ fontSize: '12px' }}>{RATING_DEFINITION}</p>
      )}
      {num !== null && (
        <p className="text-xs text-sage-500 mt-2">
          Selected: {num}/10
        </p>
      )}
    </div>
  )
}
