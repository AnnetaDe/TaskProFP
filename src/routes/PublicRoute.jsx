import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggined } from '../redux/user/userSelectors';

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggined);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); from redux
  return isLoggedIn ? <Navigate to={location?.state || '/'} /> : children;
};

export default PublicRoute;
