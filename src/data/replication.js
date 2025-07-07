export const replication = {
  id: 'replication',
  title: 'Database Replication',
  content: `# Database Replication

## Definition
Database replication is the process of copying and maintaining database objects across multiple database servers.

## Types of Replication
- **Master-Slave**: One write node, multiple read replicas
- **Master-Master**: Multiple write-capable nodes
- **Synchronous**: Real-time data consistency
- **Asynchronous**: Eventual consistency with lag

## Replication Strategies
- **Statement-Based**: Replicate SQL statements
- **Row-Based**: Replicate actual data changes
- **Mixed**: Combination of both approaches

## Benefits
- High availability
- Load distribution
- Disaster recovery
- Geographic distribution
- Read scalability

## Challenges
- Data consistency
- Replication lag
- Conflict resolution
- Network overhead
- Complexity management

## Interview Questions
**Q: What is the difference between synchronous and asynchronous replication?**
A: Synchronous replication ensures immediate consistency but higher latency, while asynchronous allows for better performance but potential data lag.

**Q: How do you handle conflicts in master-master replication?**
A: Through conflict resolution strategies like last-write-wins, application-level resolution, or vector clocks.`
}; 