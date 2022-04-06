import { Fab, Grid, Paper, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { footerHeight } from 'modules/meeting/components/footer/footer';
import React from 'react';

export function ChatFooter() {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Paper
      sx={{
        height: footerHeight,
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
    </Paper>
  );
}
