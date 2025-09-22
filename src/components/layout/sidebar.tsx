import React, { useEffect, useRef, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
} from '@mui/material';
import { Link as RouterLink, useLocation } from '@tanstack/react-router';
import { MENU_ITEMS, MenuItem, MIN_WIDTH, WIDTH } from '~/common/constant';

interface PopoverState {
  anchorEl: HTMLElement;
  item: MenuItem;
}

interface PopoverMenuItemProps {
  item: MenuItem;
  level: number;
  onHover: (event: React.MouseEvent<HTMLElement>, item: MenuItem, level: number) => void;
  onClose: () => void; // 用于点击后关闭所有 Popover
}

const PopoverMenuItem: React.FC<PopoverMenuItemProps> = ({ item, level, onHover, onClose }) => {
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    // 只有没有子菜单的项是可点击跳转的
    if (!hasChildren) {
      onClose();
    }
  };

  return (
    <ListItemButton
      component={hasChildren ? 'div' : RouterLink}
      to={item.path}
      onClick={handleClick}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => onHover(e, item, level + 1)} // 关键：触发 hover，level+1
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
      {hasChildren && <ChevronRightIcon fontSize="small" />}
    </ListItemButton>
  );
};

// =========== 帮助函数：根据当前路径查找需要展开的菜单 ===========
const findOpenMenuKeys = (menuList: MenuItem[], currentPath: string): Set<string> => {
  const openKeys = new Set<string>();

  function find(items: MenuItem[], parentKeys: string[]): boolean {
    for (const item of items) {
      const currentKeys = [...parentKeys, item.key];
      if (item.path === currentPath) {
        parentKeys.forEach(key => openKeys.add(key));
        return true;
      }
      if (item.children && find(item.children, currentKeys)) {
        return true;
      }
    }
    return false;
  }

  find(menuList, []);
  return openKeys;
};

// =========== 递归菜单项组件 ===========
interface RecursiveMenuItemProps {
  item: MenuItem;
  level: number;
  openMenus: Set<string>;
  onMenuClick: (key: string) => void;
  isCollapsed: boolean;
}

