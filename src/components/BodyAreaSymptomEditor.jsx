import { useState } from 'react'
import SeverityScale from './SeverityScale'

export default function BodyAreaSymptomEditor({ area, symptoms, onUpdate, onClose }) {
  const [localSymptoms, setLocalSymptoms] = useState(symptoms || {
    redness: null,
    swelling: null,
    itch: null,
    pain: null,
  })

  const update = (key, value) => {
    const updated = { ...localSymptoms, [key]: value }
    setLocalSymptoms(updated)
    onUpdate(area, updated)
  }

  const areaLabels = {
    'front-head': 'Head (Front)',
    'back-head': 'Head (Back)',
    'front-left-eye': 'Left Eye',
    'front-right-eye': 'Right Eye',
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

  return (
    <div className="bg-white rounded-[12px] border-2 border-seafoam-200 p-5 shadow-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-sage-800">{areaLabels[area] || area}</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-sage-500 hover:text-sage-700 text-xl"
        >
          ×
        </button>
      </div>
      <div className="space-y-4">
        <SeverityScale
          label="Redness (0–10)"
          value={localSymptoms.redness}
          onChange={(v) => update('redness', v)}
          showDefinition
          iconType="redness"
        />
        <SeverityScale
          label="Swelling (0–10)"
          value={localSymptoms.swelling}
          onChange={(v) => update('swelling', v)}
          showDefinition
          iconType="swelling"
        />
        <SeverityScale
          label="Itch (0–10)"
          value={localSymptoms.itch}
          onChange={(v) => update('itch', v)}
          showDefinition
          iconType="itch"
        />
        <SeverityScale
          label="Pain (0–10)"
          value={localSymptoms.pain}
          onChange={(v) => update('pain', v)}
          showDefinition
          iconType="pain"
        />
      </div>
    </div>
  )
}
