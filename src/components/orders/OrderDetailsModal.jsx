// src/components/orders/OrderDetailsModal.jsx
import React, { useEffect } from 'react';
import './order.css';

const OrderDetailsModal = ({ order, onClose }) => {
  // Add/Remove 'active' class for transitions
  useEffect(() => {
    // Add class when component mounts (modal becomes visible)
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        // Delay adding class slightly to allow initial render for transition
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });
    }
    // Cleanup function to remove class when component unmounts
    return () => {
      if (overlay) {
        overlay.classList.remove('active');
      }
    };
  }, []); // Run only once when the modal mounts

  // Handle Esc key press to close modal
   useEffect(() => {
    const handleEsc = (event) => {
       if (event.key === 'Escape') {
          handleClose();
       }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
       window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]); // Add onClose to dependency array if it changes


  // Function to handle closing, potentially adding transition out
  const handleClose = () => {
      const overlay = document.querySelector('.modal-overlay');
      if (overlay) {
            overlay.classList.remove('active');
            // Wait for transition to finish before calling onClose prop
            overlay.addEventListener('transitionend', onClose, { once: true });
      } else {
          onClose(); // Fallback if overlay not found
      }
  };


  if (!order) return null;

  const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;
  const formatDate = (dateObject) => {
     if (!dateObject || !(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
         return 'N/A';
     }
     return dateObject.toLocaleDateString(undefined, {
         year: 'numeric', month: 'long', day: 'numeric',
         hour: '2-digit', minute: '2-digit' // More detailed format
     });
  }

  return (
    // Add 'active' class dynamically for transitions
    <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={handleClose} aria-label="Close dialog">&times;</button>
        <h2 id="modal-title">Order Details - {order.id}</h2>

        <div className="modal-section">
            <h4>Customer Information</h4>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Email:</strong> {order.customerEmail || 'N/A'}</p>
        </div>

        <div className="modal-section">
            <h4>Order Summary</h4>
            <p><strong>Order Date:</strong> {formatDate(order.date)}</p>
            <p><strong>Status:</strong> <span className={`status status-${order.status?.toLowerCase()}`}>{order.status}</span></p>
            <p><strong>Total Amount:</strong> {formatCurrency(order.amount)}</p>
        </div>

         <div className="modal-section">
            <h4>Items Ordered</h4>
            {order.items && order.items.length > 0 ? (
                <ul className="modal-item-list">
                    {order.items.map(item => (
                        <li key={item.id}>
                             {item.name} ({item.quantity} x {formatCurrency(item.price)})
                        </li>
                    ))}
                </ul>
            ) : <p>No item details available.</p>}
        </div>

         <div className="modal-section">
            <h4>Shipping Address</h4>
             {/* Improved address formatting */}
            <p style={{ whiteSpace: 'pre-wrap' }}>{order.shippingAddress?.replace(/, /g, '\n') || 'N/A'}</p>
         </div>

         {/* Optional Footer for actions within modal */}
         {/* <div className="modal-footer">
            <button onClick={handleClose}>Close</button>
         </div> */}
      </div>
    </div>
  );
};

export default OrderDetailsModal;