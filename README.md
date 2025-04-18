# React + Vite
# React Order Management Dashboard

**[Try the application out – click here ](https://vite-react-eight-psi-78.vercel.app/)**


A simple React application for displaying, filtering, sorting, and managing customer orders. This project demonstrates various React concepts including state management (useState, useEffect, useMemo, useCallback), component composition, event handling, and conditional rendering.

## Description

This application provides a user interface to view a list of orders. Users can search through orders, apply filters based on status and date range, sort the data by various columns, view detailed information for each order in a modal, select multiple orders for bulk actions (like marking as shipped), and export the current view to a CSV file.

## Features

* **Order Listing:** Displays orders in a paginated table.
* **Search:** Filter orders by Order ID, Customer Name, Email, or Status.
* **Filtering:**
    * Filter by Order Status (dynamically populated dropdown).
    * Filter by Date Range (start and end date inputs).
* **Sorting:** Sort the order list by clicking on column headers (ID, Customer, Date, Status, Amount). Supports ascending and descending order.
* **Pagination:** Navigate through large sets of orders using "Previous" and "Next" buttons.
* **Order Details Modal:** Click on any order row to view detailed information (including items ordered and shipping address) in a pop-up modal window.
* **Bulk Actions:**
    * Select multiple orders using checkboxes.
    * "Select All" checkbox for the current filtered view.
    * Perform actions on selected orders (e.g., "Mark as Shipped").
    * Clear current selection.
* **Export to CSV:** Export the currently filtered and sorted orders to a downloadable CSV file.
* **Loading & Error States:** Displays messages during data fetching and if errors occur.
* **Basic Authentication Flow:** Includes a placeholder logout button and mentions required credentials for access.

* ** try it out click on the link https://vite-react-eight-psi-78.vercel.app/ **

## Tech Stack

* **React:** (v17+ or v18+) JavaScript library for building user interfaces.
* **JavaScript (ES6+):** Core language.
* **CSS:** For styling the components.


    ```
    This will start the development server, typically at `http://localhost:3000`.

## Usage

1.  Open your web browser and navigate to `http://localhost:3000` (or the port specified by the development server).
2.  You will likely be redirected to a login page (if implemented). Use the following credentials:
    * **Email:** `test@example.com`
    * **Password:** `password`
3.  Once logged in, you will see the Order Management Dashboard.
4.  Use the search bar, status dropdown, and date pickers to filter the orders.
5.  Click on table headers (like "Order ID", "Order Date") to sort the data.
6.  Click on any order row to open the details modal.
7.  Use the checkboxes to select orders and the "Bulk Actions Bar" (which appears when items are selected) to perform actions like "Mark as Shipped".
8.  Use the "Export CSV" button to download the current list of orders.
9.  Navigate through pages using the "Previous" and "Next" buttons below the table.
10. Use the "Logout" button to simulate logging out.


**Note:** This version uses mock data for demonstration purposes. It includes simulated API loading states and basic error handling.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
