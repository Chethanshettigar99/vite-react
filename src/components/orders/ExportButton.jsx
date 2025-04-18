// src/components/orders/ExportButton.jsx
import React from 'react';
import './order.css';

const ExportButton = ({ data, filename = 'export.csv' }) => {

  const formatValueForCSV = (value) => {
    if (value === null || value === undefined) return '';

    if (value instanceof Date) {
      // Consistent ISO format YYYY-MM-DD
      try {
            return value.toISOString().split('T')[0];
      } catch (e) {
          return 'Invalid Date'; // Handle potential invalid date objects
      }
    }

    // Convert arrays (like items) to a simple string representation or handle specific fields
     if (Array.isArray(value)) {
      return `"${value.map(item => item.name || item).join('; ')}"`; // Example: Join item names
    }


    let stringValue = String(value);
    // Escape quotes by doubling them and enclose if it contains comma, newline, or quote
    if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
      // Ensure existing quotes are doubled before wrapping
      stringValue = stringValue.replace(/"/g, '""');
      return `"${stringValue}"`;
    }
    return stringValue;
  };

  const convertToCSV = (objArray, headers) => {
    if (!objArray || objArray.length === 0) return '';

    const headerKeys = headers.map(h => h.key);
    const headerTitles = headers.map(h => h.label);

    const csvRows = [headerTitles.join(',')]; // Header row

    objArray.forEach(row => {
        const values = headerKeys.map(key => formatValueForCSV(row[key]));
        csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  };

  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No data available to export.');
      return;
    }

    // Define columns and headers for the CSV export
    const exportHeaders = [
        { key: 'id', label: 'Order ID' },
        { key: 'customerName', label: 'Customer Name' },
        { key: 'customerEmail', label: 'Customer Email' },
        { key: 'date', label: 'Order Date' },
        { key: 'status', label: 'Status' },
        { key: 'amount', label: 'Amount' },
        { key: 'shippingAddress', label: 'Shipping Address' },
        // { key: 'items', label: 'Items' }, // Export flattened items if needed
    ];

    // Prepare data for export (ensure necessary fields exist)
    const dataToExport = data.map(order => ({
        id: order.id,
        customerName: order.customerName,
        customerEmail: order.customerEmail || '',
        date: order.date, // Already a Date object
        status: order.status,
        amount: order.amount,
        shippingAddress: order.shippingAddress || '',
        // items: order.items || [] // Pass items array if needed by formatValueForCSV
    }));


    const csvString = convertToCSV(dataToExport, exportHeaders);
    if (!csvString) return;

    // Create and trigger download link
    const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' }); // Add BOM for Excel compatibility
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
        alert("CSV export is not supported in this browser.");
        console.error("CSV Export Error: link.download not supported.");
    }
  };

  return (
    <button
        onClick={handleExport}
        className="export-button"
        disabled={!data || data.length === 0}
        title={(!data || data.length === 0) ? "No data to export" : "Export current view to CSV"}
    >
      Export CSV
    </button>
  );
};

export default ExportButton;