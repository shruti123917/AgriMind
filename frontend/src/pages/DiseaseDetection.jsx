import { Bug } from 'lucide-react'
import PagePlaceholder from '../components/ui/PagePlaceholder'

export default function DiseaseDetection() {
  return (
    <PagePlaceholder
      icon={Bug}
      title="Disease Detection"
      description="Upload crop leaf images to detect common diseases. This module will use image analysis to identify issues and suggest treatments."
      phase="Coming in Phase 4 — Image-based disease detection"
    />
  )
}
