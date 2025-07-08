export const graphql = {
  id: 'graphql',
  title: 'GraphQL',
  content: `
## Definition
GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need.

## Key Features
- **Single Endpoint**: One URL for all operations
- **Flexible Queries**: Request specific fields
- **Strong Type System**: Schema-defined types
- **Real-time**: Subscriptions for live data
- **Introspection**: Self-documenting

## Core Concepts
- **Schema**: API structure definition
- **Types**: Object, Scalar, Enum, Interface, Union
- **Queries**: Read operations
- **Mutations**: Write operations
- **Subscriptions**: Real-time updates
- **Resolvers**: Functions that fetch data

## GraphQL vs REST
- **Data Fetching**: Precise vs over/under-fetching
- **Endpoints**: Single vs multiple
- **Caching**: Complex vs simple
- **Learning Curve**: Steep vs gentle

## Example Query
\`\`\`graphql
query {
  user(id: "123") {
    name
    email
    posts {
      title
      createdAt
    }
  }
}
\`\`\`

## Benefits
- Efficient data loading
- Strong typing
- Excellent tooling
- Backward compatibility

## Challenges
- Complexity
- Caching difficulties
- Query complexity analysis
- N+1 problem

## Interview Questions
**Q: What are the main advantages of GraphQL over REST?**
A: Precise data fetching, single endpoint, strong typing, and better client-server communication.
`
}; 