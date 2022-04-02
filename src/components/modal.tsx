import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { PropsWithChildren } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type TProps = {
  buttons: JSX.Element;
  title: string;
  isOpen: boolean;
  onClose: VoidFunction;
};

export function Modal({
  children,
  title,
  buttons,
  onClose,
  isOpen,
}: PropsWithChildren<TProps>) {
  return (
    <Dialog
      transitionDuration={350}
      TransitionComponent={Transition}
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{buttons}</DialogActions>
    </Dialog>
  );
}
