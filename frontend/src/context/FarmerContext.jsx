/**
 * Shared farmer profile state across the app.
 * Loads dashboard data from the backend when an active profile exists.
 */

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getDashboard } from '../services/api'
import { getActiveProfileId, setActiveProfileId, clearActiveProfileId } from '../utils/profileStorage'

const FarmerContext = createContext(null)

export function FarmerProvider({ children }) {
  const [profileId, setProfileId] = useState(getActiveProfileId())
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const refreshDashboard = useCallback(async (id = profileId) => {
    if (!id) {
      setDashboard(null)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const { data } = await getDashboard(id)
      setDashboard(data)
    } catch (err) {
      setDashboard(null)
      setError(err.response?.data?.detail || 'Failed to load farm data')
    } finally {
      setLoading(false)
    }
  }, [profileId])

  const selectProfile = useCallback((id) => {
    setActiveProfileId(id)
    setProfileId(id)
  }, [])

  const clearProfile = useCallback(() => {
    clearActiveProfileId()
    setProfileId(null)
    setDashboard(null)
    setError(null)
  }, [])

  useEffect(() => {
    refreshDashboard(profileId)
  }, [profileId, refreshDashboard])

  return (
    <FarmerContext.Provider
      value={{
        profileId,
        dashboard,
        loading,
        error,
        hasProfile: Boolean(profileId && dashboard),
        selectProfile,
        clearProfile,
        refreshDashboard,
      }}
    >
      {children}
    </FarmerContext.Provider>
  )
}

export function useFarmer() {
  const ctx = useContext(FarmerContext)
  if (!ctx) throw new Error('useFarmer must be used within FarmerProvider')
  return ctx
}
