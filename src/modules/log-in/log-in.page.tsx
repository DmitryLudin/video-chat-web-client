import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

export function LoginPage() {
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
        <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
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
            label="Твое имя или псевдоним"
            name="username"
            autoFocus
          />
          <Button
            type="submit"
            size="large"
            fullWidth
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
