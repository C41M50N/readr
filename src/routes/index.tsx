import { requireAuth } from '@/auth.server'
import { ContentCard } from '@/components/content-card'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async () => await requireAuth(),
  component: App
})

function App() {
  const { data: contents } = useSuspenseQuery(convexQuery(api.features.content.queries.getInboxContents, {}));

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <div className="pl-6 pr-6 pt-4 pb-4">
        <h1 className="text-2xl font-bold mb-0.5">Inbox</h1>
        <p className="text-gray-600">Welcome to your inbox! Here you can find all your recent content.</p>
      </div>
      <div className="px-6 pb-6 flex flex-col items-center justify-center gap-2">
        {contents.length > 0 ? (
          contents.map((content) => (
            <ContentCard key={content._id.toString()} content={content} />
          ))
        ) : (
          <span className="text-gray-500">No content available.</span>
        )}
      </div>
    </div>
  )
}
