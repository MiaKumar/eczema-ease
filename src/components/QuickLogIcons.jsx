import { Moon, Brain, CloudSun } from 'lucide-react'

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
    <div className="bg-white rounded-card border-2 border-seafoam-200 p-5 shadow-soft space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Moon className="w-5 h-5 text-primary-500" strokeWidth={1.5} />
          <p className="text-sm font-medium text-sage-700">Sleep quality</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SLEEP_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onSleep(value)}
              className={`flex flex-col items-center p-2 rounded-lg border-2 text-xs transition-colors ${
                sleep === value
                  ? 'border-primary-500 bg-seafoam-100 text-primary-700'
                  : 'border-seafoam-200 bg-seafoam-50 text-sage-600 hover:border-primary-300'
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
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-primary-500" strokeWidth={1.5} />
          <p className="text-sm font-medium text-sage-700">Stress level</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {STRESS_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onStress(value)}
              className={`flex flex-col items-center p-2 rounded-lg border-2 text-xs transition-colors ${
                stress === value
                  ? 'border-primary-500 bg-seafoam-100 text-primary-700'
                  : 'border-seafoam-200 bg-seafoam-50 text-sage-600 hover:border-primary-300'
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
        <div className="flex items-center gap-2 mb-2">
          <CloudSun className="w-5 h-5 text-primary-500" strokeWidth={1.5} />
          <p className="text-sm font-medium text-sage-700">Weather</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {WEATHER_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onWeather(value)}
              className={`flex flex-col items-center p-2 rounded-lg border-2 text-xs transition-colors ${
                weather === value
                  ? 'border-primary-500 bg-seafoam-100 text-primary-700'
                  : 'border-seafoam-200 bg-seafoam-50 text-sage-600 hover:border-primary-300'
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
