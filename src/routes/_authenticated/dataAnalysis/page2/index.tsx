import { createFileRoute } from '@tanstack/react-router';
import { DemoECharts } from '~/components/react-echarts';

export const Route = createFileRoute('/_authenticated/dataAnalysis/page2/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '数据分析' }],
  }),
  context: () => ({
    breadcrumb: '数据分析',
  }),
});

function RouteComponent() {
  return <DemoECharts />;
}
