import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Switch,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import { useBoolean } from '~/hooks';
import { cn } from '~/utils';

// 格式化时间为"几分钟前"、"几小时前"、"几天前"等格式
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '刚刚';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}天前`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}个月前`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}年前`;
}

// 通知类型定义
type Notification = {
  id: string;
  title: string;
  description: string;
  avatar?: string;
  type: 'alert' | 'message' | 'mail' | 'shipping' | 'order';
  createdAt: Date;
  isUnRead: boolean;
};

// 模拟通知数据
const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: '您的订单已发货',
    description: '订单 #XK-38646 已于今天发出',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    type: 'order',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    isUnRead: true,
  },
  {
    id: '2',
    title: '新消息',
    description: '张三: 项目进展如何？需要我协助吗？',
    avatar: 'https://mui.com/static/images/avatar/5.jpg',
    type: 'message',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1天前
    isUnRead: true,
  },
  {
    id: '3',
    title: '系统更新完成',
    description: '系统已更新至最新版本 v2.1.0',
    avatar: 'https://mui.com/static/images/avatar/4.jpg',
    type: 'alert',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2天前
    isUnRead: false,
  },
  {
    id: '4',
    title: '新邮件',
    description: '您收到来自李四的新邮件',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    type: 'mail',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3天前
    isUnRead: true,
  },
  {
    id: '5',
    title: '会议提醒',
    description: '明天上午10点项目进度会议',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    type: 'alert',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4天前
    isUnRead: false,
  },
];

// 通知项组件
interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: VoidFunction;
  onRemove: VoidFunction;
}

function NotificationItem({ notification, onMarkAsRead, onRemove }: NotificationItemProps) {
  const { avatar, title, description, type, createdAt, isUnRead } = notification;

  // 根据通知类型获取头像颜色
  const getAvatarColor = (type: string) => {
    switch (type) {
      case 'order':
        return { color: '#FF4842', bgcolor: '#FFE7E5' };
      case 'shipping':
        return { color: '#1890FF', bgcolor: '#D0F2FF' };
      case 'mail':
        return { color: '#FFC107', bgcolor: '#FFF7CD' };
      case 'message':
        return { color: '#00AB55', bgcolor: '#E9FCD4' };
      default:
        return { color: '#7635DC', bgcolor: '#EBD6FD' };
    }
  };

  // 根据通知类型获取图标
  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return (
          <img
            alt="order"
            src="https://minimal-kit-react.vercel.app/assets/icons/notification/ic_package.svg"
            width={24}
          />
        );
      case 'shipping':
        return (
          <img
            alt="shipping"
            src="https://minimal-kit-react.vercel.app/assets/icons/notification/ic_shipping.svg"
            width={24}
          />
        );
      case 'mail':
        return (
          <img alt="mail" src="https://minimal-kit-react.vercel.app/assets/icons/notification/ic_mail.svg" width={24} />
        );
      case 'message':
        return (
          <img alt="chat" src="https://minimal-kit-react.vercel.app/assets/icons/notification/ic_chat.svg" width={24} />
        );
      default:
        return (
          <img
            alt="notification"
            src="https://minimal-kit-react.vercel.app/assets/icons/notification/ic_notification.svg"
            width={24}
          />
        );
    }
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        ...(isUnRead && {
          bgcolor: 'action.hover',
        }),
      }}
      onClick={onMarkAsRead}
    >
      <ListItemAvatar>
        {avatar ? (
          <Avatar src={avatar} sx={{ bgcolor: 'background.neutral' }} />
        ) : (
          <Box
            component="span"
            sx={{
              width: 40,
              height: 40,
              display: 'flex',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              color: getAvatarColor(type).color,
              bgcolor: getAvatarColor(type).bgcolor,
            }}
          >
            {getIcon(type)}
          </Box>
        )}
      </ListItemAvatar>

      <ListItemText
        primary={title}
        secondary={
          <Stack direction="row" alignItems="center" sx={{ typography: 'caption', color: 'text.disabled' }}>
            <Box component="span" sx={{ mr: 0.5, width: 'max-content' }}>
              {description}
            </Box>

            <Box component="span" sx={{ mx: 0.5, width: 2, height: 2, borderRadius: '50%', bgcolor: 'currentColor' }} />

            <Box component="span">{formatTimeAgo(createdAt)}</Box>
          </Stack>
        }
        primaryTypographyProps={{
          noWrap: true,
          variant: 'subtitle2',
          ...(isUnRead && { fontWeight: 'fontWeightBold' }),
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: false,
          component: 'span',
          variant: 'body2',
          color: 'text.secondary',
        }}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        {isUnRead && (
          <Tooltip title="标记为已读">
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'error.main',
                transition: theme => theme.transitions.create(['transform']),
                ...(isUnRead && {
                  transform: 'scale(1)',
                }),
              }}
            />
          </Tooltip>
        )}

        <IconButton
          size="small"
          color="default"
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
    </ListItemButton>
  );
}

// 通知设置组件
function NotificationSettings() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        通知设置
      </Typography>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">系统通知</Typography>
          <Switch defaultChecked size="small" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">消息通知</Typography>
          <Switch defaultChecked size="small" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">邮件通知</Typography>
          <Switch defaultChecked size="small" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">订单通知</Typography>
          <Switch defaultChecked size="small" />
        </Box>
      </Stack>
    </Box>
  );
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { value: showSettings, setTrue: showSettingsTrue, setFalse: showSettingsFalse } = useBoolean(false);
  const [notificationToRemove, setNotificationToRemove] = useState<string | null>(null);

  // 计算未读通知数量
  const unreadCount = notifications.filter(item => item.isUnRead).length;

  // 打开/关闭弹出框
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    showSettingsFalse();
  };

  // 标记所有通知为已读
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        isUnRead: false,
      })),
    );
  };

  // 标记单个通知为已读
  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id
          ? {
              ...notification,
              isUnRead: false,
            }
          : notification,
      ),
    );
  };

  // 删除单个通知
  const handleRemove = (id: string) => {
    setNotificationToRemove(id);
    setTimeout(() => {
      setNotifications(notifications.filter(notification => notification.id !== id));
      setNotificationToRemove(null);
    }, 300);
  };

  // 删除所有通知
  const handleRemoveAll = () => {
    if (notifications.length > 0) {
      setNotifications([]);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton color="default" onClick={handleOpenPopover} sx={{ position: 'relative' }}>
        <Badge
          badgeContent={unreadCount}
          color="error"
          className={cn({
            'animate-pulse': unreadCount > 0,
          })}
        >
          {unreadCount > 0 ? <NotificationsIcon /> : <NotificationsNoneIcon />}
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 360,
              maxHeight: 600,
              overflow: 'inherit',
              borderRadius: 1.5,
              boxShadow: theme => theme.shadows[8],
            },
          },
        }}
      >
        {showSettings ? (
          <Fade in={showSettings}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                <IconButton size="small" onClick={showSettingsFalse} sx={{ mr: 1 }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="subtitle1">通知设置</Typography>
              </Box>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <NotificationSettings />
            </Box>
          </Fade>
        ) : (
          <Fade in={!showSettings}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">通知</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    您有 {unreadCount} 条未读消息
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  {unreadCount > 0 && (
                    <Tooltip title="全部标为已读">
                      <IconButton color="primary" onClick={handleMarkAllAsRead}>
                        <DoneAllIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="通知设置">
                    <IconButton color="default" onClick={showSettingsTrue}>
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>

              <Divider sx={{ borderStyle: 'dashed' }} />

              {notifications.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Zoom in={true}>
                    <Box
                      component="img"
                      alt="empty notification"
                      src="https://minimal-kit-react.vercel.app/assets/icons/empty/ic_notification.svg"
                      sx={{ width: 100, height: 100, opacity: 0.8, mb: 2 }}
                    />
                  </Zoom>
                  <Typography variant="subtitle1" gutterBottom>
                    暂无通知
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    当您有新的通知时，它们将显示在这里
                  </Typography>
                </Box>
              ) : (
                <List disablePadding>
                  {notifications.map(notification => (
                    <Fade
                      key={notification.id}
                      in={notificationToRemove !== notification.id}
                      timeout={{ enter: 500, exit: 300 }}
                      unmountOnExit
                    >
                      <Box>
                        <NotificationItem
                          notification={notification}
                          onMarkAsRead={() => handleMarkAsRead(notification.id)}
                          onRemove={() => handleRemove(notification.id)}
                        />
                      </Box>
                    </Fade>
                  ))}
                </List>
              )}

              <Divider sx={{ borderStyle: 'dashed' }} />

              <Box sx={{ p: 1 }}>
                <Button fullWidth disableRipple onClick={handleRemoveAll} disabled={notifications.length === 0}>
                  清除所有通知
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Popover>
    </>
  );
}
