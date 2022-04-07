import {
  Box,
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

export function Members() {
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ overflow: 'hidden', height: 'inherit', maxHeight: '100%' }}>
      <List
        sx={{
          position: 'relative',
          overflow: 'auto',
          maxHeight: isTableOrMobile ? '40vh' : 'inherit',
          height: 'auto',
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
    </Box>
  );
}
