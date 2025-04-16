// src/components/orders/OrderItem.jsx
import React from 'react';
import './order.css'; // Add basic styling for rows/cells

const OrderItem = ({ order }) => {
  const formatDate = (dateString) => {
      // Basic date formatting, consider using a library like date-fns for robust formatting
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const formatCurrency = (amount) => {
      // Basic currency formatting
      return `$${amount.toFixed(2)}`;
  }

  return (
    <tr className="order-item">
      <td>{order.id}</td>
      <td>{order.customerName}</td>
      <td>{formatDate(order.date)}</td>
      <td><span className={`status status-${order.status?.toLowerCase()}`}>{order.status}</span></td>
      <td>{formatCurrency(order.amount)}</td>
      {/* Add more cells if needed */}
    </tr>
  );
};

export default OrderItem;
