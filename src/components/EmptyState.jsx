import { Sparkles } from 'lucide-react'

export default function EmptyState({ message = 'Start tracking today!', submessage }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-seafoam-100 flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8 text-primary-500" strokeWidth={1.5} />
      </div>
      <p className="text-base font-medium text-sage-800">{message}</p>
      {submessage && <p className="text-sm text-sage-600 mt-1">{submessage}</p>}
    </div>
  )
}
