# Product Requirements Document (PRD): Rural SME POS System

## 1. Executive Summary & Target Market
This system is a lightweight, offline-first Point of Sale (POS) application tailored for Small to Medium Enterprises (SMEs) operating general shops in rural and small-town Kenya. These shops primarily handle Fast-Moving Consumer Goods (FMCG) and Over-The-Counter (OTC) drugs. 

The application solves unique local operational challenges: bulk-breaking inventory, managing micro-debts ("mkopo"), preventing staff shrinkage (theft), and operating reliably despite unpredictable power and internet connectivity.

## 2. Architecture & Technology Stack
* **Frontend (Decoupled PWA):** Built with **React**. Designed as a Progressive Web App (PWA) using Service Workers and IndexedDB to cache the UI and store queued offline transactions.
* **Backend Framework:** **Python / Django**. Utilizes the Django REST Framework (DRF) to provide a stateless, secure API for the frontend.
* **Database:** **MySQL**. Ensures strict ACID compliance for all financial ledgers, inventory deductions, and debt tracking.
* **Background Tasks:** **Celery backed by Redis** to handle heavy background tasks (e.g., processing large batches of offline synced data when the internet is restored).
* **Offline Data Handling:** The React PWA processes sales completely offline. Upon internet restoration, background sync pushes the queued, timestamped local transactions to the Django API to maintain chronological integrity.

## 3. Deployment & CI/CD Strategy
The infrastructure utilizes a decoupled deployment strategy to optimize both frontend speed and backend database requirements:
* **Frontend Hosting (Vercel):** The React PWA is deployed on Vercel for lightning-fast edge delivery and native CI/CD integration.
* **Backend & Database Hosting (Railway):** The Django REST API, Celery background workers, Redis, and the MySQL database are provisioned and deployed on **Railway** (Platform-as-a-Service). 
* **CI/CD Pipeline:** Automated pipelines (e.g., GitHub Actions) enforce passing unit/integration tests (via `pytest`), code linting (`flake8`, `black`), and Static Application Security Testing (SAST) before code is merged to the main branch.

## 4. Secure Design Principles (AppSec)
Built with "security by design," the application mitigates OWASP Top 10 vulnerabilities and common CWEs using Django’s native middleware and strict pipeline rules:
* **SQL Injection (CWE-89):** All database interactions rely strictly on the Django ORM. Raw SQL is prohibited, ensuring all queries are parameterized.
* **Authentication & Session Management (CWE-287):** Secure JSON Web Tokens (JWT) are used for stateless PWA sessions. Strict Role-Based Access Control (RBAC) separates Admin and Cashier API endpoints.
* **Cross-Site Scripting (CWE-79):** The React frontend and DRF serializers automatically escape and sanitize user inputs and context variables before rendering.
* **Data Protection:** Database credentials, Secret Keys, and JWT signing keys are securely injected via environment variables (`python-dotenv` / Railway/Vercel secrets) and are strictly excluded from source control.

## 5. Multi-Branch Architecture & User Roles
The database schema inherently supports multiple locations. All relevant tables (Users, Inventory, Sales, Shifts, Expenses) include a `branch_id` foreign key.
* **Admin/Owner:** Has global visibility. The UI features a "Branch Selector" allowing the Admin to switch contexts between different shops to view isolated inventory and sales, or view aggregated cross-branch reports.
* **Cashier:** JWT tokens strictly bind Cashiers to their assigned branch. They can only operate the POS checkout, record customer debts, declare shift cash, and log payouts for their specific location. They cannot view wholesale profit margins or delete past transactions.

## 6. Core Functional Modules

### 6.1 Shift & Cash Management (Shrinkage Prevention)
* **Shift Lifecycle:** Cashiers must open a shift by inputting the starting physical cash amount in the till.
* **Daily Expenses (Payouts):** Cashiers log money taken *out* of the till during the day for shop operations (e.g., transport, supplier payments).
* **Shift Reconciliation:** At closing, cashiers manually input their physical cash count. The system calculates the *expected* cash (`Starting Cash + Cash Sales - Payouts`) and flags any discrepancies (shortages/overages) to the Admin.

### 6.2 Inventory & Supply Management
* **Derivative Unit Tracking (Bulk Breaking):** A critical feature. The database tracks inventory using the *smallest possible unit* as the base (e.g., 1 piece of soap). Larger units are derivatives (e.g., 1 carton = 36 base units). Receiving a carton adds 36 base units; selling one piece deducts 1 base unit.
* **Incoming Goods:** A dedicated module for receiving stock from suppliers.
* **Expiry Tracking:** Mandatory batch and expiry date logging upon receiving goods, with dashboard alerts for items nearing expiration (vital for OTC drugs).

### 6.3 Point of Sale (POS) Checkout
* **Manual Search Interface:** Optimized for fast, text-based searching (no reliance on physical barcode scanners).
* **Dynamic Pricing Toggle:** A manual checkout switch allowing the Cashier to designate the transaction as "Retail" or "Wholesale." The system dynamically pulls the respective predefined price for the items in the cart.
* **Payment & Receipts:** Supports Cash and M-Pesa. Upon checkout completion, the system displays an on-screen receipt summary (no physical printing or SMS integration required).

### 6.4 Micro-Debt Management
* **Customer Credit ("Mkopo"):** A ledger (Accounts Receivable) tracking unpaid or partially paid transactions tied to specific customer profiles, logging balances and repayment history.
* **Supplier Debt:** Integrated with the "Incoming Goods" module (Accounts Payable) to track stock taken on credit, logging exactly how much the shop owes specific suppliers.

## 7. Reporting & Analytics Dashboard (Admin Only)
The Django backend aggregates data to generate critical reports for the Admin dashboard:
* **End-of-Day (EOD) Reconciliation:** Highlights expected vs. actual declared cash per shift/branch to monitor shrinkage.
* **Inventory Alerts:** Real-time lists of items reaching minimum stock thresholds and OTC drugs approaching expiry.
* **Debt Ledger:** Total outstanding Customer Mkopo and Supplier Debt, filterable by branch.
* **Sales Performance:** Daily/Weekly profit margins (calculated by Sales Revenue minus Cost of Goods Sold and Payouts) and fastest-moving items.