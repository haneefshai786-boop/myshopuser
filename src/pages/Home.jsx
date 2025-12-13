import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>HomeVendors</h1>
      <p>Select a vendor to browse products</p>

      <div style={{ display: 'grid', gap: 20 }}>

        <Link to="/vendors/restaurant">
          <div style={{ border: '1px solid #ccc', padding: 20 }}>
            <h2>Restaurants</h2>
          </div>
        </Link>

        <Link to="/vendors/grocery">
          <div style={{ border: '1px solid #ccc', padding: 20 }}>
            <h2>Grocery</h2>
          </div>
        </Link>

      </div>
    </div>
  );
}
