// src/components/orders/SearchBar.jsx
import React from 'react';
import './order.css'; // Add basic styling

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by Order ID or Customer..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;