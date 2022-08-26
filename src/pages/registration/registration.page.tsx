import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Container, Grid, Link, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { RegisterDisplayNameField } from 'pages/registration/display-name-field';
import { RegisterPasswordField } from 'pages/registration/password-field';
import { RegisterUsernameField } from 'pages/registration/username-field';
import { useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { authService } from 'shared/domains/auth/auth.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

const initFormState = { username: '', displayName: '', password: '' };
type TFormState = typeof initFormState;

export function RegistrationPageObserver() {
  const navigate = useNavigate();
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initFormState,
  });
  const { handleSubmit, formState, setError } = methods;
  const { error } = authService.store;

  useEffect(() => {
    if (error) {
      setError('password', { message: error.message });
      setError('username', { message: error.message });
    }
  }, [error, setError]);

  const onSubmit = useCallback(
    (data: TFormState) => {
      return authService.register(data).then((user) => {
        if (user) navigate('/');
      });
    },
    [navigate]
  );

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
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>

          <Box sx={{ mt: 1, width: '100%' }}>
            <RegisterUsernameField />
            <RegisterDisplayNameField />
            <RegisterPasswordField />
            <LoadingButton
              type="submit"
              size="large"
              fullWidth
              onClick={handleSubmit(onSubmit)}
              loading={formState.isSubmitting}
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Отправить
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Link to="/log-in" component={RouterLink} variant="body2">
                Уже есть учетная запись? Войти
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  );
}

export const RegistrationPage = withObserverMemo(RegistrationPageObserver);
