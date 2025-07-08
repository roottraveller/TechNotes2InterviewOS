export const indexing = {
  id: 'indexing',
  title: 'Database Indexing',
  content: `
## Definition
Database indexing is a data structure technique used to quickly locate and access data in a database table.

## Types of Indexes
- **Primary Index**: Based on primary key
- **Secondary Index**: On non-primary key columns
- **Clustered Index**: Data physically ordered
- **Non-Clustered Index**: Logical ordering with pointers
- **Composite Index**: Multiple columns
- **Unique Index**: Ensures uniqueness

## Index Structures
- **B-Tree**: Balanced tree structure
- **Hash Index**: Hash table for equality searches
- **Bitmap Index**: For low-cardinality data
- **Full-Text Index**: For text search

## Benefits
- Faster query performance
- Efficient sorting and grouping
- Quick data retrieval
- Improved JOIN operations

## Drawbacks
- Additional storage overhead
- Slower INSERT/UPDATE/DELETE operations
- Maintenance overhead
- Memory usage

## Interview Questions
**Q: When should you create an index?**
A: On frequently queried columns, foreign keys, and columns used in WHERE, ORDER BY, and JOIN clauses.

**Q: What is the difference between clustered and non-clustered indexes?**
A: Clustered indexes physically reorder table data, while non-clustered indexes create separate structures with pointers to data rows.
`
}; 