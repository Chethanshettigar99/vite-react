// src/pages/OrdersPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/orders/SearchBar';
import Filters from '../components/orders/Filters'; // You'll create this
import OrderList from '../components/orders/OrderList';
import Pagination from '../components/orders/Pagination';
import { useNavigate } from 'react-router-dom'; // To handle logout redirection
// import { getOrders } from '../services/orderService'; // Use this for API calls
import mockOrders from '../services/mockOrders'; // Import mock data
import './OrdersPage.css'; // Add basic styling

const ITEMS_PER_PAGE = 10;

const OrdersPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]); // Original fetched data
  const [filteredOrders, setFilteredOrders] = useState([]); // Data after search/filter
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // Example filter state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Data (Mock or API)
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        // const data = await getOrders(); // Use for real API
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        setAllOrders(mockOrders);
        setFilteredOrders(mockOrders); // Initially, filtered orders are all orders
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []); // Empty dependency array means run once on mount

  // Apply Search and Filter
  useEffect(() => {
    let result = allOrders;

    // Apply status filter
    if (statusFilter) {
      result = result.filter(order => order.status === statusFilter);
    }

    // Apply search term (e.g., search by ID or customer name)
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(order =>
        order.id.toLowerCase().includes(lowerCaseSearch) ||
        order.customerName.toLowerCase().includes(lowerCaseSearch)
      );
    }

    setFilteredOrders(result);
    setCurrentPage(1); // Reset to page 1 when filters/search changes
  }, [searchTerm, statusFilter, allOrders]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const currentOrders = useMemo(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);


  const handleLogoutClick = () => {
    onLogout();
    navigate('/login'); // Redirect after logout
  };

  return (
    <div className="orders-page">
       <div className="orders-header">
            <h1>Orders</h1>
            <button onClick={handleLogoutClick} className="logout-button">Logout</button>
       </div>

      <div className="controls">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <Filters
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            // Add more filter props as needed
        />
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <OrderList orders={currentOrders} />
          {totalPages > 1 && (
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
              />
          )}
           {filteredOrders.length === 0 && !loading && <p>No orders found matching your criteria.</p>}
        </>
      )}
    </div>
  );
};

export default OrdersPage;