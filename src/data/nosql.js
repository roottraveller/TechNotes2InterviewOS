export const nosql = {
  id: 'nosql',
  title: 'NoSQL Databases',
  content: `
## Definition
NoSQL (Not Only SQL) databases are non-relational databases designed for distributed data storage and horizontal scaling. Handle 80% of big data workloads and power 60% of modern web applications.

## NoSQL Types & Use Cases
| Type | Examples | Data Model | Best For | Market Leaders |
|------|----------|------------|----------|----------------|
| **Document** | MongoDB, CouchDB | JSON-like documents | Content management, catalogs | MongoDB (60% market share) |
| **Key-Value** | Redis, DynamoDB | Key → Value pairs | Caching, session storage | Redis (70% of caching) |
| **Column-Family** | Cassandra, HBase | Column families | Time-series, IoT data | Cassandra (Netflix, Uber) |
| **Graph** | Neo4j, Amazon Neptune | Nodes + relationships | Social networks, recommendations | Neo4j (50% graph DB market) |

## Database Comparison Examples

### 1. Document Database (MongoDB)
\`\`\`javascript
// Flexible schema - no predefined structure
{
    "_id": ObjectId("507f1f77bcf86cd799439011"),
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipcode": "10001"
    },
    "orders": [
        { "product": "laptop", "price": 999.99, "date": "2023-01-15" },
        { "product": "mouse", "price": 29.99, "date": "2023-01-20" }
    ]
}

// Query examples
db.users.find({"address.city": "New York"})
db.users.find({"orders.price": {$gt: 500}})
\`\`\`

### 2. Key-Value Store (Redis)
\`\`\`bash
# Simple key-value operations
SET user:1001 "{"name":"John","email":"john@example.com"}"
GET user:1001
EXPIRE user:1001 3600  # TTL in seconds

# Data structures
HSET user:1001 name "John" email "john@example.com"
LPUSH notifications:1001 "New message"
SADD user:1001:tags "premium" "verified"

# Use cases: Session storage, caching, real-time analytics
\`\`\`

### 3. Column-Family (Cassandra)
\`\`\`sql
-- Wide column storage
CREATE TABLE user_events (
    user_id UUID,
    event_time TIMESTAMP,
    event_type TEXT,
    event_data MAP<TEXT, TEXT>,
    PRIMARY KEY (user_id, event_time)
) WITH CLUSTERING ORDER BY (event_time DESC);

-- Optimized for time-series queries
SELECT * FROM user_events 
WHERE user_id = ? AND event_time > ?;
\`\`\`

### 4. Graph Database (Neo4j)
\`\`\`cypher
// Create nodes and relationships
CREATE (john:Person {name: "John", age: 30})
CREATE (jane:Person {name: "Jane", age: 28})
CREATE (company:Company {name: "TechCorp"})
CREATE (john)-[:WORKS_FOR]->(company)
CREATE (john)-[:FRIEND]->(jane)

// Graph traversal queries
MATCH (p:Person)-[:FRIEND]->(friend)-[:WORKS_FOR]->(company)
WHERE p.name = "John"
RETURN friend.name, company.name
\`\`\`

## CAP Theorem in Practice
\`\`\`bash
# Consistency + Availability (CA) - Traditional RDBMS
MySQL, PostgreSQL
- Strong consistency
- High availability (single node)
- No partition tolerance

# Consistency + Partition Tolerance (CP)
MongoDB, HBase, Redis
- Strong consistency
- Partition tolerance
- May sacrifice availability during network splits

# Availability + Partition Tolerance (AP)
Cassandra, DynamoDB, CouchDB
- High availability
- Partition tolerance  
- Eventual consistency
\`\`\`

## Consistency Models
\`\`\`bash
# Strong Consistency
Read reflects all previous writes immediately
Example: MongoDB with majority read concern

# Eventual Consistency  
System becomes consistent over time
Example: DynamoDB default, Cassandra

# Weak Consistency
No guarantees when all nodes will be consistent
Example: DNS, web caches

# Causal Consistency
Related operations appear in same order
Example: Social media posts and comments
\`\`\`

## Real-World Use Cases

### Netflix - Cassandra for Viewing History
- **Scale**: 2.5 petabytes across 1,000+ nodes
- **Writes**: 1.3 million writes/second
- **Use Case**: User viewing history, recommendations
\`\`\`sql
-- Time-series data model
CREATE TABLE viewing_history (
    user_id UUID,
    view_time TIMESTAMP,
    content_id UUID,
    watch_duration INT,
    device_type TEXT,
    PRIMARY KEY (user_id, view_time)
);
\`\`\`

### Facebook - Graph Database for Social Network
- **Scale**: 2.8 billion users, 400+ billion relationships
- **Use Case**: Friend suggestions, news feed ranking
\`\`\`cypher
// Find mutual friends
MATCH (user1:User)-[:FRIEND]-(mutual)-[:FRIEND]-(user2:User)
WHERE user1.id = $user1_id AND user2.id = $user2_id
RETURN mutual.name
\`\`\`

### Airbnb - MongoDB for Property Listings
- **Scale**: 7+ million listings worldwide
- **Use Case**: Flexible property data, search functionality
\`\`\`javascript
// Flexible schema for different property types
{
    "_id": ObjectId("..."),
    "title": "Cozy Downtown Apartment",
    "type": "apartment",
    "location": {
        "coordinates": [-73.935242, 40.730610],
        "address": "123 Broadway, New York, NY"
    },
    "amenities": ["wifi", "kitchen", "heating"],
    "pricing": {
        "base_price": 120,
        "cleaning_fee": 25,
        "currency": "USD"
    },
    "availability": {
        "2023-12-01": true,
        "2023-12-02": false
    }
}
\`\`\`

## Performance Comparison
\`\`\`bash
# Read Performance (ops/second)
Redis (in-memory):     100,000 - 1,000,000
MongoDB (SSD):         10,000 - 50,000
Cassandra (cluster):   50,000 - 200,000
MySQL (optimized):     5,000 - 20,000

# Write Performance (ops/second)
Cassandra (cluster):   100,000 - 500,000
MongoDB (replica):     10,000 - 100,000
Redis (persistent):    50,000 - 200,000
PostgreSQL:            5,000 - 50,000

# Storage Efficiency
Column-family: 50-80% compression
Document: 20-40% compression  
Key-value: Minimal overhead
Graph: Higher overhead for relationships
\`\`\`

## Scaling Patterns

### Horizontal Scaling (Sharding)
\`\`\`javascript
// MongoDB sharding
sh.shardCollection("ecommerce.products", {"category": 1})

// Data distribution
Shard 1: category = "electronics"
Shard 2: category = "clothing"  
Shard 3: category = "books"

// Cassandra partitioning
CREATE TABLE products (
    category TEXT,
    product_id UUID,
    name TEXT,
    price DECIMAL,
    PRIMARY KEY (category, product_id)
);
// Automatically distributes by category hash
\`\`\`

### Replication Strategies
\`\`\`bash
# MongoDB Replica Set
Primary: Handles all writes
Secondary 1: Read replica (optional)
Secondary 2: Read replica (optional)
Arbiter: Voting only (no data)

# Cassandra Multi-DC Replication
DC1: Replication Factor = 3
DC2: Replication Factor = 3
Consistency Level: LOCAL_QUORUM (2/3 nodes per DC)
\`\`\`

## Data Modeling Best Practices

### Document Database (MongoDB)
\`\`\`javascript
// Embed vs Reference decision
// Embed: 1-to-few relationships, data read together
{
    "user_id": 123,
    "profile": {
        "name": "John",
        "bio": "Software Engineer",
        "avatar_url": "..."
    },
    "settings": {
        "theme": "dark",
        "notifications": true
    }
}

// Reference: 1-to-many, large subdocuments
{
    "user_id": 123,
    "name": "John",
    "order_ids": [456, 789, 101112]  // Reference to orders collection
}
\`\`\`

### Column-Family (Cassandra)
\`\`\`sql
-- Design around query patterns
-- Query: Get user's recent orders
CREATE TABLE user_orders (
    user_id UUID,
    order_date TIMESTAMP,
    order_id UUID,
    total DECIMAL,
    status TEXT,
    PRIMARY KEY (user_id, order_date)
) WITH CLUSTERING ORDER BY (order_date DESC);

-- Query: Get order details
CREATE TABLE order_details (
    order_id UUID PRIMARY KEY,
    user_id UUID,
    items LIST<FROZEN<order_item>>,
    shipping_address TEXT,
    created_at TIMESTAMP
);
\`\`\`

## Migration Strategies
\`\`\`bash
# SQL to NoSQL Migration Approaches

# 1. Strangler Fig Pattern
- Gradually migrate features
- Run both systems in parallel
- Route traffic incrementally

# 2. Database-per-Service
- Microservices with dedicated NoSQL
- Event-driven synchronization
- Eventual consistency between services

# 3. CQRS (Command Query Responsibility Segregation)
- SQL for writes (consistency)
- NoSQL for reads (performance)
- Event sourcing for synchronization
\`\`\`

## Interview Questions & Answers

**Q: When would you choose NoSQL over SQL?**
A: Choose NoSQL for:
- **Horizontal scaling**: Need to scale across multiple servers
- **Flexible schema**: Rapidly changing data structures
- **High write throughput**: >10,000 writes/second
- **Unstructured data**: JSON, documents, time-series
- **Specific patterns**: Real-time analytics, caching, graph traversal

**Q: Explain the CAP theorem with examples.**
A: Can only guarantee 2 of 3:
- **CP (MongoDB)**: Strong consistency + partition tolerance, may sacrifice availability
- **AP (Cassandra)**: High availability + partition tolerance, eventual consistency
- **CA (Traditional SQL)**: Consistency + availability, no partition tolerance

**Q: What is eventual consistency and when is it acceptable?**
A: System becomes consistent over time, not immediately. Acceptable for:
- **Social media**: Likes/comments can be slightly delayed
- **Shopping carts**: Item counts can be approximate
- **Analytics**: Metrics don't need real-time accuracy
- **Not acceptable**: Financial transactions, inventory management

**Q: How do you handle ACID properties in NoSQL?**
A:
- **MongoDB**: ACID transactions within single document or replica set
- **Cassandra**: Atomic operations per partition, lightweight transactions
- **DynamoDB**: ACID transactions with TransactWrite/TransactRead
- **Redis**: Transactions with MULTI/EXEC commands
- **Alternative**: Application-level consistency, saga pattern

**Q: Compare document vs relational data modeling.**
A:
- **Document**: Denormalized, embed related data, optimize for read patterns
- **Relational**: Normalized, separate tables, optimize for storage efficiency
- **Document pros**: Fewer queries, flexible schema, matches object models
- **Relational pros**: Data consistency, complex queries, mature tooling

**Q: How do you ensure data consistency across microservices using NoSQL?**
A:
- **Event sourcing**: Immutable event log, rebuild state from events
- **Saga pattern**: Compensating transactions for distributed workflows
- **CQRS**: Separate read/write models with event synchronization
- **Two-phase commit**: Strong consistency but impacts performance
- **Eventual consistency**: Accept temporary inconsistency for better performance
`
}; 