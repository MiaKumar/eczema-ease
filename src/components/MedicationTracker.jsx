import { useState } from 'react'

const COMMON_MEDICATIONS = [
  'Topical Steroid',
  'Moisturizer',
  'Oral Medication',
  'Phototherapy',
  'Antihistamine',
  'Antibiotic Cream',
  'Calcineurin Inhibitor',
]

export default function MedicationTracker({ medications = [], onUpdate }) {
  const [showAdd, setShowAdd] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    time: new Date().toTimeString().slice(0, 5),
    isCustom: false,
  })

  const addMedication = () => {
    if (!formData.name.trim()) return
    const newMed = {
      id: Date.now().toString(),
      name: formData.name,
      dosage: formData.dosage || '',
      time: formData.time,
      date: new Date().toISOString(),
    }
    onUpdate([...medications, newMed])
    setFormData({ name: '', dosage: '', time: new Date().toTimeString().slice(0, 5), isCustom: false })
    setShowAdd(false)
  }

  const removeMedication = (id) => {
    onUpdate(medications.filter((m) => m.id !== id))
  }

  return (
    <div className="bg-white rounded-[12px] border border-seafoam-200 p-5 shadow-card">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-sage-800">Medications & Treatments</p>
        <button
          type="button"
          onClick={() => setShowAdd(!showAdd)}
          className="px-3 py-1 bg-primary-500 text-white rounded-lg text-xs font-medium hover:bg-primary-600"
        >
          + Add
        </button>
      </div>

      {showAdd && (
        <div className="mb-4 p-3 bg-seafoam-50 rounded-xl border border-seafoam-200">
          <div className="space-y-2">
            <div>
              <label className="text-xs text-sage-700 mb-1 block">Medication/Treatment</label>
              <select
                value={formData.isCustom ? 'custom' : formData.name}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setFormData({ ...formData, isCustom: true, name: '' })
                  } else {
                    setFormData({ ...formData, isCustom: false, name: e.target.value })
                  }
                }}
                className="w-full rounded-lg border border-seafoam-300 px-2 py-1.5 text-sm"
              >
                <option value="">Select...</option>
                {COMMON_MEDICATIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
                <option value="custom">Custom...</option>
              </select>
              {formData.isCustom && (
                <input
                  type="text"
                  placeholder="Enter medication name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-seafoam-300 px-2 py-1.5 text-sm"
                />
              )}
            </div>
            <div>
              <label className="text-xs text-sage-700 mb-1 block">Dosage/Amount</label>
              <input
                type="text"
                placeholder="e.g., 1 pump, 2 tablets"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                className="w-full rounded-lg border border-seafoam-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-sage-700 mb-1 block">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full rounded-lg border border-seafoam-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addMedication}
                className="flex-1 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 bg-seafoam-100 text-sage-700 rounded-lg text-sm font-medium hover:bg-seafoam-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {medications.length === 0 ? (
        <p className="text-xs text-sage-500 text-center py-4">No medications logged today</p>
      ) : (
        <div className="space-y-2">
          {medications.map((med) => (
            <div key={med.id} className="flex items-center justify-between p-2 bg-seafoam-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-sage-800">{med.name}</p>
                {med.dosage && <p className="text-xs text-sage-600">Dosage: {med.dosage}</p>}
                {med.time && <p className="text-xs text-sage-600">Time: {med.time}</p>}
              </div>
              <button
                type="button"
                onClick={() => removeMedication(med.id)}
                className="text-red-500 hover:text-red-700 text-lg px-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
