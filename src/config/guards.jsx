import PublicRoute from "../routes/PublicRoute";
import PrivateRoute from "../routes/PrivateRoute";


export const withPrivate = (element) => (
  <PrivateRoute>{element}</PrivateRoute>
);

export const withPublic = (element) => (
  <PublicRoute>{element}</PublicRoute>
);
