import { useState } from 'react';
import { Logout } from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { userAtom } from '~/modules/auth/store';

export function AccountMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAtomValue(userAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className="flex items-center">
      <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
        <Avatar src="https://multiavatar.com/img/logo-animated.gif?v=003" sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Typography variant="body2" sx={{ ml: 1, textTransform: 'capitalize' }}>
        {user?.username}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate({ to: '/login', search: { redirectTo: location.pathname } });
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
