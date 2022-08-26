import { Paper } from '@mui/material';
import { ReplyMessage } from 'pages/conference/components/sidebar/chat/message/reply-message';
import { PropsWithChildren } from 'react';
import { IMessage } from 'shared/domains/conference/models';

type TProps = {
  reply: IMessage;
};

export function MessageText({ children, reply }: PropsWithChildren<TProps>) {
  return (
    <Paper
      sx={{
        p: 1,
        px: 1.5,
        mr: 1,
        borderRadius: 3,
        hyphens: 'auto',
        bgcolor: (theme) => theme.palette.background.default,
      }}
      elevation={2}
    >
      {reply && <ReplyMessage message={reply} />}
      {children}
    </Paper>
  );
}
