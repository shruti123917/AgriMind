const PROFILE_KEY = 'agrimind_active_profile_id'

export function getActiveProfileId() {
  return localStorage.getItem(PROFILE_KEY)
}

export function setActiveProfileId(id) {
  localStorage.setItem(PROFILE_KEY, id)
}

export function clearActiveProfileId() {
  localStorage.removeItem(PROFILE_KEY)
}
