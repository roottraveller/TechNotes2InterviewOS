export const partitioning = {
  id: 'partitioning',
  title: 'Database Partitioning',
  content: `
    <p>Database partitioning is the process of dividing a large database into smaller, more manageable pieces called partitions. This technique improves performance, scalability, and maintainability by distributing data across multiple storage units, enabling parallel processing and reducing the size of individual data segments that need to be accessed for queries.</p>

    <details>
      <summary><strong>Real-World Example: Instagram's Photo Storage Partitioning</strong></summary>
      <div class="info-note">
        Instagram stores 95+ billion photos and videos, generating 4.2 billion likes daily. Their original single-database approach couldn't handle the massive scale. They implemented a sophisticated partitioning strategy using a combination of techniques: photos are partitioned by creation time (range partitioning) and user ID (hash partitioning), with each partition storing ~1 billion photos. This partitioning strategy reduced query response times from 300ms to 25ms, enabled horizontal scaling to 1000+ database servers, and supports 500+ million daily active users. The system handles 4.2 billion likes and 95 million photos/videos uploaded daily with 99.9% uptime.
      </div>
    </details>

    <h3>Partitioning Fundamentals</h3>
    <p>Understanding partitioning fundamentals is essential for designing scalable database architectures that can handle large datasets and high-throughput workloads.</p>

    <h4>Why Partition Data?</h4>
    <p>Partitioning addresses several scalability and performance challenges in large-scale database systems:</p>

    <ul>
      <li><strong>Performance Improvement:</strong> Smaller data sets mean faster queries and index operations</li>
      <li><strong>Parallel Processing:</strong> Multiple partitions can be processed simultaneously</li>
      <li><strong>Scalability:</strong> Distribute load across multiple servers or storage devices</li>
      <li><strong>Maintenance:</strong> Backup, restore, and maintenance operations on smaller data sets</li>
      <li><strong>Cost Optimization:</strong> Store frequently accessed data on faster, more expensive storage</li>
    </ul>

    <h4>Partitioning vs Sharding</h4>
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Partitioning</th>
          <th>Sharding</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Scope</td>
          <td>Within single database instance</td>
          <td>Across multiple database servers</td>
        </tr>
        <tr>
          <td>Complexity</td>
          <td>Lower - managed by DBMS</td>
          <td>Higher - application-level logic</td>
        </tr>
        <tr>
          <td>Scalability</td>
          <td>Limited by single server resources</td>
          <td>Unlimited horizontal scaling</td>
        </tr>
        <tr>
          <td>Consistency</td>
          <td>ACID properties maintained</td>
          <td>Eventual consistency challenges</td>
        </tr>
        <tr>
          <td>Query Complexity</td>
          <td>Transparent to applications</td>
          <td>Cross-shard queries complex</td>
        </tr>
      </tbody>
    </table>

    <h4>Partition Pruning</h4>
    <p><strong>Definition:</strong> Partition pruning is the process of eliminating unnecessary partitions from query execution, improving performance by accessing only relevant data.</p>

    <div class="code-block">
      <pre><code>Partition Pruning Example:

Table: sales_data (partitioned by date)
Partitions:
├── sales_2023_q1 (Jan-Mar 2023)
├── sales_2023_q2 (Apr-Jun 2023)
├── sales_2023_q3 (Jul-Sep 2023)
└── sales_2023_q4 (Oct-Dec 2023)

Query: SELECT * FROM sales_data WHERE sale_date >= '2023-07-01'

Without Pruning:
- Scans all 4 partitions
- Processes ~100M records
- Query time: 2.5 seconds

With Pruning:
- Scans only sales_2023_q3 and sales_2023_q4
- Processes ~50M records
- Query time: 1.2 seconds
- 52% performance improvement

Pruning Conditions:
✓ WHERE sale_date >= '2023-07-01' → Prunes Q1, Q2
✓ WHERE sale_date = '2023-08-15' → Prunes Q1, Q2, Q4
✓ WHERE sale_date BETWEEN '2023-05-01' AND '2023-08-31' → Prunes Q1, Q4
✗ WHERE YEAR(sale_date) = 2023 → Cannot prune (function on partition key)</code></pre>
    </div>

    <h3>Horizontal Partitioning (Sharding)</h3>
    <p>Horizontal partitioning divides table rows across multiple partitions based on partition key values, enabling distribution of data across multiple storage units or servers.</p>

    <h4>Sharding Strategies</h4>
    <p>Different sharding strategies offer various trade-offs between simplicity, performance, and scalability:</p>

    <h5>1. Range-Based Sharding</h5>
    <p><strong>Concept:</strong> Partition data based on ranges of partition key values.</p>

    <div class="code-block">
      <pre><code>Range-Based Sharding Example:

User Table (10M users):
Partition Key: user_id

Shard 1: user_id 1-2,500,000
Shard 2: user_id 2,500,001-5,000,000
Shard 3: user_id 5,000,001-7,500,000
Shard 4: user_id 7,500,001-10,000,000

Advantages:
✓ Simple to implement and understand
✓ Efficient range queries
✓ Easy to add new ranges
✓ Predictable data distribution

Disadvantages:
✗ Potential hotspots (newer users more active)
✗ Uneven data distribution over time
✗ Difficult to rebalance existing ranges

Best For:
- Time-series data
- Sequential IDs
- Data with natural ranges
- Analytical workloads</code></pre>
    </div>

    <h5>2. Hash-Based Sharding</h5>
    <p><strong>Concept:</strong> Use hash function to determine partition placement, ensuring even distribution.</p>

    <div class="code-block">
      <pre><code>Hash-Based Sharding Example:

User Table (10M users):
Partition Key: user_id
Hash Function: MD5(user_id) % 4

Shard 0: hash(user_id) % 4 = 0
Shard 1: hash(user_id) % 4 = 1
Shard 2: hash(user_id) % 4 = 2
Shard 3: hash(user_id) % 4 = 3

Example Distribution:
user_id=12345 → MD5(12345) % 4 = 1 → Shard 1
user_id=67890 → MD5(67890) % 4 = 3 → Shard 3
user_id=11111 → MD5(11111) % 4 = 0 → Shard 0

Advantages:
✓ Even data distribution
✓ No hotspots
✓ Simple routing logic
✓ Predictable performance

Disadvantages:
✗ Range queries require all shards
✗ Difficult to add/remove shards
✗ No data locality
✗ Complex rebalancing

Best For:
- Point queries
- Even access patterns
- Random data distribution
- OLTP workloads</code></pre>
    </div>

    <h5>3. Consistent Hashing</h5>
    <p><strong>Concept:</strong> Advanced hashing that minimizes data movement when adding/removing shards.</p>

    <div class="code-block">
      <pre><code>Consistent Hashing Example:

Hash Ring (0 to 2^32-1):
           0
           │
    Shard A │ Shard B
           │
    2^31 ──┼── 2^30
           │
    Shard D │ Shard C
           │
          2^31

Data Placement:
- hash(key) = 1000 → Shard A
- hash(key) = 2^30 + 500 → Shard B
- hash(key) = 2^31 + 1000 → Shard C

Adding New Shard E between A and B:
- Only data from Shard B moves to Shard E
- ~25% of Shard B's data redistributed
- Other shards unaffected

Advantages:
✓ Minimal data movement during rebalancing
✓ Fault tolerance
✓ Dynamic scaling
✓ Load distribution

Disadvantages:
✗ Complex implementation
✗ Potential uneven distribution
✗ Requires virtual nodes for balance

Best For:
- Distributed systems
- Dynamic scaling requirements
- Fault-tolerant systems
- Cloud environments</code></pre>
    </div>

    <h5>4. Directory-Based Sharding</h5>
    <p><strong>Concept:</strong> Use lookup service to determine data location, providing flexibility in routing.</p>

    <div class="code-block">
      <pre><code>Directory-Based Sharding Example:

Lookup Service (Directory):
┌─────────────┬──────────────┐
│ Partition   │ Shard Server │
├─────────────┼──────────────┤
│ users_1-1M  │ shard_01     │
│ users_1M-2M │ shard_02     │
│ users_2M-3M │ shard_03     │
│ orders_2023 │ shard_04     │
│ orders_2024 │ shard_05     │
└─────────────┴──────────────┘

Query Flow:
1. Application queries directory for user_id=1500000
2. Directory returns shard_02
3. Application queries shard_02 directly
4. Results returned to application

Advantages:
✓ Flexible routing logic
✓ Easy to rebalance
✓ Complex partitioning strategies
✓ Centralized management

Disadvantages:
✗ Single point of failure
✗ Additional latency
✗ Directory service complexity
✗ Consistency challenges

Best For:
- Complex business logic
- Frequent rebalancing
- Multiple partitioning strategies
- Enterprise applications</code></pre>
    </div>

    <h4>Sharding Strategy Comparison</h4>
    <table>
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Distribution</th>
          <th>Range Queries</th>
          <th>Rebalancing</th>
          <th>Complexity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Range-Based</td>
          <td>Potentially uneven</td>
          <td>Excellent</td>
          <td>Difficult</td>
          <td>Low</td>
        </tr>
        <tr>
          <td>Hash-Based</td>
          <td>Even</td>
          <td>Poor</td>
          <td>Very difficult</td>
          <td>Low</td>
        </tr>
        <tr>
          <td>Consistent Hash</td>
          <td>Good</td>
          <td>Poor</td>
          <td>Good</td>
          <td>High</td>
        </tr>
        <tr>
          <td>Directory-Based</td>
          <td>Configurable</td>
          <td>Good</td>
          <td>Excellent</td>
          <td>High</td>
        </tr>
      </tbody>
    </table>

    <details>
      <summary><strong>Example: Discord's Message Sharding Strategy</strong></summary>
      <div class="info-note">
        Discord handles 4+ billion messages daily across millions of servers. They use a hybrid sharding approach combining range-based and hash-based strategies. Messages are first partitioned by guild (server) ID using consistent hashing to ensure even distribution across shards. Within each shard, messages are further partitioned by timestamp ranges to optimize recent message queries. This approach reduced message query latency from 150ms to 35ms, supports 19+ million concurrent users, and handles 4+ billion messages daily. The system automatically rebalances when shards reach 80% capacity, maintaining optimal performance as Discord scales.
      </div>
    </details>

    <h3>Vertical Partitioning</h3>
    <p>Vertical partitioning divides table columns into separate tables, optimizing storage and access patterns for different types of data.</p>

    <h4>Column-Based Partitioning</h4>
    <p><strong>Concept:</strong> Separate frequently accessed columns from rarely accessed ones to improve query performance.</p>

    <div class="code-block">
      <pre><code>Vertical Partitioning Example:

Original User Table:
┌─────────┬──────────┬───────────┬──────────┬─────────────┬──────────────┐
│ user_id │ username │ email     │ password │ profile_pic │ last_login   │
├─────────┼──────────┼───────────┼──────────┼─────────────┼──────────────┤
│ 1       │ alice    │ a@ex.com  │ hash123  │ pic1.jpg    │ 2023-12-01   │
│ 2       │ bob      │ b@ex.com  │ hash456  │ pic2.jpg    │ 2023-12-02   │
└─────────┴──────────┴───────────┴──────────┴─────────────┴──────────────┘

After Vertical Partitioning:

User_Basic Table (frequently accessed):
┌─────────┬──────────┬───────────┬──────────────┐
│ user_id │ username │ email     │ last_login   │
├─────────┼──────────┼───────────┼──────────────┤
│ 1       │ alice    │ a@ex.com  │ 2023-12-01   │
│ 2       │ bob      │ b@ex.com  │ 2023-12-02   │
└─────────┴──────────┴───────────┴──────────────┘

User_Security Table (rarely accessed):
┌─────────┬──────────┐
│ user_id │ password │
├─────────┼──────────┤
│ 1       │ hash123  │
│ 2       │ hash456  │
└─────────┴──────────┘

User_Profile Table (occasionally accessed):
┌─────────┬─────────────┐
│ user_id │ profile_pic │
├─────────┼─────────────┤
│ 1       │ pic1.jpg    │
│ 2       │ pic2.jpg    │
└─────────┴─────────────┘

Benefits:
✓ Faster queries on frequently accessed columns
✓ Reduced I/O for common operations
✓ Better cache utilization
✓ Improved security (sensitive data isolated)
✓ Optimized storage (different compression per table)</code></pre>
    </div>

    <h4>Normalization vs Vertical Partitioning</h4>
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Normalization</th>
          <th>Vertical Partitioning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Purpose</td>
          <td>Eliminate redundancy</td>
          <td>Optimize access patterns</td>
        </tr>
        <tr>
          <td>Relationship</td>
          <td>Logical data relationships</td>
          <td>Performance-based grouping</td>
        </tr>
        <tr>
          <td>Data Integrity</td>
          <td>Primary focus</td>
          <td>Secondary consideration</td>
        </tr>
        <tr>
          <td>Query Pattern</td>
          <td>Based on business logic</td>
          <td>Based on access frequency</td>
        </tr>
      </tbody>
    </table>

    <h4>Vertical Partitioning Strategies</h4>
    <ul>
      <li><strong>Access Frequency:</strong> Separate hot and cold data</li>
      <li><strong>Data Type:</strong> Group similar data types for optimization</li>
      <li><strong>Security Level:</strong> Isolate sensitive information</li>
      <li><strong>Update Frequency:</strong> Separate static and dynamic data</li>
      <li><strong>Storage Requirements:</strong> Different compression/storage needs</li>
    </ul>

    <h3>Functional Partitioning</h3>
    <p>Functional partitioning divides data based on business functions or features, aligning database structure with application architecture.</p>

    <h4>Microservices-Aligned Partitioning</h4>
    <div class="code-block">
      <pre><code>Functional Partitioning Example:

E-commerce Platform:

User Service Database:
├── users
├── user_profiles
├── user_preferences
└── authentication_tokens

Product Service Database:
├── products
├── categories
├── product_reviews
└── inventory

Order Service Database:
├── orders
├── order_items
├── payments
└── shipping_info

Benefits:
✓ Service independence
✓ Technology stack flexibility
✓ Team ownership clarity
✓ Scalability per function
✓ Fault isolation

Challenges:
✗ Cross-service queries
✗ Data consistency
✗ Transaction management
✗ Increased complexity</code></pre>
    </div>

    <h4>Domain-Driven Design Partitioning</h4>
    <p>Align partitions with business domains and bounded contexts:</p>

    <ul>
      <li><strong>Customer Domain:</strong> Customer data, preferences, history</li>
      <li><strong>Product Domain:</strong> Catalog, inventory, pricing</li>
      <li><strong>Order Domain:</strong> Orders, payments, fulfillment</li>
      <li><strong>Analytics Domain:</strong> Reporting, metrics, insights</li>
    </ul>

    <h3>Advanced Partitioning Techniques</h3>
    <p>Modern distributed systems employ sophisticated partitioning strategies to handle complex requirements and massive scale.</p>

    <h4>Composite Partitioning</h4>
    <p><strong>Concept:</strong> Combine multiple partitioning strategies for optimal data distribution and query performance.</p>

    <div class="code-block">
      <pre><code>Composite Partitioning Example:

E-commerce Orders Table:
Primary Partition: Range by order_date (monthly)
Secondary Partition: Hash by customer_id

Partition Structure:
orders_2023_01_shard_0 (Jan 2023, hash 0)
orders_2023_01_shard_1 (Jan 2023, hash 1)
orders_2023_01_shard_2 (Jan 2023, hash 2)
orders_2023_01_shard_3 (Jan 2023, hash 3)
orders_2023_02_shard_0 (Feb 2023, hash 0)
...

Query Optimization:
- Time-based queries: Prune by date partitions
- Customer queries: Prune by hash partitions
- Combined queries: Prune by both dimensions

Benefits:
✓ Multiple query patterns optimized
✓ Balanced data distribution
✓ Efficient pruning strategies
✓ Scalable architecture

Example Query Execution:
SELECT * FROM orders 
WHERE order_date >= '2023-06-01' 
  AND customer_id = 12345

Execution Plan:
1. Prune to orders_2023_06_* partitions
2. Calculate hash(12345) % 4 = 1
3. Query only orders_2023_06_shard_1
4. Result: 1 partition accessed instead of 48</code></pre>
    </div>

    <h4>Dynamic Partitioning</h4>
    <p><strong>Concept:</strong> Automatically adjust partitions based on data growth and access patterns.</p>

    <div class="code-block">
      <pre><code>Dynamic Partitioning Strategies:

1. Auto-Splitting:
   Condition: Partition size > 10GB
   Action: Split into two equal partitions
   
2. Auto-Merging:
   Condition: Adjacent partitions < 1GB each
   Action: Merge into single partition
   
3. Hot Partition Detection:
   Condition: Queries per second > 1000
   Action: Split hot partition or add read replicas
   
4. Load Balancing:
   Condition: Uneven query distribution
   Action: Redistribute data across shards

Implementation Example:
┌─────────────┬────────────┬─────────────┬────────────┐
│ Partition   │ Size (GB)  │ QPS         │ Action     │
├─────────────┼────────────┼─────────────┼────────────┤
│ shard_01    │ 12.5       │ 500         │ Split      │
│ shard_02    │ 0.8        │ 50          │ Merge      │
│ shard_03    │ 0.9        │ 45          │ Merge      │
│ shard_04    │ 8.2        │ 1500        │ Add Replica│
└─────────────┴────────────┴─────────────┴────────────┘

Benefits:
✓ Automatic optimization
✓ Consistent performance
✓ Reduced manual intervention
✓ Adaptive to workload changes</code></pre>
    </div>

    <h4>Cross-Partition Operations</h4>
    <p>Handling queries and transactions that span multiple partitions requires special techniques:</p>

    <table>
      <thead>
        <tr>
          <th>Operation</th>
          <th>Technique</th>
          <th>Complexity</th>
          <th>Performance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Scatter-Gather</td>
          <td>Query all partitions, merge results</td>
          <td>Low</td>
          <td>Slow</td>
        </tr>
        <tr>
          <td>Distributed Joins</td>
          <td>Coordinate joins across partitions</td>
          <td>High</td>
          <td>Very slow</td>
        </tr>
        <tr>
          <td>Denormalization</td>
          <td>Duplicate data to avoid cross-partition queries</td>
          <td>Medium</td>
          <td>Fast</td>
        </tr>
        <tr>
          <td>Lookup Tables</td>
          <td>Maintain routing information</td>
          <td>Medium</td>
          <td>Medium</td>
        </tr>
      </tbody>
    </table>

    <details>
      <summary><strong>Example: Uber's Trip Data Partitioning</strong></summary>
      <div class="info-note">
        Uber processes 15+ million trips daily across 900+ cities worldwide. Their trip data is partitioned using a sophisticated multi-dimensional approach: primary partitioning by city (geographic locality), secondary partitioning by date (temporal locality), and tertiary partitioning by driver/rider ID (load distribution). This strategy ensures that 95% of queries access only 1-2 partitions, reducing query latency from 500ms to 50ms. The system handles 15+ million trips daily, supports real-time pricing across 900+ cities, and maintains 99.9% uptime. Cross-partition operations (like global analytics) use a separate analytical pipeline with eventual consistency.
      </div>
    </details>

    <h3>Partitioning Implementation</h3>
    <p>Implementing effective partitioning requires careful planning, proper tooling, and ongoing monitoring to ensure optimal performance.</p>

    <h4>Partition Key Selection</h4>
    <p><strong>Critical Decision:</strong> The partition key determines data distribution and query performance.</p>

    <div class="code-block">
      <pre><code>Partition Key Selection Criteria:

1. Query Patterns:
   ✓ Frequently used in WHERE clauses
   ✓ Enables partition pruning
   ✓ Supports primary access patterns
   ✗ Avoid keys requiring full table scans

2. Data Distribution:
   ✓ Even distribution across partitions
   ✓ Prevents hotspots
   ✓ Stable over time
   ✗ Avoid skewed distributions

3. Cardinality:
   ✓ High cardinality for hash partitioning
   ✓ Reasonable ranges for range partitioning
   ✗ Avoid low cardinality keys

4. Business Logic:
   ✓ Aligns with application logic
   ✓ Supports transaction boundaries
   ✓ Enables data locality
   ✗ Avoid complex business rules

Good Partition Key Examples:
- user_id (high cardinality, even distribution)
- timestamp (natural ranges, time-based queries)
- geographic_region (business alignment)
- tenant_id (multi-tenant applications)

Poor Partition Key Examples:
- gender (low cardinality, uneven distribution)
- status (few distinct values)
- boolean flags (binary distribution)
- calculated fields (complex logic)</code></pre>
    </div>

    <h4>Partition Maintenance</h4>
    <p>Ongoing maintenance ensures partitions remain optimized and performant:</p>

    <ul>
      <li><strong>Monitoring:</strong> Track partition sizes, query patterns, and performance metrics</li>
      <li><strong>Rebalancing:</strong> Redistribute data when partitions become uneven</li>
      <li><strong>Pruning:</strong> Remove old partitions based on retention policies</li>
      <li><strong>Statistics:</strong> Update partition statistics for query optimization</li>
      <li><strong>Indexing:</strong> Maintain appropriate indexes on each partition</li>
    </ul>

    <h4>Partition Monitoring Metrics</h4>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Target Range</th>
          <th>Action if Outside Range</th>
          <th>Frequency</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Partition Size</td>
          <td>1GB - 10GB</td>
          <td>Split or merge partitions</td>
          <td>Daily</td>
        </tr>
        <tr>
          <td>Query Distribution</td>
          <td>±20% of average</td>
          <td>Rebalance or add replicas</td>
          <td>Hourly</td>
        </tr>
        <tr>
          <td>Cross-Partition Queries</td>
          <td><5% of total</td>
          <td>Review partition strategy</td>
          <td>Weekly</td>
        </tr>
        <tr>
          <td>Partition Pruning Ratio</td>
          <td>>90%</td>
          <td>Optimize query patterns</td>
          <td>Daily</td>
        </tr>
      </tbody>
    </table>

    <h4>Common Partitioning Pitfalls</h4>
    <div class="code-block">
      <pre><code>Partitioning Anti-Patterns:

1. Over-Partitioning:
   Problem: Too many small partitions
   Impact: Increased overhead, poor performance
   Solution: Aim for 1-10GB partitions

2. Under-Partitioning:
   Problem: Few large partitions
   Impact: Limited parallelism, slow queries
   Solution: Increase partition count

3. Skewed Distribution:
   Problem: Uneven data across partitions
   Impact: Hotspots, poor resource utilization
   Solution: Choose better partition key

4. Cross-Partition Queries:
   Problem: Queries spanning multiple partitions
   Impact: Poor performance, complex logic
   Solution: Denormalize or change partition strategy

5. Ignoring Growth Patterns:
   Problem: Partition strategy doesn't scale
   Impact: Performance degradation over time
   Solution: Plan for data growth

6. Poor Key Selection:
   Problem: Partition key doesn't match queries
   Impact: Full table scans, no pruning
   Solution: Analyze query patterns first

7. Lack of Monitoring:
   Problem: No visibility into partition health
   Impact: Performance issues go unnoticed
   Solution: Implement comprehensive monitoring</code></pre>
    </div>

    <h3>Database-Specific Partitioning</h3>
    <p>Different database systems provide various partitioning features and capabilities.</p>

    <h4>PostgreSQL Partitioning</h4>
    <div class="code-block">
      <pre><code>PostgreSQL Partitioning Example:

-- Create partitioned table
CREATE TABLE sales (
    id SERIAL,
    sale_date DATE,
    amount DECIMAL(10,2),
    customer_id INT
) PARTITION BY RANGE (sale_date);

-- Create partitions
CREATE TABLE sales_2023_q1 PARTITION OF sales
    FOR VALUES FROM ('2023-01-01') TO ('2023-04-01');

CREATE TABLE sales_2023_q2 PARTITION OF sales
    FOR VALUES FROM ('2023-04-01') TO ('2023-07-01');

-- Query with partition pruning
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM sales 
WHERE sale_date >= '2023-02-01' 
  AND sale_date < '2023-03-01';

-- Result shows only sales_2023_q1 accessed

Features:
✓ Declarative partitioning
✓ Automatic partition pruning
✓ Constraint exclusion
✓ Parallel query execution
✓ Partition-wise joins</code></pre>
    </div>

    <h4>MySQL Partitioning</h4>
    <div class="code-block">
      <pre><code>MySQL Partitioning Example:

-- Hash partitioning
CREATE TABLE users (
    id INT,
    username VARCHAR(50),
    email VARCHAR(100)
) PARTITION BY HASH(id) PARTITIONS 4;

-- Range partitioning
CREATE TABLE orders (
    order_id INT,
    order_date DATE,
    amount DECIMAL(10,2)
) PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025)
);

-- List partitioning
CREATE TABLE regional_data (
    id INT,
    region VARCHAR(20),
    data TEXT
) PARTITION BY LIST COLUMNS(region) (
    PARTITION p_north VALUES IN ('north', 'northeast'),
    PARTITION p_south VALUES IN ('south', 'southeast'),
    PARTITION p_west VALUES IN ('west', 'northwest')
);

Features:
✓ Multiple partition types
✓ Partition pruning
✓ Online partition management
✓ Subpartitioning support</code></pre>
    </div>

    <h4>MongoDB Sharding</h4>
    <div class="code-block">
      <pre><code>MongoDB Sharding Example:

// Enable sharding for database
sh.enableSharding("ecommerce")

// Shard collection by user_id
sh.shardCollection("ecommerce.users", { "user_id": 1 })

// Range-based sharding
sh.shardCollection("ecommerce.orders", { "order_date": 1 })

// Compound shard key
sh.shardCollection("ecommerce.products", { 
    "category": 1, 
    "product_id": 1 
})

// Check shard distribution
db.users.getShardDistribution()

Features:
✓ Automatic balancing
✓ Horizontal scaling
✓ Chunk-based distribution
✓ Query routing
✓ Replica set integration</code></pre>
    </div>

    <h4>Database Partitioning Comparison</h4>
    <table>
      <thead>
        <tr>
          <th>Database</th>
          <th>Partition Types</th>
          <th>Automatic Balancing</th>
          <th>Cross-Partition Queries</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PostgreSQL</td>
          <td>Range, List, Hash</td>
          <td>Manual</td>
          <td>Excellent</td>
        </tr>
        <tr>
          <td>MySQL</td>
          <td>Range, List, Hash, Key</td>
          <td>Manual</td>
          <td>Good</td>
        </tr>
        <tr>
          <td>MongoDB</td>
          <td>Range, Hash, Zone</td>
          <td>Automatic</td>
          <td>Good</td>
        </tr>
        <tr>
          <td>Cassandra</td>
          <td>Hash, Range</td>
          <td>Automatic</td>
          <td>Limited</td>
        </tr>
      </tbody>
    </table>

    <h3>Conclusion</h3>
    <p>Database partitioning is a powerful technique for achieving scalability and performance in large-scale applications. The choice of partitioning strategy depends on data characteristics, query patterns, and scalability requirements.</p>

    <p>Key principles for effective partitioning:</p>
    <ul>
      <li><strong>Understand Access Patterns:</strong> Analyze how data is queried and accessed</li>
      <li><strong>Choose Appropriate Strategy:</strong> Select partitioning method based on requirements</li>
      <li><strong>Plan for Growth:</strong> Design partitions to handle future data volume</li>
      <li><strong>Monitor Performance:</strong> Track partition health and query patterns</li>
      <li><strong>Maintain Balance:</strong> Ensure even distribution across partitions</li>
      <li><strong>Consider Trade-offs:</strong> Balance performance, complexity, and consistency</li>
      <li><strong>Test Thoroughly:</strong> Validate partitioning strategy with realistic workloads</li>
    </ul>

    <p>As applications continue to scale and data volumes grow, partitioning becomes increasingly important for maintaining performance and enabling horizontal scaling. Modern distributed systems and cloud databases provide sophisticated partitioning capabilities that can automatically adapt to changing workloads and data patterns.</p>

    <h3>References</h3>
    <ul>
      <li><a href="https://www.postgresql.org/docs/current/ddl-partitioning.html" target="_blank">PostgreSQL Partitioning Documentation</a></li>
      <li><a href="https://dev.mysql.com/doc/refman/8.0/en/partitioning.html" target="_blank">MySQL Partitioning Guide</a></li>
      <li><a href="https://docs.mongodb.com/manual/sharding/" target="_blank">MongoDB Sharding Documentation</a></li>
      <li><a href="https://cassandra.apache.org/doc/latest/architecture/dynamo.html" target="_blank">Cassandra Partitioning Architecture</a></li>
      <li><a href="https://aws.amazon.com/blogs/database/best-practices-for-amazon-dynamodb/" target="_blank">DynamoDB Partitioning Best Practices</a></li>
    </ul>
  `
}; 