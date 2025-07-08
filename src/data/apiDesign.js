export const apiDesign = {
  id: 'api-design',
  title: 'API Design Principles',
  content: `
<p>API (Application Programming Interface) design is crucial for building maintainable, scalable, and user-friendly systems that enable effective communication between different software components.</p>

    <h3>REST API Design Principles</h3>
    
    <h4>1. Resource-Based URLs</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Good - Resource-based URLs
GET    /users              // Get all users
GET    /users/123          // Get user with ID 123
POST   /users              // Create a new user
PUT    /users/123          // Update user 123
DELETE /users/123          // Delete user 123

// Bad - Action-based URLs
GET    /getUsers
GET    /getUserById?id=123
POST   /createUser
POST   /updateUser
POST   /deleteUser</code></pre>
    </div>

    <h4>2. HTTP Methods (Verbs)</h4>
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Purpose</th>
          <th>Idempotent</th>
          <th>Safe</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>GET</strong></td>
          <td>Retrieve data</td>
          <td>Yes</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td><strong>POST</strong></td>
          <td>Create new resource</td>
          <td>No</td>
          <td>No</td>
        </tr>
        <tr>
          <td><strong>PUT</strong></td>
          <td>Update/replace resource</td>
          <td>Yes</td>
          <td>No</td>
        </tr>
        <tr>
          <td><strong>PATCH</strong></td>
          <td>Partial update</td>
          <td>No</td>
          <td>No</td>
        </tr>
        <tr>
          <td><strong>DELETE</strong></td>
          <td>Remove resource</td>
          <td>Yes</td>
          <td>No</td>
        </tr>
      </tbody>
    </table>

    <h4>3. HTTP Status Codes</h4>
    <ul>
      <li><strong>2xx Success:</strong> 200 OK, 201 Created, 204 No Content</li>
      <li><strong>3xx Redirection:</strong> 301 Moved Permanently, 304 Not Modified</li>
      <li><strong>4xx Client Error:</strong> 400 Bad Request, 401 Unauthorized, 404 Not Found</li>
      <li><strong>5xx Server Error:</strong> 500 Internal Server Error, 503 Service Unavailable</li>
    </ul>

    <h3>API Versioning Strategies</h3>

    <h4>URL Path Versioning</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// URL path versioning
https://api.example.com/v1/users
https://api.example.com/v2/users

// Subdomain versioning
https://v1.api.example.com/users
https://v2.api.example.com/users</code></pre>
    </div>

    <h4>Header Versioning</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Custom header
Accept-Version: v1
API-Version: 2.0

// Accept header
Accept: application/vnd.example.v1+json
Accept: application/vnd.example.v2+json</code></pre>
    </div>

    <h4>Query Parameter Versioning</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Query parameter
https://api.example.com/users?version=1
https://api.example.com/users?v=2</code></pre>
    </div>

    <h3>Request and Response Design</h3>

    <h4>Request Body Structure</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Good - Clear, nested structure
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "profile": {
      "age": 30,
      "location": "New York"
    }
  }
}

// Bad - Flat structure with unclear naming
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "userAge": 30,
  "userLocation": "New York"
}</code></pre>
    </div>

    <h4>Response Envelope Pattern</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Consistent response envelope
{
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.0"
  },
  "links": {
    "self": "/users/123",
    "edit": "/users/123/edit"
  }
}</code></pre>
    </div>

    <h3>Pagination Patterns</h3>

    <h4>Offset-Based Pagination</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Request
GET /users?offset=20&limit=10

// Response
{
  "data": [...],
  "pagination": {
    "offset": 20,
    "limit": 10,
    "total": 150,
    "has_more": true
  }
}</code></pre>
    </div>

    <h4>Cursor-Based Pagination</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Request
GET /users?cursor=eyJpZCI6MTIzfQ&limit=10

// Response
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTMzfQ",
    "has_more": true
  }
}</code></pre>
    </div>

    <h3>Error Handling</h3>

    <h4>Standardized Error Format</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Consistent error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "age",
        "message": "Age must be between 18 and 100"
      }
    ],
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req-123-456-789"
  }
}</code></pre>
    </div>

    <h3>Security Best Practices</h3>

    <h4>Authentication & Authorization</h4>
    <ul>
      <li><strong>API Keys:</strong> Simple but limited security</li>
      <li><strong>JWT Tokens:</strong> Stateless, self-contained</li>
      <li><strong>OAuth 2.0:</strong> Industry standard for authorization</li>
      <li><strong>API Gateway:</strong> Centralized security enforcement</li>
    </ul>

    <h4>Input Validation</h4>
    <ul>
      <li>Validate all input parameters</li>
      <li>Use schema validation (JSON Schema, OpenAPI)</li>
      <li>Sanitize input to prevent injection attacks</li>
      <li>Implement rate limiting and throttling</li>
    </ul>

    <h3>GraphQL API Design</h3>

    <h4>Schema Definition</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// GraphQL schema
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}</code></pre>
    </div>

    <h4>Query Examples</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Flexible data fetching
query GetUserWithPosts {
  user(id: "123") {
    name
    email
    posts {
      title
      content
    }
  }
}

// Avoid over-fetching
query GetUserNames {
  users {
    name
  }
}</code></pre>
    </div>

    <h3>API Documentation</h3>

    <h4>OpenAPI Specification</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get all users
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            default: 10
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'</code></pre>
    </div>

    <h3>Performance Optimization</h3>

    <h4>Caching Strategies</h4>
    <ul>
      <li><strong>ETags:</strong> Conditional requests based on content hash</li>
      <li><strong>Cache-Control:</strong> HTTP caching directives</li>
      <li><strong>CDN Caching:</strong> Geographic distribution of cached responses</li>
    </ul>

    <h4>Response Optimization</h4>
    <ul>
      <li>Use compression (gzip, brotli)</li>
      <li>Implement field selection (sparse fieldsets)</li>
      <li>Support batch operations</li>
      <li>Use efficient serialization formats</li>
    </ul>

    <h3>API Testing Strategies</h3>

    <h4>Testing Pyramid</h4>
    <ul>
      <li><strong>Unit Tests:</strong> Individual function/method testing</li>
      <li><strong>Integration Tests:</strong> API endpoint testing</li>
      <li><strong>Contract Tests:</strong> API contract validation</li>
      <li><strong>End-to-End Tests:</strong> Full workflow testing</li>
    </ul>

    <h4>Testing Tools</h4>
    <ul>
      <li><strong>Postman:</strong> Manual and automated API testing</li>
      <li><strong>Jest/Mocha:</strong> Unit and integration testing</li>
      <li><strong>Pact:</strong> Consumer-driven contract testing</li>
      <li><strong>Newman:</strong> Command-line Postman collection runner</li>
    </ul>

    <h3>Best Practices Summary</h3>
    <ul>
      <li>Use consistent naming conventions and URL structures</li>
      <li>Implement proper HTTP status codes and error handling</li>
      <li>Design for backwards compatibility and versioning</li>
      <li>Provide comprehensive documentation and examples</li>
      <li>Implement security measures and input validation</li>
      <li>Optimize for performance with caching and compression</li>
      <li>Design APIs that are intuitive and easy to use</li>
      <li>Follow REST principles or GraphQL best practices</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Good API design is about creating interfaces that are intuitive, consistent, and maintainable. Focus on the developer experience and design APIs that you would want to use yourself.</p>
    </div>
`
}; 