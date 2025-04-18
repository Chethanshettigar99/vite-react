// src/components/orders/Filters.jsx
import React from 'react';
import './order.css';

const Filters = ({
    statusFilter,
    onStatusChange,
    availableStatuses = [],
    dateRange,
    onDateChange
}) => {

  const handleDateInputChange = (e) => {
    const { name, value } = e.target;
    // Basic validation could be added here if needed
    onDateChange({ ...dateRange, [name]: value });
  };

  return (
    <div className="filters">
      {/* Status Filter */}
      <div className="filter-item">
        <label htmlFor="status-filter">Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by Status"
        >
          <option value="">All Statuses</option>
          {availableStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="filter-item">
         <label htmlFor="start-date">From:</label>
         <input
            type="date"
            id="start-date"
            name="start" // Matches state key
            value={dateRange.start}
            onChange={handleDateInputChange}
            className="date-input"
            aria-label="Filter start date"
         />
      </div>
      <div className="filter-item">
        <label htmlFor="end-date">To:</label>
        <input
            type="date"
            id="end-date"
            name="end" // Matches state key
            value={dateRange.end}
            onChange={handleDateInputChange}
            min={dateRange.start || undefined} // Prevent end date before start date
            className="date-input"
            aria-label="Filter end date"
        />
      </div>
    </div>
  );
};

export default Filters;