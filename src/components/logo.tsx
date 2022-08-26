import { Videocam } from '@mui/icons-material';
import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function Logo() {
  return (
    <Link underline="none" color="inherit" component={RouterLink} to="/">
      <Videocam
        color="primary"
        fontSize="large"
        sx={{ mr: 1, display: { xs: 'block', sm: 'none' } }}
      />
      <Typography
        variant="h4"
        component="div"
        sx={{
          fontWeight: 600,
          display: { sm: 'flex', xs: 'none' },
        }}
      >
        неработа.
        <Typography
          variant="h4"
          component="p"
          sx={{
            fontWeight: 600,
          }}
          color="primary"
        >
          конференции
        </Typography>
      </Typography>
    </Link>
  );
}
