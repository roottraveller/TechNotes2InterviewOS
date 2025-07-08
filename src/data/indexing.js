export const indexing = {
  id: 'indexing',
  title: 'Database Indexing',
  content: `
    <p>Database indexing is a data structure technique that improves the speed of data retrieval operations on a database table at the cost of additional storage space and slower write operations. Indexes create shortcuts to data locations, similar to how a book's index helps you quickly find specific topics without reading every page.</p>

    <details>
      <summary><strong>Real-World Example: Google's Search Index</strong></summary>
      <div class="info-note">
        Google's search engine maintains one of the world's largest indexes, containing over 130 trillion web pages. Their indexing system uses a combination of inverted indexes, B-trees, and custom data structures to deliver search results in under 0.2 seconds. The index is distributed across millions of servers and updated continuously as new content is discovered. Google's PageRank algorithm relies heavily on efficient indexing to rank billions of web pages, processing over 8.5 billion searches daily with sub-second response times.
      </div>
    </details>

    <h3>Indexing Fundamentals</h3>
    <p>Understanding indexing fundamentals is crucial for database performance optimization and efficient query execution.</p>

    <h4>How Indexes Work</h4>
    <p>An index is a separate data structure that contains a sorted copy of selected columns from a table, along with pointers to the actual data rows. This allows the database engine to quickly locate specific records without scanning the entire table.</p>

    <div class="code-block">
      <pre><code>Without Index (Full Table Scan):
Table: Users (1 million rows)
Query: SELECT * FROM Users WHERE email = 'john@example.com'
Process: Scan all 1,000,000 rows → O(n) complexity
Time: ~500ms

With Index on Email:
Index: Sorted email values with row pointers
Query: SELECT * FROM Users WHERE email = 'john@example.com'
Process: Binary search in index → O(log n) complexity
Time: ~2ms

Performance Improvement: 250x faster!</code></pre>
    </div>

    <h4>Index Structure Visualization</h4>
    <div class="code-block">
      <pre><code>Table Data (Heap):
Row 1: [ID=101, Name="Alice", Email="alice@example.com"]
Row 2: [ID=205, Name="Bob", Email="bob@example.com"]
Row 3: [ID=150, Name="Charlie", Email="charlie@example.com"]
Row 4: [ID=300, Name="David", Email="david@example.com"]

Index on Email (B-Tree):
        "charlie@example.com" → Row 3
       /                            \
"alice@example.com" → Row 1    "david@example.com" → Row 4
                                /
                        "bob@example.com" → Row 2

Index Benefits:
- Sorted order enables binary search
- Pointers eliminate full table scans
- Balanced tree ensures consistent performance</code></pre>
    </div>

    <h4>Index Performance Metrics</h4>
    <table>
      <thead>
        <tr>
          <th>Operation</th>
          <th>Without Index</th>
          <th>With Index</th>
          <th>Improvement</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Point Query</td>
          <td>O(n)</td>
          <td>O(log n)</td>
          <td>100-1000x</td>
        </tr>
        <tr>
          <td>Range Query</td>
          <td>O(n)</td>
          <td>O(log n + k)</td>
          <td>10-100x</td>
        </tr>
        <tr>
          <td>Sorting</td>
          <td>O(n log n)</td>
          <td>O(k)</td>
          <td>50-500x</td>
        </tr>
        <tr>
          <td>Join Operations</td>
          <td>O(n × m)</td>
          <td>O(n log m)</td>
          <td>10-1000x</td>
        </tr>
      </tbody>
    </table>

    <h3>Types of Database Indexes</h3>
    <p>Different index types serve different purposes and are optimized for specific query patterns and data characteristics.</p>

    <h4>Primary Index (Clustered Index)</h4>
    <p><strong>Definition:</strong> An index that physically reorders table data according to the indexed column(s). The table data is stored in the same order as the index.</p>

    <p><strong>Characteristics:</strong></p>
    <ul>
      <li><strong>Physical Ordering:</strong> Table data is physically sorted by index key</li>
      <li><strong>One Per Table:</strong> Only one clustered index allowed per table</li>
      <li><strong>Automatic Creation:</strong> Usually created on primary key</li>
      <li><strong>Fast Range Queries:</strong> Excellent for range scans</li>
    </ul>

    <div class="code-block">
      <pre><code>Clustered Index Example:
Table: Orders (clustered on OrderID)

Physical Storage:
[OrderID=1001, CustomerID=501, Amount=150.00]
[OrderID=1002, CustomerID=502, Amount=200.00]
[OrderID=1003, CustomerID=503, Amount=175.00]
[OrderID=1004, CustomerID=501, Amount=300.00]

Query: SELECT * FROM Orders WHERE OrderID BETWEEN 1002 AND 1003
Result: Direct access to physically adjacent rows
Performance: Optimal for range queries</code></pre>
    </div>

    <h4>Secondary Index (Non-Clustered Index)</h4>
    <p><strong>Definition:</strong> A separate data structure that contains index keys and pointers to the actual data rows. Does not change the physical order of table data.</p>

    <p><strong>Characteristics:</strong></p>
    <ul>
      <li><strong>Logical Ordering:</strong> Index is sorted, table data remains unsorted</li>
      <li><strong>Multiple Allowed:</strong> Can have many non-clustered indexes per table</li>
      <li><strong>Additional Storage:</strong> Requires separate storage space</li>
      <li><strong>Pointer Lookup:</strong> Requires additional step to access data</li>
    </ul>

    <div class="code-block">
      <pre><code>Non-Clustered Index Example:
Table: Customers (heap storage)
Index: CustomerName (non-clustered)

Table Data (unsorted):
Row 1: [ID=101, Name="Charlie", City="NYC"]
Row 2: [ID=102, Name="Alice", City="LA"]
Row 3: [ID=103, Name="Bob", City="Chicago"]

Index Structure:
"Alice" → Pointer to Row 2
"Bob" → Pointer to Row 3
"Charlie" → Pointer to Row 1

Query Process:
1. Search index for "Bob"
2. Find pointer to Row 3
3. Access Row 3 in table
4. Return data</code></pre>
    </div>

    <h4>Composite Index (Multi-Column Index)</h4>
    <p><strong>Definition:</strong> An index that includes multiple columns, creating a sorted structure based on the combination of column values.</p>

    <p><strong>Key Concepts:</strong></p>
    <ul>
      <li><strong>Column Order Matters:</strong> Index is sorted by first column, then second, etc.</li>
      <li><strong>Leftmost Prefix:</strong> Can be used for queries on leading columns</li>
      <li><strong>Covering Index:</strong> Can satisfy queries without table access</li>
      <li><strong>Selectivity:</strong> Most selective column should be first</li>
    </ul>

    <div class="code-block">
      <pre><code>Composite Index Example:
Index: (LastName, FirstName, Age)

Index Entries (sorted):
("Adams", "John", 25) → Row 5
("Adams", "Mary", 30) → Row 8
("Brown", "Alice", 28) → Row 2
("Brown", "Bob", 35) → Row 1
("Smith", "Charlie", 22) → Row 3

Efficient Queries (use leftmost prefix):
✓ WHERE LastName = 'Brown'
✓ WHERE LastName = 'Brown' AND FirstName = 'Alice'
✓ WHERE LastName = 'Brown' AND FirstName = 'Alice' AND Age = 28

Inefficient Queries (skip leftmost columns):
✗ WHERE FirstName = 'Alice'
✗ WHERE Age = 28
✗ WHERE FirstName = 'Alice' AND Age = 28</code></pre>
    </div>

    <h4>Unique Index</h4>
    <p><strong>Definition:</strong> An index that enforces uniqueness constraint on the indexed column(s) while providing fast lookup capabilities.</p>

    <p><strong>Benefits:</strong></p>
    <ul>
      <li><strong>Data Integrity:</strong> Prevents duplicate values</li>
      <li><strong>Query Optimization:</strong> Database knows values are unique</li>
      <li><strong>Faster Lookups:</strong> Can stop searching after first match</li>
      <li><strong>Better Execution Plans:</strong> Optimizer can make better decisions</li>
    </ul>

    <h4>Index Types Comparison</h4>
    <table>
      <thead>
        <tr>
          <th>Index Type</th>
          <th>Physical Order</th>
          <th>Quantity per Table</th>
          <th>Storage Overhead</th>
          <th>Best Use Case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Clustered</td>
          <td>Yes</td>
          <td>1</td>
          <td>Low</td>
          <td>Range queries, primary key</td>
        </tr>
        <tr>
          <td>Non-Clustered</td>
          <td>No</td>
          <td>Multiple</td>
          <td>Medium</td>
          <td>Point queries, foreign keys</td>
        </tr>
        <tr>
          <td>Composite</td>
          <td>Depends</td>
          <td>Multiple</td>
          <td>High</td>
          <td>Multi-column queries</td>
        </tr>
        <tr>
          <td>Unique</td>
          <td>Depends</td>
          <td>Multiple</td>
          <td>Medium</td>
          <td>Unique constraints</td>
        </tr>
      </tbody>
    </table>

    <details>
      <summary><strong>Example: Facebook's Social Graph Indexing</strong></summary>
      <div class="info-note">
        Facebook's social graph contains 3+ billion users and 200+ billion connections. They use a sophisticated indexing strategy combining clustered indexes on user IDs, composite indexes on (user_id, friend_id, timestamp), and specialized graph indexes for friend recommendations. Their TAO (The Associations and Objects) system uses distributed indexing across thousands of servers to handle 1+ billion queries per second. The system maintains multiple index types: forward indexes for friend lists, reverse indexes for follower counts, and temporal indexes for activity feeds, enabling sub-millisecond response times for social interactions.
      </div>
    </details>

    <h3>Index Data Structures</h3>
    <p>Different data structures are used to implement indexes, each optimized for specific access patterns and data characteristics.</p>

    <h4>B-Tree Indexes</h4>
    <p><strong>Definition:</strong> A self-balancing tree data structure that maintains sorted data and allows searches, insertions, and deletions in logarithmic time.</p>

    <p><strong>Characteristics:</strong></p>
    <ul>
      <li><strong>Balanced Structure:</strong> All leaf nodes at same level</li>
      <li><strong>Sorted Order:</strong> Keys stored in sorted order</li>
      <li><strong>Logarithmic Performance:</strong> O(log n) for all operations</li>
      <li><strong>Range Queries:</strong> Excellent for range scans</li>
    </ul>

    <div class="code-block">
      <pre><code>B-Tree Structure (Order 3):
                    [50]
                   /    \
              [20, 30]   [70, 80]
             /   |   \   /   |   \
        [10,15] [25] [35] [60] [75] [90,95]

Properties:
- Each node has max 2 keys (order-1)
- Each internal node has max 3 children (order)
- All leaves at same level
- Keys in sorted order

Search for 25:
1. Start at root [50]
2. 25 < 50, go left to [20, 30]
3. 20 < 25 < 30, go middle to [25]
4. Found! Total: 3 comparisons</code></pre>
    </div>

    <h4>B+ Tree Indexes</h4>
    <p><strong>Definition:</strong> A variant of B-tree where all data is stored in leaf nodes, with internal nodes containing only keys for navigation.</p>

    <p><strong>Advantages over B-Tree:</strong></p>
    <ul>
      <li><strong>Sequential Access:</strong> Leaf nodes linked for range queries</li>
      <li><strong>Higher Fanout:</strong> More keys per internal node</li>
      <li><strong>Consistent Performance:</strong> All data at same level</li>
      <li><strong>Cache Friendly:</strong> Better memory locality</li>
    </ul>

    <div class="code-block">
      <pre><code>B+ Tree Structure:
Internal Nodes (keys only):
                    [50]
                   /    \
              [20, 30]   [70, 80]
             /   |   \   /   |   \
Leaf Nodes (data + pointers):
[10,15]→[20,25]→[30,35]→[50,60]→[70,75]→[80,90]
   ↓       ↓       ↓       ↓       ↓       ↓
 Data    Data    Data    Data    Data    Data

Benefits:
- Range queries: Follow leaf pointers
- Full scans: Sequential leaf access
- Point queries: Navigate to leaf
- Insertions: Maintain balance automatically</code></pre>
    </div>

    <h4>Hash Indexes</h4>
    <p><strong>Definition:</strong> Index structure that uses hash functions to map keys to bucket locations, providing O(1) average-case lookup time.</p>

    <p><strong>Characteristics:</strong></p>
    <ul>
      <li><strong>Constant Time Lookup:</strong> O(1) for equality searches</li>
      <li><strong>No Ordering:</strong> Cannot support range queries</li>
      <li><strong>Hash Collisions:</strong> Multiple keys may hash to same bucket</li>
      <li><strong>Memory Indexes:</strong> Often used for in-memory tables</li>
    </ul>

    <div class="code-block">
      <pre><code>Hash Index Example:
Hash Function: key % 7

Keys: [15, 22, 8, 31, 44, 17, 29]
Hash Values: [1, 1, 1, 3, 2, 3, 1]

Hash Table:
Bucket 0: []
Bucket 1: [15] → [22] → [8] → [29] (collision chain)
Bucket 2: [44]
Bucket 3: [31] → [17] (collision chain)
Bucket 4: []
Bucket 5: []
Bucket 6: []

Search for 22:
1. Hash(22) = 22 % 7 = 1
2. Go to bucket 1
3. Scan chain: 15 ≠ 22, 22 = 22 ✓
4. Found! Average: O(1)</code></pre>
    </div>

    <h4>Bitmap Indexes</h4>
    <p><strong>Definition:</strong> Index structure that uses bit vectors to represent the presence or absence of values, particularly effective for low-cardinality data.</p>

    <p><strong>Use Cases:</strong></p>
    <ul>
      <li><strong>Low Cardinality:</strong> Columns with few distinct values</li>
      <li><strong>Data Warehousing:</strong> OLAP queries with aggregations</li>
      <li><strong>Boolean Operations:</strong> Fast AND, OR, NOT operations</li>
      <li><strong>Bulk Operations:</strong> Efficient for batch processing</li>
    </ul>

    <div class="code-block">
      <pre><code>Bitmap Index Example:
Table: Employees
Column: Department (Sales, Engineering, Marketing)

Row Data:
Row 1: Sales
Row 2: Engineering
Row 3: Sales
Row 4: Marketing
Row 5: Engineering
Row 6: Sales

Bitmap Index:
Sales:       [1, 0, 1, 0, 0, 1]
Engineering: [0, 1, 0, 0, 1, 0]
Marketing:   [0, 0, 0, 1, 0, 0]

Query: SELECT * FROM Employees WHERE Department = 'Sales'
Result: Use Sales bitmap [1, 0, 1, 0, 0, 1]
Rows: 1, 3, 6

Query: SELECT * FROM Employees WHERE Department IN ('Sales', 'Engineering')
Result: Sales OR Engineering = [1, 1, 1, 0, 1, 1]
Rows: 1, 2, 3, 5, 6</code></pre>
    </div>

    <h4>Index Structure Comparison</h4>
    <table>
      <thead>
        <tr>
          <th>Structure</th>
          <th>Point Query</th>
          <th>Range Query</th>
          <th>Insertion</th>
          <th>Best Use Case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>B-Tree</td>
          <td>O(log n)</td>
          <td>O(log n + k)</td>
          <td>O(log n)</td>
          <td>General purpose</td>
        </tr>
        <tr>
          <td>B+ Tree</td>
          <td>O(log n)</td>
          <td>O(log n + k)</td>
          <td>O(log n)</td>
          <td>Range queries</td>
        </tr>
        <tr>
          <td>Hash</td>
          <td>O(1)</td>
          <td>Not supported</td>
          <td>O(1)</td>
          <td>Equality searches</td>
        </tr>
        <tr>
          <td>Bitmap</td>
          <td>O(1)</td>
          <td>O(k)</td>
          <td>O(1)</td>
          <td>Low cardinality</td>
        </tr>
      </tbody>
    </table>

    <h3>Index Selection and Design</h3>
    <p>Choosing the right indexes is crucial for optimal database performance. Poor index selection can hurt performance more than having no indexes at all.</p>

    <h4>Index Selection Criteria</h4>
    <ul>
      <li><strong>Query Patterns:</strong> Analyze most frequent queries</li>
      <li><strong>Selectivity:</strong> Prefer columns with high selectivity</li>
      <li><strong>Cardinality:</strong> Consider number of distinct values</li>
      <li><strong>Update Frequency:</strong> Balance read vs write performance</li>
      <li><strong>Storage Constraints:</strong> Consider space overhead</li>
    </ul>

    <h4>Selectivity Analysis</h4>
    <div class="code-block">
      <pre><code>Selectivity = Distinct Values / Total Rows

Example Table: Customers (1,000,000 rows)

Column Analysis:
CustomerID: 1,000,000 distinct values
Selectivity: 1,000,000 / 1,000,000 = 1.0 (Perfect)
Index Recommendation: Excellent candidate

Email: 995,000 distinct values
Selectivity: 995,000 / 1,000,000 = 0.995 (Very High)
Index Recommendation: Excellent candidate

Country: 50 distinct values
Selectivity: 50 / 1,000,000 = 0.00005 (Very Low)
Index Recommendation: Poor candidate (consider bitmap)

Gender: 3 distinct values
Selectivity: 3 / 1,000,000 = 0.000003 (Extremely Low)
Index Recommendation: Avoid traditional index</code></pre>
    </div>

    <h4>Index Design Patterns</h4>
    <table>
      <thead>
        <tr>
          <th>Pattern</th>
          <th>Description</th>
          <th>Example</th>
          <th>Benefit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Covering Index</td>
          <td>Include all query columns</td>
          <td>INDEX(user_id, name, email)</td>
          <td>Avoid table lookup</td>
        </tr>
        <tr>
          <td>Partial Index</td>
          <td>Index subset of rows</td>
          <td>WHERE active = true</td>
          <td>Smaller index size</td>
        </tr>
        <tr>
          <td>Functional Index</td>
          <td>Index on expression</td>
          <td>INDEX(UPPER(name))</td>
          <td>Case-insensitive search</td>
        </tr>
        <tr>
          <td>Filtered Index</td>
          <td>Index with WHERE clause</td>
          <td>WHERE status = 'active'</td>
          <td>Focused performance</td>
        </tr>
      </tbody>
    </table>

    <h4>Index Maintenance Strategy</h4>
    <div class="code-block">
      <pre><code>Index Lifecycle Management:

1. Analysis Phase:
   ├── Query workload analysis
   ├── Execution plan review
   ├── Performance baseline
   └── Index usage statistics

2. Design Phase:
   ├── Selectivity calculation
   ├── Composite index design
   ├── Covering index planning
   └── Maintenance cost estimation

3. Implementation Phase:
   ├── Index creation (online if possible)
   ├── Statistics update
   ├── Execution plan validation
   └── Performance testing

4. Monitoring Phase:
   ├── Usage statistics tracking
   ├── Performance impact analysis
   ├── Maintenance cost monitoring
   └── Optimization opportunities

5. Optimization Phase:
   ├── Unused index removal
   ├── Duplicate index elimination
   ├── Index consolidation
   └── Performance tuning</code></pre>
    </div>

    <details>
      <summary><strong>Example: Amazon's DynamoDB Indexing</strong></summary>
      <div class="info-note">
        Amazon DynamoDB uses a sophisticated indexing system to handle trillions of requests daily. They employ hash-based primary indexes for O(1) lookups and Global Secondary Indexes (GSI) for alternate access patterns. Their Local Secondary Indexes (LSI) provide different sort orders for the same partition key. DynamoDB's indexing supports Netflix's 230+ million subscribers, Airbnb's 4+ million hosts, and Snapchat's 300+ million daily users. The system automatically manages index distribution across multiple servers and maintains consistent performance even as data scales to petabytes.
      </div>
    </details>

    <h3>Index Performance Optimization</h3>
    <p>Optimizing index performance involves understanding query patterns, monitoring index usage, and making informed decisions about index design and maintenance.</p>

    <h4>Query Optimization with Indexes</h4>
    <ul>
      <li><strong>Index Scan vs Table Scan:</strong> Force index usage when beneficial</li>
      <li><strong>Index Intersection:</strong> Combine multiple indexes</li>
      <li><strong>Index Union:</strong> Merge results from multiple indexes</li>
      <li><strong>Sort Elimination:</strong> Use index order for sorting</li>
    </ul>

    <h4>Index Usage Patterns</h4>
    <div class="code-block">
      <pre><code>Query Execution Plans:

1. Index Seek (Optimal):
   Query: SELECT * FROM Users WHERE UserID = 123
   Plan: Index Seek on PK_Users_UserID
   Cost: 1 logical read
   Time: 0.1ms

2. Index Scan (Good):
   Query: SELECT * FROM Users WHERE Age BETWEEN 25 AND 35
   Plan: Index Scan on IX_Users_Age
   Cost: 50 logical reads
   Time: 2ms

3. Table Scan (Poor):
   Query: SELECT * FROM Users WHERE UPPER(Name) = 'JOHN'
   Plan: Table Scan (no suitable index)
   Cost: 10,000 logical reads
   Time: 100ms

4. Index Intersection (Advanced):
   Query: SELECT * FROM Users WHERE Age = 25 AND City = 'NYC'
   Plan: Index Intersection on IX_Age + IX_City
   Cost: 20 logical reads
   Time: 1ms</code></pre>
    </div>

    <h4>Index Performance Metrics</h4>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Description</th>
          <th>Good Value</th>
          <th>Action Required</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Index Usage</td>
          <td>Queries using index</td>
          <td>&gt; 80%</td>
          <td>Remove unused indexes</td>
        </tr>
        <tr>
          <td>Seek Ratio</td>
          <td>Seeks vs Scans</td>
          <td>&gt; 90%</td>
          <td>Improve index design</td>
        </tr>
        <tr>
          <td>Fragmentation</td>
          <td>Index fragmentation %</td>
          <td>&lt; 10%</td>
          <td>Rebuild/reorganize</td>
        </tr>
        <tr>
          <td>Page Splits</td>
          <td>Index page splits/sec</td>
          <td>&lt; 20</td>
          <td>Adjust fill factor</td>
        </tr>
      </tbody>
    </table>

    <h4>Index Maintenance Operations</h4>
    <div class="code-block">
      <pre><code>Index Maintenance Schedule:

Daily (Automated):
├── Update statistics
├── Monitor fragmentation
├── Check index usage
└── Alert on performance issues

Weekly (Scheduled):
├── Reorganize fragmented indexes (5-30%)
├── Rebuild heavily fragmented indexes (>30%)
├── Update index usage statistics
└── Review slow query reports

Monthly (Analysis):
├── Identify unused indexes
├── Analyze query patterns
├── Review index design
└── Plan optimization changes

Quarterly (Strategic):
├── Comprehensive workload analysis
├── Index architecture review
├── Performance baseline update
└── Capacity planning</code></pre>
    </div>

    <h3>Advanced Indexing Techniques</h3>
    <p>Modern databases provide advanced indexing features that can significantly improve performance for specific use cases.</p>

    <h4>Partial Indexes</h4>
    <p><strong>Definition:</strong> Indexes that include only rows meeting specific conditions, reducing index size and maintenance overhead.</p>

    <div class="code-block">
      <pre><code>Partial Index Example:
CREATE INDEX idx_active_users 
ON Users(LastLoginDate) 
WHERE IsActive = true;

Benefits:
- Smaller index size (only active users)
- Faster maintenance (fewer rows to update)
- Better cache utilization
- Reduced storage cost

Use Case:
Query: SELECT * FROM Users 
       WHERE IsActive = true 
       AND LastLoginDate > '2023-01-01'
Result: Uses partial index efficiently</code></pre>
    </div>

    <h4>Functional Indexes</h4>
    <p><strong>Definition:</strong> Indexes created on expressions or function results rather than column values directly.</p>

    <div class="code-block">
      <pre><code>Functional Index Examples:

1. Case-Insensitive Search:
   CREATE INDEX idx_name_upper ON Users(UPPER(Name));
   Query: SELECT * FROM Users WHERE UPPER(Name) = 'JOHN DOE';

2. Date Part Extraction:
   CREATE INDEX idx_order_month ON Orders(EXTRACT(MONTH FROM OrderDate));
   Query: SELECT * FROM Orders WHERE EXTRACT(MONTH FROM OrderDate) = 12;

3. JSON Path Indexing:
   CREATE INDEX idx_json_email ON Users((profile->>'email'));
   Query: SELECT * FROM Users WHERE profile->>'email' = 'john@example.com';

Benefits:
- Enable complex query optimization
- Support application-specific logic
- Improve computed column performance</code></pre>
    </div>

    <h4>Columnstore Indexes</h4>
    <p><strong>Definition:</strong> Indexes that store data in columnar format, optimized for analytical queries and data compression.</p>

    <p><strong>Benefits:</strong></p>
    <ul>
      <li><strong>Compression:</strong> 10x better compression than row storage</li>
      <li><strong>Vectorized Processing:</strong> Process multiple rows simultaneously</li>
      <li><strong>Analytical Queries:</strong> Optimal for aggregations and scans</li>
      <li><strong>Batch Mode:</strong> Efficient for large data sets</li>
    </ul>

    <div class="code-block">
      <pre><code>Columnstore vs Rowstore:

Rowstore (OLTP):
Row 1: [ID=1, Name="John", Age=25, Salary=50000]
Row 2: [ID=2, Name="Jane", Age=30, Salary=60000]
Row 3: [ID=3, Name="Bob", Age=35, Salary=70000]

Columnstore (OLAP):
ID Column:     [1, 2, 3]
Name Column:   ["John", "Jane", "Bob"]
Age Column:    [25, 30, 35]
Salary Column: [50000, 60000, 70000]

Query: SELECT AVG(Salary) FROM Employees WHERE Age > 25
Columnstore: Only reads Age and Salary columns
Rowstore: Reads all columns for all rows
Performance: 5-10x faster for analytical queries</code></pre>
    </div>

    <h4>Spatial Indexes</h4>
    <p><strong>Definition:</strong> Specialized indexes for geometric and geographic data, enabling efficient spatial queries.</p>

    <p><strong>Common Types:</strong></p>
    <ul>
      <li><strong>R-Tree:</strong> Hierarchical bounding rectangles</li>
      <li><strong>Quadtree:</strong> Recursive spatial subdivision</li>
      <li><strong>Grid Index:</strong> Fixed-size spatial grid</li>
      <li><strong>Geohash:</strong> Hierarchical spatial encoding</li>
    </ul>

    <details>
      <summary><strong>Example: Uber's Spatial Indexing</strong></summary>
      <div class="info-note">
        Uber uses sophisticated spatial indexing to match 15+ million trips daily across 70+ countries. Their system uses a combination of geohash-based indexes for initial filtering and R-tree indexes for precise spatial queries. The indexing system handles real-time location updates from millions of drivers and riders, enabling sub-second matching within specific geographic areas. Their H3 hexagonal indexing system (open-sourced by Uber) provides efficient spatial analytics for demand forecasting and pricing optimization, processing billions of location points daily.
      </div>
    </details>

    <h3>Index Monitoring and Troubleshooting</h3>
    <p>Effective index management requires continuous monitoring and proactive troubleshooting to maintain optimal performance.</p>

    <h4>Index Health Monitoring</h4>
    <div class="code-block">
      <pre><code>Index Health Dashboard:

Performance Metrics:
├── Index Usage Statistics
│   ├── Seeks: 1,250,000/day
│   ├── Scans: 50,000/day
│   ├── Lookups: 25,000/day
│   └── Updates: 100,000/day
├── Fragmentation Analysis
│   ├── Logical: 5.2% (Good)
│   ├── Physical: 2.1% (Excellent)
│   └── Page Fullness: 85% (Optimal)
└── Maintenance Statistics
    ├── Last Rebuild: 2023-01-15
    ├── Last Reorganize: 2023-01-22
    └── Statistics Update: 2023-01-23

Alerts:
⚠️ IX_Orders_CustomerID: 15% fragmentation
⚠️ IX_Users_Email: Low usage (5 seeks/day)
✅ PK_Products_ID: Optimal performance</code></pre>
    </div>

    <h4>Common Index Problems</h4>
    <table>
      <thead>
        <tr>
          <th>Problem</th>
          <th>Symptoms</th>
          <th>Cause</th>
          <th>Solution</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Index Fragmentation</td>
          <td>Slow queries, high I/O</td>
          <td>Frequent updates/deletes</td>
          <td>Rebuild/reorganize index</td>
        </tr>
        <tr>
          <td>Missing Index</td>
          <td>Table scans, slow queries</td>
          <td>No suitable index</td>
          <td>Create appropriate index</td>
        </tr>
        <tr>
          <td>Unused Index</td>
          <td>Slow writes, wasted space</td>
          <td>Query pattern changed</td>
          <td>Drop unused index</td>
        </tr>
        <tr>
          <td>Wrong Index Type</td>
          <td>Suboptimal performance</td>
          <td>Poor index selection</td>
          <td>Replace with better index</td>
        </tr>
      </tbody>
    </table>

    <h4>Index Optimization Workflow</h4>
    <div class="code-block">
      <pre><code>Index Optimization Process:

1. Performance Analysis:
   ├── Identify slow queries
   ├── Analyze execution plans
   ├── Review index usage stats
   └── Measure baseline performance

2. Index Assessment:
   ├── Calculate selectivity
   ├── Analyze fragmentation
   ├── Review maintenance costs
   └── Identify optimization opportunities

3. Optimization Strategy:
   ├── Create missing indexes
   ├── Remove unused indexes
   ├── Consolidate similar indexes
   └── Adjust existing indexes

4. Implementation:
   ├── Create indexes online
   ├── Update statistics
   ├── Monitor performance impact
   └── Validate improvements

5. Monitoring:
   ├── Track performance metrics
   ├── Monitor index usage
   ├── Adjust maintenance schedule
   └── Plan future optimizations</code></pre>
    </div>

    <h3>Best Practices and Recommendations</h3>
    <p>Following indexing best practices ensures optimal database performance while avoiding common pitfalls.</p>

    <h4>Index Design Best Practices</h4>
    <ul>
      <li><strong>Analyze Query Patterns:</strong> Create indexes based on actual usage</li>
      <li><strong>Prioritize Selectivity:</strong> Index columns with high selectivity first</li>
      <li><strong>Use Composite Indexes:</strong> Combine related columns efficiently</li>
      <li><strong>Consider Covering Indexes:</strong> Include all query columns when beneficial</li>
      <li><strong>Monitor Index Usage:</strong> Remove unused indexes regularly</li>
      <li><strong>Maintain Statistics:</strong> Keep index statistics current</li>
      <li><strong>Plan for Growth:</strong> Consider future data volume and patterns</li>
    </ul>

    <h4>Common Indexing Mistakes</h4>
    <ul>
      <li><strong>Over-Indexing:</strong> Creating too many indexes hurts write performance</li>
      <li><strong>Under-Indexing:</strong> Missing critical indexes causes poor read performance</li>
      <li><strong>Wrong Column Order:</strong> Incorrect composite index column sequence</li>
      <li><strong>Ignoring Maintenance:</strong> Allowing indexes to become fragmented</li>
      <li><strong>Index on Everything:</strong> Indexing low-selectivity columns</li>
      <li><strong>Duplicate Indexes:</strong> Creating redundant indexes</li>
      <li><strong>Ignoring Statistics:</strong> Outdated statistics lead to poor plans</li>
    </ul>

    <h4>Index Strategy Decision Matrix</h4>
    <div class="code-block">
      <pre><code>Index Selection Guide:

Query Type → Recommended Index:
├── Point Queries (WHERE col = value)
│   └── Single-column B-tree index
├── Range Queries (WHERE col BETWEEN x AND y)
│   └── B-tree or B+ tree index
├── Pattern Matching (WHERE col LIKE 'prefix%')
│   └── B-tree index (prefix matching)
├── Full-Text Search (WHERE CONTAINS(col, 'text'))
│   └── Full-text index
├── Equality on Multiple Columns
│   └── Composite index (most selective first)
├── Sorting (ORDER BY col1, col2)
│   └── Composite index matching sort order
├── Grouping (GROUP BY col1, col2)
│   └── Composite index on grouping columns
└── Joining (JOIN ON table1.col = table2.col)
    └── Index on join columns (both tables)</code></pre>
    </div>

    <h3>Conclusion</h3>
    <p>Database indexing is a fundamental technique for optimizing query performance and ensuring scalable database operations. The choice of index type and design strategy depends on query patterns, data characteristics, and performance requirements.</p>

    <p>Key success factors for effective indexing:</p>
    <ul>
      <li><strong>Understand Workload:</strong> Analyze query patterns and access methods</li>
      <li><strong>Choose Appropriate Structure:</strong> Select index type based on use case</li>
      <li><strong>Design for Selectivity:</strong> Prioritize high-selectivity columns</li>
      <li><strong>Monitor Continuously:</strong> Track index usage and performance</li>
      <li><strong>Maintain Regularly:</strong> Keep indexes optimized and current</li>
      <li><strong>Balance Trade-offs:</strong> Consider read vs write performance</li>
      <li><strong>Plan for Scale:</strong> Design indexes for future growth</li>
    </ul>

    <p>As data volumes continue to grow and query complexity increases, effective indexing strategies become even more critical for maintaining application performance and user experience.</p>

    <h3>References</h3>
    <ul>
      <li><a href="https://docs.microsoft.com/en-us/sql/relational-databases/indexes/" target="_blank">Microsoft SQL Server Index Design Guide</a></li>
      <li><a href="https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html" target="_blank">MySQL Index Optimization</a></li>
      <li><a href="https://www.postgresql.org/docs/current/indexes.html" target="_blank">PostgreSQL Index Types</a></li>
      <li><a href="https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/indexes-and-performance.html" target="_blank">Oracle Database Index Performance</a></li>
      <li><a href="https://docs.mongodb.com/manual/indexes/" target="_blank">MongoDB Index Strategies</a></li>
    </ul>
  `
}; 