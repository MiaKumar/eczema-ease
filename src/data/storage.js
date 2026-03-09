const STORAGE_KEYS = {
  ENTRIES: 'eczemaease_entries',
  PHOTOS: 'eczemaease_photos',
  USER_PROFILE: 'eczemaease_userProfile',
  ONBOARDING_COMPLETE: 'eczemaease_hasCompletedOnboarding',
}

function getStored(key, defaultValue = {}) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : defaultValue
  } catch {
    return defaultValue
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/** @returns {Record<string, { date: string, itch?: number, pain?: number, bodyAreas?: string[], sleep?: number, stress?: number, weather?: string, foods?: string[], products?: string[], activities?: string[], notes?: string }>} */
export function getEntries() {
  return getStored(STORAGE_KEYS.ENTRIES, {})
}

/** @param {Record<string, object>} entries */
export function saveEntries(entries) {
  return setStored(STORAGE_KEYS.ENTRIES, entries)
}

/** @returns {Record<string, { id: string, dataUrl: string, label?: string }[]>} date -> photos */
export function getPhotos() {
  return getStored(STORAGE_KEYS.PHOTOS, {})
}

/** @param {Record<string, { id: string, dataUrl: string }[]>} photos */
export function savePhotos(photos) {
  return setStored(STORAGE_KEYS.PHOTOS, photos)
}

export function getEntry(dateKey) {
  const entries = getEntries()
  return entries[dateKey] ?? null
}

export function saveEntry(dateKey, entry) {
  const entries = getEntries()
  entries[dateKey] = { ...entries[dateKey], ...entry, date: dateKey }
  return saveEntries(entries)
}

export function getPhotosForDate(dateKey) {
  const photos = getPhotos()
  return photos[dateKey] ?? []
}

export function addPhoto(dateKey, dataUrl, label = '') {
  const photos = getPhotos()
  if (!photos[dateKey]) photos[dateKey] = []
  const id = `${dateKey}_${Date.now()}`
  photos[dateKey].push({ id, dataUrl, label })
  return savePhotos(photos) ? id : null
}

export function removePhoto(dateKey, photoId) {
  const photos = getPhotos()
  if (!photos[dateKey]) return false
  photos[dateKey] = photos[dateKey].filter((p) => p.id !== photoId)
  return savePhotos(photos)
}

/** @returns {{ gender?: string, yearBorn?: number, ethnicity?: string, zipCode?: string, completedAt?: string } | null } */
export function getUserProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/** @param {{ gender?: string, yearBorn?: number, ethnicity?: string, zipCode?: string, completedAt?: string }} profile */
export function saveUserProfile(profile) {
  const current = getUserProfile() || {}
  return setStored(STORAGE_KEYS.USER_PROFILE, { ...current, ...profile })
}

export function hasCompletedOnboarding() {
  try {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true'
  } catch {
    return false
  }
}

export function setOnboardingComplete() {
  try {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true')
    return true
  } catch {
    return false
  }
}

/** Clears onboarding flag (for testing / reset app) */
export function clearOnboardingFlag() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETE)
    return true
  } catch {
    return false
  }
}
