import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/visionMixin/page1/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/visionMixin/page1/"!</div>;
}
