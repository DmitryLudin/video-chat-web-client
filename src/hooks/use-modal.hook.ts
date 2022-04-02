import React, { useCallback } from 'react';

export const useModalHook = (): [boolean, VoidFunction, VoidFunction] => {
  const [isOpen, setOpen] = React.useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return [isOpen, handleOpen, handleClose];
};
