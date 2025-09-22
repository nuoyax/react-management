import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useMatches } from '@tanstack/react-router';

export function Breadcrumb() {
  const matches = useMatches();
  console.log('matches 👉：', { matches });

  // 过滤掉根路由和没有标题的路由
  const breadcrumbItems = matches
    .filter(match => match.fullPath !== '/' && match.context?.breadcrumb)
    .map(match => ({
      id: match.id,
      fullPath: match.fullPath,
      breadcrumb: match.context.breadcrumb,
    }));

  // 如果没有面包屑项，则不显示面包屑
  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {/* 首页链接 */}
      <Link to="/" className="hover:text-primary-600 flex items-center text-gray-600 hover:underline">
        首页
      </Link>

      {/* 面包屑项 */}
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return isLast ? (
          // 最后一项不可点击
          <Typography key={item.id} color="text.primary" className="flex items-center">
            {item.breadcrumb}
          </Typography>
        ) : (
          // 中间项可点击
          <Link
            key={item.id}
            to={item.fullPath as unknown as any}
            className="hover:text-primary-600 flex items-center text-gray-600 hover:underline"
          >
            {item.breadcrumb}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
