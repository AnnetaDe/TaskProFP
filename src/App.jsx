import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Login, Registration, Start } from './pages';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { Button } from './components/Button/Button';

function App() {
  return (
    <>
      <h1>App</h1>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Start />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
