export const graphql = {
  id: 'graphql',
  title: 'GraphQL',
  content: `
<h2>Definition</h2>
<p>GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need. Used by Facebook, GitHub, Shopify, and 60% of Fortune 500 companies.</p>

<h2>GraphQL vs REST Comparison</h2>
<table>
  <tr>
    <th>Aspect</th>
    <th>GraphQL</th>
    <th>REST</th>
    <th>Winner</th>
  </tr>
  <tr>
    <td><strong>Data Fetching</strong></td>
    <td>Exact fields requested</td>
    <td>Fixed response structure</td>
    <td>GraphQL</td>
  </tr>
  <tr>
    <td><strong>Endpoints</strong></td>
    <td>Single /graphql</td>
    <td>Multiple (/users, /posts)</td>
    <td>GraphQL</td>
  </tr>
  <tr>
    <td><strong>Over/Under-fetching</strong></td>
    <td>❌ Never</td>
    <td>✅ Common problem</td>
    <td>GraphQL</td>
  </tr>
  <tr>
    <td><strong>Caching</strong></td>
    <td>Complex (query-based)</td>
    <td>Simple (URL-based)</td>
    <td>REST</td>
  </tr>
  <tr>
    <td><strong>File Uploads</strong></td>
    <td>Complex</td>
    <td>Native support</td>
    <td>REST</td>
  </tr>
  <tr>
    <td><strong>Learning Curve</strong></td>
    <td>Steep</td>
    <td>Gentle</td>
    <td>REST</td>
  </tr>
  <tr>
    <td><strong>Network Requests</strong></td>
    <td>1 request, multiple resources</td>
    <td>Multiple requests</td>
    <td>GraphQL</td>
  </tr>
</table>

<h2>Core Schema Definition</h2>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code># Schema Definition Language (SDL)
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

# Root Types
type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

type Subscription {
  postAdded: Post!
  commentAdded(postId: ID!): Comment!
}

# Input Types
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}</code></pre>
</div>

<h2>Query Examples</h2>

<h3>Basic Query</h3>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code># Request specific fields only
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
}</code></pre>
</div>

<h3>Query with Variables</h3>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code>query GetUserPosts($userId: ID!, $limit: Int = 10) {
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
}</code></pre>
</div>

<h3>Mutation Examples</h3>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code>mutation CreateUser($input: CreateUserInput!) {
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
}</code></pre>
</div>

<h3>Subscription Example</h3>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code>subscription OnCommentAdded($postId: ID!) {
  commentAdded(postId: $postId) {
    id
    text
    author {
      name
    }
    createdAt
  }
}</code></pre>
</div>

<h2>Resolver Implementation</h2>

<h3>Node.js with Apollo Server</h3>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code>const { ApolloServer, gql } = require('apollo-server');

const resolvers = {
  Query: {
    user: async (parent, { id }, context) => {
      return await User.findByPk(id);
    },
    users: async (parent, { limit = 10, offset = 0 }) => {
      return await User.findAll({ limit, offset });
    }
  },
  
  Mutation: {
    createUser: async (parent, { input }, context) => {
      return await User.create(input);
    },
    updateUser: async (parent, { id, input }) => {
      const user = await User.findByPk(id);
      return await user.update(input);
    }
  },
  
  // Field resolvers
  User: {
    posts: async (user) => {
      return await user.getPosts();
    }
  },
  
  Post: {
    author: async (post) => {
      return await post.getUser();
    },
    comments: async (post) => {
      return await post.getComments();
    }
  }
};</code></pre>
</div>

<h2>Advanced Features</h2>

<h3>Fragments (Reusable Fields)</h3>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code>fragment UserInfo on User {
  id
  name
  email
}

query GetUsers {
  activeUsers: users(filter: {isActive: true}) {
    ...UserInfo
  }
  inactiveUsers: users(filter: {isActive: false}) {
    ...UserInfo
  }
}</code></pre>
</div>

<h3>DataLoader (N+1 Problem Solution)</h3>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code>const DataLoader = require('dataloader');

// Batch function
const batchUsers = async (userIds) => {
  const users = await User.findAll({
    where: { id: userIds }
  });
  
  return userIds.map(id => 
    users.find(user => user.id === id)
  );
};

// Create loader
const userLoader = new DataLoader(batchUsers);

// Use in resolver
Post: {
  author: async (post) => {
    return await userLoader.load(post.authorId);
  }
}</code></pre>
</div>

<h2>Error Handling</h2>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code>const { UserInputError, AuthenticationError } = require('apollo-server');

const resolvers = {
  Mutation: {
    createUser: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Must be logged in');
      }
      
      if (!input.email.includes('@')) {
        throw new UserInputError('Invalid email format', {
          invalidArgs: ['email']
        });
      }
      
      try {
        return await User.create(input);
      } catch (error) {
        throw new Error('Failed to create user');
      }
    }
  }
};</code></pre>
</div>

<h2>Real-World Examples</h2>

<h3>GitHub GraphQL API</h3>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code>query {
  repository(owner: "facebook", name: "react") {
    name
    description
    stargazerCount
    issues(first: 5, states: OPEN) {
      edges {
        node {
          title
          author {
            login
          }
        }
      }
    }
  }
}</code></pre>
</div>

<h3>Shopify Storefront API</h3>
<div class="code-block">
  <div class="code-label">CODE</div>
  <pre><code>query getProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}</code></pre>
</div>

<h2>Performance Optimization</h2>
<ul>
  <li><strong>DataLoader:</strong> Batch and cache database requests</li>
  <li><strong>Query Complexity:</strong> Limit expensive queries</li>
  <li><strong>Depth Limiting:</strong> Prevent deeply nested queries</li>
  <li><strong>Persisted Queries:</strong> Cache query strings</li>
  <li><strong>Field-level Caching:</strong> Cache individual fields</li>
</ul>

<h2>Interview Questions</h2>

<h3>Q: What are the main advantages of GraphQL over REST?</h3>
<p><strong>A:</strong> GraphQL eliminates over/under-fetching by allowing clients to request exactly the data they need, reduces network requests by fetching related data in a single query, provides strong typing and introspection, and offers real-time capabilities with subscriptions.</p>

<h3>Q: How does GraphQL solve the N+1 problem?</h3>
<p><strong>A:</strong> GraphQL uses DataLoader pattern to batch multiple database requests into a single query, caching results within a single request to avoid duplicate fetches.</p>

<h3>Q: What is the difference between Query, Mutation, and Subscription?</h3>
<p><strong>A:</strong> Query is for reading data (like GET), Mutation is for writing/modifying data (like POST/PUT/DELETE), and Subscription is for real-time updates using WebSockets or Server-Sent Events.</p>

<h3>Q: How do you handle authentication in GraphQL?</h3>
<p><strong>A:</strong> Authentication is typically handled at the transport layer (HTTP headers), with authorization logic in resolvers checking user permissions before returning data.</p>

<h3>Q: What are GraphQL fragments and why use them?</h3>
<p><strong>A:</strong> Fragments are reusable pieces of query logic that help avoid duplication and ensure consistency when requesting the same fields across multiple queries.</p>

<h3>Q: How do you optimize GraphQL performance?</h3>
<p><strong>A:</strong> Use DataLoader for batching, implement query complexity analysis, set depth limits, use persisted queries, implement proper caching strategies, and monitor resolver performance.</p>

<div class="info-note">
  <strong>💡 Interview Tip:</strong>
  <p>GraphQL is not a replacement for REST in all cases. It's excellent for client-driven applications with complex data requirements but may be overkill for simple CRUD operations or when you need HTTP caching.</p>
</div>
`
}; 