import { createFileRoute } from '@tanstack/react-router';
import { DemoECharts } from '~/components/react-echarts';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '首页' }],
  }),
});

function RouteComponent() {
  return <DemoECharts />;
}
