import { useMemo } from 'react'

// Simple front/back body zones as SVG paths or div regions. We use clickable zones with data-area ids.
const FRONT_ZONES = [
  'front-head', 'front-neck', 'front-left-arm', 'front-right-arm',
  'front-chest', 'front-torso', 'front-left-leg', 'front-right-leg',
]
const BACK_ZONES = [
  'back-head', 'back-neck', 'back-left-arm', 'back-right-arm',
  'back-upper', 'back-lower', 'back-left-leg', 'back-right-leg',
]

export default function BodyMap({ selectedAreas = [], onChange }) {
  const toggle = (area) => {
    const set = new Set(selectedAreas)
    if (set.has(area)) set.delete(area)
    else set.add(area)
    onChange([...set])
  }

  const frontSelected = useMemo(() => new Set(selectedAreas), [selectedAreas])
  const backSelected = useMemo(() => new Set(selectedAreas), [selectedAreas])

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-700 mb-3">Affected areas</p>
      <div className="flex gap-4 justify-center flex-wrap">
        <div className="flex flex-col items-center">
          <p className="text-xs text-slate-500 mb-1">Front</p>
          <svg viewBox="0 0 120 220" className="w-32 h-auto touch-manipulation" role="img" aria-label="Body front">
            <ellipse cx="60" cy="25" rx="22" ry="20" className={frontSelected.has('front-head') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('front-head')} />
            <rect x="48" y="42" width="24" height="18" rx="4" className={frontSelected.has('front-neck') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('front-neck')} />
            <ellipse cx="60" cy="75" rx="28" ry="22" className={frontSelected.has('front-chest') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('front-chest')} />
            <rect x="32" y="95" width="56" height="45" rx="6" className={frontSelected.has('front-torso') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('front-torso')} />
            <path d="M 20 55 L 8 95 L 18 140" fill="none" strokeWidth="14" strokeLinecap="round" className={frontSelected.has('front-left-arm') ? 'stroke-primary-400' : 'stroke-slate-200'} onClick={() => toggle('front-left-arm')} />
            <path d="M 100 55 L 112 95 L 102 140" fill="none" strokeWidth="14" strokeLinecap="round" className={frontSelected.has('front-right-arm') ? 'stroke-primary-400' : 'stroke-slate-200'} onClick={() => toggle('front-right-arm')} />
            <rect x="38" y="138" width="18" height="75" rx="6" className={frontSelected.has('front-left-leg') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('front-left-leg')} />
            <rect x="64" y="138" width="18" height="75" rx="6" className={frontSelected.has('front-right-leg') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('front-right-leg')} />
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xs text-slate-500 mb-1">Back</p>
          <svg viewBox="0 0 120 220" className="w-32 h-auto touch-manipulation" role="img" aria-label="Body back">
            <ellipse cx="60" cy="25" rx="22" ry="20" className={backSelected.has('back-head') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('back-head')} />
            <rect x="48" y="42" width="24" height="18" rx="4" className={backSelected.has('back-neck') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('back-neck')} />
            <path d="M 20 55 L 8 95 L 18 140" fill="none" strokeWidth="14" strokeLinecap="round" className={backSelected.has('back-left-arm') ? 'stroke-primary-400' : 'stroke-slate-200'} onClick={() => toggle('back-left-arm')} />
            <path d="M 100 55 L 112 95 L 102 140" fill="none" strokeWidth="14" strokeLinecap="round" className={backSelected.has('back-right-arm') ? 'stroke-primary-400' : 'stroke-slate-200'} onClick={() => toggle('back-right-arm')} />
            <rect x="32" y="68" width="56" height="40" rx="6" className={backSelected.has('back-upper') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('back-upper')} />
            <rect x="32" y="105" width="56" height="45" rx="6" className={backSelected.has('back-lower') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('back-lower')} />
            <rect x="38" y="148" width="18" height="65" rx="6" className={backSelected.has('back-left-leg') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('back-left-leg')} />
            <rect x="64" y="148" width="18" height="65" rx="6" className={backSelected.has('back-right-leg') ? 'fill-primary-400 stroke-primary-600' : 'fill-slate-200 stroke-slate-400'} strokeWidth="1.5" onClick={() => toggle('back-right-leg')} />
          </svg>
        </div>
      </div>
      {selectedAreas.length > 0 && (
        <p className="text-xs text-slate-500 mt-2">{selectedAreas.length} area(s) selected</p>
      )}
    </div>
  )
}
