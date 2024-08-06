import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggined } from '../redux/user/userSelectors';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const isLoggedIn = useSelector(selectIsLoggined);
  console.log('privat', isLoggedIn);
  return isLoggedIn ? children : <Navigate to="auth/login" state={location} />;
};

export default PrivateRoute;
