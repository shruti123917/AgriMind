import { useState } from 'react'
import { Save, CheckCircle, AlertCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import { createFarmerProfile } from '../services/api'

const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky']
const waterOptions = ['Low', 'Medium', 'High']

const initialForm = {
  name: '',
  location: '',
  farm_size: '',
  soil_type: '',
  current_crop: '',
  water_availability: '',
}

export default function FarmerProfile() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null) // { type: 'success' | 'error', text }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const payload = {
        ...form,
        farm_size: parseFloat(form.farm_size),
      }
      const { data } = await createFarmerProfile(payload)
      setMessage({
        type: 'success',
        text: `Profile saved successfully! ID: ${data.id}`,
      })
      setForm(initialForm)
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.detail || 'Failed to save profile. Is the backend running?',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card title="Create Farmer Profile">
        <p className="mb-6 text-sm text-gray-500">
          Enter your farm details. This information is used by the recommendation
          engine and AI assistant to give personalized advice.
        </p>

        {message && (
          <div
            className={`mb-4 flex items-center gap-2 rounded-lg p-3 text-sm ${
              message.type === 'success'
                ? 'bg-primary-50 text-primary-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Farmer Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Ramesh Kumar"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="e.g. Nashik, Maharashtra"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {/* Farm size */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Farm Size (acres)
            </label>
            <input
              type="number"
              name="farm_size"
              value={form.farm_size}
              onChange={handleChange}
              required
              min="0.1"
              step="0.1"
              placeholder="e.g. 5"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {/* Soil type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Soil Type
            </label>
            <select
              name="soil_type"
              value={form.soil_type}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="">Select soil type</option>
              {soilTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Current crop */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Current Crop
            </label>
            <input
              type="text"
              name="current_crop"
              value={form.current_crop}
              onChange={handleChange}
              required
              placeholder="e.g. Wheat"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {/* Water availability */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Water Availability
            </label>
            <select
              name="water_availability"
              value={form.water_availability}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="">Select availability</option>
              {waterOptions.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </Card>
    </div>
  )
}
