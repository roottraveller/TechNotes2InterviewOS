export const normalization = {
  id: 'normalization',
  title: 'Database Normalization',
  content: `# Database Normalization

## Definition
Database normalization is the process of organizing data to reduce redundancy and improve data integrity.

## Normal Forms
- **1NF (First Normal Form)**: Atomic values, no repeating groups
- **2NF (Second Normal Form)**: 1NF + no partial dependencies
- **3NF (Third Normal Form)**: 2NF + no transitive dependencies
- **BCNF (Boyce-Codd Normal Form)**: Stricter version of 3NF

## Benefits
- Reduces data redundancy
- Improves data integrity
- Easier maintenance
- Consistent data updates

## Drawbacks
- More complex queries
- Potential performance impact
- Increased JOIN operations
- More tables to manage

## Denormalization
Sometimes intentionally breaking normal forms for:
- Performance optimization
- Simplified queries
- Reduced JOIN complexity
- Analytical workloads

## Interview Questions
**Q: What is the difference between 2NF and 3NF?**
A: 2NF eliminates partial dependencies on composite keys, while 3NF eliminates transitive dependencies between non-key attributes.

**Q: When would you consider denormalization?**
A: For read-heavy workloads, data warehousing, or when query performance is more critical than storage efficiency.`
}; 