import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';

export function RegisterDisplayNameField() {
  const {
    field: { onChange, name, value },
  } = useController<{ displayName: string }>({
    name: 'displayName',
    defaultValue: '',
  });

  return (
    <TextField
      margin="normal"
      fullWidth
      label="Как тебя зовут?"
      placeholder="Иванов Иван Иванович"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
