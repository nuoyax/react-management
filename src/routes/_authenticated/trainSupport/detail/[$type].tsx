import { createFileRoute, useParams, useSearch } from '@tanstack/react-router';
import React from 'react';
import { Typography } from 'antd';

export const Route = createFileRoute('/_authenticated/trainSupport/detail/$type')({
  component: DetailPage,
  head: () => ({
    meta: [{ title: '培训详情' }],
  }),
  context: () => ({
    breadcrumb: '培训详情',
  }),
});

function DetailPage() {
  const { type } = useParams({ from: '/_authenticated/trainSupport/detail/$type' });
  const { trainingId } = useSearch({ from: '/_authenticated/trainSupport/detail/$type' });

  return (
    <div style={{ padding: 24 }}>
      {type === 'video' ? (
        <video width="100%" height="400" controls src="https://www.w3schools.com/html/mov_bbb.mp4" />
      ) : (
        <Typography.Paragraph style={{ whiteSpace: 'pre-wrap', fontSize: 16 }}>
          这里展示培训文档内容，培训ID：{trainingId}
        </Typography.Paragraph>
      )}
    </div>
  );
}