const RecursiveMenuItemComponent: React.FC<RecursiveMenuItemProps> = ({
  item,
  level,
  openMenus,
  onMenuClick,
  isCollapsed,
}) => {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openMenus.has(item.key);
  const isSelected = !hasChildren && location.pathname === item.path;

  const handleItemClick = () => {
    if (hasChildren) {
      onMenuClick(item.key);
    }
  };

  return (
    <>
      <ListItemButton
        component={hasChildren ? 'div' : RouterLink}
        to={item.path}
        onClick={handleItemClick}
        selected={isSelected}
        sx={{ pl: 2.5 + level * 2 }} // 根据层级缩进
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
        {hasChildren ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map(child => (
              <RecursiveMenuItemComponent
                key={child.key}
                item={child}
                level={level + 1}
                openMenus={openMenus}
                onMenuClick={onMenuClick}
                isCollapsed={isCollapsed}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

// =========== 主侧边栏组件 ===========
interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose, isCollapsed }) => {
  const location = useLocation();
  // 使用 Set 来管理多个展开的子菜单
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const [popoverStack, setPopoverStack] = useState<PopoverState[]>([]);

  const closePopoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 效果钩子：当路由变化时，自动展开父菜单
  useEffect(() => {
    setOpenMenus(findOpenMenuKeys(MENU_ITEMS, location.pathname));
  }, [location.pathname]);

  const clearCloseTimer = () => {
    if (closePopoverTimer.current) {
      clearTimeout(closePopoverTimer.current);
    }
  };

  const handleMenuClick = (key: string) => {
    setOpenMenus(prev => {
      const newOpen = new Set(prev);
      if (newOpen.has(key)) {
        newOpen.delete(key);
      } else {
        newOpen.add(key);
      }
      return newOpen;
    });
  };

  const handlePopoverClose = () => {
    clearCloseTimer();
    closePopoverTimer.current = setTimeout(() => {
      setPopoverStack([]);
    }, 200); // 延迟时间可以微调
  };

  const handleSubMenuHover = (event: React.MouseEvent<HTMLElement>, item: MenuItem, level: number) => {
    clearCloseTimer();

    const newStack = popoverStack.slice(0, level - 1);
    if (item.children) {
      newStack.push({ anchorEl: event.currentTarget, item });
    }
    setPopoverStack(newStack);
  };

  const handleMainMenuHover = (event: React.MouseEvent<HTMLElement>, item: MenuItem) => {
    clearCloseTimer();
    if (item.children) {
      setPopoverStack([{ anchorEl: event.currentTarget, item }]);
    } else {
      setPopoverStack([]); // 如果hover到没有子菜单的项，关闭所有popover
    }
  };

  // 渲染函数
  const drawerContent = (
    <div>
      <Toolbar />
      {isCollapsed ? (
        // 缩小模式的渲染逻辑 (只显示一级图标和 hover)
        <List onMouseLeave={handlePopoverClose}>
          {/* 鼠标离开整个列表时准备关闭 */}
          {MENU_ITEMS.map(item => (
            <ListItemButton
              key={item.key}
              component={item.children ? 'div' : RouterLink}
              to={item.path}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => handleMainMenuHover(e, item)}
              sx={{
                minHeight: 48,
                px: 2.5,
                transition: theme =>
                  theme.transitions.create('padding', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 0,
                  transition: theme =>
                    theme.transitions.create('margin', {
                      easing: theme.transitions.easing.sharp,
                      duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      ) : (
        // 展开模式的渲染逻辑 (使用递归组件)
        <List>
          {MENU_ITEMS.map(item => (
            <RecursiveMenuItemComponent
              key={item.key}
              item={item}
              level={0}
              openMenus={openMenus}
              onMenuClick={handleMenuClick}
              isCollapsed={isCollapsed}
            />
          ))}
        </List>
      )}
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { sm: isCollapsed ? MIN_WIDTH : WIDTH }, flexShrink: { sm: 0 } }}>
      {/* 移动端临时抽屉 (使用展开模式) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: WIDTH } }}
      >
        {/* 为了简化，移动端始终是展开模式，因此直接传入 isCollapsed=false */}
        {/* 如果需要移动端也支持缩小，可以调整这里 */}
        <List>
          {MENU_ITEMS.map(item => (
            <RecursiveMenuItemComponent
              key={item.key}
              item={item}
              level={0}
              openMenus={openMenus}
              onMenuClick={handleMenuClick}
              isCollapsed={false}
            />
          ))}
        </List>
      </Drawer>

      {/* 桌面端永久抽屉 */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isCollapsed ? MIN_WIDTH : WIDTH,
            overflowX: 'hidden',
            transition: theme =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            '& .MuiListItemText-root': {
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : 'auto',
              minWidth: 0,
              maxWidth: isCollapsed ? 0 : 'unset',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              pointerEvents: isCollapsed ? 'none' : 'auto',
              transition: isCollapsed
                ? 'opacity 0.15s cubic-bezier(0.4,0,0.2,1), max-width 0.3s cubic-bezier(0.4,0,0.2,1)'
                : 'max-width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.15s cubic-bezier(0.4,0,0.2,1) 0.15s',
            },
            '& .MuiListItemIcon-root': {
              minWidth: 0,
              transition: 'margin 0.3s linear',
              mr: isCollapsed ? 0 : 3,
            },
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 用于缩小模式的 Popover */}
      {popoverStack.map((popoverState, index) => (
        <Popover
          key={index}
          open={true}
          anchorEl={popoverState.anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          // onClose={handlePopoverClose} // onClose 会在点击外部时触发，我们用 onMouseLeave 控制
          PaperProps={{
            onMouseEnter: clearCloseTimer, // 鼠标进入，取消关闭
            onMouseLeave: handlePopoverClose, // 鼠标离开，准备关闭
          }}
          sx={{ pointerEvents: 'none' }} // Popover本身不响应事件，让Paper响应
        >
          <Box sx={{ pointerEvents: 'auto' }}>
            {/* 内容区需要响应事件 */}
            <List disablePadding>
              {popoverState.item.children?.map(child => (
                <PopoverMenuItem
                  key={child.key}
                  item={child}
                  level={index + 1}
                  onHover={handleSubMenuHover}
                  onClose={() => setPopoverStack([])}
                />
              ))}
            </List>
          </Box>
        </Popover>
      ))}
    </Box>
  );
};
