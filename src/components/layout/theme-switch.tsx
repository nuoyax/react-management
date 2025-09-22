import { useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, ListItemIcon, Menu, MenuItem, useColorScheme } from '@mui/material';

const THEME_DATA = [
  { key: 'light', icon: <LightModeIcon />, label: 'Light' },
  { key: 'dark', icon: <DarkModeIcon />, label: 'Dark' },
  { key: 'system', icon: <DesktopMacOutlinedIcon />, label: 'System' },
] as const;

type ThemeMode = (typeof THEME_DATA)[number]['key'];

export function ThemeSwitch() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { setMode, mode, systemMode } = useColorScheme();

  const handleClose = () => setAnchorEl(null);

  const handleChange = (key: ThemeMode) => {
    handleClose();
    if (!document.startViewTransition) {
      setMode(key);
      return;
    }
    document
      .startViewTransition(() => {
        setMode(key);
      })
      .ready.then(() => {
        const r = Math.hypot(window.innerWidth, window.innerHeight);
        const isDarkMode = (systemMode ?? mode) === 'dark';
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${window.innerWidth}px 0px)`, `circle(${r}px at ${window.innerWidth}px 0px)`],
          },
          {
            duration: 500,
            easing: 'ease-in',
            direction: isDarkMode ? 'normal' : 'reverse',
            pseudoElement: isDarkMode ? `::view-transition-new(root)` : `::view-transition-old(root)`,
          },
        );
      });
  };

  const icon = THEME_DATA.find(({ key }) => mode === key)?.icon;

  return (
    <div>
      <IconButton onClick={e => setAnchorEl(e.currentTarget)}>{icon}</IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {THEME_DATA.map(({ key, icon, label }) => (
          <MenuItem key={key} onClick={() => handleChange(key)} selected={mode === key}>
            <ListItemIcon>{icon}</ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
