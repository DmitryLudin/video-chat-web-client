import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { authService } from 'shared/domains/auth/auth.service';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setUsername(e.target.value);
    }, []);

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setPassword(e.target.value);
    }, []);

  const handleSubmit = useCallback(() => {
    authService.logIn({ username, password });
  }, [username, password]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Как тебя зовут?
        </Typography>
        <Box sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={username}
            label="Твое имя или псевдоним"
            name="username"
            onChange={handleChangeUsername}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={handleChangePassword}
            name="password"
            label="Пароль"
            type="password"
          />
          <Button
            type="submit"
            size="large"
            fullWidth
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
