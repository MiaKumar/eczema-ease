import { useState, useEffect } from 'react'
import { User, Bell, Download, Info } from 'lucide-react'
import { getSetupProfile, saveSetupProfile } from '../data/setupStorage'

const STORAGE_KEY = 'eczemaease_settings'
const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say']
const ETHNICITIES = ['Asian', 'Black/African American', 'Hispanic/Latino', 'White/Caucasian', 'Native American', 'Pacific Islander', 'Mixed', 'Other', 'Prefer not to say']

function getSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { dailyReminder: false, treatmentReminder: false, treatmentTime: '20:00' }
  } catch {
    return { dailyReminder: false, treatmentReminder: false, treatmentTime: '20:00' }
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    return true
  } catch {
    return false
  }
}

export default function Settings() {
  const [profile, setProfile] = useState(getSetupProfile)
  const [settings, setSettings] = useState(getSettings)
  const [permissionStatus, setPermissionStatus] = useState('default')

  useEffect(() => {
    if ('Notification' in window) setPermissionStatus(Notification.permission)
  }, [])

  const updateProfile = (key, value) => {
    const next = { ...profile, [key]: value }
    setProfile(next)
    saveSetupProfile(next)
  }

  const updateSettings = (updates) => {
    const next = { ...settings, ...updates }
    setSettings(next)
    saveSettings(next)
    if (next.dailyReminder || next.treatmentReminder) setupNotifications(next)
  }

  const requestPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      setPermissionStatus(permission)
      if (permission === 'granted') {
        new Notification('EczemaEase', { body: 'Notifications enabled!', icon: '/favicon.svg' })
      }
    }
  }

  const setupNotifications = (currentSettings) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return
    if (window.notificationInterval) clearInterval(window.notificationInterval)
    if (currentSettings.dailyReminder || currentSettings.treatmentReminder) {
      window.notificationInterval = setInterval(() => {
        const now = new Date()
        const t = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
        if (currentSettings.dailyReminder && t === '09:00') {
          new Notification('EczemaEase', { body: 'Time to log your symptoms today!', icon: '/favicon.svg', tag: 'daily' })
        }
        if (currentSettings.treatmentReminder && t === currentSettings.treatmentTime) {
          new Notification('EczemaEase', { body: 'Reminder: Apply your treatment/medication', icon: '/favicon.svg', tag: 'treatment' })
        }
      }, 60000)
    }
  }

  useEffect(() => {
    if (Notification.permission === 'granted') setupNotifications(settings)
    return () => { if (window.notificationInterval) clearInterval(window.notificationInterval) }
  }, [settings])

  const handleExport = () => {
    const entries = JSON.parse(localStorage.getItem('eczemaease_entries') || '{}')
    const photos = JSON.parse(localStorage.getItem('eczemaease_photos') || '{}')
    const blob = new Blob([JSON.stringify({ entries, photos, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `eczemaease-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const years = Array.from({ length: 2024 - 1940 + 1 }, (_, i) => 2024 - i)

  return (
    <div className="space-y-6 pb-4">
      <h2 className="text-2xl font-bold text-sage-800 tracking-tight">Settings</h2>

      {/* Personal Info */}
      <section className="bg-white rounded-card border-2 border-seafoam-200 p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary-500" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-sage-800">Personal Info</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-1">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => updateProfile('gender', e.target.value)}
              className="w-full min-h-touch rounded-button border-2 border-seafoam-200 bg-white px-4 text-sage-800"
            >
              <option value="">Select...</option>
              {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-1">Year born</label>
            <select
              value={profile.yearBorn}
              onChange={(e) => updateProfile('yearBorn', e.target.value)}
              className="w-full min-h-touch rounded-button border-2 border-seafoam-200 bg-white px-4 text-sage-800"
            >
              <option value="">Select year...</option>
              {years.map((y) => <option key={y} value={String(y)}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-1">Ethnicity</label>
            <select
              value={profile.ethnicity}
              onChange={(e) => updateProfile('ethnicity', e.target.value)}
              className="w-full min-h-touch rounded-button border-2 border-seafoam-200 bg-white px-4 text-sage-800"
            >
              <option value="">Select...</option>
              {ETHNICITIES.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-1">ZIP code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={profile.zipCode}
              onChange={(e) => updateProfile('zipCode', e.target.value.replace(/\D/g, ''))}
              className="w-full min-h-touch rounded-button border-2 border-seafoam-200 bg-white px-4 text-sage-800"
            />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-card border-2 border-seafoam-200 p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-primary-500" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-sage-800">Notifications & Reminders</h3>
        </div>
        {permissionStatus === 'default' && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-button">
            <p className="text-sm text-amber-800 mb-2">Enable browser notifications for reminders.</p>
            <button type="button" onClick={requestPermission} className="min-h-touch px-4 rounded-button bg-primary-500 text-white font-medium text-sm">
              Enable Notifications
            </button>
          </div>
        )}
        {permissionStatus === 'denied' && (
          <p className="text-sm text-red-600 mb-4">Notifications are blocked. Enable them in your browser settings.</p>
        )}
        <div className="space-y-3">
          <label className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-sage-800">Daily symptom reminder</p>
              <p className="text-xs text-sage-600">9:00 AM</p>
            </div>
            <input
              type="checkbox"
              checked={settings.dailyReminder}
              onChange={(e) => updateSettings({ dailyReminder: e.target.checked })}
              disabled={permissionStatus !== 'granted'}
              className="w-5 h-5 rounded border-seafoam-300 text-primary-500"
            />
          </label>
          <label className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-sage-800">Treatment reminder</p>
            </div>
            <input
              type="checkbox"
              checked={settings.treatmentReminder}
              onChange={(e) => updateSettings({ treatmentReminder: e.target.checked })}
              disabled={permissionStatus !== 'granted'}
              className="w-5 h-5 rounded border-seafoam-300 text-primary-500"
            />
          </label>
          {settings.treatmentReminder && (
            <div>
              <label className="text-xs text-sage-700 mb-1 block">Time</label>
              <input
                type="time"
                value={settings.treatmentTime}
                onChange={(e) => updateSettings({ treatmentTime: e.target.value })}
                className="w-full min-h-touch rounded-button border-2 border-seafoam-200 px-3"
              />
            </div>
          )}
        </div>
      </section>

      {/* Data Export */}
      <section className="bg-white rounded-card border-2 border-seafoam-200 p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <Download className="w-5 h-5 text-primary-500" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-sage-800">Data Export</h3>
        </div>
        <p className="text-sm text-sage-600 mb-4">Download your entries and photos as a JSON file.</p>
        <button type="button" onClick={handleExport} className="min-h-touch px-4 rounded-button border-2 border-seafoam-300 text-sage-700 font-medium">
          Export data
        </button>
      </section>

      {/* About */}
      <section className="bg-white rounded-card border-2 border-seafoam-200 p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 text-primary-500" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-sage-800">About & Help</h3>
        </div>
        <p className="text-sm text-sage-600">EczemaEase helps you track symptoms, triggers, and treatments.</p>
        <p className="text-xs text-sage-500 mt-2">Version 1.0.0</p>
      </section>
    </div>
  )
}
