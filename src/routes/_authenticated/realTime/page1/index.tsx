import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/realTime/page1/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <iframe width="100%" height="100%" src="http://localhost:8081/assets/addons/cesiummapv/vue3/#/" />;
}
