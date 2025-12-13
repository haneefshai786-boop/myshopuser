import { useEffect, useState } from 'react';

export default function Toast({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); 
    const timer = setTimeout(() => {
      setVisible(false); 
      setTimeout(onClose, 500); 
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 15px',
      borderRadius: 5,
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      zIndex: 1000,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.5s, transform 0.5s',
    }}>
      {message}
    </div>
  );
}
