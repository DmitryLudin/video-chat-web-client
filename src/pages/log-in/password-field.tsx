import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';

export function LogInPasswordField() {
  const {
    field: { onChange, name, value },
    fieldState: { invalid, error },
  } = useController<{ password: string }>({
    name: 'password',
    defaultValue: '',
    rules: {
      required: 'Обязательно поле',
      minLength: {
        value: 8,
        message: 'Пароль должен содержать как минимум 8 символов',
      },
    },
  });

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      error={invalid}
      helperText={error?.message}
      onChange={onChange}
      value={value}
      name={name}
      label="Пароль"
      type="password"
    />
  );
}
