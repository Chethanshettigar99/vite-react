// src/components/orders/BulkActionsBar.jsx
import React from 'react';
import './order.css';

const BulkActionsBar = ({ selectedCount, onMarkShipped, onClearSelection }) => {
  // Use CSS to hide/show or conditional rendering based on selectedCount
  if (selectedCount === 0) {
    return null; // Or return with a hidden class for CSS transitions
  }

  return (
    <div className="bulk-actions-bar">
      <span>{selectedCount} order{selectedCount !== 1 ? 's' : ''} selected</span>
      <div className="bulk-actions-buttons">
         <button
            onClick={onMarkShipped}
            className="bulk-action-button primary"
            disabled={selectedCount === 0}
         >
           Mark as Shipped
         </button>
         {/* Add more action buttons here if needed */}
         <button onClick={onClearSelection} className="bulk-action-button secondary">
            Clear Selection
         </button>
      </div>
    </div>
  );
};

export default BulkActionsBar;