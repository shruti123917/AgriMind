import { Sprout } from 'lucide-react'
import PagePlaceholder from '../components/ui/PagePlaceholder'

export default function CropRecommendation() {
  return (
    <PagePlaceholder
      icon={Sprout}
      title="Crop Recommendation System"
      description="Enter soil nutrients (N, P, K), temperature, humidity, pH, and rainfall to get ML-powered crop recommendations with suitability scores."
      phase="Coming in Phase 2 — Scikit-learn classifier"
    />
  )
}
