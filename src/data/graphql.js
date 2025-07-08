export const graphql = {
  id: 'graphql',
  title: 'GraphQL',
  content: `
## Definition
GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need. Used by Facebook, GitHub, Shopify, and 60% of Fortune 500 companies.

## GraphQL vs REST Comparison
| Aspect | GraphQL | REST | Winner |
|--------|---------|------|--------|
| **Data Fetching** | Exact fields requested | Fixed response structure | GraphQL |
| **Endpoints** | Single /graphql | Multiple (/users, /posts) | GraphQL |
| **Over/Under-fetching** | ❌ Never | ✅ Common problem | GraphQL |
| **Caching** | Complex (query-based) | Simple (URL-based) | REST |
| **File Uploads** | Complex | Native support | REST |
| **Learning Curve** | Steep | Gentle | REST |
| **Network Requests** | 1 request, multiple resources | Multiple requests | GraphQL |

## Core Schema Definition
\`\`\`graphql
# Schema Definition Language (SDL)
type User {
  id: ID!                    # Non-null ID
  name: String!              # Non-null String
  email: String!
  age: Int                   # Nullable Int
  posts: [Post!]!           # Non-null array of non-null Posts
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!              # Relationship
  comments: [Comment!]!
  publishedAt: DateTime
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}

# Root Types
type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
  posts(authorId: ID): [Post!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
  createPost(input: CreatePostInput!): Post!
}

type Subscription {
  postAdded: Post!
  commentAdded(postId: ID!): Comment!
  userOnline: User!
}

# Input Types
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}
\`\`\`

## Query Examples

### Basic Query
\`\`\`graphql
# Request specific fields only
query GetUser {
  user(id: "123") {
    id
    name
    email
    posts {
      id
      title
      publishedAt
    }
  }
}

# Response
{
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "posts": [
        {
          "id": "456",
          "title": "GraphQL Tutorial",
          "publishedAt": "2023-01-15T10:00:00Z"
        }
      ]
    }
  }
}
\`\`\`

### Query with Variables
\`\`\`graphql
# Query with variables
query GetUserPosts($userId: ID!, $limit: Int = 10) {
  user(id: $userId) {
    name
    posts(limit: $limit) {
      title
      content
      comments {
        text
        author {
          name
        }
      }
    }
  }
}

# Variables
{
  "userId": "123",
  "limit": 5
}
\`\`\`

### Mutation Examples
\`\`\`graphql
# Create user mutation
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    createdAt
  }
}

# Variables
{
  "input": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 28
  }
}

# Update mutation
mutation UpdatePost($id: ID!, $title: String!) {
  updatePost(id: $id, input: { title: $title }) {
    id
    title
    updatedAt
  }
}
\`\`\`

### Subscription Example
\`\`\`graphql
# Real-time subscription
subscription OnCommentAdded($postId: ID!) {
  commentAdded(postId: $postId) {
    id
    text
    author {
      name
    }
    createdAt
  }
}
\`\`\`

## Resolver Implementation

### Node.js with Apollo Server
\`\`\`javascript
const { ApolloServer, gql } = require('apollo-server');

// Resolvers
const resolvers = {
  Query: {
    user: async (parent, { id }, context) => {
      return await context.dataSources.userAPI.getUser(id);
    },
    users: async (parent, { limit, offset }, context) => {
      return await context.dataSources.userAPI.getUsers(limit, offset);
    }
  },
  
  Mutation: {
    createUser: async (parent, { input }, context) => {
      const user = await context.dataSources.userAPI.createUser(input);
      // Publish to subscription
      context.pubsub.publish('USER_CREATED', { userCreated: user });
      return user;
    }
  },
  
  Subscription: {
    userCreated: {
      subscribe: (parent, args, context) => {
        return context.pubsub.asyncIterator(['USER_CREATED']);
      }
    }
  },
  
  // Field resolvers
  User: {
    posts: async (user, args, context) => {
      // Solve N+1 problem with DataLoader
      return await context.dataSources.postAPI.getPostsByUserId(user.id);
    }
  },
  
  Post: {
    author: async (post, args, context) => {
      return await context.loaders.userLoader.load(post.authorId);
    },
    comments: async (post, args, context) => {
      return await context.dataSources.commentAPI.getCommentsByPostId(post.id);
    }
  }
};

// Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: getUser(req.headers.authorization),
    dataSources: {
      userAPI: new UserAPI(),
      postAPI: new PostAPI(),
      commentAPI: new CommentAPI()
    },
    loaders: {
      userLoader: new DataLoader(userIds => batchGetUsers(userIds))
    }
  })
});
\`\`\`

## N+1 Problem Solution (DataLoader)
\`\`\`javascript
const DataLoader = require('dataloader');

// Without DataLoader (N+1 Problem)
// 1 query for posts + N queries for each post's author
const posts = await getPosts();
for (const post of posts) {
  post.author = await getUser(post.authorId); // N queries!
}

// With DataLoader (Batching)
const userLoader = new DataLoader(async (userIds) => {
  // Single query for all users
  const users = await getUsersByIds(userIds);
  return userIds.map(id => users.find(user => user.id === id));
});

// Usage in resolver
Post: {
  author: async (post, args, context) => {
    return await context.loaders.userLoader.load(post.authorId);
  }
}

// DataLoader automatically batches requests:
// userLoader.load('1'), userLoader.load('2'), userLoader.load('3')
// Becomes: getUsersByIds(['1', '2', '3'])
\`\`\`

## Advanced Features

### Fragments
\`\`\`graphql
# Define reusable fragments
fragment UserInfo on User {
  id
  name
  email
  createdAt
}

fragment PostInfo on Post {
  id
  title
  publishedAt
  author {
    ...UserInfo
  }
}

# Use fragments in queries
query GetUserWithPosts($id: ID!) {
  user(id: $id) {
    ...UserInfo
    posts {
      ...PostInfo
    }
  }
}
\`\`\`

### Directives
\`\`\`graphql
# Conditional fields
query GetUser($includeEmail: Boolean!) {
  user(id: "123") {
    name
    email @include(if: $includeEmail)
    posts @skip(if: false) {
      title
    }
  }
}

# Custom directives
directive @auth(role: String!) on FIELD_DEFINITION

type Query {
  adminUsers: [User!]! @auth(role: "ADMIN")
  secretData: String! @auth(role: "SUPER_ADMIN")
}
\`\`\`

### Interfaces and Unions
\`\`\`graphql
# Interface
interface Node {
  id: ID!
  createdAt: DateTime!
}

type User implements Node {
  id: ID!
  createdAt: DateTime!
  name: String!
  email: String!
}

type Post implements Node {
  id: ID!
  createdAt: DateTime!
  title: String!
  content: String!
}

# Union
union SearchResult = User | Post | Comment

type Query {
  search(query: String!): [SearchResult!]!
}

# Query with inline fragments
query Search($query: String!) {
  search(query: $query) {
    ... on User {
      name
      email
    }
    ... on Post {
      title
      content
    }
    ... on Comment {
      text
    }
  }
}
\`\`\`

## Performance Optimization

### Query Complexity Analysis
\`\`\`javascript
const depthLimit = require('graphql-depth-limit');
const costAnalysis = require('graphql-cost-analysis');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimit(10),           // Limit query depth
    costAnalysis.costAnalysisValidationRule({
      maximumCost: 1000,      // Limit query cost
      scalarCost: 1,
      objectCost: 2,
      listFactor: 10
    })
  ]
});
\`\`\`

### Caching Strategies
\`\`\`javascript
// 1. Response Caching
const responseCachePlugin = require('apollo-server-plugin-response-cache');

const server = new ApolloServer({
  plugins: [
    responseCachePlugin({
      sessionId: (requestContext) => 
        requestContext.request.http.headers.get('session-id'),
      shouldReadFromCache: (requestContext) => 
        requestContext.request.http.method === 'GET'
    })
  ]
});

// 2. Field-level caching
const resolvers = {
  Query: {
    expensiveData: async (parent, args, context, info) => {
      info.cacheControl.setCacheHint({ maxAge: 60 }); // Cache 60 seconds
      return await getExpensiveData();
    }
  }
};
\`\`\`

## Real-World Examples

### GitHub GraphQL API
\`\`\`graphql
query {
  repository(owner: "facebook", name: "react") {
    name
    description
    stargazerCount
    issues(first: 5, states: OPEN) {
      nodes {
        title
        createdAt
        author {
          login
        }
      }
    }
  }
}
\`\`\`

### Shopify Storefront API
\`\`\`graphql
query getProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              availableForSale
            }
          }
        }
      }
    }
  }
}
\`\`\`

## Error Handling
\`\`\`javascript
// Custom error types
const { ApolloError } = require('apollo-server');

class UserNotFoundError extends ApolloError {
  constructor(userId) {
    super(\`User with ID \${userId} not found\`, 'USER_NOT_FOUND');
  }
}

// Resolver with error handling
const resolvers = {
  Query: {
    user: async (parent, { id }) => {
      const user = await getUserById(id);
      if (!user) {
        throw new UserNotFoundError(id);
      }
      return user;
    }
  }
};

// Error response
{
  "errors": [
    {
      "message": "User with ID 123 not found",
      "extensions": {
        "code": "USER_NOT_FOUND"
      },
      "path": ["user"]
    }
  ],
  "data": {
    "user": null
  }
}
\`\`\`

## Interview Questions & Answers

**Q: What are the main advantages of GraphQL over REST?**
A:
- **Precise data fetching**: Request exactly needed fields, no over/under-fetching
- **Single endpoint**: One URL for all operations vs multiple REST endpoints
- **Strong typing**: Schema-first development with type safety
- **Real-time**: Built-in subscriptions for live updates
- **Better tooling**: Introspection enables auto-generated documentation

**Q: What is the N+1 problem and how do you solve it?**
A: N+1 occurs when fetching a list requires additional queries for each item:
- **Problem**: 1 query for posts + N queries for each author
- **Solution**: DataLoader batches requests into single query
- **Alternative**: Include related data in initial query (JOIN)

**Q: How do you handle authentication in GraphQL?**
A:
- **Context**: Add user info to resolver context from JWT token
- **Directives**: Use @auth directive on schema fields
- **Resolver-level**: Check permissions in individual resolvers
- **Schema-level**: Different schemas for different user roles

**Q: What are GraphQL subscriptions and when would you use them?**
A: Real-time updates using WebSockets or Server-Sent Events:
- **Use cases**: Chat applications, live comments, real-time dashboards
- **Implementation**: PubSub system with event publishing/subscribing
- **Scaling**: Use Redis or other message brokers for multiple servers

**Q: How do you optimize GraphQL query performance?**
A:
- **DataLoader**: Batch and cache database requests
- **Query complexity analysis**: Limit query depth and cost
- **Caching**: Response caching and field-level cache hints
- **Persisted queries**: Pre-approved queries for security and performance

**Q: When would you choose REST over GraphQL?**
A: Choose REST for:
- **Simple CRUD operations**: Basic data operations
- **File uploads**: REST handles multipart better
- **Caching requirements**: URL-based caching is simpler
- **Team expertise**: REST has lower learning curve
- **HTTP semantics**: When HTTP methods and status codes are important
`
}; 