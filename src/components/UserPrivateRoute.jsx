import { Navigate, Outlet } from 'react-router-dom';

export default function UserPrivateRoute() {
  const token = localStorage.getItem('userToken');
  return token ? <Outlet /> : <Navigate to="/login" />;
}
