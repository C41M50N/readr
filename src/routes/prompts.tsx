import { requireAuth } from '@/auth.server'
import { AddPromptModal } from '@/components/add-prompt-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleDotIcon, PencilIcon, Trash2Icon } from 'lucide-react'

export const Route = createFileRoute('/prompts')({
  beforeLoad: async () => await requireAuth(),
  component: RouteComponent,
})

function RouteComponent() {
  // const prompts = [
  //   { id: 1, title: "Generate a list of creative blog post ideas about technology.", content: "I need some inspiration for my tech blog. Can you help me come up with a list of creative and engaging blog post ideas that will attract readers interested in the latest technology trends?" },
  //   { id: 2, title: "Write a professional email to request a meeting with a potential client.", content: "I want to reach out to a potential client to discuss our services. Can you help me draft a professional and persuasive email that will encourage them to schedule a meeting with me?" },
  //   { id: 3, title: "Create a social media post promoting our new product launch.", content: "We are launching a new product next week and I need a catchy social media post to promote it. Can you help me create an engaging post that highlights the key features and benefits of our new product? Lorem ipsum dolor sit amet. Consectetur adipiscing elit." },
  //   { id: 4, title: "Develop a content strategy for our company's blog.", content: "Our company wants to improve its blog and attract more readers. Can you help me develop a comprehensive content strategy that includes topic ideas, posting frequency, and promotion tactics? Lorem ipsum dolor sit amet, consectetur adipiscing elit. And here's a new idea to consider." },
  //   { id: 5, title: "Write a persuasive product description for our e-commerce website.", content: "We need compelling product descriptions for our e-commerce website to boost sales. Can you help me write persuasive and informative descriptions that highlight the features and benefits of our products? Lorem ipsum dolor sit amet, consectetur adipiscing elit. And here's another idea. Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  // ];

  const { data: prompts } = useSuspenseQuery(convexQuery(api.features.prompts.queries.getMyPrompts, {}));

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto max-w-5xl py-2">
        <div className="pl-6 pr-6 pt-4 pb-4">
          <h1 className="text-2xl font-bold mb-0.5">prompt vault</h1>
          <p className="text-gray-600">browse and manage your collection of prompts</p>
        </div>
        <div className="px-6 flex flex-row items-center justify-between gap-5">
          <Input
            type="text"
            placeholder="search prompts..."
            className="w-full"
          />
          <AddPromptModal />
        </div>
      </div>

      <div className="mt-3 mx-auto max-w-5xl">
        {prompts.length === 0 ? (
          <div className="pt-16 px-6 flex flex-col items-center justify-center gap-2">
            <span className="text-gray-500">you don't have any prompts yet.</span>
          </div>
        ) : (
          <div className="px-6 flex flex-col items-center justify-center gap-3">
            {prompts.map((prompt) => (
              <div key={prompt._id} className="group relative w-full p-4 pl-6 border border-gray-200">
                <h2 className="mb-1 text-lg font-semibold">{prompt.title}</h2>
                <p className="max-w-[90%] text-gray-600 text-ellipsis line-clamp-2">{prompt.text}</p>
                <div className="absolute top-1.5 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button variant="ghost" size="icon">
                    <CircleDotIcon />
                    <span className="sr-only">Use</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <PencilIcon />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2Icon />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
