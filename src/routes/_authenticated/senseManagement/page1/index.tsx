import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/senseManagement/page1/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '场景管理-子页面1' }],
  }),
  context: () => ({
    breadcrumb: '场景管理-子页面1',
  }),
});

function RouteComponent() {
  return <div>Hello "/_authenticated/threeBuild/"!</div>;
}
