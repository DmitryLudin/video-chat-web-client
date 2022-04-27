import { Box, Fab, Grid, Paper, Stack, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { footerHeight } from 'modules/meeting/components/footer/footer';
import { ReplyFooterMessage } from 'modules/meeting/components/sidebar/chat/reply-footer-message';
import { uiChatService } from 'modules/meeting/services/ui-chat.service';
import React, { useCallback } from 'react';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { IMeeting, IMember } from 'shared/domains/meeting/models';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function ChatFooterObserver() {
  const [value, setValue] = React.useState('');
  const user = userService.store.user as IUser;
  const meeting = meetingService.store.meeting as IMeeting;
  const replayMessage = uiChatService.store.replyMessage;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSend: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      const member = meeting.members.find(
        (member) => member.user.id === user.id
      ) as IMember;
      meetingService.sendMessage({
        text: value,
        meetingId: meeting.id,
        memberId: member.id,
        replyMessageId: replayMessage?.id,
      });
      uiChatService.resetStore();
      setValue('');
    },
    [meeting.id, meeting.members, replayMessage?.id, user.id, value]
  );

  return (
    <Paper
      sx={{
        minHeight: footerHeight,
        px: 2,
        mt: 'auto',
        display: 'flex',
        alignItems: 'center',
        borderRight: 0,
        borderBottom: 0,
        borderLeft: 0,
      }}
      square
      variant="outlined"
      component="footer"
    >
      <Box sx={{ width: '100%' }}>
        <Stack>
          {replayMessage && <ReplyFooterMessage message={replayMessage} />}

          <form>
            <Grid container alignItems="center" spacing={1}>
              <Grid item flexGrow={1}>
                <TextField
                  placeholder="Введи сообщение"
                  margin="dense"
                  fullWidth
                  value={value}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Fab
                  type="submit"
                  disabled={!value}
                  onClick={handleSend}
                  size="medium"
                  color="primary"
                >
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Box>
    </Paper>
  );
}

export const ChatFooter = withObserverMemo(ChatFooterObserver);
