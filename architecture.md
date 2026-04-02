# System Architecture & Database Design Document: Rural SME POS System

## 1. High-Level Architecture Overview
The application utilizes a **Decoupled, Offline-First Client-Server Architecture** designed specifically for high availability in low-connectivity rural environments.

### 1.1 The Client-Side (Frontend / Presentation Layer)
* **Framework:** React.js configured as a Progressive Web App (PWA).
* **Hosting:** Deployed on **Vercel** for fast edge delivery and native CI/CD.
* **Core Components:**
    * **UI Layer:** The interfaces for Point of Sale (POS), shift management, and receipt summaries.
    * **Service Worker:** Acts as a network proxy. It intercepts API requests to check network status. If online, it passes requests to the server; if offline, it routes data to local storage.
    * **Local Data Layer (IndexedDB):** Utilizes a wrapper like Dexie.js. It stores a daily cached snapshot of inventory and pricing, and holds the "Offline Queue" of pending transactions and shift payouts.

### 1.2 The Server-Side (Backend / Application Layer)
* **Framework:** Python / Django using Django REST Framework (DRF).
* **Hosting:** Deployed on **Railway** (Platform-as-a-Service).
* **Core Services:**
    * **Web Server (API):** The primary Django WSGI application handling synchronous requests, JWT authentication, and Role-Based Access Control (RBAC).
    * **Message Broker (Redis):** Acts as a buffer and queue manager. When the PWA comes back online and pushes a massive payload of offline transactions, Django routes them to Redis to prevent server timeouts.
    * **Background Worker (Celery):** Continuously monitors Redis. It picks up queued sync payloads and processes them asynchronously, safely writing deductions to the database.

### 1.3 The Data Layer
* **Database:** **MySQL** (Hosted on Railway).
* **Properties:** Strictly relational, normalized, and relies on ACID transactions to ensure financial ledger and inventory integrity (e.g., rolling back failed multi-table transactions).

---

## 2. Data Flow & Offline Sync Mechanism
1. **Caching (Online):** Upon Cashier login, the React PWA fetches the latest inventory levels, prices, and customer ledgers from the Django API and stores them in IndexedDB.
2. **Offline Operation:** If network connectivity drops, the POS continues to function using the IndexedDB cache. Sales, payouts, and shift events are saved to a local "Offline Queue" table, each stamped with a `local_timestamp`.
3. **Connection Restored:** The Service Worker detects the returning network. It automatically triggers a background sync, sending the queued payload to the Django `/api/sync/` endpoint.
4. **Processing:** Django offloads the payload to Celery. Celery processes the transactions chronologically (using the `local_timestamp`) to ensure inventory deductions and shift expected-cash totals are perfectly accurate.

---

## 3. Database Schema (Django Models)

The database handles multi-branch isolation, complex bulk-breaking (derivative units), and strict debt tracking.

### 3.1 Core Setup & Users
* **`Branch`**
    * `id` (PK)
    * `name` (String, e.g., "Juja Main Store")
    * `location` (String)
* **`User` (Extends AbstractUser)**
    * `id` (PK)
    * `role` (Enum: Admin, Cashier)
    * `branch_id` (FK -> Branch, nullable for global SuperAdmins)
    * `phone_number` (String)

### 3.2 Inventory & Bulk Breaking
* **`Product` (The abstract item)**
    * `id` (PK)
    * `name` (String)
    * `category` (String)
    * `base_unit_name` (String, e.g., "Piece") - *The absolute smallest unit.*
* **`ProductDerivative` (For bulk breaking)**
    * `id` (PK)
    * `product_id` (FK -> Product)
    * `derivative_name` (String, e.g., "Carton")
    * `conversion_rate` (Integer, e.g., 36) - *1 Carton = 36 Pieces.*
* **`InventoryBatch` (Branch-specific stock & expiry)**
    * `id` (PK)
    * `branch_id` (FK -> Branch)
    * `product_id` (FK -> Product)
    * `batch_number` (String)
    * `base_unit_stock_level` (Integer) - *Always stored in base units.*
    * `retail_price_per_base_unit` (Decimal)
    * `wholesale_price_per_base_unit` (Decimal)
    * `expiry_date` (Date, nullable)

### 3.3 Sales & Transactions
* **`SaleTransaction`**
    * `id` (PK)
    * `branch_id` (FK -> Branch)
    * `cashier_id` (FK -> User)
    * `customer_id` (FK -> Customer, nullable)
    * `sale_type` (Enum: Retail, Wholesale)
    * `payment_method` (Enum: Cash, M-Pesa, Mkopo)
    * `total_amount` (Decimal)
    * `local_timestamp` (DateTime) - *Crucial for offline sync chronological order.*
    * `server_timestamp` (DateTime, auto-add)
* **`SaleLineItem`**
    * `id` (PK)
    * `transaction_id` (FK -> SaleTransaction)
    * `product_id` (FK -> Product)
    * `quantity_sold` (Integer) - *In base units.*
    * `unit_price_applied` (Decimal) - *Snapshot of price at checkout.*
    * `subtotal` (Decimal)

### 3.4 Shift Management & Shrinkage Control
* **`Shift`**
    * `id` (PK)
    * `branch_id` (FK -> Branch)
    * `cashier_id` (FK -> User)
    * `start_time` (DateTime)
    * `end_time` (DateTime, nullable)
    * `starting_cash` (Decimal)
    * `declared_ending_cash` (Decimal, nullable)
    * `status` (Enum: Open, Closed)
* **`DailyExpense` (Payouts)**
    * `id` (PK)
    * `shift_id` (FK -> Shift)
    * `amount` (Decimal)
    * `description` (String)
    * `timestamp` (DateTime)

### 3.5 Debt & Ledger Management
* **`Customer` (Mkopo Ledger)**
    * `id` (PK)
    * `branch_id` (FK -> Branch)
    * `name` (String)
    * `phone_number` (String)
    * `outstanding_balance` (Decimal)
* **`Supplier` (Accounts Payable)**
    * `id` (PK)
    * `name` (String)
    * `outstanding_balance` (Decimal)
* **`GoodsReceivedTicket` (Incoming Stock)**
    * `id` (PK)
    * `branch_id` (FK -> Branch)
    * `supplier_id` (FK -> Supplier)
    * `total_invoice_cost` (Decimal)
    * `amount_paid_upfront` (Decimal)
    * `timestamp` (DateTime)

---

## 4. Security & Data Integrity Notes
* **Race Condition Prevention:** Django post-save signals (or Celery task logic) will be used when saving `SaleLineItem` and `GoodsReceivedTicket` records to safely deduct or add to the `base_unit_stock_level` in the `InventoryBatch` table.
* **Soft Deletes:** Financial and shift records (`SaleTransaction`, `Shift`, `DailyExpense`) will implement an `is_active` boolean field (Soft Delete). Hard deletions are disabled at the API level to maintain historical ledger integrity for audits.