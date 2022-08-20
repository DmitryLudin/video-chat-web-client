import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from 'shared/domains/auth/auth.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { userService } from 'shared/domains/user/user.service';

function UserAccountObserver() {
  const { user } = userService.store;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    void authService.logOut().then(() => navigate('/log-in'));
    handleClose();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleMenu} sx={{ borderRadius: 2 }}>
        <AccountCircle fontSize="large" color="primary" sx={{ mr: 1 }} />
        <Typography variant="body1">
          {user.displayName || user.username}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <ExitToAppIcon sx={{ mr: 1 }} />
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
}

export const UserAccount = withObserverMemo(UserAccountObserver);
