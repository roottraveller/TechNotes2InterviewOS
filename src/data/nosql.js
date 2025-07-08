export const nosql = {
  id: 'nosql',
  title: 'NoSQL Databases',
  content: `
## Definition
NoSQL (Not Only SQL) databases are non-relational databases designed for distributed data storage and horizontal scaling.

## Types of NoSQL Databases
- **Document**: MongoDB, CouchDB
- **Key-Value**: Redis, DynamoDB
- **Column-Family**: Cassandra, HBase
- **Graph**: Neo4j, Amazon Neptune

## Key Characteristics
- **Schema Flexibility**: Dynamic schemas
- **Horizontal Scaling**: Distributed across multiple servers
- **Eventual Consistency**: CAP theorem trade-offs
- **High Performance**: Optimized for specific use cases

## Advantages
- Scalability for large datasets
- Flexible data models
- High availability
- Cost-effective for distributed systems

## Disadvantages
- Limited ACID compliance
- Less mature tooling
- Eventual consistency challenges
- Learning curve for SQL developers

## Interview Questions
**Q: When would you choose NoSQL over SQL?**
A: For applications requiring horizontal scaling, flexible schemas, high write throughput, or handling unstructured data.

**Q: What is eventual consistency?**
A: A consistency model where the system will become consistent over time, but may not be immediately consistent after updates.
`
}; 