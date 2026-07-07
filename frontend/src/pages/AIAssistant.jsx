import { Bot, Construction } from 'lucide-react'
import Card from '../components/ui/Card'

export default function AIAssistant() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <div className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
            <Bot className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">AI Farming Assistant</h3>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Chat-style assistant that answers farming questions using your profile,
            crop data, and recommendation results.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm text-amber-700">
            <Construction className="h-4 w-4" />
            Coming in Phase 6
          </div>
        </div>
      </Card>
    </div>
  )
}
