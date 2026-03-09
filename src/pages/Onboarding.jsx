import { useState } from 'react'
import { saveUserProfile, setOnboardingComplete } from '../data/storage'

const TOTAL_STEPS = 6

const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary', 'Prefer not to say']

const YEARS = Array.from({ length: 2024 - 1940 + 1 }, (_, i) => 1940 + i).reverse()

const ETHNICITY_OPTIONS = [
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

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    gender: '',
    yearBorn: null,
    ethnicity: '',
    zipCode: '',
  })

  const updateProfile = (updates) => setProfile((p) => ({ ...p, ...updates }))

  const handleNext = () => {
    if (step === TOTAL_STEPS) {
      saveUserProfile({
        ...profile,
        completedAt: new Date().toISOString(),
      })
      setOnboardingComplete()
      onComplete()
      return
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const canProceed = () => {
    if (step === 2) return !!profile.gender
    if (step === 3) return profile.yearBorn != null
    return true
  }

  return (
    <div className="min-h-screen bg-seafoam-50 flex flex-col px-4 pt-8 pb-12">
      {/* Progress */}
      <div className="mb-6">
        <p className="text-xs font-medium text-sage-600 mb-2">
          Step {step} of {TOTAL_STEPS}
        </p>
        <div className="h-1.5 bg-seafoam-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div
          key={step}
          className="flex-1 flex flex-col justify-center animate-fadeIn bg-white rounded-[12px] border border-seafoam-200 p-6 shadow-card"
        >
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-seafoam-100 flex items-center justify-center">
                  <span className="text-4xl" aria-hidden="true">🌿</span>
                </div>
                <h1 className="text-2xl font-semibold text-sage-800 mb-2">Welcome to EczemaEase</h1>
                <p className="text-sage-600 text-base">
                  Track your eczema symptoms and discover your triggers.
                </p>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3.5 rounded-lg bg-primary-500 text-white font-medium text-base hover:bg-primary-600 active:scale-[0.98] transition-all duration-200"
              >
                Get Started
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-sage-800 mb-1">What is your gender?</h2>
              <p className="text-sm text-sage-600 mb-4">This helps us personalize your experience.</p>
              <div className="space-y-2 mb-6">
                {GENDER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateProfile({ gender: opt })}
                    className={`w-full py-3 px-4 rounded-lg border-2 text-left text-sm font-medium transition-all duration-200 ${
                      profile.gender === opt
                        ? 'border-primary-500 bg-seafoam-50 text-primary-700'
                        : 'border-seafoam-200 bg-seafoam-50/50 text-sage-700 hover:border-seafoam-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg border-2 border-seafoam-200 text-sage-700 font-medium text-sm hover:bg-seafoam-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 py-3 rounded-lg bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] transition-all"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold text-sage-800 mb-1">What year were you born?</h2>
              <p className="text-sm text-sage-600 mb-4">We use this for research insights.</p>
              <select
                value={profile.yearBorn ?? ''}
                onChange={(e) => updateProfile({ yearBorn: e.target.value ? parseInt(e.target.value, 10) : null })}
                className="w-full py-3 px-4 rounded-lg border-2 border-seafoam-200 bg-white text-sage-800 text-sm font-medium mb-6 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none"
              >
                <option value="">Select year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg border-2 border-seafoam-200 text-sage-700 font-medium text-sm hover:bg-seafoam-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 py-3 rounded-lg bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] transition-all"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-lg font-semibold text-sage-800 mb-1">What is your ethnicity?</h2>
              <p className="text-sm text-sage-600 mb-4">Optional — helps with research.</p>
              <select
                value={profile.ethnicity}
                onChange={(e) => updateProfile({ ethnicity: e.target.value })}
                className="w-full py-3 px-4 rounded-lg border-2 border-seafoam-200 bg-white text-sage-800 text-sm font-medium mb-6 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none"
              >
                <option value="">Select (optional)</option>
                {ETHNICITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg border-2 border-seafoam-200 text-sage-700 font-medium text-sm hover:bg-seafoam-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-lg bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 active:scale-[0.98] transition-all"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-lg font-semibold text-sage-800 mb-1">What is your zip code?</h2>
              <p className="text-sm text-sage-600 mb-4">Optional — used for local climate insights.</p>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                placeholder="12345"
                value={profile.zipCode}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 5)
                  updateProfile({ zipCode: v })
                }}
                className="w-full py-3 px-4 rounded-lg border-2 border-seafoam-200 bg-white text-sage-800 text-sm font-medium mb-6 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg border-2 border-seafoam-200 text-sage-700 font-medium text-sm hover:bg-seafoam-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-lg bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 active:scale-[0.98] transition-all"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-seafoam-100 flex items-center justify-center">
                  <span className="text-3xl" aria-hidden="true">✨</span>
                </div>
                <h2 className="text-xl font-semibold text-sage-800 mb-2">You&apos;re all set!</h2>
                <p className="text-sage-600 text-base">
                  Start tracking your eczema journey and learn what works for you.
                </p>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3.5 rounded-lg bg-primary-500 text-white font-medium text-base hover:bg-primary-600 active:scale-[0.98] transition-all duration-200"
              >
                Begin
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
