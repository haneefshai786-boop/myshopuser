import { Navigate, Outlet } from 'react-router-dom';


export default function UserPrivateRoute() {
return localStorage.getItem('userToken') ? <Outlet /> : <Navigate to="/login" />;
}
