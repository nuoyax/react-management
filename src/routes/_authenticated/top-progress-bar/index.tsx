import { useRef } from 'react';
import { Button, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { TopLoadingBar, type TopLoadingBarRef } from '~/components/top-loading-bar';

export const Route = createFileRoute('/_authenticated/top-progress-bar/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '进度条演示' }],
  }),
  context: () => ({
    breadcrumb: '进度条演示',
  }),
});

function RouteComponent() {
  const barRef = useRef<TopLoadingBarRef | null>(null);
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button onClick={() => barRef.current?.start()} color="primary">
          开始加载
        </Button>
        <Button onClick={() => barRef.current?.complete()} color="primary">
          完成加载
        </Button>
      </Stack>
      <TopLoadingBar ref={barRef} />
    </>
  );
}
