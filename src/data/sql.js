export const sql = {
  id: 'sql',
  title: 'SQL (Structured Query Language)',
  content: `
## Definition
SQL is a standardized language for managing and manipulating relational databases.

## Core SQL Commands
- **DDL (Data Definition Language)**: CREATE, ALTER, DROP
- **DML (Data Manipulation Language)**: INSERT, UPDATE, DELETE
- **DQL (Data Query Language)**: SELECT
- **DCL (Data Control Language)**: GRANT, REVOKE

## Basic Syntax
\`\`\`sql
SELECT column1, column2 
FROM table_name 
WHERE condition
ORDER BY column1;
\`\`\`

## Key Concepts
- **Tables**: Structured data storage
- **Relationships**: Foreign keys, joins
- **Indexes**: Performance optimization
- **Constraints**: Data integrity rules

## Common Operations
- **Joins**: INNER, LEFT, RIGHT, FULL OUTER
- **Aggregations**: COUNT, SUM, AVG, MIN, MAX
- **Subqueries**: Nested SELECT statements
- **Transactions**: BEGIN, COMMIT, ROLLBACK

## Interview Questions
**Q: What is the difference between INNER JOIN and LEFT JOIN?**
A: INNER JOIN returns only matching records from both tables, while LEFT JOIN returns all records from the left table and matching records from the right table.

**Q: What is a SQL injection attack?**
A: A security vulnerability where malicious SQL code is inserted into application queries to manipulate the database.
`
}; 