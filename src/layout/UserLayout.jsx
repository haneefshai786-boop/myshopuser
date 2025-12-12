import { Outlet, Link } from 'react-router-dom';
export default function UserLayout(){
  return (
    <div>
      <header className="header">
        <div className="container nav">
          <Link to="/">Home</Link>
          <Link to="/vendors">Vendors</Link>
        </div>
      </header>
      <main className="container"><Outlet /></main>
    </div>
  );
}
