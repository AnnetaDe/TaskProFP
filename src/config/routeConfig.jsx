
import { ROUTES } from './routes';
import { withPrivate, withPublic } from './guards';
import {
  HomePage,
  ScreensPage,
  WelcomePage,
  AuthPage,
  NotFound,
  DashboardLayout,
} from './lazyPages';

export const routeConfig = [
  {
    path: ROUTES.HOME,
    element: withPrivate(<DashboardLayout />),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'board/:id', element: <ScreensPage /> },
    ],
  },
  {
    path: ROUTES.WELCOME,
    element: withPublic(<WelcomePage />),
  },
  {
    path: ROUTES.AUTH,
    element: withPublic(<AuthPage />),
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
];