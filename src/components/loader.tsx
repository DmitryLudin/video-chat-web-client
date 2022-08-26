import { CircularProgress, Grid } from '@mui/material';

export function Loader() {
  return (
    <Grid sx={{ p: 3 }} container justifyContent="center">
      <CircularProgress />
    </Grid>
  );
}
