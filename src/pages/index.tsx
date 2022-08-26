import loadable from '@loadable/component';
import { Loader } from 'components/loader';

export const HomePage = loadable(() => import('./home'), {
  fallback: <Loader />,
});

export const LoginPage = loadable(() => import('./log-in'), {
  fallback: <Loader />,
});

export const RegistrationPage = loadable(() => import('./registration'), {
  fallback: <Loader />,
});

export const ConferencePage = loadable(() => import('./conference'), {
  fallback: <Loader />,
});
