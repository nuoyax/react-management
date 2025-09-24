import { createFileRoute } from '@tanstack/react-router';
import { DemoECharts } from '~/components/react-echarts';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '首页' }],
  }),
});

function RouteComponent() {
  return (
    <video width="100%" height="800" autoPlay muted loop playsInline>
      <source src={`/react-management/docker.mp4`} type="video/mp4" />
      您的浏览器不支持 video 标签。
    </video>
  );
}
