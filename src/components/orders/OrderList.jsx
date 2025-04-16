// src/components/orders/OrderList.jsx
import React from 'react';
import OrderItem from './OrderItem';
import './order.css'; // Add basic styling for the table/list

const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    // This message is now handled in OrdersPage, but good practice here too
    // return <p>No orders to display.</p>;
    return null;
  }

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer Name</th>
          <th>Order Date</th>
          <th>Status</th>
          <th>Amount</th>
          {/* Add more headers if needed */}
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;