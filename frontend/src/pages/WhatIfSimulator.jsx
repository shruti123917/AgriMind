import { FlaskConical } from 'lucide-react'
import PagePlaceholder from '../components/ui/PagePlaceholder'

export default function WhatIfSimulator() {
  return (
    <PagePlaceholder
      icon={FlaskConical}
      title="What-If Simulator"
      description="Test scenarios like reduced rainfall, crop switching, or cost changes and see how yield and profit may change."
      phase="Coming in Phase 5 — Unique project feature"
    />
  )
}
