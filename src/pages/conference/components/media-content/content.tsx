import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Members } from 'pages/conference/components/media-content/members/members';

export function ConferenceMediaContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        width: '100%',
        height: `calc(100vh - 92px - 64px)`,
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: isMobile ? '67vh' : '67vw',
          margin: '0 auto',
          display: 'grid',
          gridGap: (theme) => theme.spacing(2),
          gridTemplateColumns: 'repeat(auto-fit, minmax(228px, 1fr))',
          gridAutoFlow: 'dense',
          gridAutoRows: 'min-content',
        }}
      >
        <Members />
      </Box>
    </Box>
  );
}
