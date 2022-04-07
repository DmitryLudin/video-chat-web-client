import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { MessageText } from 'modules/meeting/components/sidebar/chat/message/text';
import React from 'react';

export function Message() {
  return (
    <ListItem
      alignItems="flex-start"
      // secondaryAction={<Typography>15:34</Typography>}
    >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography color="text.secondary" variant="body2">
              Remy Sharp
            </Typography>
            <Typography color="text.secondary" variant="caption">
              15:34
            </Typography>
          </Grid>
        }
        secondary={
          <Stack sx={{ pt: 1 }} spacing={1}>
            <MessageText>
              Ill be in your neighborhood doing errands this Ill be in your
              neighborhood doing errands this
            </MessageText>
            <MessageText>
              Ill be in your neighborhood doing errands this
            </MessageText>
            <MessageText>
              Ill be in your neighborhood doing errands this
            </MessageText>
          </Stack>
        }
      />
    </ListItem>
  );
}
