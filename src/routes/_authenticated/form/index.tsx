import { createFileRoute } from '@tanstack/react-router';
import { UserForm } from '~/modules/form/components/user-form';

export const Route = createFileRoute('/_authenticated/form/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '表单' }],
  }),
  context: () => ({
    breadcrumb: '用户表单',
  }),
});

function RouteComponent() {
  return (
    <div>
      <UserForm />
    </div>
  );
}
