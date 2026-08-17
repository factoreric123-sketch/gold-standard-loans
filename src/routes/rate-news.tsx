import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rate-news')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/rate-news"!</div>
}
