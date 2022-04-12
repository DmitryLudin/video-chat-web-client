import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

export function RegisterUsernameField() {
  const {
    field: { onChange, name, value },
    fieldState: { invalid, error },
  } = useController<{ username: string }>({
    name: 'username',
    defaultValue: '',
    rules: { required: 'Обязательно поле' },
  });

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      error={invalid}
      helperText={error?.message}
      onChange={onChange}
      label="Твой никнейм"
      value={value}
      name={name}
      autoFocus
    />
  );
}
