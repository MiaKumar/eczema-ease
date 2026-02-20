import { useState, useRef, useEffect } from 'react'
import DateSelector from '../components/DateSelector'
import { getPhotosForDate, addPhoto, removePhoto, getPhotos } from '../data/storage'

const todayKey = () => new Date().toISOString().slice(0, 10)

export default function PhotoDocumentation() {
  const [dateKey, setDateKey] = useState(todayKey())
  const [photos, setPhotos] = useState(() => getPhotosForDate(todayKey()))
  const fileInputRef = useRef(null)
  const streamRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    setPhotos(getPhotosForDate(dateKey))
  }, [dateKey])

  const refreshPhotos = () => {
    setPhotos(getPhotosForDate(dateKey))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      addPhoto(dateKey, reader.result)
      refreshPhotos()
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const startCamera = () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Camera not supported in this browser.')
      return
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
      })
      .catch(() => alert('Could not access camera.'))
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
  }

  const capturePhoto = () => {
    const video = videoRef.current
    if (!video || !video.srcObject) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
    addPhoto(dateKey, dataUrl)
    refreshPhotos()
    stopCamera()
    setShowCamera(false)
  }

  const handleDelete = (photoId) => {
    if (window.confirm('Delete this photo?')) {
      removePhoto(dateKey, photoId)
      refreshPhotos()
    }
  }

  const [showCamera, setShowCamera] = useState(false)

  useEffect(() => {
    if (showCamera) startCamera()
    return () => stopCamera()
  }, [showCamera])

  return (
    <div className="space-y-4">
      <DateSelector value={dateKey} onChange={setDateKey} />

      <div className="bg-white rounded-xl border-2 border-seafoam-200 p-4 shadow-sm">
        <p className="text-sm font-semibold text-sage-800 mb-3">Photos for this date</p>
        <div className="flex gap-3 mb-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 py-3 rounded-lg border-2 border-dashed border-primary-400 text-primary-600 font-medium text-sm hover:bg-seafoam-50"
          >
            Upload photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <button
            type="button"
            onClick={() => setShowCamera(true)}
            className="flex-1 py-3 rounded-lg bg-primary-500 text-white font-medium text-sm hover:bg-primary-600"
          >
            Take photo
          </button>
        </div>

        {showCamera && (
          <div className="fixed inset-0 z-30 bg-black/90 flex flex-col justify-end safe-bottom">
            <div className="bg-slate-900 p-4 flex flex-col items-center gap-3">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full max-h-[50vh] object-contain bg-black rounded-lg"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { stopCamera(); setShowCamera(false); }}
                  className="px-4 py-2 rounded-lg bg-slate-600 text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white"
                >
                  Capture
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group rounded-xl overflow-hidden border-2 border-seafoam-200 bg-seafoam-50 aspect-square">
            <img src={photo.dataUrl} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleDelete(photo.id)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white text-sm opacity-90 hover:opacity-100"
              aria-label="Delete photo"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {photos.length === 0 && (
        <p className="text-sage-500 text-sm text-center py-4">No photos for this date yet.</p>
      )}
    </div>
  )
}
