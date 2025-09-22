import { useEffect, useRef, useState } from 'react';
import { debounce } from '@mui/material';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { DatasetComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { ECharts } from 'echarts/types/dist/core';
import lightTheme from '../theme/light.json';
import { UseEChartsProps } from '../types';

echarts.registerTheme('light', lightTheme);

echarts.use([
  // 图表
  BarChart,
  LineChart,
  PieChart,
  // 组件
  GridComponent,
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  // 渲染器
  CanvasRenderer,
]);

export function useECharts(options: UseEChartsProps = {}) {
  const { theme = 'light', option, renderer = 'canvas', onEvents } = options;

  const domRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<ECharts | null>(null);

  // 创建实例
  useEffect(() => {
    if (!domRef.current) return;
    const instance = echarts.init(domRef.current, theme, { renderer });

    setChart(instance);

    return () => {
      instance.dispose();
      setChart(null);
    };
  }, [theme, renderer]);

  // option 变化时自动 setOption
  useEffect(() => {
    if (!chart || !option) return;
    chart.setOption(option, { notMerge: true });
  }, [chart, option]);

  // 自动 resize
  useEffect(() => {
    if (!chart) return;
    const resize = debounce(() => chart.resize());
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [chart]);

  // 事件绑定
  useEffect(() => {
    if (!chart || !onEvents) return;
    Object.entries(onEvents).forEach(([event, callback]) => {
      chart.on(event, params => callback(params, chart));
    });
    return () => {
      chart.off();
    };
  }, [chart, onEvents]);

  return { chart, domRef };
}
