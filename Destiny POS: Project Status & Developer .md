Destiny POS: Project Status & Developer Handover

  1. Project Overview
  Destiny POS is a "Stateless-First" retail management system. It is built to handle
  multiple branches, track inventory via a batch-based system (to handle varying expiry
  dates and purchase prices), and provide a modern, responsive interface for both desktop
  and mobile users.

  Tech Stack
   * Frontend: React 19, Vite, Tailwind CSS (Styling), Lucide-React (Icons), Axios (API
     Client).
   * Backend: Django 5.0, Django Rest Framework (DRF), SimpleJWT (Authentication), MySQL
     (Production target) / SQLite (Current dev).
   * DevOps: Docker-ready (docker-compose.yml present), Git (GitHub repository initialized).

  ---

  2. Current Implementation Status

  A. Core Layout & Navigation
   * STATUS: 95% Complete (UI-wise)
   * Done:
       * Implemented DashboardLayout.jsx which dynamically switches between a DesktopSidebar
         and a MobileBottomNav.
       * Responsive "Top Bar" for mobile showing branch location and user status.
       * Smooth page transitions using Tailwind's animate-in utilities.
   * Missing:
       * The "Branch Switcher" in the UI is currently static; it doesn't actually change the
         context of the data being fetched.

  B. Inventory Module (The "Heart" of the App)
   * STATUS: Backend API Live | Frontend Read-Only (Live Data) | Write Operations Pending
   * What is Working (Live):
       * Backend Data Structure: We are using a sophisticated Batch-Based System. Instead of
         a simple stock_count on the Product model, we use InventoryBatch. This allows the
         business to track that "Batch A" of Milk expires in June, while "Batch B" expires
         in July.
       * Serializers: The ProductSerializer in the backend is "smart." It automatically
         calculates total stock by summing up all associated batches and determines the
         retail price based on the most recent batch.
       * Frontend Data Fetching: The InventoryPage.jsx uses a useEffect hook and Axios to
         fetch real data from http://127.0.0.1:8000/api/inventory/products/.
       * Filtering & Search: The frontend uses useMemo to filter the table in real-time by
         category or search term without triggering unnecessary re-renders.
       * UI Feedback: Added "Loading" spinners (using Loader2) and "Error" states with "Try
         Again" functionality.
   * What is Partially Working / Gaps:
       * Add Product (Backend vs. Frontend): You can add products via the Django Admin
         (/admin), and they will immediately appear on the React frontend. However, clicking
         "Save Product" in the React Inventory Modal does not yet send a POST request to the
         server. It currently only closes the modal and triggers a re-fetch.
       * Stock Adjustment: There is currently no UI to add a new batch to an existing
         product. In the backend, InventoryBatch exists, but the frontend lacks the form to
         input batch numbers, expiry dates, or purchase prices.
       * Delete/Edit: These buttons exist in the UI but are not yet linked to DELETE or
         PATCH API calls.

  C. Dashboard Module
   * STATUS: UI Complete | Data Integration Pending
   * Done:
       * Metric Cards: 5 major KPIs (Total Sales, Profit, Assets, Debt, Payables).
       * Interactive UI: Implemented a sophisticated hover effect. All cards appear neutral
         but transform into a "Destiny Green" (primary) highlight with shadow elevation when
         hovered.
       * Critical Alerts: A UI section for Low Stock and Expiring items.
   * Missing:
       * These metrics are currently hardcoded in DashboardPage.jsx. We need to create a
         DashboardSummaryAPI in Django that aggregates sales and stock data to provide real
         numbers.

  D. Sales (POS) Module
   * STATUS: UI Prototype Ready | Backend Models Ready | Integration Missing
   * Done:
       * Frontend layout for a POS terminal (Search items -> Add to Cart -> Checkout).
       * Backend models for SaleTransaction and SaleLineItem.
   * Missing:
       * The "Checkout" Logic: This is the most critical missing feature. We need an API
         endpoint that:
           1. Receives a list of items.
           2. Creates a SaleTransaction.
           3. Crucially: Subtracts the quantity from the InventoryBatch stock levels (using
              First-In-First-Out logic).

  ---

  3. Detailed Data Architecture (For Entry-Level Developers)

  If you are looking at the code for the first time, you must understand how we handle
  Inventory vs. Products:

   1. Product Model: Stores the "Identity" (e.g., "Coca Cola 500ml", Category: "Beverages").
      It has no price or stock field of its own.
   2. InventoryBatch Model: This is where the money is. It links a Product to a Branch. It
      stores the retail_price, wholesale_price, and base_unit_stock_level.
   3. The Logic: When the frontend asks for a list of products, the backend looks at all
      Batches for that product, adds up the stock, finds the latest price, and sends that
      "computed" object to the React app.

  Why did we do this?
  In a real-world shop, prices change weekly. If you simply had a price field on the
  Product, you'd lose the history of what you paid for older stock. Our system ensures the
  owner knows exactly what profit they are making on every specific bottle of soda.

  ---

  4. Current Configuration Details

  Backend Security (CORS)
  We have enabled django-cors-headers. In backend/core/settings.py, the CORS_ALLOWED_ORIGINS
  is restricted to localhost:5173. This allows the React app to talk to the Django app
  without being blocked by the browser.

  Authentication
   * SimpleJWT is installed.
   * The endpoints /api/auth/token/ and /api/auth/token/refresh/ are ready.
   * Current State: For development ease, I have temporarily set the Inventory API to
     permissions.AllowAny. In production, this must be reverted to IsAuthenticated.

  ---

  5. Next Steps (Roadmap)

   1. Frontend "Write" Integration:
       * Update handleSave in InventoryPage.jsx to use axios.post.
       * Create a "Add Batch" form so users can restock products.
   2. Authentication Flow:
       * Create a LoginPage.jsx that sends credentials to the backend.
       * Store the returned JWT in localStorage or a Context provider.
       * Configure an Axios Interceptor to attach the Bearer <token> to every request.
   3. POS Logic Implementation:
       * Create the "Checkout" API view.
       * Implement the signal or logic to reduce InventoryBatch stock when a SaleLineItem is
         created.
   4. Real-time Dashboard:
       * Replace hardcoded values in DashboardPage.jsx with a fetch call to a new Analytics
         endpoint.

  ---

  6. Minor Details to Note
   * Table Hover: In InventoryList.jsx, rows use hover:bg-gray-50 transition-colors.
   * Modal State: The InventoryModal uses a key prop strategy. Every time the modal opens or
     the selected item changes, the component is completely "re-mounted," which prevents old
     data from appearing in the "Add New" form (fixing the "Stale State" bug).
   * Mobile Experience: The app is fully touch-friendly with large buttons and a bottom
     navigation bar similar to modern mobile apps (e.g., Instagram or banking apps).