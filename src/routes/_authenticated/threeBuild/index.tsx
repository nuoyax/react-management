import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/threeBuild/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '三维场景重建' }],
  }),
  context: () => ({
    breadcrumb: '三维场景重建',
  }),
});

function RouteComponent() {
  return <div>Hello "/_authenticated/threeBuild/"!</div>;
}
