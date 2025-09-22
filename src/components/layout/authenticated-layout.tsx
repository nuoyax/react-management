import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { sidebarCollapsedAtom } from '~/common/store';
import { Breadcrumb } from '~/components/breadcrumb';
import { SidebarFillIcon, SidebarIcon } from '~/components/icons';
import { AccountMenu } from './account-menu';
import { NotificationsPopover } from './notifications-popover';
import { Sidebar } from './sidebar';
import { ThemeSwitch } from './theme-switch';

import LogoUrl from '/logo.svg';

export function AuthenticatedLayout() {
  const [isCollapsed, setIsCollapsed] = useAtom(sidebarCollapsedAtom);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <Box
        className="sticky top-0 flex h-8 items-center gap-2 border-b border-b-(--border-color) px-2"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          background: 'rgba(var(--palette-background-defaultChannel), 0.8)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Box className="mx-1 flex h-5 shrink-0 items-center space-x-1 rounded-lg" component={Link} to="/">
          <img src={LogoUrl} alt="Logo" className="h-5" />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} noWrap>
            Fine 后台管理
          </Typography>
        </Box>
        <div>
          <IconButton sx={{ fontSize: 24 }} onClick={toggleCollapse}>
            {isCollapsed ? <SidebarIcon /> : <SidebarFillIcon />}
          </IconButton>
        </div>
        <Breadcrumb />
        <div className="ml-auto flex items-center gap-x-1">
          <ThemeSwitch />
          <IconButton className="animate-spin">
            <SettingsIcon />
          </IconButton>
          <NotificationsPopover />
          <AccountMenu />
        </div>
      </Box>
      <main className="flex grow">
        <Sidebar mobileOpen={false} onMobileClose={() => {}} isCollapsed={isCollapsed} />
        <div className="grow overflow-x-hidden p-2">
          <Outlet />
        </div>
      </main>
    </>
  );
}
