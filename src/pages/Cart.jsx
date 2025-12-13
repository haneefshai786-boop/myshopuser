import { useOutletContext } from 'react-router-dom';

export default function Cart() {
  const { cart, setCart } = useOutletContext(); // get cart & setter from layout

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Simulate order placement
    alert(`Order placed! Total amount: ₹${total}`);

    // Clear cart after purchase
    setCart([]);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item._id}>
                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
          <button
            onClick={handleBuyNow}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              marginTop: 10
            }}
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}
