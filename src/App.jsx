import './App.css';
import { Route, Routes } from 'react-router-dom';
import {
  DashboardLayout,
  Login,
  Registration,
  WelcomePage,
  HomePage,
  ScreensPage,
  NotFound,
} from './pages';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
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
          <Route path="boardid" element={<ScreensPage />} />
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
          path="/auth/register"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
