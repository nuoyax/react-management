import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/pokemon/$id')({
  component: RouteComponent,
  head: ({ params }) => ({
    meta: [{ title: `宝可梦 #${params.id}` }],
  }),
  context: ({ params }) => ({
    breadcrumb: `宝可梦 #${params.id}`,
  }),
});

function RouteComponent() {
  const id = Route.useParams().id;
  console.log('id 👉：', { id });
  return <div>Hello "/_authenticated/pokemon/$id/"! {id}</div>;
}
