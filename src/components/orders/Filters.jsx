// src/components/orders/Filters.jsx
import React from 'react';
import './order.css'; // Add basic styling

const Filters = ({ statusFilter, onStatusChange }) => {
  // Get unique statuses from mock data or API response in a real scenario
  const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled']; // Example statuses

  return (
    <div className="filters">
      <label htmlFor="status-filter">Filter by Status: </label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        {statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      {/* Add more filters here (e.g., date range picker) */}
    </div>
  );
};

export default Filters;