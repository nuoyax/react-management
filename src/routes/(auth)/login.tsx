import { Box, Typography, useTheme } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '~/modules/auth/login/components/login-form';

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: '登录' }],
  }),
});

function RouteComponent() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* 左侧装饰区域 */}
      <div className="relative hidden h-screen bg-gradient-to-br from-[#00B96B] to-[#1890ff] p-8 lg:block">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggMGM0LjQxOCAwIDggMy41ODIgOCA4IDAgNC40MTgtMy41ODIgOC04IDhTMCAxMi40MTggMCA4czMuNTgyLTggOC04eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] opacity-10" />

        <div className="flex h-full flex-col justify-between text-white">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">Admin Pro</h1>
            <p className="text-xl opacity-90">企业级管理中台解决方案</p>
          </div>

          <div className="flex space-x-4 opacity-80">
            <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm" />
            <div className="-mt-4 ml-8 h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm" />
            <div className="mt-8 -ml-4 h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm" />
          </div>
        </div>
      </div>

      {/* 右侧登录表单区域 */}
      <Box className="flex grow flex-col items-center justify-center">
        <Box sx={{ width: '100%', maxWidth: '420px' }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              登录系统
            </Typography>
            <Typography variant="body2" color="text.secondary">
              请输入您的账号和密码
            </Typography>
          </Box>

          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}
