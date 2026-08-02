import { Construction } from 'lucide-react'
import Card from './Card'
import EmptyState from './EmptyState'

/**
 * Standard "coming soon" page layout for modules not yet built.
 */
export default function PagePlaceholder({ icon, title, description, phase }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <EmptyState
          icon={icon || Construction}
          title={title}
          description={description}
        />
        {phase && (
          <p className="pb-6 text-center text-xs text-gray-400">{phase}</p>
        )}
      </Card>
    </div>
  )
}
