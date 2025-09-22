import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { theme } from './theme';

// Import global styles
import.meta.glob('./styles/*.css', { eager: true });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // staleTime: 600_000, // 10 minutes
    },
  },
});

const router = createRouter({
  routeTree,
  basepath: import.meta.env.VITE_GITHUB_PAGES_URL,
  context: { queryClient },
  // hover 到 <Link /> 上时预加载路由
  defaultPreload: 'intent',
  // 由于使用 React Query，我们不希望加载器（loader）调用出现过时的数据
  // 这将确保在预加载或访问路由时始终调用加载器（loader）
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  // defaultNotFoundComponent: NotFound,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        theme={theme}
        noSsr
        modeStorageKey="app-mode"
        colorSchemeStorageKey="app-color-scheme"
        disableTransitionOnChange
      >
        <RouterProvider router={router} />
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
