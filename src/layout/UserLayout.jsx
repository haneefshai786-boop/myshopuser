import { Link, Outlet } from 'react-router-dom';


export default function UserLayout() {
return (
<div>
<header style={{ padding:10, background:'#2563EB', color:'#fff' }}>
<Link to="/" style={{ color:'#fff', marginRight:10 }}>Home</Link>
<Link to="/cart" style={{ color:'#fff' }}>Cart</Link>
<Link to="/orders" style={{ color:'#fff', marginLeft:10 }}>My Orders</Link>
</header>
<main style={{ padding:15 }}>
<Outlet />
</main>
</div>
);
}
