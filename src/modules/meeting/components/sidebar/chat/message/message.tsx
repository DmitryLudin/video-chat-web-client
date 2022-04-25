import ReplyIcon from '@mui/icons-material/Reply';
import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { MessageText } from 'modules/meeting/components/sidebar/chat/message/text';
import { uiChatService } from 'modules/meeting/services/ui-chat.service';
import React, { useCallback, useMemo } from 'react';
import { IMessage } from 'shared/domains/meeting/models';
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
  const isSelf = user.id === author.id;
  const displayName = useMemo(() => {
    if (isSelf) {
      return 'Ты';
    }

    return author.displayName || author.username;
  }, [author.displayName, author.username, isSelf]);

  const handleReplyMessage = useCallback(() => {
    uiChatService.selectReplyMessage(message);
  }, [message]);

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ pb: 0, pt: !isHideDetails ? 2 : 0 }}
    >
      <ListItemAvatar>
        {!isHideDetails && <Avatar alt={author.username} />}
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
