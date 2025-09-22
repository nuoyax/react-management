import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, HeadContent, Outlet } from '@tanstack/react-router';
import { Loader } from '~/components/loader';
import { useVersionChecker } from '~/hooks';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; breadcrumb?: string }>()({
  component: RootComponent,
  pendingComponent: () => (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  ),
});

function RootComponent() {
  useVersionChecker();

  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  );
}
