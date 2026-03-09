const SLEEP_OPTIONS = [
  { value: 1, label: 'Poor', icon: '😴' },
  { value: 2, label: 'Fair', icon: '😐' },
  { value: 3, label: 'OK', icon: '🙂' },
  { value: 4, label: 'Good', icon: '😊' },
  { value: 5, label: 'Great', icon: '🌟' },
]

const STRESS_OPTIONS = [
  { value: 1, label: 'Low', icon: '😌' },
  { value: 2, label: 'Mild', icon: '😐' },
  { value: 3, label: 'Moderate', icon: '😟' },
  { value: 4, label: 'High', icon: '😰' },
  { value: 5, label: 'Very high', icon: '😫' },
]

const WEATHER_OPTIONS = [
  { value: 'sunny', label: 'Sunny', icon: '☀️' },
  { value: 'cloudy', label: 'Cloudy', icon: '☁️' },
  { value: 'cold', label: 'Cold', icon: '🥶' },
  { value: 'humid', label: 'Humid', icon: '💧' },
  { value: 'dry', label: 'Dry', icon: '🏜️' },
  { value: 'windy', label: 'Windy', icon: '💨' },
]

export default function QuickLogIcons({ sleep, stress, weather, onSleep, onStress, onWeather }) {
  const btnBase = 'flex flex-col items-center justify-center min-w-[40px] min-h-[40px] w-10 h-10 rounded-lg border-2 text-xs transition-all duration-200 active:scale-95'
  return (
    <div className="bg-white rounded-[12px] border border-seafoam-200 p-5 shadow-card space-y-4">
      <div>
        <p className="text-sm font-medium text-sage-700 mb-2">Sleep quality</p>
        <div className="flex flex-wrap gap-2">
          {SLEEP_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onSleep(value)}
              className={`${btnBase} ${
                sleep === value
                  ? 'border-primary-500 bg-seafoam-100 text-primary-700 shadow-sm'
                  : 'border-seafoam-200 bg-seafoam-50 text-sage-600 hover:border-primary-300 hover:bg-seafoam-100'
              }`}
              title={label}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className="mt-0.5">{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-sage-700 mb-2">Stress level</p>
        <div className="flex flex-wrap gap-2">
          {STRESS_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onStress(value)}
              className={`${btnBase} ${
                stress === value
                  ? 'border-primary-500 bg-seafoam-100 text-primary-700 shadow-sm'
                  : 'border-seafoam-200 bg-seafoam-50 text-sage-600 hover:border-primary-300 hover:bg-seafoam-100'
              }`}
              title={label}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className="mt-0.5">{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-sage-700 mb-2">Weather</p>
        <div className="flex flex-wrap gap-2">
          {WEATHER_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onWeather(value)}
              className={`${btnBase} ${
                weather === value
                  ? 'border-primary-500 bg-seafoam-100 text-primary-700 shadow-sm'
                  : 'border-seafoam-200 bg-seafoam-50 text-sage-600 hover:border-primary-300 hover:bg-seafoam-100'
              }`}
              title={label}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className="mt-0.5">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
