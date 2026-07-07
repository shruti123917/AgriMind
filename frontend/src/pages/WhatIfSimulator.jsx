import { FlaskConical, Construction } from 'lucide-react'
import Card from '../components/ui/Card'

export default function WhatIfSimulator() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <div className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
            <FlaskConical className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">What-If Simulator</h3>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Test scenarios like &quot;What if rainfall decreases?&quot; or
            &quot;What if I choose another crop?&quot; and see how yield and profit change.
          </p>
          <div className="mt-4 rounded-xl bg-purple-50 p-4 text-left text-sm text-purple-800">
            <p className="font-medium">Example scenarios:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-purple-700">
              <li>Rainfall decreases by 20%</li>
              <li>Switch from Wheat to Rice</li>
              <li>Fertilizer cost increases by 15%</li>
            </ul>
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm text-amber-700">
            <Construction className="h-4 w-4" />
            Coming in Phase 5 — Unique project feature
          </div>
        </div>
      </Card>
    </div>
  )
}
