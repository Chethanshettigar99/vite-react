// src/components/orders/OrderList.jsx
import React from 'react';
import OrderItem from './OrderItem';
import './order.css';

const OrderList = ({
    orders,
    onSort,
    sortConfig,
    onViewDetails,
    selectedOrderIds,
    onSelectOrder,
    onSelectAll,
    allFilteredOrderIds // Set of all IDs matching the current filters
}) => {

  // Helper to add sort indicator
  const getSortIndicator = (columnKey) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  // Helper to create sortable header cells
  const SortableHeader = ({ columnKey, children, className = '' }) => (
    <th className={`sortable-header ${className}`} onClick={() => onSort(columnKey)} title={`Sort by ${children}`}>
        {children}
        <span className="sort-indicator">{getSortIndicator(columnKey)}</span>
    </th>
  );

  // Determine the state of the "Select All" checkbox based on *all filtered orders*
  const areAllFilteredSelected = allFilteredOrderIds.size > 0 &&
        Array.from(allFilteredOrderIds).every(id => selectedOrderIds.has(id));


  return (
    <table className="order-table">
      <thead>
        <tr>
          {/* Checkbox Header */}
          <th>
              <input
                  type="checkbox"
                  title={areAllFilteredSelected ? "Deselect All Filtered Orders" : "Select All Filtered Orders"}
                  checked={areAllFilteredSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  disabled={allFilteredOrderIds.size === 0}
                  aria-label={areAllFilteredSelected ? "Deselect all filtered orders" : "Select all filtered orders"}
              />
          </th>
          {/* Sortable Data Headers */}
          <SortableHeader columnKey="id">Order ID</SortableHeader>
          <SortableHeader columnKey="customerName">Customer</SortableHeader>
          <SortableHeader columnKey="date">Order Date</SortableHeader>
          <SortableHeader columnKey="status">Status</SortableHeader>
          <SortableHeader columnKey="amount" className="amount-header">Amount</SortableHeader>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <OrderItem
            key={order.id}
            order={order}
            onViewDetails={onViewDetails}
            isSelected={selectedOrderIds.has(order.id)}
            onSelectOrder={onSelectOrder}
          />
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;