import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/realTime/page1/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/realTime/page1/"!</div>;
}
