// src/components/orders/OrderItem.jsx
import React, { useCallback } from 'react';
import './order.css';

const OrderItem = ({ order, onViewDetails, isSelected, onSelectOrder }) => {

  const formatDate = useCallback((dateObject) => {
    if (!dateObject || !(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
        return 'N/A';
    }
    // Simple Date format for the table row
    return dateObject.toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric'
    });
  }, []);

  const formatCurrency = useCallback((amount) => {
    const num = Number(amount);
    return isNaN(num) ? 'N/A' : `$${num.toFixed(2)}`;
  }, []);

  // Stop row click propagation when interacting with checkbox cell/input
  const handleCheckboxClick = useCallback((e) => {
      e.stopPropagation();
      onSelectOrder(order.id, e.target.checked);
  }, [onSelectOrder, order.id]);

  const handleCheckboxCellClick = useCallback((e) => {
      e.stopPropagation(); // Prevent row onClick when clicking the cell padding around checkbox
  }, []);

   // Trigger details view only if the click is not on the checkbox cell
  const handleRowClick = useCallback(() => {
    onViewDetails(order);
  }, [onViewDetails, order]);


  return (
    <tr
      className={`order-item ${isSelected ? 'selected' : ''}`}
      onClick={handleRowClick} // View details on row click
      tabIndex={0} // Make row focusable
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRowClick(); }} // Keyboard accessibility for details
    >
      {/* Checkbox Cell */}
      <td onClick={handleCheckboxCellClick} className="checkbox-cell">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxClick} // Use specific handler for checkbox change
          aria-label={`Select order ${order.id}`}
          onClick={e => e.stopPropagation()} // Ensure clicking checkbox itself also stops propagation
        />
      </td>
      {/* Data Cells */}
      <td>{order.id}</td>
      <td>{order.customerName}</td>
      <td>{formatDate(order.date)}</td>
      <td><span className={`status status-${order.status?.toLowerCase()}`}>{order.status || 'N/A'}</span></td>
      <td style={{ textAlign: 'right' }}>{formatCurrency(order.amount)}</td>
    </tr>
  );
};

// Memoize OrderItem to prevent unnecessary re-renders when props haven't changed
// Particularly useful in lists where parent state changes might trigger full list re-render
export default React.memo(OrderItem);