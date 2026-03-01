import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, User, Calendar, Globe, MapPin, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'
import { saveSetupProfile, setCompletedSetup } from '../data/setupStorage'

const STEPS = [
  { id: 1, title: 'Welcome', icon: Sparkles },
  { id: 2, title: 'Gender', icon: User },
  { id: 3, title: 'Year born', icon: Calendar },
  { id: 4, title: 'Ethnicity', icon: Globe },
  { id: 5, title: 'Location', icon: MapPin },
]

const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say']
const YEARS = Array.from({ length: 2024 - 1940 + 1 }, (_, i) => 2024 - i)
const ETHNICITIES = [
  'Asian',
  'Black/African American',
  'Hispanic/Latino',
  'White/Caucasian',
  'Native American',
  'Pacific Islander',
  'Mixed',
  'Other',
  'Prefer not to say',
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('eczemaease_setup')
      return raw ? { ...JSON.parse(raw) } : { gender: '', yearBorn: '', ethnicity: '', zipCode: '' }
    } catch {
      return { gender: '', yearBorn: '', ethnicity: '', zipCode: '' }
    }
  })

  const updateProfile = (key, value) => setProfile((p) => ({ ...p, [key]: value }))

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      saveSetupProfile(profile)
      setCompletedSetup(true)
      navigate('/', { replace: true })
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    if (step === 1) return true
    if (step === 2) return !!profile.gender
    if (step === 3) return !!profile.yearBorn
    if (step === 4) return !!profile.ethnicity
    if (step === 5) return /^\d{5}$/.test(profile.zipCode)
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-seafoam-50 to-seafoam-100 flex flex-col safe-bottom">
      {/* Progress */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-sage-600">Step {step} of 5</span>
        </div>
        <div className="h-1.5 bg-seafoam-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pb-8">
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-primary-500" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-sage-800 tracking-tight mb-2">EczemaEase</h1>
            <p className="text-base text-sage-600 max-w-xs">Your personal eczema symptom tracker. Understand your patterns, feel more in control.</p>
          </div>
        )}

        {/* Step 2: Gender */}
        {step === 2 && (
          <div className="flex-1 flex flex-col pt-8 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-6">
              <User className="w-7 h-7 text-primary-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-sage-800 mb-1">What's your gender?</h2>
            <p className="text-sm text-sage-600 mb-6">This helps us personalize your experience.</p>
            <select
              value={profile.gender}
              onChange={(e) => updateProfile('gender', e.target.value)}
              className="w-full h-12 rounded-xl border-2 border-seafoam-200 bg-white px-4 text-base text-sage-800 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-shadow"
            >
              <option value="">Select...</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        )}

        {/* Step 3: Year born */}
        {step === 3 && (
          <div className="flex-1 flex flex-col pt-8 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-6">
              <Calendar className="w-7 h-7 text-primary-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-sage-800 mb-1">What year were you born?</h2>
            <p className="text-sm text-sage-600 mb-6">We use this for relevant insights.</p>
            <select
              value={profile.yearBorn}
              onChange={(e) => updateProfile('yearBorn', e.target.value)}
              className="w-full h-12 rounded-xl border-2 border-seafoam-200 bg-white px-4 text-base text-sage-800 focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            >
              <option value="">Select year...</option>
              {YEARS.map((y) => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
          </div>
        )}

        {/* Step 4: Ethnicity */}
        {step === 4 && (
          <div className="flex-1 flex flex-col pt-8 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-6">
              <Globe className="w-7 h-7 text-primary-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-sage-800 mb-1">Ethnicity</h2>
            <p className="text-sm text-sage-600 mb-6">Optional. Helps with research and personalization.</p>
            <select
              value={profile.ethnicity}
              onChange={(e) => updateProfile('ethnicity', e.target.value)}
              className="w-full h-12 rounded-xl border-2 border-seafoam-200 bg-white px-4 text-base text-sage-800 focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            >
              <option value="">Select...</option>
              {ETHNICITIES.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
        )}

        {/* Step 5: Zip code */}
        {step === 5 && (
          <div className="flex-1 flex flex-col pt-8 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-6">
              <MapPin className="w-7 h-7 text-primary-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-sage-800 mb-1">ZIP code</h2>
            <p className="text-sm text-sage-600 mb-6">5 digits. Used for local insights and weather.</p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="12345"
              value={profile.zipCode}
              onChange={(e) => updateProfile('zipCode', e.target.value.replace(/\D/g, ''))}
              className="w-full h-12 rounded-xl border-2 border-seafoam-200 bg-white px-4 text-base text-sage-800 focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto flex gap-3 pt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 min-h-[48px] flex items-center justify-center gap-2 rounded-xl border-2 border-seafoam-300 text-sage-700 font-medium text-base active:scale-[0.98] transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-primary-500 text-white font-medium text-base shadow-soft hover:bg-primary-600 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] transition-all"
          >
            {step === 5 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
