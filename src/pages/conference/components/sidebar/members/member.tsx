import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined';
import { Grid, ListItem, ListItemText } from '@mui/material';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { IMember } from 'shared/domains/conference/models';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

type TProps = {
  member: IMember;
};

function MemberObserver({ member }: TProps) {
  const mediaData = conferenceService.mediaDataStore[member.id];
  const isVideoPaused = mediaData?.videoStore.isPaused;
  const isAudioPaused = mediaData?.audioStore.isPaused;

  return (
    <ListItem
      secondaryAction={
        <Grid container spacing={2}>
          <Grid item>{isAudioPaused ? <MicOffIcon /> : <MicIcon />}</Grid>
          <Grid item>
            {isVideoPaused ? (
              <VideocamOffOutlinedIcon />
            ) : (
              <VideocamOutlinedIcon />
            )}
          </Grid>
        </Grid>
      }
    >
      <ListItemText
        primary={
          member.displayName || member.user.displayName || member.user.username
        }
      />
    </ListItem>
  );
}

export const Member = withObserverMemo(MemberObserver);
