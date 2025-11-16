import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/prompts/$promptId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/prompts/$promptId"!</div>
}
