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

interface DetailSearch {
  trainingId?: string; // 或者 link?: string
  link?: string;
}

function DetailPage() {
  const { type } = useParams({ from: '/_authenticated/trainSupport/detail/$type' });
  const { link } = useSearch({ from: '/_authenticated/trainSupport/detail/$type' }) as any;
  // const decodedLink = link ? decodeURIComponent(link) : '';
  return (
    <div style={{ padding: 24 }}>
      {type === 'video' ? (
        <video width="100%" height="800" controls>
          <source src={`/react-management/${link}.mp4`} type="video/mp4" />
          您的浏览器不支持 video 标签。
        </video>
      ) : (
        <Typography.Paragraph style={{ whiteSpace: 'pre-wrap', fontSize: 16 }}>
          消防安全基础知识培训 <br />
          内容： 随着城市建设的发展，消防安全显得越来越重要。
          <br />
          本篇文章将讲解消防知识的核心内容，包括火灾预防、逃生方法、灭火器使用等。
          <br />
          1. 火灾预防 确保电器设备安全使用，定期检查线路，不随意存放易燃物品。
          <br /> 2. 紧急逃生 在火灾发生时，请保持冷静，寻找安全出口，不要乘坐电梯，低姿态前进，避免吸入浓烟。 <br />
          3. 灭火器使用 熟悉不同类型灭火器的用途。使用前拔掉安全销，对准火源根部，按下手柄进行灭火。
          <br /> 4. 责任意识 每个人都应具备消防安全意识，了解应急疏散路线，并参与定期消防演练。
          本篇文章通过消防知识培训帮助大家增强安全意识，提高自救能力。
        </Typography.Paragraph>
      )}
    </div>
  );
}
