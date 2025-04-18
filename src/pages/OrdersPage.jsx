import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Components
import SearchBar from '../components/orders/SearchBar';
import Filters from '../components/orders/Filters';
import OrderList from '../components/orders/OrderList';
import Pagination from '../components/orders/Pagination';
import OrderDetailsModal from '../components/orders/OrderDetailsModal';
import BulkActionsBar from '../components/orders/BulkActionsBar';
import ExportButton from '../components/orders/ExportButton';

// Import Services / Data
// import { getOrders } from '../services/orderService'; // Use this for real API calls
import mockOrders from '../services/mockOrders'; // Import mock data

// Import CSS
import '../components/orders/order.css';

const ITEMS_PER_PAGE = 10; // Configurable items per page

const OrdersPage = ({ onLogout }) => {
    const navigate = useNavigate();

    // --- State ---
    const [allOrders, setAllOrders] = useState([]); // Original fetched data with Date objects
    const [filteredOrders, setFilteredOrders] = useState([]); // Data after search/filter/sort
    const [allFilteredOrderIds, setAllFilteredOrderIds] = useState(new Set()); // IDs of all filtered orders (for select-all)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' }); // Default sort
    const [selectedOrderIds, setSelectedOrderIds] = useState(new Set()); // For bulk actions
    const [viewingOrder, setViewingOrder] = useState(null); // For details modal
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // --- Data Fetching ---
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError('');
            setSelectedOrderIds(new Set()); // Clear selection on data refresh
            setViewingOrder(null); // Close modal on data refresh
            try {
                // const rawData = await getOrders(); // Use for real API
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
                const rawData = mockOrders;

                // --- Process data: Ensure dates are Date objects ---
                const ordersWithDates = rawData.map(order => ({
                    ...order,
                    date: new Date(order.date) // Convert date string to Date object
                }));
                setAllOrders(ordersWithDates);
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []); // Empty dependency array means run once on mount

    // --- Dynamic Status Options ---
    const uniqueStatuses = useMemo(() => {
        if (!allOrders || allOrders.length === 0) return [];
        const statuses = new Set(allOrders.map(order => order.status).filter(Boolean));
        return Array.from(statuses).sort();
    }, [allOrders]);

    // --- Filtering, Sorting Logic ---
    useEffect(() => {
        let result = [...allOrders]; // Start with a fresh copy

        // Apply Status Filter
        if (statusFilter) {
            result = result.filter(order => order.status === statusFilter);
        }

        // Apply Date Range Filter
        try {
            if (dateRange.start) {
                const startDate = new Date(dateRange.start);
                startDate.setHours(0, 0, 0, 0); // Start of the day
                 if (!isNaN(startDate)) { // Check if date is valid
                    result = result.filter(order => order.date >= startDate);
                }
            }
            if (dateRange.end) {
                const endDate = new Date(dateRange.end);
                endDate.setHours(23, 59, 59, 999); // End of the day
                 if (!isNaN(endDate)) { // Check if date is valid
                    result = result.filter(order => order.date <= endDate);
                }
            }
        } catch (e) {
            console.error("Date Filtering Error:", e); // Handle potential date parsing errors
        }


        // Apply Search Term
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase().trim();
            if (lowerCaseSearch) {
                 result = result.filter(order =>
                    order.id.toLowerCase().includes(lowerCaseSearch) ||
                    order.customerName.toLowerCase().includes(lowerCaseSearch) ||
                    (order.customerEmail && order.customerEmail.toLowerCase().includes(lowerCaseSearch)) ||
                    (order.status && order.status.toLowerCase().includes(lowerCaseSearch))
                );
            }
        }

        // Store IDs of all filtered orders *before* sorting
        setAllFilteredOrderIds(new Set(result.map(order => order.id)));

        // Apply Sorting
        if (sortConfig.key !== null) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                let comparison = 0;

                if (aValue instanceof Date && bValue instanceof Date) {
                    comparison = aValue.getTime() - bValue.getTime();
                } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                    comparison = aValue - bValue;
                } else {
                    // Ensure values are strings for comparison
                    const strA = String(aValue ?? '').toLowerCase();
                    const strB = String(bValue ?? '').toLowerCase();
                    comparison = strA.localeCompare(strB);
                }
                return sortConfig.direction === 'ascending' ? comparison : comparison * -1;
            });
        }

        setFilteredOrders(result);
        setCurrentPage(1); // Reset to page 1 whenever filters/search/sort changes

        // Optional: Prune selectedOrderIds if some are no longer in the filtered list
        // setSelectedOrderIds(currentSelected => {
        //     const currentFilteredSet = new Set(result.map(o => o.id));
        //     const newSelected = new Set();
        //     currentSelected.forEach(id => {
        //         if (currentFilteredSet.has(id)) newSelected.add(id);
        //     });
        //     return newSelected;
        // });


    }, [searchTerm, statusFilter, dateRange, sortConfig, allOrders]); // Dependencies


    // --- Pagination Logic ---
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const currentOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredOrders.slice(startIndex, endIndex);
    }, [filteredOrders, currentPage]);


    // --- Event Handlers ---
    const handleLogoutClick = useCallback(() => {
        if (onLogout) {
            onLogout();
        }
        navigate('/login'); // Assuming '/login' is your login route
    }, [navigate, onLogout]);

    const handleSort = useCallback((key) => {
        setSortConfig(prevConfig => {
            const direction = prevConfig.key === key && prevConfig.direction === 'ascending'
                ? 'descending'
                : 'ascending';
            return { key, direction };
        });
    }, []);

    const handleDateChange = useCallback((newRange) => {
        setDateRange(newRange);
    }, []);

    const handleViewDetails = useCallback((order) => {
        setViewingOrder(order);
    }, []);

    const handleCloseModal = useCallback(() => {
        setViewingOrder(null);
    }, []);

    const handleSelectOrder = useCallback((orderId, isSelected) => {
        setSelectedOrderIds(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (isSelected) {
                newSelected.add(orderId);
            } else {
                newSelected.delete(orderId);
            }
            return newSelected;
        });
    }, []);

    const handleSelectAll = useCallback((isSelected) => {
        if (isSelected) {
            setSelectedOrderIds(new Set(allFilteredOrderIds)); // Select all IDs from the current filter results
        } else {
            setSelectedOrderIds(new Set());
        }
    }, [allFilteredOrderIds]); // Depends on the currently filtered IDs

    const handleClearSelection = useCallback(() => {
        setSelectedOrderIds(new Set());
    }, []);

    const handleMarkSelectedShipped = useCallback(() => {
        if (selectedOrderIds.size === 0) return;

        // --- Simulate API call and update local state ---
        // In a real app: try { await api.updateOrderStatus(Array.from(selectedOrderIds), 'Shipped'); ... } catch(e) { handle error }
        console.log(`Simulating: Marking ${selectedOrderIds.size} orders as Shipped:`, Array.from(selectedOrderIds));

        setAllOrders(prevOrders =>
            prevOrders.map(order =>
                selectedOrderIds.has(order.id)
                    ? { ...order, status: 'Shipped' } // Update status immutably
                    : order
            )
        );
        // Note: The main useEffect will automatically re-filter and re-sort the updated allOrders

        setSelectedOrderIds(new Set()); // Clear selection after action
        alert(`${selectedOrderIds.size} order(s) marked as Shipped (simulated).`); // User feedback

    }, [selectedOrderIds]);


    // --- Render ---
    return (
        <div className="orders-page">
            <div className="orders-header">
                <h1>Order Management</h1>
                <button onClick={handleLogoutClick} className="logout-button">Logout</button>
            </div>

            {/* --- Controls Area --- */}
            <div className="controls">
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
                <div className="filters-and-actions">
                     <Filters
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        availableStatuses={uniqueStatuses}
                        dateRange={dateRange}
                        onDateChange={handleDateChange}
                    />
                    <ExportButton
                        data={filteredOrders} // Export only filtered/sorted data
                        filename={`orders_export_${new Date().toISOString().split('T')[0]}.csv`}
                    />
                </div>
            </div>

             {/* --- Bulk Actions Bar (conditional) --- */}
             <BulkActionsBar
                selectedCount={selectedOrderIds.size}
                onMarkShipped={handleMarkSelectedShipped}
                onClearSelection={handleClearSelection}
            />


            {/* --- Main Content: Table or Messages --- */}
            {loading && <p className="loading-message">Loading orders...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && (
                <>
                    <div className="order-table-container">
                        <OrderList
                           orders={currentOrders} // Pass only orders for the current page
                           onSort={handleSort}
                           sortConfig={sortConfig}
                           onViewDetails={handleViewDetails}
                           selectedOrderIds={selectedOrderIds}
                           onSelectOrder={handleSelectOrder}
                           onSelectAll={handleSelectAll}
                           allFilteredOrderIds={allFilteredOrderIds} // Pass the Set of all filtered IDs
                         />
                    </div>

                    {filteredOrders.length === 0 && !loading && (
                        <p className="no-orders-message">No orders found matching your criteria.</p>
                    )}

                    {filteredOrders.length > 0 && totalPages > 1 && (
                         <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={setCurrentPage}
                          />
                    )}
                </>
             )}

             {/* --- Order Details Modal (conditional) --- */}
             {viewingOrder && (
                <OrderDetailsModal
                    order={viewingOrder}
                    onClose={handleCloseModal}
                 />
             )}
        </div>
    );
};

export default OrdersPage;