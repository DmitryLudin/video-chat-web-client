import ReplyIcon from '@mui/icons-material/Reply';
import {
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { UserAvatar } from 'components/user-avatar';
import dayjs from 'dayjs';
import { MessageText } from 'modules/conference/components/sidebar/chat/message/text';
import { uiChatService } from 'modules/conference/services/ui-chat.service';
import React, { useCallback, useMemo } from 'react';
import { IMessage } from 'shared/domains/conference/models';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

type TProps = {
  message: IMessage;
  isHideDetails?: boolean;
};

function MessageObserver({ message, isHideDetails = false }: TProps) {
  const { author, createdAt, text, reply } = message;
  const user = userService.store.user as IUser;
  const isSelf = user.id === author.user.id;
  const displayName = useMemo(() => {
    if (isSelf) {
      return 'Ты';
    }

    return (
      author.displayName || author.user.displayName || author.user.username
    );
  }, [
    author.displayName,
    author.user.displayName,
    author.user.username,
    isSelf,
  ]);

  const handleReplyMessage = useCallback(() => {
    uiChatService.selectReplyMessage(message);
  }, [message]);

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ pb: 0, pt: !isHideDetails ? 2 : 0 }}
    >
      <ListItemAvatar>
        {!isHideDetails && (
          <UserAvatar
            name={author.user.username}
            displayName={author.displayName || author.user.displayName || ''}
          />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          !isHideDetails && (
            <Grid
              sx={{ mb: 1 }}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                color={isSelf ? 'primary' : 'text.secondary'}
                variant="body2"
              >
                {displayName}
              </Typography>
              <Typography color="text.secondary" variant="caption">
                {dayjs(createdAt).format('HH:mm:ss')}
              </Typography>
            </Grid>
          )
        }
        secondary={
          <Grid container wrap="nowrap" alignItems="center">
            <MessageText reply={reply}>{text}</MessageText>
            <IconButton onClick={handleReplyMessage} size="small">
              <ReplyIcon fontSize="medium" />
            </IconButton>
          </Grid>
        }
      />
    </ListItem>
  );
}

export const Message = withObserverMemo(MessageObserver);
