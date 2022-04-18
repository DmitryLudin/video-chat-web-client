import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { useParams } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

export function MembersObserver() {
  const { id } = useParams() as { id: string };
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { meeting } = meetingService.store;

  return (
    <Box sx={{ overflow: 'hidden', height: 'inherit', maxHeight: '100%' }}>
      <List
        sx={{
          position: 'relative',
          overflow: 'auto',
          maxHeight: isTableOrMobile ? '40vh' : 'inherit',
          height: 'auto',
        }}
        subheader={
          <ListSubheader>
            <Grid container justifyContent="space-between" alignItems="center">
              Участники ({meeting?.members.length || 0})
              <Button
                onClick={() => {
                  void navigator.clipboard.writeText(id);
                }}
                size="small"
              >
                Скопировать ID встречи
              </Button>
            </Grid>
          </ListSubheader>
        }
      >
        {meeting?.members.map((member) => (
          <ListItem
            key={member.id}
            secondaryAction={
              <Grid container spacing={2}>
                <Grid item>
                  <MicIcon />
                </Grid>
                <Grid item>
                  <VideocamOutlinedIcon />
                </Grid>
              </Grid>
            }
          >
            <ListItemText
              primary={member.user.displayName || member.user.username}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export const Members = withObserverMemo(MembersObserver);
