import './App.css';
import { Route, Routes } from 'react-router-dom';
import {
  DashboardLayout,
  WelcomePage,
  HomePage,
  ScreensPage,
  NotFound,
  AuthPage,
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
