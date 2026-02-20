import { useState, useEffect } from 'react'

const STORAGE_KEY = 'eczemaease_settings'

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
  const [settings, setSettings] = useState(getSettings)
  const [permissionStatus, setPermissionStatus] = useState('default')

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission)
    }
  }, [])

  const updateSettings = (updates) => {
    const newSettings = { ...settings, ...updates }
    setSettings(newSettings)
    saveSettings(newSettings)
    setupNotifications(newSettings)
  }

  const requestPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      setPermissionStatus(permission)
      if (permission === 'granted') {
        // Show a test notification
        new Notification('EczemaEase', {
          body: 'Notifications enabled! You\'ll receive reminders to log your symptoms.',
          icon: '/favicon.svg',
        })
      }
    }
  }

  const setupNotifications = (currentSettings) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return

    // Clear existing notifications
    if (window.notificationInterval) {
      clearInterval(window.notificationInterval)
    }

    if (currentSettings.dailyReminder || currentSettings.treatmentReminder) {
      // Check every minute if it's time to notify
      window.notificationInterval = setInterval(() => {
        const now = new Date()
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

        // Daily reminder at 9 AM
        if (currentSettings.dailyReminder && currentTime === '09:00') {
          new Notification('EczemaEase', {
            body: 'Time to log your symptoms today!',
            icon: '/favicon.svg',
            tag: 'daily-reminder',
          })
        }

        // Treatment reminder
        if (currentSettings.treatmentReminder && currentTime === currentSettings.treatmentTime) {
          new Notification('EczemaEase', {
            body: 'Reminder: Apply your treatment/medication',
            icon: '/favicon.svg',
            tag: 'treatment-reminder',
          })
        }
      }, 60000) // Check every minute
    }
  }

  useEffect(() => {
    if (Notification.permission === 'granted') {
      setupNotifications(settings)
    }
    return () => {
      if (window.notificationInterval) {
        clearInterval(window.notificationInterval)
      }
    }
  }, [settings])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-sage-800">Settings</h2>

      <div className="bg-white rounded-2xl border-2 border-seafoam-200 p-4 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-sage-800 mb-3">Notifications</h3>
          {permissionStatus === 'default' && (
            <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800 mb-2">
                Enable browser notifications to receive reminders.
              </p>
              <button
                type="button"
                onClick={requestPermission}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600"
              >
                Enable Notifications
              </button>
            </div>
          )}
          {permissionStatus === 'denied' && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-800">
                Notifications are blocked. Please enable them in your browser settings.
              </p>
            </div>
          )}
          {permissionStatus === 'granted' && (
            <p className="text-xs text-sage-600 mb-3">✓ Notifications enabled</p>
          )}

          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-800">Daily symptom reminder</p>
                <p className="text-xs text-sage-600">Remind me at 9:00 AM to log symptoms</p>
              </div>
              <input
                type="checkbox"
                checked={settings.dailyReminder}
                onChange={(e) => updateSettings({ dailyReminder: e.target.checked })}
                disabled={permissionStatus !== 'granted'}
                className="w-5 h-5 rounded border-seafoam-300 text-primary-500 focus:ring-primary-400"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-800">Treatment reminder</p>
                <p className="text-xs text-sage-600">Remind me to apply medication</p>
              </div>
              <input
                type="checkbox"
                checked={settings.treatmentReminder}
                onChange={(e) => updateSettings({ treatmentReminder: e.target.checked })}
                disabled={permissionStatus !== 'granted'}
                className="w-5 h-5 rounded border-seafoam-300 text-primary-500 focus:ring-primary-400"
              />
            </label>

            {settings.treatmentReminder && (
              <div>
                <label className="text-xs text-sage-700 mb-1 block">Reminder time</label>
                <input
                  type="time"
                  value={settings.treatmentTime}
                  onChange={(e) => updateSettings({ treatmentTime: e.target.value })}
                  className="w-full rounded-lg border-2 border-seafoam-200 px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-seafoam-200 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-sage-800 mb-2">About</h3>
        <p className="text-xs text-sage-600">
          EczemaEase helps you track symptoms, triggers, and treatments to better understand your eczema patterns.
        </p>
        <p className="text-xs text-sage-500 mt-2">Version 1.0.0</p>
      </div>
    </div>
  )
}
