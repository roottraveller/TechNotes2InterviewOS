export const sql = {
  id: 'sql',
  title: 'SQL (Structured Query Language)',
  content: `
## Definition
SQL (Structured Query Language) is a standardized language for managing and manipulating relational databases. It's the backbone of data operations in most enterprise applications, handling over 90% of structured data worldwide.

## Core SQL Components Impact
| Component | Performance Impact | Use Case | Real-World Example |
|-----------|-------------------|----------|-------------------|
| **Indexes** | 100-1000x faster queries | Query optimization | PostgreSQL B-tree indexes |
| **Joins** | O(n²) to O(n log n) | Data relationships | MySQL nested loop joins |
| **Transactions** | ACID compliance | Data consistency | Oracle transaction logs |
| **Views** | Query abstraction | Security/simplification | SQL Server indexed views |
| **Stored Procedures** | 2-5x faster execution | Business logic | PL/SQL procedures |

## SQL Language Categories

### 1. DDL (Data Definition Language)
**Purpose**: Define database structure and schema
\`\`\`sql
-- Create table with constraints
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Alter table structure
ALTER TABLE users 
ADD COLUMN last_login TIMESTAMP,
ADD CONSTRAINT chk_email CHECK (email LIKE '%@%');

-- Drop table
DROP TABLE IF EXISTS temp_users CASCADE;
\`\`\`

### 2. DML (Data Manipulation Language)
**Purpose**: Manipulate data within tables
\`\`\`sql
-- Insert data
INSERT INTO users (email) VALUES 
('john@example.com'),
('jane@example.com')
ON DUPLICATE KEY UPDATE last_login = NOW();

-- Update data
UPDATE users 
SET last_login = NOW() 
WHERE email = 'john@example.com';

-- Delete data
DELETE FROM users 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
\`\`\`

### 3. DQL (Data Query Language)
**Purpose**: Retrieve and analyze data
\`\`\`sql
-- Complex SELECT with multiple clauses
SELECT 
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent,
    RANK() OVER (ORDER BY SUM(o.total) DESC) as spending_rank
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2023-01-01'
GROUP BY u.id, u.email
HAVING COUNT(o.id) > 5
ORDER BY total_spent DESC
LIMIT 100;
\`\`\`

### 4. DCL (Data Control Language)
**Purpose**: Control access and permissions
\`\`\`sql
-- Grant permissions
GRANT SELECT, INSERT ON users TO 'app_user'@'localhost';
GRANT ALL PRIVILEGES ON database.* TO 'admin'@'%';

-- Revoke permissions
REVOKE DELETE ON users FROM 'app_user'@'localhost';
\`\`\`

### 5. TCL (Transaction Control Language)
**Purpose**: Manage database transactions
\`\`\`sql
-- Transaction example
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Check if both updates succeeded
IF @@ERROR = 0
    COMMIT TRANSACTION;
ELSE
    ROLLBACK TRANSACTION;
\`\`\`

## Advanced SQL Concepts

### Joins Deep Dive
\`\`\`sql
-- INNER JOIN: Only matching records
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: All left records + matching right
SELECT u.name, COALESCE(o.total, 0) as total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN: All right records + matching left
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN: All records from both tables
SELECT u.name, o.total
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- CROSS JOIN: Cartesian product
SELECT u.name, p.title
FROM users u
CROSS JOIN products p;

-- SELF JOIN: Join table with itself
SELECT e1.name as employee, e2.name as manager
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.id;
\`\`\`

### Window Functions
\`\`\`sql
-- Ranking functions
SELECT 
    name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num,
    RANK() OVER (ORDER BY salary DESC) as rank_pos,
    DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank,
    NTILE(4) OVER (ORDER BY salary DESC) as quartile
FROM employees;

-- Aggregate window functions
SELECT 
    name,
    salary,
    SUM(salary) OVER (ORDER BY salary) as running_total,
    AVG(salary) OVER (PARTITION BY department) as dept_avg,
    LAG(salary, 1) OVER (ORDER BY hire_date) as prev_salary,
    LEAD(salary, 1) OVER (ORDER BY hire_date) as next_salary
FROM employees;
\`\`\`

### Common Table Expressions (CTEs)
\`\`\`sql
-- Recursive CTE for hierarchical data
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees with managers
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy ORDER BY level, name;

-- Multiple CTEs
WITH 
high_value_customers AS (
    SELECT user_id, SUM(total) as total_spent
    FROM orders
    GROUP BY user_id
    HAVING SUM(total) > 1000
),
recent_orders AS (
    SELECT user_id, COUNT(*) as recent_count
    FROM orders
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    GROUP BY user_id
)
SELECT u.name, hvc.total_spent, ro.recent_count
FROM users u
JOIN high_value_customers hvc ON u.id = hvc.user_id
LEFT JOIN recent_orders ro ON u.id = ro.user_id;
\`\`\`

## Performance Optimization

### Index Strategies
\`\`\`sql
-- B-tree index (default)
CREATE INDEX idx_user_email ON users(email);

-- Composite index
CREATE INDEX idx_order_user_date ON orders(user_id, created_at);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_users ON users(email) 
WHERE status = 'active';

-- Covering index
CREATE INDEX idx_user_covering ON users(id, email, name, created_at);

-- Function-based index
CREATE INDEX idx_user_lower_email ON users(LOWER(email));
\`\`\`

### Query Optimization Techniques
\`\`\`sql
-- Use EXPLAIN to analyze query plans
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Optimize with EXISTS instead of IN for large datasets
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.user_id = u.id AND o.total > 100
);

-- Use LIMIT with ORDER BY for pagination
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 20 OFFSET 100;

-- Avoid SELECT * in production
SELECT id, email, name FROM users
WHERE status = 'active';
\`\`\`

## Database Design Principles

### Normalization
\`\`\`sql
-- 1NF: Atomic values, unique rows
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    product_ids VARCHAR(255)  -- VIOLATES 1NF
);

-- 2NF: 1NF + no partial dependencies
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    product_name VARCHAR(255),  -- VIOLATES 2NF (depends only on product_id)
    PRIMARY KEY (order_id, product_id)
);

-- 3NF: 2NF + no transitive dependencies
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    category_id INT,
    category_name VARCHAR(255)  -- VIOLATES 3NF (transitive dependency)
);

-- BCNF: 3NF + every determinant is a candidate key
CREATE TABLE courses (
    student_id INT,
    course_id INT,
    instructor_id INT,
    -- VIOLATES BCNF if instructor determines course
    PRIMARY KEY (student_id, course_id)
);
\`\`\`

### Constraints and Data Integrity
\`\`\`sql
-- Primary key constraint
ALTER TABLE users ADD CONSTRAINT pk_users PRIMARY KEY (id);

-- Foreign key constraint
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Check constraint
ALTER TABLE products 
ADD CONSTRAINT chk_price CHECK (price > 0);

-- Unique constraint
ALTER TABLE users 
ADD CONSTRAINT uk_users_email UNIQUE (email);

-- Not null constraint
ALTER TABLE users 
MODIFY COLUMN email VARCHAR(255) NOT NULL;
\`\`\`

## Advanced SQL Features

### Stored Procedures and Functions
\`\`\`sql
-- MySQL stored procedure
DELIMITER //
CREATE PROCEDURE GetUserOrders(IN user_id INT)
BEGIN
    DECLARE total_orders INT DEFAULT 0;
    
    SELECT COUNT(*) INTO total_orders
    FROM orders o
    WHERE o.user_id = user_id;
    
    SELECT 
        o.*,
        total_orders as user_total_orders
    FROM orders o
    WHERE o.user_id = user_id
    ORDER BY o.created_at DESC;
END //
DELIMITER ;

-- PostgreSQL function
CREATE OR REPLACE FUNCTION calculate_order_total(order_id INT)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    total DECIMAL(10,2);
BEGIN
    SELECT SUM(quantity * price) INTO total
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = order_id;
    
    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;
\`\`\`

### Triggers
\`\`\`sql
-- Audit trigger
CREATE TRIGGER audit_user_changes
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_audit (
        user_id, 
        old_email, 
        new_email, 
        changed_at, 
        changed_by
    ) VALUES (
        NEW.id, 
        OLD.email, 
        NEW.email, 
        NOW(), 
        USER()
    );
END;

-- Validation trigger
CREATE TRIGGER validate_order_total
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    IF NEW.total < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Order total cannot be negative';
    END IF;
END;
\`\`\`

## Real-World Applications

### E-commerce Platform (Amazon-scale)
- **Query Volume**: 100M+ queries/day
- **Data Size**: 100TB+ product catalog
- **Performance**: Sub-100ms query response
\`\`\`sql
-- Product search with faceting
SELECT 
    p.id,
    p.name,
    p.price,
    c.name as category,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as review_count
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN reviews r ON p.id = r.product_id
WHERE p.name LIKE '%laptop%'
    AND p.price BETWEEN 500 AND 2000
    AND p.status = 'active'
GROUP BY p.id, p.name, p.price, c.name
HAVING avg_rating >= 4.0
ORDER BY avg_rating DESC, review_count DESC
LIMIT 50;
\`\`\`

### Financial System (Banking)
- **Transaction Volume**: 1M+ transactions/hour
- **Consistency**: ACID compliance required
- **Availability**: 99.99% uptime
\`\`\`sql
-- Money transfer with transaction
START TRANSACTION;

-- Check source account balance
SELECT balance INTO @source_balance
FROM accounts 
WHERE account_id = @source_account
FOR UPDATE;

IF @source_balance >= @transfer_amount THEN
    -- Debit source account
    UPDATE accounts 
    SET balance = balance - @transfer_amount,
        updated_at = NOW()
    WHERE account_id = @source_account;
    
    -- Credit destination account
    UPDATE accounts 
    SET balance = balance + @transfer_amount,
        updated_at = NOW()
    WHERE account_id = @dest_account;
    
    -- Log transaction
    INSERT INTO transactions (
        from_account, to_account, amount, type, status
    ) VALUES (
        @source_account, @dest_account, @transfer_amount, 'transfer', 'completed'
    );
    
    COMMIT;
ELSE
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient funds';
END IF;
\`\`\`

### Analytics Platform (Netflix-scale)
- **Data Volume**: 1PB+ viewing data
- **Query Complexity**: Multi-dimensional analysis
- **Real-time**: Sub-second aggregations
\`\`\`sql
-- User viewing analytics
WITH viewing_stats AS (
    SELECT 
        user_id,
        DATE(viewed_at) as view_date,
        COUNT(*) as videos_watched,
        SUM(watch_duration) as total_watch_time,
        COUNT(DISTINCT content_id) as unique_content
    FROM viewing_events
    WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    GROUP BY user_id, DATE(viewed_at)
),
user_engagement AS (
    SELECT 
        user_id,
        AVG(videos_watched) as avg_daily_videos,
        SUM(total_watch_time) as monthly_watch_time,
        COUNT(DISTINCT view_date) as active_days,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_watch_time) as median_daily_time
    FROM viewing_stats
    GROUP BY user_id
)
SELECT 
    ue.*,
    CASE 
        WHEN active_days >= 25 THEN 'Heavy User'
        WHEN active_days >= 15 THEN 'Regular User'
        WHEN active_days >= 5 THEN 'Light User'
        ELSE 'Inactive User'
    END as user_segment
FROM user_engagement ue
ORDER BY monthly_watch_time DESC;
\`\`\`

## SQL Security Best Practices

### SQL Injection Prevention
\`\`\`sql
-- VULNERABLE: String concatenation
query = "SELECT * FROM users WHERE email = '" + user_input + "'";

-- SECURE: Parameterized queries
PREPARE stmt FROM 'SELECT * FROM users WHERE email = ?';
SET @email = 'user@example.com';
EXECUTE stmt USING @email;

-- SECURE: Stored procedures with parameters
CALL GetUserByEmail(@email);
\`\`\`

### Access Control
\`\`\`sql
-- Role-based access control
CREATE ROLE 'app_read_only';
GRANT SELECT ON database.* TO 'app_read_only';

CREATE ROLE 'app_read_write';
GRANT SELECT, INSERT, UPDATE ON database.* TO 'app_read_write';
GRANT DELETE ON database.temp_tables TO 'app_read_write';

-- User creation with roles
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT 'app_read_write' TO 'app_user'@'localhost';

-- Row-level security (PostgreSQL)
CREATE POLICY user_data_policy ON user_data
FOR ALL TO application_role
USING (user_id = current_setting('app.current_user_id')::int);
\`\`\`

## Database Comparison

### SQL Databases Feature Comparison
| Database | Strengths | Use Cases | Market Share |
|----------|-----------|-----------|--------------|
| **PostgreSQL** | Advanced features, JSON support | Complex applications, analytics | 15% |
| **MySQL** | Performance, replication | Web applications, e-commerce | 45% |
| **Oracle** | Enterprise features, reliability | Large enterprises, banking | 20% |
| **SQL Server** | Windows integration, BI tools | Microsoft stack, enterprises | 15% |
| **SQLite** | Embedded, zero-config | Mobile apps, prototypes | 5% |

### SQL vs NoSQL Decision Matrix
| Factor | SQL | NoSQL | Recommendation |
|--------|-----|-------|----------------|
| **Data Structure** | Structured, relational | Flexible, document/key-value | SQL for complex relationships |
| **ACID Compliance** | Full ACID support | Eventual consistency | SQL for financial/critical data |
| **Scalability** | Vertical scaling | Horizontal scaling | NoSQL for massive scale |
| **Query Complexity** | Complex joins, aggregations | Simple queries | SQL for analytics |
| **Development Speed** | Schema design required | Rapid prototyping | NoSQL for MVPs |

## Performance Monitoring

### Key SQL Metrics
\`\`\`sql
-- Query performance analysis
SELECT 
    query_id,
    query_text,
    execution_count,
    total_execution_time,
    avg_execution_time,
    max_execution_time,
    total_logical_reads,
    total_physical_reads
FROM performance_schema.query_statistics
ORDER BY avg_execution_time DESC
LIMIT 10;

-- Index usage statistics
SELECT 
    table_name,
    index_name,
    cardinality,
    sub_part,
    packed,
    nullable,
    index_type,
    comment
FROM information_schema.statistics
WHERE table_schema = 'your_database'
ORDER BY table_name, seq_in_index;

-- Connection monitoring
SHOW PROCESSLIST;
SELECT * FROM information_schema.processlist
WHERE command != 'Sleep'
ORDER BY time DESC;
\`\`\`

## Interview Questions & Answers

### Core SQL Concepts

**Q: Explain the difference between UNION and UNION ALL.**
A: 
- **UNION**: Combines results from two queries and removes duplicates
- **UNION ALL**: Combines results without removing duplicates (faster)
- Performance: UNION ALL is faster as it doesn't need to check for duplicates
- Use UNION when you need unique results, UNION ALL when duplicates are acceptable

**Q: What is the difference between WHERE and HAVING clauses?**
A:
- **WHERE**: Filters rows before grouping (row-level filtering)
- **HAVING**: Filters groups after GROUP BY (group-level filtering)
- WHERE cannot use aggregate functions, HAVING can
- Execution order: WHERE → GROUP BY → HAVING → ORDER BY

**Q: Explain different types of indexes and when to use them.**
A:
- **B-tree (default)**: Best for equality and range queries (90% of use cases)
- **Hash**: Fast equality lookups, no range queries
- **Bitmap**: Low-cardinality columns (gender, status)
- **Partial**: Index subset of rows (WHERE condition)
- **Covering**: Include all query columns to avoid table lookup

### Advanced SQL Concepts

**Q: How do you optimize a slow SQL query?**
A:
1. **Analyze execution plan**: Use EXPLAIN/EXPLAIN ANALYZE
2. **Add appropriate indexes**: Based on WHERE/JOIN conditions
3. **Rewrite query logic**: EXISTS vs IN, subqueries vs joins
4. **Optimize joins**: Ensure join conditions use indexes
5. **Limit result sets**: Use LIMIT, avoid SELECT *
6. **Update statistics**: Ensure query planner has current data

**Q: Explain ACID properties with examples.**
A:
- **Atomicity**: All operations in transaction succeed or all fail
  - Example: Bank transfer - both debit and credit must complete
- **Consistency**: Database remains in valid state
  - Example: Referential integrity maintained across operations
- **Isolation**: Concurrent transactions don't interfere
  - Example: Two users booking last seat don't both succeed
- **Durability**: Committed changes survive system failures
  - Example: Completed orders persist through server crash

**Q: What are the different isolation levels and their trade-offs?**
A:
- **READ UNCOMMITTED**: Fastest, allows dirty reads
- **READ COMMITTED**: Prevents dirty reads, allows non-repeatable reads
- **REPEATABLE READ**: Prevents non-repeatable reads, allows phantom reads
- **SERIALIZABLE**: Strictest, prevents all phenomena but slowest
- Trade-off: Higher isolation = better consistency but lower concurrency

### Performance and Optimization

**Q: How would you handle a table with 1 billion rows?**
A:
1. **Partitioning**: Horizontal (by date/range) or vertical (by columns)
2. **Indexing strategy**: Composite indexes on query patterns
3. **Archival**: Move old data to separate tables/storage
4. **Query optimization**: Avoid full table scans, use covering indexes
5. **Hardware**: SSD storage, sufficient RAM for working set
6. **Caching**: Application-level caching for frequent queries

**Q: Explain database sharding and its challenges.**
A:
**Sharding**: Horizontal partitioning across multiple databases
**Benefits**: Linear scalability, reduced contention
**Challenges**:
- Cross-shard queries are complex/slow
- Rebalancing data when adding shards
- Transaction consistency across shards
- Application complexity increases
**Solutions**: Consistent hashing, shard keys, distributed transactions

**Q: How do you ensure data consistency in distributed systems?**
A:
1. **2PC (Two-Phase Commit)**: Coordinator ensures all nodes commit/abort
2. **Saga Pattern**: Compensating transactions for rollback
3. **Event Sourcing**: Immutable event log with eventual consistency
4. **CQRS**: Separate read/write models with eventual consistency
5. **Distributed locks**: Prevent concurrent modifications
6. **Consensus algorithms**: Raft/Paxos for agreement

### Real-World Scenarios

**Q: Design a database schema for a social media platform.**
A:
\`\`\`sql
-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Posts table
CREATE TABLE posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_created (user_id, created_at)
);

-- Followers table (many-to-many)
CREATE TABLE follows (
    follower_id BIGINT NOT NULL,
    following_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (following_id) REFERENCES users(id),
    INDEX idx_following (following_id)
);
\`\`\`

**Q: How would you implement pagination for large result sets?**
A:
**Offset-based (simple but slow for large offsets):**
\`\`\`sql
SELECT * FROM posts 
ORDER BY created_at DESC 
LIMIT 20 OFFSET 10000;  -- Slow for large offsets
\`\`\`

**Cursor-based (efficient for large datasets):**
\`\`\`sql
-- First page
SELECT * FROM posts 
ORDER BY created_at DESC, id DESC 
LIMIT 20;

-- Next page (using last item's values)
SELECT * FROM posts 
WHERE (created_at < '2023-01-01 12:00:00') 
   OR (created_at = '2023-01-01 12:00:00' AND id < 12345)
ORDER BY created_at DESC, id DESC 
LIMIT 20;
\`\`\`

**Q: How do you handle database migrations in production?**
A:
1. **Backward compatibility**: New migrations shouldn't break old code
2. **Blue-green deployment**: Run migration on standby, then switch
3. **Online schema changes**: Use tools like pt-online-schema-change
4. **Rollback strategy**: Always have a rollback plan
5. **Testing**: Test migrations on production-like data
6. **Monitoring**: Watch for performance impact during migration
`
}; 