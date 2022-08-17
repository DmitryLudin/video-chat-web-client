import { styled } from '@mui/material';
import { drawerWidth } from 'modules/conference/consts';

export const Wrap = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  isSidebarOpen?: boolean;
  isMobile: boolean;
}>(({ theme, isMobile, isSidebarOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  minHeight: `calc(100vh - ${isMobile ? 56 : 64}px)`,
  marginRight: -drawerWidth,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(isSidebarOpen && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));
