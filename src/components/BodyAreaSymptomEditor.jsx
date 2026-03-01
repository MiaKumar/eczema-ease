import { useState } from 'react'
import { Palette, Droplets, Sparkles, Bandage, Check, X } from 'lucide-react'
import SeverityScale from './SeverityScale'

const AREA_LABELS = {
  'front-head': 'Head (Front)',
  'back-head': 'Head (Back)',
  'front-eyes': 'Eyes',
  'front-neck': 'Neck (Front)',
  'back-neck': 'Neck (Back)',
  'front-left-arm': 'Left Arm (Front)',
  'front-right-arm': 'Right Arm (Front)',
  'back-left-arm': 'Left Arm (Back)',
  'back-right-arm': 'Right Arm (Back)',
  'front-chest': 'Chest',
  'front-torso': 'Torso (Front)',
  'back-upper': 'Upper Back',
  'back-lower': 'Lower Back',
  'front-left-leg': 'Left Leg (Front)',
  'front-right-leg': 'Right Leg (Front)',
  'back-left-leg': 'Left Leg (Back)',
  'back-right-leg': 'Right Leg (Back)',
}

export default function BodyAreaSymptomEditor({ area, symptoms, onSave, onCancel }) {
  const [localSymptoms, setLocalSymptoms] = useState(() => {
    const s = symptoms || {}
    return {
      redness: s.redness ?? s.darkColor ?? null,
      swelling: s.swelling ?? null,
      itch: s.itch ?? null,
      pain: s.pain ?? null,
    }
  })

  const update = (key, value) => {
    setLocalSymptoms((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onSave(area, localSymptoms)
  }

  return (
    <div className="bg-white rounded-card border-2 border-seafoam-200 p-5 shadow-soft-lg animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-sage-800">{AREA_LABELS[area] || area}</h3>
          <p className="text-sm text-sage-600 mt-0.5">Rate symptoms for this area</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-seafoam-100 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 60 110" className="w-8 h-8 text-primary-500">
            <ellipse cx="30" cy="12" rx="11" ry="10" fill="currentColor" opacity="0.6" />
            <rect x="24" y="21" width="12" height="9" rx="2" fill="currentColor" opacity="0.6" />
            <ellipse cx="30" cy="37" rx="14" ry="11" fill="currentColor" opacity="0.6" />
            <rect x="16" y="47" width="28" height="22" rx="3" fill="currentColor" opacity="0.6" />
            <rect x="19" y="69" width="9" height="37" rx="3" fill="currentColor" opacity="0.6" />
            <rect x="32" y="69" width="9" height="37" rx="3" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        <SeverityScale
          label="Redness (0–10)"
          value={localSymptoms.redness}
          onChange={(v) => update('redness', v)}
          icon={Palette}
        />
        <SeverityScale
          label="Swelling (0–10)"
          value={localSymptoms.swelling}
          onChange={(v) => update('swelling', v)}
          icon={Droplets}
        />
        <SeverityScale
          label="Itch (0–10)"
          value={localSymptoms.itch}
          onChange={(v) => update('itch', v)}
          icon={Sparkles}
        />
        <SeverityScale
          label="Pain (0–10)"
          value={localSymptoms.pain}
          onChange={(v) => update('pain', v)}
          icon={Bandage}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 min-h-touch flex items-center justify-center gap-2 rounded-button border-2 border-seafoam-300 text-sage-700 font-medium active:scale-[0.98] transition-transform"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 min-h-touch flex items-center justify-center gap-2 rounded-button bg-primary-500 text-white font-medium shadow-soft active:scale-[0.98] transition-transform"
        >
          <Check className="w-5 h-5" />
          Save
        </button>
      </div>
    </div>
  )
}
