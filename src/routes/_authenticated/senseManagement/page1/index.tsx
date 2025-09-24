import { createFileRoute, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Table, Form, Input, Button, Select, Space, Row, Col } from 'antd';

import type { ColumnsType } from 'antd/es/table';

export const Route = createFileRoute('/_authenticated/senseManagement/page1/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '场景管理' }],
  }),
  context: () => ({
    breadcrumb: '场景管理',
  }),
});

interface Scene {
  key: number;
  sceneId: string;
  sceneName: string;
  sceneType: string;
  address: string;
  contactPerson: string;
  contactPhone: string;
}

const initialData: Scene[] = [
  {
    key: 1,
    sceneId: 'S000',
    sceneName: '码头港口',
    sceneType: '港口',
    address: '海南省某港口',
    contactPerson: '张三',
    contactPhone: '13800000001',
  },
  {
    key: 1,
    sceneId: 'S001',
    sceneName: '学校操场演练',
    sceneType: '学校',
    address: '北京市朝阳区某中学',
    contactPerson: '张三',
    contactPhone: '13800000001',
  },
  {
    key: 2,
    sceneId: 'S002',
    sceneName: '公园消防演练',
    sceneType: '公园',
    address: '上海市浦东新区世纪公园',
    contactPerson: '李四',
    contactPhone: '13800000002',
  },
  {
    key: 3,
    sceneId: 'S003',
    sceneName: '医院应急疏散演练',
    sceneType: '医院',
    address: '广州市天河区某医院',
    contactPerson: '王五',
    contactPhone: '13800000003',
  },
  {
    key: 4,
    sceneId: 'S004',
    sceneName: '商场火灾演练',
    sceneType: '商场',
    address: '深圳市福田区某购物中心',
    contactPerson: '赵六',
    contactPhone: '13800000004',
  },
  {
    key: 5,
    sceneId: 'S005',
    sceneName: '工厂安全演练',
    sceneType: '工厂',
    address: '苏州市工业园区某工厂',
    contactPerson: '钱七',
    contactPhone: '13800000005',
  },
  {
    key: 6,
    sceneId: 'S006',
    sceneName: '地铁站紧急疏散演练',
    sceneType: '交通设施',
    address: '北京市地铁2号线某站',
    contactPerson: '孙八',
    contactPhone: '13800000006',
  },
  {
    key: 7,
    sceneId: 'S007',
    sceneName: '住宅小区防火演练',
    sceneType: '住宅小区',
    address: '杭州市西湖区某小区',
    contactPerson: '周九',
    contactPhone: '13800000007',
  },
  {
    key: 8,
    sceneId: 'S008',
    sceneName: '图书馆地震演练',
    sceneType: '公共建筑',
    address: '武汉市洪山区某图书馆',
    contactPerson: '吴十',
    contactPhone: '13800000008',
  },
];

function RouteComponent() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState<Scene[]>(initialData);

  const columns: ColumnsType<Scene> = [
    { title: '场景ID', dataIndex: 'sceneId', key: 'sceneId' },
    { title: '场景名称', dataIndex: 'sceneName', key: 'sceneName' },
    { title: '场景类型', dataIndex: 'sceneType', key: 'sceneType' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '联系人', dataIndex: 'contactPerson', key: 'contactPerson' },
    { title: '联系电话', dataIndex: 'contactPhone', key: 'contactPhone' },
    {
      title: '操作',
      key: 'action',
      render: (_, record, index) => (
        <Space>
          <Button
            size="small"
            type="link"
            onClick={() =>
              // @ts-ignore
              navigate({
                to: '/senseManagement/detail/$type',
                params: { type: (index ).toString() },
              })
            }
          >
            场景详情
          </Button>
        </Space>
      ),
    },
  ];

  // 查询
  const handleSearch = () => {
    const { sceneId, sceneName, sceneType, contactPerson, contactPhone } = form.getFieldsValue();
    const filtered = initialData.filter(
      item =>
        (!sceneId || item.sceneId.includes(sceneId)) &&
        (!sceneName || item.sceneName.includes(sceneName)) &&
        (!sceneType || item.sceneType.includes(sceneType)) &&
        (!contactPerson || item.contactPerson.includes(contactPerson)) &&
        (!contactPhone || item.contactPhone.includes(contactPhone)),
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
      <Form form={form} layout="horizontal" style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="sceneId" label="场景ID">
              <Input placeholder="请输入场景ID" allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="sceneName" label="场景名称">
              <Input placeholder="请输入场景名称" allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="sceneType" label="场景类型">
              <Input placeholder="请输入场景类型" allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="contactPerson" label="联系人">
              <Input placeholder="请输入联系人" allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="contactPhone" label="联系电话">
              <Input placeholder="请输入联系电话" allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={handleSearch}>
                  查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* 表格 */}
      <Table<Scene> columns={columns} dataSource={data} pagination={{ pageSize: 10 }} bordered />
    </div>
  );
}
