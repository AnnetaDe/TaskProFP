import { lazy } from 'react';

export const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
export const ScreensPage = lazy(() => import('../pages/ScreensPage/ScreensPage'));
export const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
export const AuthPage = lazy(() => import('../pages/AuthPage/AuthPage'));
export const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
export const DashboardLayout = lazy(() => import('../pages/DashboardLayout/DashboardLayout'));
