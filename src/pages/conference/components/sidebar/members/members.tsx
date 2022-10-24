import {
  Box,
  Button,
  Grid,
  List,
  ListSubheader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Member } from 'pages/conference/components/sidebar/members/member';
import { useParams } from 'react-router-dom';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export function MembersObserver() {
  const { id } = useParams() as { id: string };
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const members = conferenceService.roomStore.members;

  return (
    <Box
      sx={{
        overflow: 'hidden',
        height: 'inherit',
        maxHeight: '100%',
        flex: '1',
      }}
    >
      <List
        sx={{
          position: 'relative',
          overflow: 'auto',
          maxHeight: isTableOrMobile ? '40vh' : 'inherit',
          height: 'auto',
        }}
        subheader={
          <ListSubheader>
            <Grid container justifyContent="space-between" alignItems="center">
              Участники ({members.length || 0})
              <Button
                onClick={() => {
                  void navigator.clipboard.writeText(id);
                }}
                size="small"
                startIcon={<ContentCopyIcon />}
              >
                ID конференции
              </Button>
            </Grid>
          </ListSubheader>
        }
      >
        {members.map((member) => (
          <Member key={member.id} member={member} />
        ))}
      </List>
    </Box>
  );
}

export const Members = withObserverMemo(MembersObserver);
