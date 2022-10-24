import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Members } from 'pages/conference/components/media-content/members/members';

export function ConferenceMediaContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        margin: '0 auto',
        width: '100%',
        height: `calc(100vh - 92px - ${isMobile ? 56 : 64}px)`,
        display: 'grid',
        gridGap: (theme) => theme.spacing(2),
        gridTemplateColumns: 'repeat(auto-fill, 240px)',
        justifyContent: 'center',
        overflow: 'auto',
        gridAutoRows: 'max-content',
      }}
    >
      {/*<ActiveMember />*/}
      <Members />
    </Box>
  );
}
