import { useState } from 'react'
import {
  BarChart3,
  Loader2,
  AlertCircle,
  Wheat,
  Factory,
} from 'lucide-react'

import Card from '../components/ui/Card'
import { getYieldPrediction } from '../services/api'


const initialForm = {
  year: new Date().getFullYear(),
  state: 'Maharashtra',
  crop: 'Rice',
  season: 'Kharif',
  area: '',
  annual_rainfall: '',
  fertilizer: '',
  pesticide: '',
}


export default function YieldPrediction() {

  const [form, setForm] = useState(
    initialForm
  )

  const [result, setResult] = useState(null)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')


  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target

    setForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    )
  }


  const handleSubmit = async (event) => {

    event.preventDefault()

    setLoading(true)

    setError('')

    setResult(null)

    try {

      const payload = {
        year: Number(form.year),

        state: form.state.trim(),

        crop: form.crop.trim(),

        season: form.season,

        area: Number(form.area),

        annual_rainfall: Number(
          form.annual_rainfall
        ),

        fertilizer: Number(
          form.fertilizer
        ),

        pesticide: Number(
          form.pesticide
        ),
      }


      const response =
        await getYieldPrediction(
          payload
        )


      setResult(
        response.data
      )

    } catch (err) {

      setError(
        err.response?.data?.detail ||
        'Unable to predict crop yield.'
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

            <BarChart3
              className="h-6 w-6 text-primary-700"
            />

          </div>


          <div>

            <h1 className="text-2xl font-bold text-gray-800">

              Yield Prediction

            </h1>


            <p className="text-sm text-gray-500">

              Estimate crop yield using historical
              agricultural data and machine learning.

            </p>

          </div>

        </div>

      </div>


      {/* Input Form */}

      <Card
        title="Crop & Farm Information"
        subtitle="Enter the conditions used by the yield prediction model"
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Crop Information */}

          <div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">

              Crop Information

            </h3>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <Input
                label="Year"
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                min="1990"
                max="2100"
              />


              <Select
                label="Season"
                name="season"
                value={form.season}
                onChange={handleChange}
                options={[
                  'Kharif',
                  'Rabi',
                  'Whole Year',
                  'Summer',
                  'Winter',
                  'Autumn',
                ]}
              />


              <Input
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="e.g. Maharashtra"
              />


              <Input
                label="Crop"
                name="crop"
                value={form.crop}
                onChange={handleChange}
                placeholder="e.g. Rice"
              />

            </div>

          </div>


          {/* Farm Information */}

          <div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">

              Farm & Resource Information

            </h3>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <Input
                label="Farm Area"
                name="area"
                type="number"
                value={form.area}
                onChange={handleChange}
                placeholder="e.g. 5"
                min="0.01"
                step="0.01"
              />


              <Input
                label="Annual Rainfall (mm)"
                name="annual_rainfall"
                type="number"
                value={form.annual_rainfall}
                onChange={handleChange}
                placeholder="e.g. 1000"
                min="0"
                step="0.1"
              />


              <Input
                label="Fertilizer Usage"
                name="fertilizer"
                type="number"
                value={form.fertilizer}
                onChange={handleChange}
                placeholder="e.g. 200"
                min="0"
                step="0.1"
              />


              <Input
                label="Pesticide Usage"
                name="pesticide"
                type="number"
                value={form.pesticide}
                onChange={handleChange}
                placeholder="e.g. 50"
                min="0"
                step="0.1"
              />

            </div>

          </div>


          {/* Error */}

          {error && (

            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">

              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0"
              />

              <span>
                {error}
              </span>

            </div>

          )}


          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (

              <>

                <Loader2
                  className="h-5 w-5 animate-spin"
                />

                Predicting...

              </>

            ) : (

              <>

                <BarChart3
                  className="h-5 w-5"
                />

                Predict Yield

              </>

            )}

          </button>

        </form>

      </Card>


      {/* Results */}

      {result && (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <ResultCard
            icon={Wheat}
            title="Predicted Yield"
            value={result.predicted_yield}
            unit={result.unit}
          />


          <ResultCard
            icon={Factory}
            title="Estimated Production"
            value={result.estimated_production}
            unit={result.production_unit}
          />

        </div>

      )}


      {result && (

        <Card
          title="Prediction Note"
          subtitle="How to interpret this result"
        >

          <p className="text-sm leading-6 text-gray-600">

            This prediction is generated from a
            machine-learning model trained on historical
            Indian crop production data. It is intended
            as a decision-support estimate and should
            be combined with current weather, soil
            conditions, farming practices and local
            agricultural guidance.

          </p>

        </Card>

      )}

    </div>
  )
}


/* ============================================================
   INPUT COMPONENT
============================================================ */

function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
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


/* ============================================================
   SELECT COMPONENT
============================================================ */

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {

  return (

    <div>

      <label className="mb-1.5 block text-sm font-medium text-gray-700">

        {label}

      </label>


      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
      >

        {options.map(
          (option) => (

            <option
              key={option}
              value={option}
            >
              {option}
            </option>

          )
        )}

      </select>

    </div>
  )
}


/* ============================================================
   RESULT CARD
============================================================ */

function ResultCard({
  icon: Icon,
  title,
  value,
  unit,
}) {

  return (

    <Card>

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-primary-100 p-3">

          <Icon
            className="h-6 w-6 text-primary-700"
          />

        </div>


        <div>

          <p className="text-sm text-gray-500">

            {title}

          </p>


          <div className="mt-1 flex items-baseline gap-2">

            <span className="text-3xl font-bold text-gray-800">

              {value}

            </span>


            <span className="text-sm text-gray-500">

              {unit}

            </span>

          </div>

        </div>

      </div>

    </Card>

  )
}