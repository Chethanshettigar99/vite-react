// src/components/orders/SearchBar.jsx
import React from 'react';
import './order.css';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by ID..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search Orders"
      />
    </div>
  );
};

export default SearchBar;