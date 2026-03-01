const SETUP_KEY = 'eczemaease_setup'
const HAS_COMPLETED_SETUP_KEY = 'eczemaease_hasCompletedSetup'

function getStored(key, defaultValue = null) {
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

export function hasCompletedSetup() {
  return getStored(HAS_COMPLETED_SETUP_KEY, false) === true
}

export function setCompletedSetup(value = true) {
  return setStored(HAS_COMPLETED_SETUP_KEY, value)
}

const defaultProfile = {
  gender: '',
  yearBorn: '',
  ethnicity: '',
  zipCode: '',
}

export function getSetupProfile() {
  return getStored(SETUP_KEY, defaultProfile)
}

export function saveSetupProfile(profile) {
  return setStored(SETUP_KEY, { ...defaultProfile, ...profile })
}
