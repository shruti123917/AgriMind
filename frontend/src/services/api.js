/**
 * API service — central place for all backend HTTP calls.
 */

import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// ── Health ──────────────────────────────────────────────
export const checkHealth = () => api.get('/health')

// ── Farmer Profile ──────────────────────────────────────
export const createFarmerProfile = (data) =>
  api.post('/api/farmer/profile', data)

export const getFarmerProfile = (id) =>
  api.get(`/api/farmer/profile/${id}`)

export const listFarmerProfiles = () =>
  api.get('/api/farmer/profiles')

export const updateFarmerProfile = (id, data) =>
  api.put(`/api/farmer/profile/${id}`, data)

// ── Dashboard / Crop Lifecycle ──────────────────────────
export const getDashboard = (profileId) =>
  api.get(`/api/dashboard/${profileId}`)

// ── Crop Recommendation ────────────────────────────────
export const getCropRecommendation = (data) =>
  api.post('/api/recommendation', data)

// ── Yield Prediction ─────────────────────────────────────
export const getYieldPrediction = (data) =>
  api.post('/api/yield', data)

export const detectDisease = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/api/disease-detection",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const askAIAssistant = async (
  question,
  profileId
) => {

  const response = await api.post(
    "/api/ai-assistant/chat",
    {
      question,
      profile_id: profileId,
    }
  )

  return response.data
}

export default api
