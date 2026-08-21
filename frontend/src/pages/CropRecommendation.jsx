import { useState } from 'react'
import {
  Sprout,
  Loader2,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react'

import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { getCropRecommendation } from '../services/api'


const initialForm = {
  N: '',
  P: '',
  K: '',
  temperature: '',
  humidity: '',
  ph: '',
  rainfall: '',
}


export default function CropRecommendation() {
  const [form, setForm] = useState(initialForm)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')
    setRecommendations([])

    try {
      const payload = {
        N: Number(form.N),
        P: Number(form.P),
        K: Number(form.K),
        temperature: Number(form.temperature),
        humidity: Number(form.humidity),
        ph: Number(form.ph),
        rainfall: Number(form.rainfall),
      }

      const response = await getCropRecommendation(payload)

      setRecommendations(response.data.recommendations)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Unable to generate crop recommendations.'
      )
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary-100 p-3">
            <Sprout className="h-6 w-6 text-primary-700" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Crop Recommendation
            </h1>

            <p className="text-sm text-gray-500">
              Get ML-powered crop recommendations based on soil and climate
              conditions.
            </p>
          </div>
        </div>
      </div>


      {/* Input Form */}
      <Card
        title="Farm Conditions"
        subtitle="Enter the current soil and environmental values"
      >
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Soil Nutrients
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              <Input
                label="Nitrogen (N)"
                name="N"
                value={form.N}
                onChange={handleChange}
                placeholder="e.g. 90"
                min="0"
                max="200"
              />

              <Input
                label="Phosphorus (P)"
                name="P"
                value={form.P}
                onChange={handleChange}
                placeholder="e.g. 42"
                min="0"
                max="200"
              />

              <Input
                label="Potassium (K)"
                name="K"
                value={form.K}
                onChange={handleChange}
                placeholder="e.g. 43"
                min="0"
                max="250"
              />

            </div>
          </div>


          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Environmental Conditions
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <Input
                label="Temperature (°C)"
                name="temperature"
                value={form.temperature}
                onChange={handleChange}
                placeholder="e.g. 25"
                min="-10"
                max="60"
                step="0.1"
              />

              <Input
                label="Humidity (%)"
                name="humidity"
                value={form.humidity}
                onChange={handleChange}
                placeholder="e.g. 80"
                min="0"
                max="100"
                step="0.1"
              />

              <Input
                label="Soil pH"
                name="ph"
                value={form.ph}
                onChange={handleChange}
                placeholder="e.g. 6.5"
                min="0"
                max="14"
                step="0.1"
              />

              <Input
                label="Rainfall (mm)"
                name="rainfall"
                value={form.rainfall}
                onChange={handleChange}
                placeholder="e.g. 200"
                min="0"
                max="1000"
                step="0.1"
              />

            </div>
          </div>


          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sprout className="h-5 w-5" />
                Get Crop Recommendation
              </>
            )}
          </button>

        </form>
      </Card>


      {/* Results */}
      {recommendations.length > 0 && (
        <Card
          title="Recommended Crops"
          subtitle="Based on the conditions you entered"
        >

          <div className="space-y-4">

            {recommendations.map((recommendation, index) => (
              <div
                key={recommendation.crop}
                className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {recommendation.crop}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      {index === 0 && (
                        <Badge
                          label="Best Match"
                          variant="primary"
                        />
                      )}

                      <span className="text-xs text-gray-400">
                        Model suitability score
                      </span>
                    </div>
                  </div>

                </div>


                <div className="text-right">

                  <div className="flex items-center gap-1 text-lg font-bold text-primary-700">
                    <TrendingUp className="h-4 w-4" />
                    {recommendation.score}%
                  </div>

                  <p className="text-xs text-gray-400">
                    suitability
                  </p>

                </div>

              </div>
            ))}

          </div>


          <div className="mt-5 flex items-start gap-2 rounded-lg bg-primary-50 p-4 text-xs text-primary-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

            <p>
              These scores represent the model's relative suitability
              probabilities for the entered conditions. They should be used
              as decision support alongside local agricultural advice and
              current market conditions.
            </p>
          </div>

        </Card>
      )}

    </div>
  )
}


function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  min,
  max,
  step = '1',
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
      />
    </div>
  )
}