import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/threeBuild/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '三维场景重建' }],
  }),
  context: () => ({
    breadcrumb: '三维场景重建',
  }),
});

function RouteComponent() {
  return <iframe style={{width:'100%',height:'100%'}} src='https://ion.cesium.com/stories/viewer/?id=e54cebfb-e227-4cae-9a7d-242c949e0cd6'/>
}
