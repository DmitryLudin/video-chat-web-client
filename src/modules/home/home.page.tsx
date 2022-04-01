import VideoCameraFrontRoundedIcon from '@mui/icons-material/VideoCameraFrontRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

export function HomePage() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Card sx={{ borderRadius: 4 }}>
            <CardActionArea>
              <CardContent sx={{ width: 240, height: 200 }}>
                <Grid height="100%" container direction="column">
                  <Grid flexGrow={1} item>
                    <VideoCameraFrontRoundedIcon
                      color="secondary"
                      fontSize="large"
                    />
                  </Grid>
                  <Grid item direction="column">
                    <Typography variant="h6">Новая встреча</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Запустить новую встречу
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item>
          <Card sx={{ borderRadius: 4 }}>
            <CardActionArea>
              <CardContent sx={{ width: 240, height: 200 }}>
                <Grid height="100%" container direction="column">
                  <Grid flexGrow={1} item>
                    <AddCircleRoundedIcon color="primary" fontSize="large" />
                  </Grid>
                  <Grid item direction="column">
                    <Typography variant="h6">Присоединиться</Typography>
                    <Typography variant="caption" color="text.secondary">
                      по приглашающей ссылке
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
