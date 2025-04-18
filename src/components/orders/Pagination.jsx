// src/components/orders/Pagination.jsx
import React from 'react';
import './order.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Basic pagination - could be enhanced (e.g., page numbers)
  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1} aria-label="Previous Page">
        Previous
      </button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick={handleNext} disabled={currentPage === totalPages} aria-label="Next Page">
        Next
      </button>
    </div>
  );
};

export default Pagination;