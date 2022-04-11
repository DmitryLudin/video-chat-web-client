import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Typography } from '@mui/material';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import React from 'react';
import { userService } from 'shared/domains/user/user.service';

function UserAccountObserver() {
  const { user } = userService.store;
  console.log(user);
  if (!user) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AccountCircle fontSize="large" color="primary" sx={{ mr: 1 }} />
      <Typography variant="body1">Дмитрий</Typography>
    </Box>
  );
}

export const UserAccount = withObserverMemo(UserAccountObserver);
