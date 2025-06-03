import './App.css';
import { Route, Routes } from 'react-router-dom';
import { DashboardLayout, WelcomePage, NotFound, AuthPage } from './pages';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import { useSelector } from 'react-redux';
import {
 
  selectIsRefreshing,
  selectNotification,
} from './redux/user/userSelectors';
import { lazy, useEffect } from 'react';
import Loader from './components/Loader/Loader';

import { showToast } from './helpers/showToast';
import { useDispatch } from 'react-redux';
import { clearNotification } from './redux/user/userSlice';
import { refreshUserThunk } from './redux/user/userOperations';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ScreensPage = lazy(() => import('./pages/ScreensPage/ScreensPage'));
function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const notification = useSelector(selectNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      showToast(notification);
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  // useEffect(() => {
  //   dispatch(refreshUserThunk());
  // }, []);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="board/:id" element={<ScreensPage />} />
      </Route>
      <Route
        path="/welcome"
        element={
          <PublicRoute>
            <WelcomePage />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/:type"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
