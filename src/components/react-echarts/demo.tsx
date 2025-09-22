import { Grid } from '@mui/material';
import { EChartsOption } from 'echarts/types/dist/shared';
import { BaseChart } from './components/base-chart';

// 销售数据
const salesData = [
  { product: '笔记本电脑', '2021': 4300, '2022': 5000, '2023': 6800 },
  { product: '智能手机', '2021': 8500, '2022': 9200, '2023': 10500 },
  { product: '平板电脑', '2021': 2800, '2022': 3800, '2023': 4300 },
  { product: '智能手表', '2021': 1500, '2022': 2500, '2023': 3500 },
  { product: '耳机', '2021': 3200, '2022': 4500, '2023': 5800 },
];

// 用户增长数据
const userGrowthData = [
  { month: '1月', APP: 1200, 网站: 800, 小程序: 600 },
  { month: '2月', APP: 1900, 网站: 1200, 小程序: 900 },
  { month: '3月', APP: 2500, 网站: 1500, 小程序: 1200 },
  { month: '4月', APP: 3000, 网站: 1800, 小程序: 1500 },
  { month: '5月', APP: 3500, 网站: 2100, 小程序: 1800 },
  { month: '6月', APP: 4000, 网站: 2400, 小程序: 2100 },
];

// 区域分布数据
const regionData = [
  { name: '华东', value: 35 },
  { name: '华南', value: 25 },
  { name: '华北', value: 20 },
  { name: '西南', value: 10 },
  { name: '西北', value: 5 },
  { name: '东北', value: 5 },
];

// 柱状图配置
const barChartOption: EChartsOption = {
  title: {
    text: '产品销售趋势 (2021-2023)',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    top: 'bottom',
  },
  dataset: {
    source: salesData,
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      rotate: 45,
      interval: 0,
    },
  },
  yAxis: {
    type: 'value',
    name: '销售量',
  },
  series: [
    {
      type: 'bar',
      name: '2021',
      encode: {
        x: 'product',
        y: '2021',
      },
      itemStyle: {
        color: '#409EFF',
      },
    },
    {
      type: 'bar',
      name: '2022',
      encode: {
        x: 'product',
        y: '2022',
      },
      itemStyle: {
        color: '#67C23A',
      },
    },
    {
      type: 'bar',
      name: '2023',
      encode: {
        x: 'product',
        y: '2023',
      },
      itemStyle: {
        color: '#E6A23C',
      },
    },
  ],
};

// 折线图配置
const lineChartOption: EChartsOption = {
  title: {
    text: '用户增长趋势 (2023)',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 'bottom',
  },
  dataset: {
    source: userGrowthData,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    name: '用户数',
  },
  series: [
    {
      type: 'line',
      name: 'APP',
      encode: {
        x: 'month',
        y: 'APP',
      },
      smooth: true,
      lineStyle: {
        width: 3,
      },
      itemStyle: {
        color: '#409EFF',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(64, 158, 255, 0.5)',
            },
            {
              offset: 1,
              color: 'rgba(64, 158, 255, 0.1)',
            },
          ],
        },
      },
    },
    {
      type: 'line',
      name: '网站',
      encode: {
        x: 'month',
        y: '网站',
      },
      smooth: true,
      lineStyle: {
        width: 3,
      },
      itemStyle: {
        color: '#67C23A',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(103, 194, 58, 0.5)',
            },
            {
              offset: 1,
              color: 'rgba(103, 194, 58, 0.1)',
            },
          ],
        },
      },
    },
    {
      type: 'line',
      name: '小程序',
      encode: {
        x: 'month',
        y: '小程序',
      },
      smooth: true,
      lineStyle: {
        width: 3,
      },
      itemStyle: {
        color: '#E6A23C',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(230, 162, 60, 0.5)',
            },
            {
              offset: 1,
              color: 'rgba(230, 162, 60, 0.1)',
            },
          ],
        },
      },
    },
  ],
};

// 饼图配置
const pieChartOption: EChartsOption = {
  title: {
    text: '用户区域分布',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    top: 'bottom',
  },
  dataset: {
    source: regionData,
  },
  series: [
    {
      name: '区域分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      encode: {
        itemName: 'name',
        value: 'value',
      },
    },
  ],
};

export function DemoECharts() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <BaseChart option={barChartOption} style={{ height: '400px', width: '100%' }} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <BaseChart option={lineChartOption} style={{ height: '400px', width: '100%' }} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <BaseChart option={pieChartOption} style={{ height: '400px', width: '100%' }} />
      </Grid>
    </Grid>
  );
}
