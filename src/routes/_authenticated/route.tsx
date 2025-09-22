import { createFileRoute, redirect } from '@tanstack/react-router';
import { AuthenticatedLayout } from '~/components/layout/authenticated-layout';

export const Route = createFileRoute('/_authenticated')({
  loader: () => {
    const user = localStorage.getItem('user');
    if (!user) {
      throw redirect({ to: '/login', replace: true });
    }
    return;
  },
  component: AuthenticatedLayout,
  head: () => ({
    meta: [{ title: '管理后台' }],
  }),
});
