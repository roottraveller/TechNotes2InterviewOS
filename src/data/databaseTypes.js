export const databaseTypes = {
  id: 'database-types',
  title: 'Database Types',
  content: `
    <p>Understanding different database types and their optimal use cases is crucial for system design and architecture decisions. Modern applications often use multiple database types (polyglot persistence) to optimize for different data patterns and performance requirements.</p>

    <details>
      <summary><strong>Real-World Example: Netflix's Multi-Database Architecture</strong></summary>
      <div class="info-note">
        Netflix serves 260+ million subscribers globally using a sophisticated multi-database architecture. Their system uses Cassandra for user viewing history (handling 1+ million writes per second), MySQL for billing and account data (requiring ACID compliance), Elasticsearch for search and recommendations (processing 500+ billion events daily), Redis for session management (sub-millisecond response times), and Amazon S3 for content metadata. This polyglot approach enables Netflix to stream 1+ billion hours of content monthly while maintaining 99.9% uptime. Each database type is optimized for specific use cases: Cassandra for massive write throughput, MySQL for transactional consistency, Elasticsearch for complex search queries, and Redis for ultra-fast caching.
      </div>
    </details>

    <h3>Database Classification Overview</h3>
    <p>Databases can be categorized based on their data model, storage mechanism, and intended use cases. Each type has specific strengths and trade-offs that make them suitable for different scenarios.</p>

    <table>
      <thead>
        <tr>
          <th>Database Type</th>
          <th>Data Model</th>
          <th>Best Use Cases</th>
          <th>Examples</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Relational (RDBMS)</td>
          <td>Tables with relationships</td>
          <td>Transactional systems, complex queries</td>
          <td>PostgreSQL, MySQL, Oracle</td>
        </tr>
        <tr>
          <td>Document</td>
          <td>JSON-like documents</td>
          <td>Content management, catalogs</td>
          <td>MongoDB, CouchDB</td>
        </tr>
        <tr>
          <td>Key-Value</td>
          <td>Simple key-value pairs</td>
          <td>Caching, session storage</td>
          <td>Redis, DynamoDB</td>
        </tr>
        <tr>
          <td>Column-Family</td>
          <td>Column-oriented storage</td>
          <td>Time-series, analytics</td>
          <td>Cassandra, HBase</td>
        </tr>
        <tr>
          <td>Graph</td>
          <td>Nodes and relationships</td>
          <td>Social networks, recommendations</td>
          <td>Neo4j, Amazon Neptune</td>
        </tr>
      </tbody>
    </table>

    <h3>Classification by Data Model</h3>
    <p>The data model determines how data is structured, stored, and accessed within the database system.</p>

    <h4>1. Relational Databases (RDBMS)</h4>
    <p><strong>Architecture:</strong> Data organized in tables with rows and columns, connected through foreign key relationships.</p>

    <div class="code-block">
      <pre><code>Relational Model Structure:

Users Table:
┌────┬──────────┬─────────────────┬──────────────┐
│ ID │   Name   │      Email      │  Created_At  │
├────┼──────────┼─────────────────┼──────────────┤
│ 1  │ John Doe │ john@email.com  │ 2023-01-15   │
│ 2  │ Jane Doe │ jane@email.com  │ 2023-01-16   │
└────┴──────────┴─────────────────┴──────────────┘

Orders Table:
┌────┬─────────┬────────┬────────────┬──────────┐
│ ID │ User_ID │ Amount │    Date    │  Status  │
├────┼─────────┼────────┼────────────┼──────────┤
│ 1  │    1    │ 99.99  │ 2023-01-20 │ Complete │
│ 2  │    2    │ 149.50 │ 2023-01-21 │ Pending  │
└────┴─────────┴────────┴────────────┴──────────┘

SQL Query Example:
SELECT u.name, o.amount, o.date
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'Complete'
ORDER BY o.date DESC;</code></pre>
    </div>

    <p><strong>Key Characteristics:</strong></p>
    <ul>
      <li><strong>ACID Compliance:</strong> Atomicity, Consistency, Isolation, Durability</li>
      <li><strong>Schema Enforcement:</strong> Predefined structure with data types</li>
      <li><strong>SQL Support:</strong> Standardized query language</li>
      <li><strong>Referential Integrity:</strong> Foreign key constraints</li>
      <li><strong>Normalization:</strong> Reduces data redundancy</li>
    </ul>

    <p><strong>Popular RDBMS Systems:</strong></p>
    <table>
      <thead>
        <tr>
          <th>Database</th>
          <th>Strengths</th>
          <th>Typical Use Cases</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PostgreSQL</td>
          <td>Advanced features, JSON support, extensibility</td>
          <td>Complex applications, geospatial data</td>
        </tr>
        <tr>
          <td>MySQL</td>
          <td>Performance, ease of use, web applications</td>
          <td>Web development, content management</td>
        </tr>
        <tr>
          <td>Oracle Database</td>
          <td>Enterprise features, scalability, reliability</td>
          <td>Large enterprises, mission-critical systems</td>
        </tr>
        <tr>
          <td>SQL Server</td>
          <td>Microsoft ecosystem, business intelligence</td>
          <td>Enterprise applications, data warehousing</td>
        </tr>
      </tbody>
    </table>

    <details>
      <summary><strong>Example: Stripe's PostgreSQL at Scale</strong></summary>
      <div class="info-note">
        Stripe processes $800+ billion in payments annually using PostgreSQL as their primary database. Their architecture uses multiple PostgreSQL clusters with read replicas, handling millions of transactions per day with 99.99% uptime. Stripe's database design emphasizes strong consistency for financial data, complex queries for fraud detection, and ACID compliance for payment processing. They use PostgreSQL's advanced features like JSON columns for flexible payment metadata, full-text search for merchant data, and sophisticated indexing strategies. The system maintains strict data integrity while processing 135+ billion API requests annually, demonstrating how RDBMS can scale for critical financial infrastructure.
      </div>
    </details>

    <h4>2. NoSQL Databases</h4>
    <p><strong>Philosophy:</strong> Non-relational databases designed for specific data models and use cases, prioritizing scalability and flexibility over strict consistency.</p>

    <h5>Document Databases</h5>
    <p><strong>Architecture:</strong> Store data as documents (JSON, BSON, XML) with flexible schemas and nested structures.</p>

    <div class="code-block">
      <pre><code>Document Database Structure:

User Document:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@email.com",
  "profile": {
    "age": 29,
    "location": "San Francisco",
    "interests": ["technology", "music", "travel"]
  },
  "orders": [
    {
      "id": "order_123",
      "amount": 99.99,
      "date": "2023-01-20",
      "items": [
        { "name": "Laptop", "price": 99.99, "quantity": 1 }
      ]
    }
  ],
  "created_at": "2023-01-15T10:30:00Z"
}

MongoDB Query Examples:
// Find users in San Francisco
db.users.find({ "profile.location": "San Francisco" })

// Find users with orders over $100
db.users.find({ "orders.amount": { $gt: 100 } })

// Update nested field
db.users.updateOne(
  { "_id": ObjectId("507f1f77bcf86cd799439011") },
  { $set: { "profile.age": 30 } }
)</code></pre>
    </div>

    <details>
      <summary><strong>Example: Airbnb's MongoDB Implementation</strong></summary>
      <div class="info-note">
        Airbnb uses MongoDB to store property listings, user profiles, and booking data for 4+ million hosts and 900+ million guest arrivals. Their document-based approach handles complex, nested data structures like property amenities, photos, reviews, and availability calendars. MongoDB's flexible schema allows Airbnb to rapidly iterate on new features without database migrations. The system processes 50+ million searches daily, handles real-time booking updates, and maintains property data across 220+ countries. MongoDB's geospatial indexing enables location-based searches, while its aggregation framework powers complex analytics for pricing recommendations and search ranking algorithms.
      </div>
    </details>

    <h5>Key-Value Stores</h5>
    <p><strong>Architecture:</strong> Simple key-value pairs optimized for high performance and horizontal scaling.</p>

    <div class="code-block">
      <pre><code>Key-Value Store Structure:

Data Storage:
┌─────────────────┬──────────────────────────────────┐
│      Key        │             Value                │
├─────────────────┼──────────────────────────────────┤
│ user:1001       │ {"name": "John", "email": "..."}  │
│ session:abc123  │ {"user_id": 1001, "expires": ...}│
│ cart:user:1001  │ ["item1", "item2", "item3"]      │
│ counter:visits  │ 1,234,567                        │
└─────────────────┴──────────────────────────────────┘

Redis Operations:
SET user:1001 '{"name": "John", "email": "john@email.com"}'
GET user:1001
INCR counter:visits
EXPIRE session:abc123 3600
LPUSH cart:user:1001 "new_item"

DynamoDB Operations:
PutItem: { "pk": "user:1001", "data": {...} }
GetItem: { "pk": "user:1001" }
UpdateItem: { "pk": "user:1001", "SET": {...} }</code></pre>
    </div>

    <details>
      <summary><strong>Example: Amazon's DynamoDB at Scale</strong></summary>
      <div class="info-note">
        Amazon DynamoDB powers critical services across AWS, handling 20+ million requests per second during peak events like Prime Day. The key-value store manages shopping cart data, user sessions, product catalogs, and real-time inventory for millions of products. DynamoDB's single-digit millisecond latency enables real-time recommendations, fraud detection, and inventory updates. The system automatically scales to handle traffic spikes, maintains 99.999% availability, and provides global replication across multiple regions. Major applications include Alexa (voice processing), AWS Lambda (configuration storage), and Amazon Prime Video (user preferences and viewing history).
      </div>
    </details>

    <h5>Column-Family Databases</h5>
    <p><strong>Architecture:</strong> Data organized in column families, optimized for write-heavy workloads and time-series data.</p>

    <div class="code-block">
      <pre><code>Column-Family Structure:

Column Family: user_activity
┌─────────────┬─────────────────────────────────────────────────────────┐
│  Row Key    │                    Columns                              │
├─────────────┼─────────────────────────────────────────────────────────┤
│ user:1001   │ 2023-01-01:login → "mobile"                            │
│             │ 2023-01-01:page_view → "/dashboard"                    │
│             │ 2023-01-01:purchase → "product_123"                    │
│             │ 2023-01-01:login → "desktop"                           │
├─────────────┼─────────────────────────────────────────────────────────┤
│ user:1002   │ 2023-01-01:login → "mobile"                            │
│             │ 2023-01-01:search → "laptops"                          │
└─────────────┴─────────────────────────────────────────────────────────┘

Cassandra CQL Examples:
CREATE TABLE user_activity (
  user_id text,
  timestamp timestamp,
  action text,
  details text,
  PRIMARY KEY (user_id, timestamp)
);

INSERT INTO user_activity (user_id, timestamp, action, details)
VALUES ('user:1001', '2023-01-01 10:30:00', 'login', 'mobile');

SELECT * FROM user_activity 
WHERE user_id = 'user:1001' 
AND timestamp >= '2023-01-01' 
AND timestamp < '2023-01-02';</code></pre>
    </div>

    <details>
      <summary><strong>Example: Discord's Cassandra Implementation</strong></summary>
      <div class="info-note">
        Discord uses Cassandra to store 4+ billion messages daily across millions of servers, handling 40+ million concurrent users. Their column-family design optimizes for high write throughput (millions of messages per second) and efficient retrieval of conversation history. Cassandra's distributed architecture enables Discord to scale across multiple data centers with automatic failover and replication. The system maintains message ordering within channels, handles real-time message delivery, and provides message search capabilities. Discord's implementation demonstrates how column-family databases excel at time-series data patterns, supporting features like message history, user activity tracking, and server analytics.
      </div>
    </details>

    <h5>Graph Databases</h5>
    <p><strong>Architecture:</strong> Data represented as nodes (entities) and edges (relationships) optimized for traversal queries.</p>

    <div class="code-block">
      <pre><code>Graph Database Structure:

Nodes and Relationships:
    (User:John)──[FOLLOWS]──>(User:Jane)
         │                       │
    [CREATED]               [LIKED]
         │                       │
         ▼                       ▼
    (Post:123)──[TAGGED]──>(Tag:Tech)
         │                       │
    [COMMENTED]             [RELATED]
         │                       │
         ▼                       ▼
  (Comment:456)           (Tag:Programming)

Neo4j Cypher Queries:
// Find friends of friends
MATCH (user:User {name: 'John'})-[:FOLLOWS]->(friend)-[:FOLLOWS]->(fof)
WHERE fof <> user
RETURN DISTINCT fof.name

// Find popular posts in tech
MATCH (post:Post)-[:TAGGED]->(tag:Tag {name: 'Tech'})
MATCH (post)<-[:LIKED]-(user:User)
RETURN post.title, count(user) as likes
ORDER BY likes DESC

// Shortest path between users
MATCH path = shortestPath((a:User {name: 'John'})-[*]-(b:User {name: 'Alice'}))
RETURN length(path) as degrees_of_separation</code></pre>
    </div>

    <details>
      <summary><strong>Example: LinkedIn's Graph Database for Professional Networks</strong></summary>
      <div class="info-note">
        LinkedIn uses graph databases to power their professional network of 900+ million members, processing billions of relationship queries daily. Their graph model represents users, companies, skills, and connections, enabling features like "People You May Know" recommendations, network degree calculations, and professional path suggestions. The system handles complex queries like finding shortest paths between professionals, identifying influential industry connections, and generating personalized content feeds. LinkedIn's graph implementation processes 100+ million profile views daily, powers job recommendations based on network connections, and enables advanced analytics for recruiting and business intelligence.
      </div>
    </details>

    <h3>Classification by Storage Mechanism</h3>
    <p>Storage mechanisms determine how data is physically stored and accessed, affecting performance characteristics.</p>

    <h4>1. In-Memory Databases</h4>
    <p><strong>Architecture:</strong> Store data primarily in RAM for ultra-fast access with optional persistence.</p>

    <div class="code-block">
      <pre><code>In-Memory Database Architecture:

Memory Layout:
┌─────────────────────────────────────────────────────────┐
│                    RAM (Primary Storage)                │
├─────────────────────────────────────────────────────────┤
│  Data Structures: Hash Tables, B-Trees, Skip Lists     │
│  Indexes: In-memory indexes for fast lookups           │
│  Cache: Frequently accessed data                       │
│  Buffers: Transaction logs, write buffers              │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                Disk (Optional Persistence)              │
├─────────────────────────────────────────────────────────┤
│  Snapshots: Periodic data dumps                        │
│  WAL: Write-ahead logs for durability                  │
│  Backups: Point-in-time recovery                       │
└─────────────────────────────────────────────────────────┘

Performance Characteristics:
- Read latency: 0.1-1 microseconds
- Write latency: 1-10 microseconds
- Throughput: 1M+ operations per second
- Capacity: Limited by available RAM</code></pre>
    </div>

    <details>
      <summary><strong>Example: Twitter's Redis for Real-Time Timeline</strong></summary>
      <div class="info-note">
        Twitter uses Redis to power real-time timelines for 450+ million monthly active users, handling 500+ million tweets daily. Their in-memory architecture enables sub-millisecond response times for timeline generation, trending topics calculation, and real-time notifications. Redis stores user timelines, tweet metadata, and social graph data in memory, supporting Twitter's requirement to display fresh content within 150ms. The system handles 300,000+ timeline requests per second during peak events, maintains user session data, and powers real-time features like live tweet counts and trending hashtags. Twitter's Redis implementation demonstrates how in-memory databases enable real-time social media experiences at massive scale.
      </div>
    </details>

    <h4>2. Disk-Based Databases</h4>
    <p><strong>Architecture:</strong> Store data on persistent storage (SSDs/HDDs) with memory caching for performance.</p>

    <h4>3. Hybrid Databases</h4>
    <p><strong>Architecture:</strong> Combine in-memory and disk storage, automatically managing data placement based on access patterns.</p>

    <h3>Classification by Use Case</h3>
    <p>Database systems optimized for specific workload patterns and requirements.</p>

    <h4>1. OLTP (Online Transaction Processing)</h4>
    <p><strong>Characteristics:</strong> Optimized for high-concurrency, short-duration transactions with strong consistency.</p>

    <div class="code-block">
      <pre><code>OLTP Workload Pattern:

Transaction Example:
BEGIN TRANSACTION;
  -- Check account balance
  SELECT balance FROM accounts WHERE id = 123;
  
  -- Deduct amount if sufficient funds
  UPDATE accounts SET balance = balance - 100 
  WHERE id = 123 AND balance >= 100;
  
  -- Add transaction record
  INSERT INTO transactions (account_id, amount, type, timestamp)
  VALUES (123, -100, 'withdrawal', NOW());
COMMIT;

Performance Requirements:
- Latency: < 100ms per transaction
- Throughput: 1000+ transactions per second
- Consistency: ACID compliance
- Concurrency: Handle thousands of concurrent users
- Availability: 99.9%+ uptime</code></pre>
    </div>

    <h4>2. OLAP (Online Analytical Processing)</h4>
    <p><strong>Characteristics:</strong> Optimized for complex queries over large datasets with read-heavy workloads.</p>

    <div class="code-block">
      <pre><code>OLAP Query Example:

-- Complex analytical query
SELECT 
  region,
  product_category,
  EXTRACT(YEAR FROM order_date) as year,
  SUM(revenue) as total_revenue,
  COUNT(DISTINCT customer_id) as unique_customers,
  AVG(order_value) as avg_order_value
FROM sales_fact sf
JOIN dimension_geography dg ON sf.geography_key = dg.geography_key
JOIN dimension_product dp ON sf.product_key = dp.product_key
WHERE order_date >= '2020-01-01'
GROUP BY region, product_category, EXTRACT(YEAR FROM order_date)
HAVING total_revenue > 1000000
ORDER BY total_revenue DESC;

Performance Characteristics:
- Query complexity: Multi-table joins, aggregations
- Data volume: Terabytes to petabytes
- Response time: Seconds to minutes
- Concurrency: Fewer concurrent users
- Data freshness: Near real-time to batch updates</code></pre>
    </div>

    <details>
      <summary><strong>Example: Snowflake's Cloud Data Warehouse</strong></summary>
      <div class="info-note">
        Snowflake processes 1+ billion queries monthly for 6,000+ customers, handling petabytes of data across multiple cloud providers. Their OLAP architecture separates compute and storage, enabling elastic scaling for analytical workloads. Snowflake's columnar storage and automatic clustering optimize query performance for complex analytics, supporting queries across billions of rows in seconds. The platform handles diverse workloads from real-time dashboards to machine learning pipelines, demonstrating how modern OLAP systems support data-driven decision making at enterprise scale.
      </div>
    </details>

    <h4>3. HTAP (Hybrid Transactional/Analytical Processing)</h4>
    <p><strong>Characteristics:</strong> Combines OLTP and OLAP capabilities in a single system for real-time analytics.</p>

    <h3>Specialized Database Types</h3>
    <p>Purpose-built databases optimized for specific data types and access patterns.</p>

    <h4>1. Time-Series Databases</h4>
    <p><strong>Architecture:</strong> Optimized for time-stamped data with high write throughput and time-based queries.</p>

    <div class="code-block">
      <pre><code>Time-Series Data Structure:

Metrics Collection:
┌─────────────────┬─────────────┬────────────┬─────────────┐
│   Timestamp     │   Metric    │   Value    │    Tags     │
├─────────────────┼─────────────┼────────────┼─────────────┤
│ 2023-01-01T10:00│ cpu_usage   │    75.2    │ host=web01  │
│ 2023-01-01T10:00│ memory_usage│    68.5    │ host=web01  │
│ 2023-01-01T10:01│ cpu_usage   │    78.1    │ host=web01  │
│ 2023-01-01T10:01│ memory_usage│    69.2    │ host=web01  │
└─────────────────┴─────────────┴────────────┴─────────────┘

InfluxDB Query Examples:
-- Average CPU usage over time
SELECT MEAN(value) FROM cpu_usage 
WHERE time >= '2023-01-01T00:00:00Z' 
AND time <= '2023-01-01T23:59:59Z'
GROUP BY time(1h)

-- Detect anomalies
SELECT * FROM cpu_usage 
WHERE value > 90 
AND time >= now() - 1h</code></pre>
    </div>

    <details>
      <summary><strong>Example: Tesla's Time-Series Database for Vehicle Telemetry</strong></summary>
      <div class="info-note">
        Tesla collects 25+ GB of data per hour from each vehicle, processing billions of data points daily from their fleet of 4+ million vehicles. Their time-series database handles sensor data including GPS coordinates, battery metrics, autopilot telemetry, and performance statistics. This massive dataset enables real-time fleet monitoring, predictive maintenance, autonomous driving improvements, and over-the-air software updates. Tesla's time-series implementation processes 1+ trillion data points monthly, supports real-time anomaly detection for vehicle safety, and powers machine learning models for autonomous driving development.
      </div>
    </details>

    <h4>2. Search Databases</h4>
    <p><strong>Architecture:</strong> Optimized for full-text search with inverted indexes and relevance scoring.</p>

    <h4>3. Spatial Databases</h4>
    <p><strong>Architecture:</strong> Specialized for geographic data with spatial indexing and location-based queries.</p>

    <h3>Database Selection Framework</h3>
    <p>A systematic approach to choosing the right database for your specific requirements.</p>

    <h4>Decision Matrix</h4>
    <table>
      <thead>
        <tr>
          <th>Requirement</th>
          <th>RDBMS</th>
          <th>Document</th>
          <th>Key-Value</th>
          <th>Column-Family</th>
          <th>Graph</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ACID Transactions</td>
          <td>Excellent</td>
          <td>Limited</td>
          <td>Limited</td>
          <td>Limited</td>
          <td>Good</td>
        </tr>
        <tr>
          <td>Horizontal Scaling</td>
          <td>Limited</td>
          <td>Excellent</td>
          <td>Excellent</td>
          <td>Excellent</td>
          <td>Good</td>
        </tr>
        <tr>
          <td>Complex Queries</td>
          <td>Excellent</td>
          <td>Good</td>
          <td>Poor</td>
          <td>Limited</td>
          <td>Excellent</td>
        </tr>
        <tr>
          <td>Schema Flexibility</td>
          <td>Poor</td>
          <td>Excellent</td>
          <td>Excellent</td>
          <td>Good</td>
          <td>Good</td>
        </tr>
        <tr>
          <td>Write Performance</td>
          <td>Good</td>
          <td>Excellent</td>
          <td>Excellent</td>
          <td>Excellent</td>
          <td>Good</td>
        </tr>
      </tbody>
    </table>

    <h4>Selection Guidelines</h4>
    <div class="code-block">
      <pre><code>Database Selection Decision Tree:

1. Data Structure Requirements:
   ├── Highly structured, related data → RDBMS
   ├── Semi-structured, nested data → Document DB
   ├── Simple key-value pairs → Key-Value Store
   ├── Time-series or sparse data → Column-Family
   └── Highly connected data → Graph DB

2. Scalability Requirements:
   ├── Vertical scaling acceptable → RDBMS
   ├── Horizontal scaling required → NoSQL
   ├── Global distribution needed → Multi-region NoSQL
   └── Massive write throughput → Column-Family

3. Consistency Requirements:
   ├── Strong consistency critical → RDBMS
   ├── Eventual consistency acceptable → NoSQL
   ├── Session consistency sufficient → Document DB
   └── Weak consistency tolerable → Key-Value Store

4. Query Complexity:
   ├── Complex joins and aggregations → RDBMS
   ├── Simple queries with flexibility → Document DB
   ├── Key-based lookups only → Key-Value Store
   ├── Time-range queries → Column-Family
   └── Relationship traversals → Graph DB

5. Performance Requirements:
   ├── Sub-millisecond latency → In-Memory DB
   ├── High read throughput → Read Replicas
   ├── High write throughput → Column-Family
   └── Balanced read/write → Document DB</code></pre>
    </div>

    <h3>Modern Database Trends</h3>
    <p>Emerging patterns and technologies shaping the future of database systems.</p>

    <h4>1. Multi-Model Databases</h4>
    <p><strong>Concept:</strong> Single database supporting multiple data models (document, graph, key-value, etc.).</p>

    <ul>
      <li><strong>ArangoDB:</strong> Document, Graph, and Key-Value in one system</li>
      <li><strong>Azure Cosmos DB:</strong> Multiple API compatibility (SQL, MongoDB, Cassandra, Gremlin)</li>
      <li><strong>OrientDB:</strong> Document, Graph, and Object database</li>
      <li><strong>Amazon Neptune:</strong> Graph database with RDF and Property Graph support</li>
    </ul>

    <h4>2. Serverless Databases</h4>
    <p><strong>Concept:</strong> Fully managed databases with automatic scaling and pay-per-use pricing.</p>

    <ul>
      <li><strong>Amazon Aurora Serverless:</strong> Auto-scaling relational database</li>
      <li><strong>Google Cloud Firestore:</strong> Serverless document database</li>
      <li><strong>PlanetScale:</strong> Serverless MySQL platform</li>
      <li><strong>Fauna:</strong> Serverless, globally distributed database</li>
    </ul>

    <h4>3. NewSQL Databases</h4>
    <p><strong>Concept:</strong> Modern databases combining RDBMS benefits with NoSQL scalability.</p>

    <details>
      <summary><strong>Example: CockroachDB's Global Distribution</strong></summary>
      <div class="info-note">
        CockroachDB powers global applications requiring both ACID transactions and horizontal scalability. Companies like Bose, Comcast, and Lush use CockroachDB to handle millions of transactions across multiple regions with automatic failover and strong consistency. The database provides SQL compatibility while scaling horizontally, handling geographically distributed workloads with local read/write performance. CockroachDB's architecture enables applications to survive entire data center failures while maintaining transactional guarantees, demonstrating how NewSQL databases bridge the gap between traditional RDBMS reliability and NoSQL scalability.
      </div>
    </details>

    <h3>Best Practices for Database Selection</h3>
    <p>Proven strategies for making informed database technology decisions.</p>

    <h4>1. Polyglot Persistence Strategy</h4>
    <div class="code-block">
      <pre><code>Example Multi-Database Architecture:

E-commerce Platform:
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                      │
├─────────────────────────────────────────────────────────┤
│  User Management    │  Product Catalog  │  Analytics    │
│  (PostgreSQL)       │  (MongoDB)        │  (ClickHouse) │
│  - User profiles    │  - Product data   │  - User events│
│  - Authentication   │  - Inventory      │  - Sales data │
│  - Billing          │  - Reviews        │  - Metrics    │
├─────────────────────┼───────────────────┼───────────────┤
│  Session Storage    │  Search Engine    │  Recommendations│
│  (Redis)            │  (Elasticsearch)  │  (Neo4j)      │
│  - User sessions    │  - Product search │  - User graph │
│  - Shopping carts   │  - Faceted search │  - Suggestions│
│  - Temporary data   │  - Autocomplete   │  - Relationships│
└─────────────────────┴───────────────────┴───────────────┘

Benefits:
✓ Optimal performance for each use case
✓ Technology specialization
✓ Independent scaling
✓ Reduced single points of failure

Challenges:
✗ Increased complexity
✗ Data consistency across systems
✗ Operational overhead
✗ Transaction boundaries</code></pre>
    </div>

    <h4>2. Migration Strategies</h4>
    <p><strong>Approach:</strong> Systematic methods for transitioning between database technologies.</p>

    <div class="code-block">
      <pre><code>Database Migration Process:

Phase 1: Assessment and Planning
├── Analyze current system performance
├── Identify migration drivers and goals
├── Evaluate target database options
├── Design migration architecture
└── Create rollback plan

Phase 2: Dual-Write Implementation
├── Set up target database
├── Implement dual-write logic
├── Sync historical data
├── Monitor data consistency
└── Validate data integrity

Phase 3: Read Migration
├── Gradually shift read traffic
├── Monitor performance metrics
├── Compare query results
├── Optimize target database
└── Handle any data discrepancies

Phase 4: Write Migration
├── Switch write traffic to target
├── Disable dual-write logic
├── Decommission source database
├── Update application code
└── Monitor system stability

Example Migration Code:
class DatabaseMigration {
  async writeData(data) {
    // Dual-write during migration
    await Promise.all([
      this.legacyDB.write(data),
      this.newDB.write(data)
    ]);
  }
  
  async readData(query) {
    // Gradually shift reads
    if (this.shouldUseNewDB(query)) {
      return await this.newDB.read(query);
    }
    return await this.legacyDB.read(query);
  }
}</code></pre>
    </div>

    <h3>Common Database Anti-Patterns</h3>
    <p>Frequent mistakes and how to avoid them when working with different database types.</p>

    <h4>1. Wrong Database Choice</h4>
    <div class="code-block">
      <pre><code>// Anti-pattern: Using RDBMS for everything
const badArchitecture = {
  userSessions: 'PostgreSQL',    // Should use Redis
  logData: 'MySQL',              // Should use time-series DB
  socialGraph: 'Oracle',         // Should use graph DB
  cache: 'SQL Server',           // Should use in-memory store
  searchIndex: 'SQLite'          // Should use search engine
};

// Better approach: Right tool for the job
const goodArchitecture = {
  userSessions: 'Redis',         // Fast, temporary data
  logData: 'InfluxDB',          // Time-series optimization
  socialGraph: 'Neo4j',         // Relationship queries
  cache: 'Memcached',           // Pure caching
  searchIndex: 'Elasticsearch'   // Full-text search
};</code></pre>
    </div>

    <h4>2. Over-Normalization in NoSQL</h4>
    <div class="code-block">
      <pre><code>// Anti-pattern: Treating NoSQL like RDBMS
const overNormalized = {
  users: { id: 1, name: 'John' },
  addresses: { userId: 1, street: '123 Main St' },
  orders: { userId: 1, productId: 1 },
  products: { id: 1, name: 'Widget' }
};

// Better: Denormalized for NoSQL
const denormalized = {
  users: {
    id: 1,
    name: 'John',
    address: { street: '123 Main St' },
    recentOrders: [
      { id: 1, product: 'Widget', date: '2023-01-01' }
    ]
  }
};</code></pre>
    </div>

    <h4>3. Ignoring Consistency Models</h4>
    <div class="code-block">
      <pre><code>// Anti-pattern: Expecting strong consistency in eventually consistent systems
async function badTransfer(fromAccount, toAccount, amount) {
  // This doesn't work in eventually consistent systems
  await debitAccount(fromAccount, amount);
  await creditAccount(toAccount, amount);
  // Accounts might be inconsistent temporarily
}

// Better: Design for eventual consistency
async function goodTransfer(fromAccount, toAccount, amount) {
  const transactionId = generateId();
  
  // Create transaction record first
  await createTransaction({
    id: transactionId,
    from: fromAccount,
    to: toAccount,
    amount,
    status: 'pending'
  });
  
  // Process asynchronously with idempotency
  await processTransactionAsync(transactionId);
}</code></pre>
    </div>

    <h3>Performance Optimization Strategies</h3>
    <p>Database-specific optimization techniques for different database types.</p>

    <h4>RDBMS Optimization</h4>
    <ul>
      <li><strong>Indexing:</strong> Create appropriate indexes for query patterns</li>
      <li><strong>Query Optimization:</strong> Use EXPLAIN plans and optimize SQL</li>
      <li><strong>Partitioning:</strong> Horizontal or vertical table partitioning</li>
      <li><strong>Connection Pooling:</strong> Manage database connections efficiently</li>
      <li><strong>Read Replicas:</strong> Scale read operations across multiple servers</li>
    </ul>

    <h4>NoSQL Optimization</h4>
    <ul>
      <li><strong>Data Modeling:</strong> Design for query patterns, not normalization</li>
      <li><strong>Sharding Strategy:</strong> Distribute data effectively across nodes</li>
      <li><strong>Consistency Tuning:</strong> Balance consistency and performance</li>
      <li><strong>Caching:</strong> Implement application-level caching</li>
      <li><strong>Batch Operations:</strong> Group operations for efficiency</li>
    </ul>

    <h3>Conclusion</h3>
    <p>Database selection is a critical architectural decision that significantly impacts application performance, scalability, and maintainability. The key is understanding that no single database type is optimal for all use cases.</p>

    <p><strong>Key Principles:</strong></p>
    <ul>
      <li><strong>Match Database to Use Case:</strong> Choose based on data patterns and access requirements</li>
      <li><strong>Consider Trade-offs:</strong> Evaluate consistency, availability, and performance needs</li>
      <li><strong>Plan for Scale:</strong> Anticipate growth and scaling requirements</li>
      <li><strong>Embrace Polyglot Persistence:</strong> Use multiple databases for different purposes</li>
      <li><strong>Monitor and Optimize:</strong> Continuously tune performance and capacity</li>
      <li><strong>Plan Migrations:</strong> Design for eventual technology evolution</li>
    </ul>

    <p>The database landscape continues evolving with new technologies like serverless databases, multi-model systems, and edge computing. Staying informed about these trends while focusing on fundamental principles will help you make sound database decisions for your applications.</p>

    <h3>References</h3>
    <ul>
      <li><a href="https://aws.amazon.com/nosql/" target="_blank">AWS NoSQL Database Guide</a></li>
      <li><a href="https://cloud.google.com/products/databases" target="_blank">Google Cloud Database Services</a></li>
      <li><a href="https://docs.mongodb.com/manual/" target="_blank">MongoDB Documentation</a></li>
      <li><a href="https://redis.io/documentation" target="_blank">Redis Documentation</a></li>
      <li><a href="https://cassandra.apache.org/doc/" target="_blank">Apache Cassandra Documentation</a></li>
      <li><a href="https://neo4j.com/docs/" target="_blank">Neo4j Graph Database Documentation</a></li>
    </ul>
  `
}; 