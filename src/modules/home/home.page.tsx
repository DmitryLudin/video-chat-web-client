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
          <Card raised sx={{ borderRadius: 4, bgcolor: 'secondary.main' }}>
            <CardActionArea>
              <CardContent sx={{ width: 240, height: 200 }}>
                <Grid height="100%" container direction="column">
                  <Grid flexGrow={1} item>
                    <VideoCameraFrontRoundedIcon
                      sx={{ color: 'primary.contrastText' }}
                      fontSize="large"
                    />
                  </Grid>

                  <Grid item direction="column">
                    <Typography
                      sx={{ color: 'primary.contrastText' }}
                      variant="h6"
                    >
                      Новая встреча
                    </Typography>
                    <Typography
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      variant="caption"
                    >
                      Запустить новую встречу
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item>
          <Card raised sx={{ borderRadius: 4, bgcolor: 'primary.main' }}>
            <CardActionArea>
              <CardContent sx={{ width: 240, height: 200 }}>
                <Grid height="100%" container direction="column">
                  <Grid flexGrow={1} item>
                    <AddCircleRoundedIcon
                      sx={{ color: 'primary.contrastText' }}
                      fontSize="large"
                    />
                  </Grid>
                  <Grid item direction="column">
                    <Typography
                      sx={{ color: 'primary.contrastText' }}
                      variant="h6"
                    >
                      Присоединиться
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
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
