import './App.css';
import { Route, Routes } from 'react-router-dom';
import { DashboardLayout, WelcomePage, NotFound, AuthPage } from './pages';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { refreshUserThunk } from './redux/user/userOperations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/user/userSelectors';
import { lazy, useEffect } from 'react';

const ScreensPage = lazy(() => import('./pages/ScreensPage/ScreensPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <div>refreshing...</div>
  ) : (
    <>
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
    </>
  );
}

export default App;
