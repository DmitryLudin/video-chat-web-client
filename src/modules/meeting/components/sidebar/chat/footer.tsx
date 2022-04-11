import { Box, Fab, Grid, Paper, Stack, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { footerHeight } from 'modules/meeting/components/footer/footer';
import { ReplyMessage } from 'modules/meeting/components/sidebar/chat/message/reply-message';
import React, { useState } from 'react';

export function ChatFooter() {
  const [isReply, setReply] = useState(true);
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

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
          {isReply && <ReplyMessage onClose={() => setReply(false)} />}
          <Grid container alignItems="center" spacing={1}>
            <Grid item flexGrow={1}>
              <TextField
                placeholder="Введи сообщение"
                multiline
                margin="dense"
                fullWidth
                value={value}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Fab size="medium" color="primary">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Paper>
  );
}
