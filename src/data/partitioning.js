export const partitioning = {
  id: 'partitioning',
  title: 'Database Partitioning',
  content: `
## Definition
Database partitioning is the process of dividing a large database into smaller, more manageable pieces called partitions.

## Types of Partitioning
- **Horizontal (Sharding)**: Split rows across multiple tables/servers
- **Vertical**: Split columns into separate tables
- **Functional**: Partition by feature or service
- **Range**: Partition by value ranges
- **Hash**: Partition using hash function
- **List**: Partition by predefined lists

## Benefits
- Improved performance
- Better scalability
- Parallel processing
- Easier maintenance
- Reduced index size

## Challenges
- Complex queries across partitions
- Rebalancing data
- Cross-partition transactions
- Increased complexity
- Potential hotspots

## Sharding Strategies
- **Key-Based**: Hash the partition key
- **Range-Based**: Partition by value ranges
- **Directory-Based**: Lookup service for routing

## Interview Questions
**Q: What is the difference between partitioning and sharding?**
A: Partitioning can be within a single database instance, while sharding typically involves distributing data across multiple database servers.

**Q: How do you handle cross-shard queries?**
A: Through techniques like scatter-gather, denormalization, or maintaining lookup tables.
`
}; 