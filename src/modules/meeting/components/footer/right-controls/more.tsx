import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import { FooterActionControl } from 'modules/meeting/components/footer/components';
import { uiSidebarService } from 'modules/meeting/services/ui-sidebar.service';
import React, { useCallback } from 'react';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function FooterMoreControlObserver() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const members = meetingService.store.members;
  const messages = meetingService.store.messages;

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpenChat = useCallback(() => {
    uiSidebarService.onToggleChat();
    handleClose();
  }, []);

  const handleOpenMembers = useCallback(() => {
    uiSidebarService.onToggleMembers();
    handleClose();
  }, []);

  return (
    <>
      <FooterActionControl
        onClick={handleClick}
        icon={<MoreHorizIcon sx={{ fontSize: '30px' }} />}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem onClick={handleOpenMembers}>
          <ListItemIcon>
            <PeopleIcon fontSize="small" />
          </ListItemIcon>
          Участники ({members.length || 0})
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ScreenShareIcon fontSize="small" />
          </ListItemIcon>
          Поделиться экраном
        </MenuItem>

        <MenuItem onClick={handleOpenChat}>
          <ListItemIcon>
            <ChatIcon fontSize="small" />
          </ListItemIcon>
          Чат ({messages.length})
        </MenuItem>
      </Menu>
    </>
  );
}

export const FooterMoreControl = withObserverMemo(FooterMoreControlObserver);
