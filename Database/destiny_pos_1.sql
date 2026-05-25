-- 1. Clean up existing fragments (CASCADE deletes dependent objects)
DROP TABLE IF EXISTS inventory_movements, audit_log, loyalty_history, credit_ledger, transactions, employees, customers, products CASCADE;
DROP TYPE IF EXISTS customer_type_enum, price_tier_enum, role_enum, payment_type_enum, entry_type_enum, method_enum, event_type_enum, movement_type_enum CASCADE;

-- 2. Create ENUM types
CREATE TYPE customer_type_enum AS ENUM('wholesale', 'loyalty', 'guest');
CREATE TYPE price_tier_enum AS ENUM('Retail', 'Tier A', 'Tier B', 'Tier C');
CREATE TYPE role_enum AS ENUM('cashier', 'manager', 'admin');
CREATE TYPE payment_type_enum AS ENUM('cash', 'card', 'account', 'points');
CREATE TYPE entry_type_enum AS ENUM('Purchase', 'Payment', 'Adjustment');
CREATE TYPE method_enum AS ENUM('cash', 'check', 'transfer', 'account');
CREATE TYPE event_type_enum AS ENUM('earn', 'redeem', 'adjust');
CREATE TYPE movement_type_enum AS ENUM('sale', 'restock', 'return', 'adjustment');

-- 3. Create Tables
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    retail_price DECIMAL(10,2) NOT NULL,
    tier_a_price DECIMAL(10,2) NOT NULL,
    tier_b_price DECIMAL(10,2) NOT NULL,
    tier_c_price DECIMAL(10,2) NOT NULL,
    case_qty INT NOT NULL,
    stock_level INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    customer_type customer_type_enum NOT NULL,
    price_tier price_tier_enum NOT NULL DEFAULT 'Retail',
    credit_limit DECIMAL(10,2) DEFAULT 0,
    current_balance DECIMAL(10,2) DEFAULT 0,
    loyalty_points INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role role_enum NOT NULL DEFAULT 'cashier',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    customer_id INT,
    employee_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_type payment_type_enum NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE credit_ledger (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    transaction_id INT NULL,
    entry_type entry_type_enum NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    method method_enum NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);

CREATE TABLE loyalty_history (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    points_changed INT NOT NULL,
    event_type event_type_enum NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    old_value TEXT NULL,
    new_value TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE inventory_movements (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    change_qty INT NOT NULL,
    movement_type movement_type_enum NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);