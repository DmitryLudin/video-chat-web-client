import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import { FooterActionControl } from 'modules/conference/components/footer/components';
import { uiSidebarService } from 'modules/conference/services/ui-sidebar.service';
import React, { useCallback } from 'react';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function FooterMoreControlObserver() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const members = conferenceService.store.members;
  const messages = conferenceService.store.messages;

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpenChat = useCallback(() => {
    uiSidebarService.onToggleChat();
    handleClose();
  }, [handleClose]);

  const handleOpenMembers = useCallback(() => {
    uiSidebarService.onToggleMembers();
    handleClose();
  }, [handleClose]);

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
