import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Table, Form, Input, Button, Select, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const Route = createFileRoute('/_authenticated/userAdmin/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '用户管理' }],
  }),
  context: () => ({
    breadcrumb: '用户管理',
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
    name: '张三',
    phone: '13800000001',
    company: '北京分公司',
    employeeId: 'E001',
    lastModified: '2025-09-20 10:21',
    status: '启用',
  },
  {
    key: 2,
    account: 'user002',
    name: '李四',
    phone: '13800000002',
    company: '上海分公司',
    employeeId: 'E002',
    lastModified: '2025-09-21 15:42',
    status: '停用',
  },
];

function RouteComponent() {
  const [form] = Form.useForm();
  const [data, setData] = useState<User[]>(initialData);

  const columns: ColumnsType<User> = [
    { title: '用户账号', dataIndex: 'account', key: 'account' },
    { title: '中文姓名', dataIndex: 'name', key: 'name' },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '所属公司名称', dataIndex: 'company', key: 'company' },
    { title: '员工编号', dataIndex: 'employeeId', key: 'employeeId' },
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
        <Form.Item name="account" label="用户账号">
          <Input placeholder="请输入账号" allowClear />
        </Form.Item>
        <Form.Item name="name" label="中文姓名">
          <Input placeholder="请输入姓名" allowClear />
        </Form.Item>
        <Form.Item name="employeeId" label="员工编号">
          <Input placeholder="请输入员工编号" allowClear />
        </Form.Item>
        <Form.Item name="status" label="用户状态">
          <Select placeholder="请选择状态" allowClear style={{ width: 120 }}>
            <Select.Option value="启用">启用</Select.Option>
            <Select.Option value="停用">停用</Select.Option>
          </Select>
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
