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
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Sleep quality</p>
        <div className="flex flex-wrap gap-2">
          {SLEEP_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onSleep(value)}
              className={`flex flex-col items-center p-2 rounded-lg border-2 text-xs transition-colors ${
                sleep === value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary-300'
              }`}
              title={label}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Stress level</p>
        <div className="flex flex-wrap gap-2">
          {STRESS_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onStress(value)}
              className={`flex flex-col items-center p-2 rounded-lg border-2 text-xs transition-colors ${
                stress === value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary-300'
              }`}
              title={label}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Weather</p>
        <div className="flex flex-wrap gap-2">
          {WEATHER_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onWeather(value)}
              className={`flex flex-col items-center p-2 rounded-lg border-2 text-xs transition-colors ${
                weather === value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary-300'
              }`}
              title={label}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
