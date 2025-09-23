import { createFileRoute, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Table, Form, Input, Button, Select, Space, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const Route = createFileRoute('/_authenticated/trainSupport/page1/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '应急演练培训' }],
  }),
  context: () => ({
    breadcrumb: '应急演练培训',
  }),
});

interface Training {
  key: number;
  trainingId: string; // 培训编号
  drillId: string; // 关联演练编号
  name: string; // 培训名称
  type: string; // 培训类型
  trainer: string; // 培训讲师
  location: string; // 培训地点
  date: string; // 培训时间
  participants: number; // 参训人数
  avgScore: number; // 平均成绩
  feedback: number; // 反馈评分
}

const initialData: Training[] = [
  {
    key: 1,
    trainingId: 'TR2025092301',
    drillId: 'DR2025092001',
    name: '消防安全知识培训',
    type: '安全培训',
    trainer: '张伟',
    location: '北京总部会议室A',
    date: '2025-09-23 09:00',
    participants: 35,
    avgScore: 88,
    feedback: 4.6,
  },
  {
    key: 2,
    trainingId: 'TR2025092302',
    drillId: 'DR2025092102',
    name: '地震应急演练复盘培训',
    type: '应急演练复盘',
    trainer: '李丽',
    location: '上海分公司培训室1',
    date: '2025-09-24 14:00',
    participants: 28,
    avgScore: 82,
    feedback: 4.4,
  },
  {
    key: 3,
    trainingId: 'TR2025092303',
    drillId: 'DR2025092103',
    name: '急救基础知识培训',
    type: '医疗急救',
    trainer: '王强',
    location: '广州分公司多功能厅',
    date: '2025-09-25 10:30',
    participants: 42,
    avgScore: 91,
    feedback: 4.8,
  },
  {
    key: 4,
    trainingId: 'TR2025092304',
    drillId: 'DR2025092104',
    name: '火灾疏散流程讲解',
    type: '消防培训',
    trainer: '赵敏',
    location: '深圳南山园区会议室B',
    date: '2025-09-26 09:00',
    participants: 30,
    avgScore: 85,
    feedback: 4.5,
  },
  {
    key: 5,
    trainingId: 'TR2025092305',
    drillId: 'DR2025092105',
    name: '化学品泄漏应急处理',
    type: '安全培训',
    trainer: '陈刚',
    location: '天津滨海工业区培训楼101',
    date: '2025-09-27 13:30',
    participants: 25,
    avgScore: 87,
    feedback: 4.7,
  },
  {
    key: 6,
    trainingId: 'TR2025092306',
    drillId: 'DR2025092106',
    name: '台风防范及应急演练',
    type: '自然灾害应对',
    trainer: '刘芳',
    location: '厦门鼓浪屿培训基地',
    date: '2025-09-28 15:00',
    participants: 33,
    avgScore: 90,
    feedback: 4.9,
  },
  {
    key: 7,
    trainingId: 'TR2025092307',
    drillId: 'DR2025092107',
    name: '地铁火灾应急逃生技巧',
    type: '公共安全',
    trainer: '孙凯',
    location: '杭州地铁运营中心',
    date: '2025-09-29 09:30',
    participants: 40,
    avgScore: 84,
    feedback: 4.3,
  },
  {
    key: 8,
    trainingId: 'TR2025092308',
    drillId: 'DR2025092108',
    name: '高层建筑应急疏散',
    type: '消防培训',
    trainer: '周洁',
    location: '重庆解放碑大厦会议室',
    date: '2025-09-30 10:00',
    participants: 38,
    avgScore: 89,
    feedback: 4.7,
  },
  {
    key: 9,
    trainingId: 'TR2025092309',
    drillId: 'DR2025092109',
    name: '大型活动安保协调培训',
    type: '安保培训',
    trainer: '黄磊',
    location: '武汉光谷广场安保中心',
    date: '2025-10-01 14:00',
    participants: 50,
    avgScore: 86,
    feedback: 4.5,
  },
  {
    key: 10,
    trainingId: 'TR2025092310',
    drillId: 'DR2025092110',
    name: '医院电梯困人应急处理',
    type: '医疗急救',
    trainer: '邓翔',
    location: '天津滨海医院演练室',
    date: '2025-10-02 09:00',
    participants: 27,
    avgScore: 92,
    feedback: 4.8,
  },
];

function RouteComponent() {
  const [form] = Form.useForm();
  const [data, setData] = useState<Training[]>(initialData);
  const navigate = useNavigate<any>();
  const columns: ColumnsType<Training> = [
    { title: '培训编号', dataIndex: 'trainingId', key: 'trainingId' },
    { title: '关联演练编号', dataIndex: 'drillId', key: 'drillId' },
    {
      title: '培训名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Button
          type="link"
          style={{ textDecoration: 'underline' }}
          onClick={() =>
            navigate({
              to: '/trainSupport/detail/video',
              search: { video: record.trainingId }, // 传视频参数
            })
          }
        >
          {text}
        </Button>
      ),
    },
    { title: '培训类型', dataIndex: 'type', key: 'type' },
    { title: '培训讲师', dataIndex: 'trainer', key: 'trainer' },
    { title: '地点', dataIndex: 'location', key: 'location' },
    { title: '时间', dataIndex: 'date', key: 'date' },
    { title: '参训人数', dataIndex: 'participants', key: 'participants' },
    { title: '平均成绩', dataIndex: 'avgScore', key: 'avgScore' },
    { title: '反馈评分', dataIndex: 'feedback', key: 'feedback' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            type="link"
            onClick={() =>
              navigate({
                to: '/trainSupport/detail/text',
                search: { doc: record.trainingId }, // 传文档参数
              })
            }
          >
            详情
          </Button>
        </Space>
      ),
    },
  ];

  // 查询
  const handleSearch = () => {
    const { trainingId, type, trainer, minFeedback } = form.getFieldsValue();
    const filtered = initialData.filter(
      item =>
        (!trainingId || item.trainingId.includes(trainingId)) &&
        (!type || item.type === type) &&
        (!trainer || item.trainer.includes(trainer)) &&
        (!minFeedback || item.feedback >= minFeedback),
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
        <Form.Item name="trainingId" label="培训编号">
          <Input placeholder="请输入培训编号" allowClear />
        </Form.Item>
        <Form.Item name="type" label="培训类型">
          <Select placeholder="请选择类型" allowClear style={{ width: 120 }}>
            <Select.Option value="理论">理论</Select.Option>
            <Select.Option value="实操">实操</Select.Option>
            <Select.Option value="考核">考核</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="trainer" label="培训讲师">
          <Input placeholder="请输入讲师姓名" allowClear />
        </Form.Item>
        <Form.Item name="minFeedback" label="最低反馈评分">
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
      <Table<Training> columns={columns} dataSource={data} pagination={{ pageSize: 10 }} bordered />
    </div>
  );
}
