import { useState, useEffect } from 'react'
import { Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Card from '../components/ui/Card'
import {
  createFarmerProfile,
  updateFarmerProfile,
  getFarmerProfile,
} from '../services/api'
import { useFarmer } from '../context/FarmerContext'

const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky']
const waterOptions = ['Low', 'Medium', 'High']
const genderOptions = ['Male', 'Female', 'Other']

const emptyForm = {
  name: '',
  age: '',
  gender: '',
  village: '',
  district: '',
  state: '',
  farm_size: '',
  soil_type: '',
  location: '',
  current_crop: '',
  water_availability: '',
  sowing_date: '',
}

export default function FarmerProfile() {
  const { profileId, selectProfile, refreshDashboard } = useFarmer()

  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [message, setMessage] = useState(null)

  const isEditing = Boolean(profileId)

  // Load existing profile when editing
  useEffect(() => {
    if (!profileId) return

    setFetching(true)

    getFarmerProfile(profileId)
      .then(({ data }) => {
        setForm({
          name: data.name || '',
          age: data.age ? String(data.age) : '',
          gender: data.gender || '',
          village: data.village || '',
          district: data.district || '',
          state: data.state || '',
          farm_size: data.farm_size ? String(data.farm_size) : '',
          soil_type: data.soil_type || '',
          location: data.location || '',
          current_crop: data.current_crop || '',
          water_availability: data.water_availability || '',
          sowing_date: data.sowing_date || '',
        })
      })
      .catch(() =>
        setMessage({
          type: 'error',
          text: 'Could not load existing profile.',
        })
      )
      .finally(() => setFetching(false))
  }, [profileId])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage(null)

    const payload = {
      name: form.name.trim(),
      age: parseInt(form.age, 10),
      gender: form.gender,
      village: form.village.trim(),
      district: form.district.trim(),
      state: form.state.trim(),
      farm_size: parseFloat(form.farm_size),
      soil_type: form.soil_type,
      location: form.location.trim() || null,
      current_crop: form.current_crop.trim() || null,
      water_availability: form.water_availability || null,
      sowing_date: form.sowing_date || null,
    }

    try {
      let data

      if (isEditing) {
        ;({ data } = await updateFarmerProfile(profileId, payload))
      } else {
        ;({ data } = await createFarmerProfile(payload))
        selectProfile(data.id)
      }

      await refreshDashboard(data.id)

      setMessage({
        type: 'success',
        text: isEditing
          ? 'Profile updated successfully!'
          : 'Profile created! Dashboard is now active.',
      })
    } catch (err) {
      setMessage({
        type: 'error',
        text:
          err.response?.data?.detail ||
          'Failed to save profile. Is the backend running?',
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card
        title={isEditing ? 'Edit Farmer Profile' : 'Create Farmer Profile'}
        subtitle="Your profile powers the crop lifecycle dashboard and AI insights"
      >
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

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Information */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              Personal Information
            </h3>

            <div className="space-y-4">
              <Field
                label="Farmer Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Age"
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  placeholder="e.g. 42"
                />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select gender</option>

                    {genderOptions.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              Location
            </h3>

            <div className="space-y-4">
              <Field
                label="Village"
                name="village"
                value={form.village}
                onChange={handleChange}
                placeholder="e.g. Borli Panchatan"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="District"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="e.g. Raigad"
                />

                <Field
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="e.g. Maharashtra"
                />
              </div>
            </div>
          </div>

          {/* Farm Information */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              Farm Information
            </h3>

            <div className="space-y-4">
              <Field
                label="Farm Size (acres)"
                name="farm_size"
                type="number"
                value={form.farm_size}
                onChange={handleChange}
                min="0.1"
                step="0.1"
                placeholder="e.g. 5"
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Soil Type
                </label>

                <select
                  name="soil_type"
                  value={form.soil_type}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select soil type</option>

                  {soilTypes.map((soil) => (
                    <option key={soil} value={soil}>
                      {soil}
                    </option>
                  ))}
                </select>
              </div>

              <Field
                label="Current Crop"
                name="current_crop"
                value={form.current_crop}
                onChange={handleChange}
                placeholder="e.g. Wheat"
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Water Availability
                </label>

                <select
                  name="water_availability"
                  value={form.water_availability}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select availability</option>

                  {waterOptions.map((water) => (
                    <option key={water} value={water}>
                      {water}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Sowing Date
                </label>

                <input
                  type="date"
                  name="sowing_date"
                  value={form.sowing_date}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className={inputClass}
                />

                <p className="mt-1 text-xs text-gray-400">
                  Used to calculate crop stage and upcoming tasks
                </p>
              </div>
            </div>
          </div>

          {/* Optional Location */}
          <div>
            <Field
              label="Additional Location Details (Optional)"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Near Main Road"
              required={false}
            />

            <p className="mt-1 text-xs text-gray-400">
              Optional. Village, district and state are already stored separately.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />

            {loading
              ? 'Saving...'
              : isEditing
                ? 'Update Profile'
                : 'Save Profile'}
          </button>
        </form>
      </Card>
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200'

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = true,
  ...rest
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
        {...rest}
      />
    </div>
  )
}