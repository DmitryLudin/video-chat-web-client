import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import React, { MouseEventHandler } from 'react';

type TProps = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  title: string;
  subtitle: string;
  cardColor: string;
  icon: JSX.Element;
};

export const HomePageCard = React.memo(function HomePageCardMemo({
  onClick,
  subtitle,
  title,
  icon,
  cardColor,
}: TProps) {
  return (
    <Card onClick={onClick} raised sx={{ borderRadius: 4, bgcolor: cardColor }}>
      <CardActionArea>
        <CardContent sx={{ width: 240, height: 200 }}>
          <Grid height="100%" container direction="column">
            <Grid flexGrow={1} item>
              {icon}
            </Grid>
            <Grid item direction="column">
              <Typography sx={{ color: 'primary.contrastText' }} variant="h6">
                {title}
              </Typography>
              <Typography
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                variant="caption"
              >
                {subtitle}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});
