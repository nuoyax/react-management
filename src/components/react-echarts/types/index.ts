import type { EChartsOption, EChartsType } from 'echarts/types/dist/shared';
import { useECharts } from '../hooks/use-echarts';

export interface UseEChartsProps {
  option?: EChartsOption;
  theme?: string | object;
  renderer?: 'canvas' | 'svg';
  onEvents?: Record<string, (params: any, instance: EChartsType) => void>;
}

export interface BaseChartProps extends UseEChartsProps {
  ref?: React.Ref<{ chart: ReturnType<typeof useECharts>['chart'] }>;
  className?: string;
  style?: React.CSSProperties;
}
