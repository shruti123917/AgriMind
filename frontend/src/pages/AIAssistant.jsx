import { Bot } from 'lucide-react'
import PagePlaceholder from '../components/ui/PagePlaceholder'

export default function AIAssistant() {
  return (
    <PagePlaceholder
      icon={Bot}
      title="AI Farming Assistant"
      description="Chat-style assistant that answers farming questions using your profile, crop data, and recommendation results."
      phase="Coming in Phase 6 — Context-aware chatbot"
    />
  )
}
