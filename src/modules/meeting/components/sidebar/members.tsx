import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

const members = [
  'Дмитрий Лудин',
  'Ксения Лудина',
  'Геннадий Лудин',
  'Светлана Лудина',
  'Тест Тест 1',
  'Тест Тест 2',
  'Тест Тест 3',
  'Тест Тест 4',
];

export function Members({ isChatOpen }: { isChatOpen: boolean }) {
  return (
    <List
      sx={{
        position: 'relative',
        overflow: 'auto',
        minHeight: isChatOpen ? 5 * 48 : 'auto',
      }}
      subheader={<ListSubheader>Участники ({members.length})</ListSubheader>}
    >
      {members.map((text) => (
        <ListItem
          key={text}
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
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
}
