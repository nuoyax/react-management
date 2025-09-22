import { useImperativeHandle } from 'react';
import { useECharts } from '../hooks/use-echarts';
import { BaseChartProps } from '../types';

export function BaseChart({ ref, className, style, ...rest }: BaseChartProps) {
  const { chart, domRef } = useECharts(rest);

  useImperativeHandle(
    ref,
    () => ({
      chart,
    }),
    [chart],
  );

  return <div ref={domRef} className={className} style={style} />;
}
