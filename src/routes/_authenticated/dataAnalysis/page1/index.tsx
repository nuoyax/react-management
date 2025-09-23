import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Table, Form, Input, Button, Select, Space, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const Route = createFileRoute('/_authenticated/dataAnalysis/page1/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '应急演练数据分析' }],
  }),
  context: () => ({
    breadcrumb: '应急演练分析',
  }),
});

interface Drill {
  key: number;
  drillId: string; // 演练编号
  drillName: string; // 演练名称
  type: string; // 演练类型
  location: string; // 场所类型
  date: string; // 演练日期
  organizer: string; // 主办单位
  participants: number; // 参与人数
  evacTime: number; // 平均疏散时间(分钟)
  score: number; // 评分
}

const initialData: Drill[] = [
  {
    key: 1,
    drillId: 'DRL2025-001',
    drillName: '中心公园消防演练',
    type: '消防',
    location: '公园',
    date: '2025-09-15',
    organizer: '市应急管理局',
    participants: 150,
    evacTime: 4.35,
    score: 8.5,
  },
  {
    key: 2,
    drillId: 'DRL2025-002',
    drillName: '第一中学地震演练',
    type: '地震',
    location: '学校',
    date: '2025-09-18',
    organizer: '教育局',
    participants: 300,
    evacTime: 5.2,
    score: 9.2,
  },
  {
    key: 3,
    drillId: 'DRL2025-003',
    drillName: '市医院火灾疏散演练',
    type: '消防',
    location: '医院',
    date: '2025-09-20',
    organizer: '市卫生局',
    participants: 120,
    evacTime: 3.9,
    score: 8.8,
  },
  {
    key: 4,
    drillId: 'DRL2025-004',
    drillName: '大型商场防火演练',
    type: '消防',
    location: '商场',
    date: '2025-09-22',
    organizer: '消防支队',
    participants: 200,
    evacTime: 4.5,
    score: 8.6,
  },
  {
    key: 5,
    drillId: 'DRL2025-005',
    drillName: '社区防汛应急演练',
    type: '水灾',
    location: '社区',
    date: '2025-09-24',
    organizer: '市应急管理局',
    participants: 80,
    evacTime: 6.0,
    score: 8.0,
  },
  {
    key: 6,
    drillId: 'DRL2025-006',
    drillName: '工业园区化学品泄漏演练',
    type: '化学',
    location: '工业园',
    date: '2025-09-26',
    organizer: '安全生产管理局',
    participants: 60,
    evacTime: 5.8,
    score: 8.3,
  },
  {
    key: 7,
    drillId: 'DRL2025-007',
    drillName: '地铁火灾疏散演练',
    type: '消防',
    location: '地铁站',
    date: '2025-09-28',
    organizer: '地铁公司',
    participants: 180,
    evacTime: 4.2,
    score: 8.9,
  },
  {
    key: 8,
    drillId: 'DRL2025-008',
    drillName: '高层建筑地震应急演练',
    type: '地震',
    location: '写字楼',
    date: '2025-09-30',
    organizer: '应急管理局',
    participants: 90,
    evacTime: 5.5,
    score: 9.0,
  },
  {
    key: 9,
    drillId: 'DRL2025-009',
    drillName: '学校化学实验室泄漏演练',
    type: '化学',
    location: '学校',
    date: '2025-10-02',
    organizer: '教育局',
    participants: 50,
    evacTime: 4.8,
    score: 8.7,
  },
  {
    key: 10,
    drillId: 'DRL2025-010',
    drillName: '社区火灾疏散演练',
    type: '消防',
    location: '社区',
    date: '2025-10-04',
    organizer: '社区居委会',
    participants: 70,
    evacTime: 4.1,
    score: 8.4,
  },
];

function RouteComponent() {
  const [form] = Form.useForm();
  const [data, setData] = useState<Drill[]>(initialData);

  const columns: ColumnsType<Drill> = [
    { title: '演练编号', dataIndex: 'drillId', key: 'drillId' },
    { title: '演练名称', dataIndex: 'drillName', key: 'drillName' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '场所', dataIndex: 'location', key: 'location' },
    { title: '演练日期', dataIndex: 'date', key: 'date' },
    { title: '主办单位', dataIndex: 'organizer', key: 'organizer' },
    { title: '参与人数', dataIndex: 'participants', key: 'participants' },
    { title: '平均疏散时间(分钟)', dataIndex: 'evacTime', key: 'evacTime' },
    { title: '评分', dataIndex: 'score', key: 'score' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button size="small" type="link">
            详情
          </Button>
        </Space>
      ),
    },
  ];

  // 查询
  const handleSearch = () => {
    const { drillId, type, location, minScore } = form.getFieldsValue();
    const filtered = initialData.filter(
      item =>
        (!drillId || item.drillId.includes(drillId)) &&
        (!type || item.type === type) &&
        (!location || item.location === location) &&
        (!minScore || item.score >= minScore),
    );
    setData(filtered);
  };

  // 重置
  const handleReset = () => {
    form.resetFields();
    setData(initialData);
  };

  return (
    <div style={{ padding: 24 }}>
      {/* 查询表单 */}
      <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="drillId" label="演练编号">
          <Input placeholder="请输入演练编号" allowClear />
        </Form.Item>
        <Form.Item name="type" label="类型">
          <Select placeholder="请选择类型" allowClear style={{ width: 120 }}>
            <Select.Option value="消防">消防</Select.Option>
            <Select.Option value="地震">地震</Select.Option>
            <Select.Option value="防汛">防汛</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="location" label="场所">
          <Select placeholder="请选择场所" allowClear style={{ width: 120 }}>
            <Select.Option value="学校">学校</Select.Option>
            <Select.Option value="公园">公园</Select.Option>
            <Select.Option value="企业">企业</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="minScore" label="最低评分">
          <InputNumber min={0} max={10} placeholder="输入分数" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      {/* 表格 */}
      <Table<Drill> columns={columns} dataSource={data} pagination={{ pageSize: 10 }} bordered />
    </div>
  );
}
