import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Table, Form, Input, Button, Select, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const Route = createFileRoute('/_authenticated/systemConfig/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '系统配置' }],
  }),
  context: () => ({
    breadcrumb: '系统配置',
  }),
});

interface User {
  key: number;
  account: string;
  name: string;
  phone: string;
  company: string;
  employeeId: string;
  lastModified: string;
  status: string;
}

// 模拟数据
const initialData: User[] = [
  {
    key: 1,
    account: 'user001',
    name: '三维场景重建',
    phone: 'T13800000001',
    company: '-',
    employeeId: 'E001',
    lastModified: '2025-09-20 10:21',
    status: '启用',
  },
  {
    key: 2,
    account: 'user002',
    name: '数据分析',
    phone: 'T12800000002',
    company: '-',
    employeeId: 'E002',
    lastModified: '2025-09-21 15:42',
    status: '停用',
  },
];

function RouteComponent() {
  const [form] = Form.useForm();
  const [data, setData] = useState<User[]>(initialData);

  const columns: ColumnsType<User> = [
    { title: '一级菜单id', dataIndex: 'account', key: 'account' },
    { title: '一级菜单名称', dataIndex: 'name', key: 'name' },
    { title: '二级菜单id', dataIndex: 'phone', key: 'phone' },
    { title: '二级菜单名称', dataIndex: 'company', key: 'company' },
    { title: '主题风格', dataIndex: 'employeeId', key: 'employeeId' },
    { title: '最后修改时间', dataIndex: 'lastModified', key: 'lastModified' },
    { title: '用户状态', dataIndex: 'status', key: 'status' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button size="small" type="link">
            详情
          </Button>
          {/* <Button size="small" type="link" danger>
            删除
          </Button> */}
        </Space>
      ),
    },
  ];

  // 查询
  const handleSearch = () => {
    const { account, name, employeeId, status } = form.getFieldsValue();
    const filtered = initialData.filter(
      item =>
        (!account || item.account.includes(account)) &&
        (!name || item.name.includes(name)) &&
        (!employeeId || item.employeeId.includes(employeeId)) &&
        (!status || item.status === status),
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
        <Form.Item name="account" label="一级菜单id">
          <Input placeholder="请输入一级菜单id" allowClear />
        </Form.Item>
        <Form.Item name="name" label="一级菜单名称">
          <Input placeholder="请输入一级菜单名称" allowClear />
        </Form.Item>
        <Form.Item name="employeeId" label="二级菜单id">
          <Input placeholder="请输入二级菜单id" allowClear />
        </Form.Item>
        <Form.Item name="status" label="二级菜单名称">
          <Input placeholder="请输入二级菜单名称" allowClear />
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
      <Table<User> columns={columns} dataSource={data} pagination={{ pageSize: 5 }} bordered />
    </div>
  );
}
