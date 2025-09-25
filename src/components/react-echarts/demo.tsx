import { Grid } from '@mui/material';
import { EChartsOption } from 'echarts/types/dist/shared';
import { BaseChart } from './components/base-chart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// 卡片数据
const cardData = [
  { label: '累计演练次数', value: 268 },
  { label: '累计参与人数', value: 18650 },
  { label: '消防演练次数', value: 72 },
  { label: '防汛演练次数', value: 55 },
  { label: '地震演练次数', value: 40 },
  { label: '危险化学品演练次数', value: 30 },
];

// 演练类型年度趋势
const drillTypeYearly = [
  { type: '消防演练', '2021': 35, '2022': 50, '2023': 72 },
  { type: '防汛演练', '2021': 22, '2022': 28, '2023': 55 },
  { type: '地震演练', '2021': 15, '2022': 18, '2023': 40 },
  { type: '交通事故演练', '2021': 18, '2022': 25, '2023': 36 },
  { type: '危险化学品演练', '2021': 10, '2022': 15, '2023': 30 },
];

// 参与人员结构（2023月度）
const participantData = [
  { month: '1月', 政府机关: 400, 学校: 300, 企事业单位: 200, 居民: 350 },
  { month: '2月', 政府机关: 600, 学校: 500, 企事业单位: 300, 居民: 450 },
  { month: '3月', 政府机关: 750, 学校: 600, 企事业单位: 400, 居民: 600 },
  { month: '4月', 政府机关: 900, 学校: 700, 企事业单位: 500, 居民: 650 },
  { month: '5月', 政府机关: 1100, 学校: 900, 企事业单位: 600, 居民: 800 },
  { month: '6月', 政府机关: 1300, 学校: 1000, 企事业单位: 700, 居民: 900 },
];

// 区域分布
const regionData = [
  { name: '市中心', value: 35 },
  { name: '高新区', value: 25 },
  { name: '工业园区', value: 20 },
  { name: '郊区', value: 12 },
  { name: '乡镇', value: 8 },
];

// 近一周演练数据
const weeklyData = [
  { day: 'Mon', 消防: 2, 防汛: 1, 地震: 0, 交通事故: 1 },
  { day: 'Tue', 消防: 3, 防汛: 1, 地震: 1, 交通事故: 0 },
  { day: 'Wed', 消防: 2, 防汛: 2, 地震: 1, 交通事故: 1 },
  { day: 'Thu', 消防: 4, 防汛: 1, 地震: 0, 交通事故: 2 },
  { day: 'Fri', 消防: 1, 防汛: 2, 地震: 1, 交通事故: 1 },
  { day: 'Sat', 消防: 3, 防汛: 1, 地震: 1, 交通事故: 2 },
  { day: 'Sun', 消防: 2, 防汛: 2, 地震: 0, 交通事故: 1 },
];

// 📊 图表配置

// 柱状图：演练类型年度趋势
const barChartOption: EChartsOption = {
  title: { text: '演练类型年度趋势 (2021-2023)', left: 'center' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { top: 'bottom' },
  dataset: { source: drillTypeYearly },
  xAxis: { type: 'category' },
  yAxis: { type: 'value', name: '演练次数' },
  series: [
    { type: 'bar', name: '2021', encode: { x: 'type', y: '2021' }, itemStyle: { color: '#409EFF' } },
    { type: 'bar', name: '2022', encode: { x: 'type', y: '2022' }, itemStyle: { color: '#67C23A' } },
    { type: 'bar', name: '2023', encode: { x: 'type', y: '2023' }, itemStyle: { color: '#E6A23C' } },
  ],
};

// 折线图：参与人员增长
const lineChartOption: EChartsOption = {
  title: { text: '2023年各月参与人员结构', left: 'center' },
  tooltip: { trigger: 'axis' },
  legend: { top: 'bottom' },
  dataset: { source: participantData },
  xAxis: { type: 'category' },
  yAxis: { type: 'value', name: '人数' },
  series: [
    { type: 'line', name: '政府机关', encode: { x: 'month', y: '政府机关' }, smooth: true },
    { type: 'line', name: '学校', encode: { x: 'month', y: '学校' }, smooth: true },
    { type: 'line', name: '企事业单位', encode: { x: 'month', y: '企事业单位' }, smooth: true },
    { type: 'line', name: '居民', encode: { x: 'month', y: '居民' }, smooth: true },
  ],
};

// 饼图：区域分布
const pieChartOption: EChartsOption = {
  title: { text: '2023年演练区域分布', left: 'center' },
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  legend: { top: 'bottom' },
  dataset: { source: regionData },
  color: ['#5470C6', '#91CC75', '#EE6666', '#FAC858', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'], // 🎨 多种颜色
  series: [
    {
      name: '区域分布',
      type: 'pie',
      radius: ['40%', '70%'],
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      encode: { itemName: 'name', value: 'value' },
    },
  ],
};

// 堆叠柱状图：近一周演练次数
const weeklyChartOption: EChartsOption = {
  title: { text: '近一周演练类型统计', left: 'center' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { top: 'bottom' },
  dataset: { source: weeklyData },
  xAxis: { type: 'category' },
  yAxis: { type: 'value', name: '次数' },
  series: [
    { type: 'bar', name: '消防', stack: 'total', encode: { x: 'day', y: '消防' }, itemStyle: { color: '#ff4d4f' } },
    { type: 'bar', name: '防汛', stack: 'total', encode: { x: 'day', y: '防汛' }, itemStyle: { color: '#36cfc9' } },
    { type: 'bar', name: '地震', stack: 'total', encode: { x: 'day', y: '地震' }, itemStyle: { color: '#faad14' } },
    {
      type: 'bar',
      name: '交通事故',
      stack: 'total',
      encode: { x: 'day', y: '交通事故' },
      itemStyle: { color: '#9254de' },
    },
  ],
};

// 🚀 主组件
export function DemoECharts() {
  return (
    <div style={{ margin: '50px' }}>
      <Grid container spacing={10}>
        {cardData.map((c, i) => (
          <Grid size={{ xs: 12, md: 2 }} key={i}>
            <Card variant="outlined" sx={{ minWidth: 200, textAlign: 'center' }}>
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  {c.label}
                </Typography>
                <Typography variant="h5" component="div">
                  {c.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} style={{ marginTop: '50px' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseChart option={barChartOption} style={{ height: '400px', width: '100%' }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseChart option={lineChartOption} style={{ height: '400px', width: '100%' }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseChart option={pieChartOption} style={{ height: '400px', width: '100%' }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseChart option={weeklyChartOption} style={{ height: '400px', width: '100%' }} />
        </Grid>
      </Grid>
    </div>
  );
}
