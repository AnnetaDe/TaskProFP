import './App.css';
import { useRoutes } from 'react-router-dom';
// import { DashboardLayout, WelcomePage, NotFound, AuthPage } from './pages';

import { routeConfig } from './config/routeConfig';
import { Suspense, useEffect } from 'react';
import { refreshUserThunk } from './redux/user/userOperations';
import { useDispatch } from 'react-redux';
import Loader from './components/Loader/Loader';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  // useEffect(() => {
  //   if (notification) {
  //     showToast(notification);
  //     const timer = setTimeout(() => {
  //       dispatch(clearNotification());
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [notification, dispatch]);
  const routing = useRoutes(routeConfig);

  return (
    <>
      {' '}
      <Suspense fallback={<Loader />}>{routing}</Suspense>
    </>
  );
}

export default App;
