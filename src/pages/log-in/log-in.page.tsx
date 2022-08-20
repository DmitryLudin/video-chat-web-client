import { LockOutlined } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Box, Container, Grid, Link, Typography } from '@mui/material';
import { LogInPasswordField } from 'pages/log-in/password-field';
import { LogInUsernameField } from 'pages/log-in/username-field';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Link as RouterLink,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { authService } from 'shared/domains/auth/auth.service';
import { ILogInDto } from 'shared/domains/auth/dto';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

const initFormState = { username: '', password: '' };

export function LoginPageObserver() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const stateWithFrom = state as { from?: Location } | undefined;
  const { isAuthorized, error } = authService.store;
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initFormState,
  });
  const { handleSubmit, formState, setError } = methods;

  useEffect(() => {
    if (error) {
      setError('password', { message: error.message });
      setError('username', { message: error.message });
    }
  }, [error, setError]);

  const onSubmit = (data: ILogInDto) => {
    return authService.logIn(data).then((user) => {
      if (user) navigate(stateWithFrom?.from?.pathname || '/');
    });
  };

  if (isAuthorized) {
    return <Navigate to={stateWithFrom?.from?.pathname || '/'} replace />;
  }

  return (
    <FormProvider {...methods}>
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
            Авторизация
          </Typography>

          <Box sx={{ mt: 1, width: '100%' }}>
            <LogInUsernameField />
            <LogInPasswordField />
            <LoadingButton
              size="large"
              fullWidth
              onClick={handleSubmit(onSubmit)}
              loading={formState.isSubmitting}
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Войти
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Link to="/register" variant="body2" component={RouterLink}>
                Нет учетной записи? Создать
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  );
}

export const LoginPage = withObserverMemo(LoginPageObserver);
