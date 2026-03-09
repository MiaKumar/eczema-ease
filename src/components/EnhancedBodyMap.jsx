import { useState, useMemo } from 'react'
import BodyAreaSymptomEditor from './BodyAreaSymptomEditor'

const FRONT_ZONES = [
  'front-head', 'front-left-eye', 'front-right-eye', 'front-neck', 'front-left-arm', 'front-right-arm',
  'front-chest', 'front-torso', 'front-left-leg', 'front-right-leg',
]
const BACK_ZONES = [
  'back-head', 'back-neck', 'back-left-arm', 'back-right-arm',
  'back-upper', 'back-lower', 'back-left-leg', 'back-right-leg',
]

export default function EnhancedBodyMap({ bodyAreas = {}, onUpdate }) {
  const [editingArea, setEditingArea] = useState(null)

  const toggle = (area) => {
    const current = bodyAreas[area]
    if (current) {
      // If area exists, open editor
      setEditingArea(area)
    } else {
      // If new area, add it with empty symptoms
      onUpdate({ ...bodyAreas, [area]: { redness: null, swelling: null, itch: null, pain: null } })
      setEditingArea(area)
    }
  }

  const updateAreaSymptoms = (area, symptoms) => {
    onUpdate({ ...bodyAreas, [area]: symptoms })
  }

  const removeArea = (area) => {
    const updated = { ...bodyAreas }
    delete updated[area]
    onUpdate(updated)
    setEditingArea(null)
  }

  const hasSymptoms = (area) => {
    const s = bodyAreas[area]
    return s && (s.redness != null || s.swelling != null || s.itch != null || s.pain != null)
  }

  const frontSelected = useMemo(() => {
    const set = new Set()
    Object.keys(bodyAreas).forEach((a) => {
      if (a.startsWith('front-')) set.add(a)
    })
    return set
  }, [bodyAreas])

  const backSelected = useMemo(() => {
    const set = new Set()
    Object.keys(bodyAreas).forEach((a) => {
      if (a.startsWith('back-')) set.add(a)
    })
    return set
  }, [bodyAreas])

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[12px] border border-seafoam-200 p-5 shadow-card">
        <p className="text-sm font-semibold text-sage-800 mb-3">Affected Areas & Symptoms</p>
        <p className="text-xs text-sage-600 mb-3">Tap an area to add symptoms, tap again to edit</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <div className="flex flex-col items-center">
            <p className="text-xs text-sage-600 mb-1">Front</p>
            <svg viewBox="0 0 120 220" className="w-32 h-auto touch-manipulation" role="img" aria-label="Body front">
              {/* Head */}
              <ellipse cx="60" cy="25" rx="22" ry="20" className={frontSelected.has('front-head') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('front-head')} />
              {/* Left eye */}
              <circle cx="52" cy="22" r="5" className={frontSelected.has('front-left-eye') ? 'fill-primary-500 stroke-primary-700' : 'fill-seafoam-300 stroke-seafoam-500'} strokeWidth="1" onClick={(e) => { e.stopPropagation(); toggle('front-left-eye') }} />
              {/* Right eye */}
              <circle cx="68" cy="22" r="5" className={frontSelected.has('front-right-eye') ? 'fill-primary-500 stroke-primary-700' : 'fill-seafoam-300 stroke-seafoam-500'} strokeWidth="1" onClick={(e) => { e.stopPropagation(); toggle('front-right-eye') }} />
              {/* Neck */}
              <rect x="48" y="42" width="24" height="18" rx="4" className={frontSelected.has('front-neck') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('front-neck')} />
              {/* Chest */}
              <ellipse cx="60" cy="75" rx="28" ry="22" className={frontSelected.has('front-chest') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('front-chest')} />
              {/* Torso */}
              <rect x="32" y="95" width="56" height="45" rx="6" className={frontSelected.has('front-torso') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('front-torso')} />
              {/* Arms */}
              <path d="M 20 55 L 8 95 L 18 140" fill="none" strokeWidth="14" strokeLinecap="round" className={frontSelected.has('front-left-arm') ? 'stroke-primary-400' : 'stroke-seafoam-200'} onClick={() => toggle('front-left-arm')} />
              <path d="M 100 55 L 112 95 L 102 140" fill="none" strokeWidth="14" strokeLinecap="round" className={frontSelected.has('front-right-arm') ? 'stroke-primary-400' : 'stroke-seafoam-200'} onClick={() => toggle('front-right-arm')} />
              {/* Legs */}
              <rect x="38" y="138" width="18" height="75" rx="6" className={frontSelected.has('front-left-leg') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('front-left-leg')} />
              <rect x="64" y="138" width="18" height="75" rx="6" className={frontSelected.has('front-right-leg') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('front-right-leg')} />
            </svg>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs text-sage-600 mb-1">Back</p>
            <svg viewBox="0 0 120 220" className="w-32 h-auto touch-manipulation" role="img" aria-label="Body back">
              <ellipse cx="60" cy="25" rx="22" ry="20" className={backSelected.has('back-head') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('back-head')} />
              <rect x="48" y="42" width="24" height="18" rx="4" className={backSelected.has('back-neck') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('back-neck')} />
              <path d="M 20 55 L 8 95 L 18 140" fill="none" strokeWidth="14" strokeLinecap="round" className={backSelected.has('back-left-arm') ? 'stroke-primary-400' : 'stroke-seafoam-200'} onClick={() => toggle('back-left-arm')} />
              <path d="M 100 55 L 112 95 L 102 140" fill="none" strokeWidth="14" strokeLinecap="round" className={backSelected.has('back-right-arm') ? 'stroke-primary-400' : 'stroke-seafoam-200'} onClick={() => toggle('back-right-arm')} />
              <rect x="32" y="68" width="56" height="40" rx="6" className={backSelected.has('back-upper') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('back-upper')} />
              <rect x="32" y="105" width="56" height="45" rx="6" className={backSelected.has('back-lower') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('back-lower')} />
              <rect x="38" y="148" width="18" height="65" rx="6" className={backSelected.has('back-left-leg') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('back-left-leg')} />
              <rect x="64" y="148" width="18" height="65" rx="6" className={backSelected.has('back-right-leg') ? 'fill-primary-400 stroke-primary-600' : 'fill-seafoam-200 stroke-seafoam-400'} strokeWidth="1.5" onClick={() => toggle('back-right-leg')} />
            </svg>
          </div>
        </div>
        {Object.keys(bodyAreas).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.keys(bodyAreas).map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => setEditingArea(area)}
                className="px-2 py-1 text-xs bg-seafoam-100 text-sage-700 rounded-lg hover:bg-seafoam-200"
              >
                {area.replace(/-/g, ' ')} {hasSymptoms(area) && '✓'}
              </button>
            ))}
          </div>
        )}
      </div>

      {editingArea && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingArea(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <BodyAreaSymptomEditor
              area={editingArea}
              symptoms={bodyAreas[editingArea]}
              onUpdate={updateAreaSymptoms}
              onClose={() => setEditingArea(null)}
            />
            {bodyAreas[editingArea] && (
              <button
                type="button"
                onClick={() => removeArea(editingArea)}
                className="mt-2 w-full py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium"
              >
                Remove Area
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
