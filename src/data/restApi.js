export const restApi = {
  id: 'rest-api',
  title: 'REST API',
  content: `
## Definition
REST (Representational State Transfer) is an architectural style for designing networked applications using stateless communication and standard HTTP methods. Used by 70% of public APIs.

## REST Principles (6 Constraints)
| Principle | Description | Impact | Example |
|-----------|-------------|--------|---------|
| **Stateless** | No client state on server | Scalable, reliable | Each request includes auth token |
| **Client-Server** | Separation of concerns | Independent evolution | Frontend/backend deploy separately |
| **Cacheable** | Responses marked cacheable | Performance improvement | Cache-Control headers |
| **Uniform Interface** | Consistent API design | Simplicity, visibility | Standard HTTP methods |
| **Layered System** | Hierarchical architecture | Security, load balancing | CDN, load balancers, API gateways |
| **Code on Demand** | Optional executable code | Flexibility (rarely used) | JavaScript widgets |

## HTTP Methods & Usage
\`\`\`bash
# CRUD Operations Mapping
GET    /users           # Read all users (Collection)
GET    /users/123       # Read specific user (Resource)
POST   /users           # Create new user
PUT    /users/123       # Update entire user (Replace)
PATCH  /users/123       # Partial update user (Modify)
DELETE /users/123       # Delete user

# Idempotency Rules
GET, PUT, DELETE: Idempotent (same result on multiple calls)
POST, PATCH: Not idempotent (may create/modify differently)
\`\`\`

## Resource Naming Best Practices
\`\`\`bash
# Good Examples
GET    /users                    # Collection of users
GET    /users/123               # Specific user
GET    /users/123/orders        # User's orders (nested resource)
GET    /users/123/orders/456    # Specific order
POST   /users/123/orders        # Create order for user

# Bad Examples
GET    /getUsers                # Verb in URL
GET    /user/123               # Singular for collection
GET    /users/123/getOrders    # Verb in nested resource
POST   /createUser             # Verb instead of noun
\`\`\`

## Status Codes (Essential for Interviews)
\`\`\`bash
# Success (2xx)
200 OK              # GET, PUT, PATCH success
201 Created         # POST success (resource created)
204 No Content      # DELETE success, PUT with no response body
202 Accepted        # Async processing started

# Client Error (4xx)
400 Bad Request     # Invalid request format/data
401 Unauthorized    # Missing/invalid authentication
403 Forbidden       # Valid auth but insufficient permissions
404 Not Found       # Resource doesn't exist
405 Method Not Allowed  # HTTP method not supported
409 Conflict        # Resource conflict (duplicate email)
422 Unprocessable Entity  # Validation errors
429 Too Many Requests     # Rate limiting

# Server Error (5xx)
500 Internal Server Error  # Generic server error
502 Bad Gateway           # Upstream server error
503 Service Unavailable   # Server overloaded/maintenance
504 Gateway Timeout       # Upstream timeout
\`\`\`

## Request/Response Examples
\`\`\`javascript
// 1. Create User (POST)
POST /api/v1/users
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
}

// Response: 201 Created
{
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2023-01-01T10:00:00Z",
    "updated_at": "2023-01-01T10:00:00Z"
}

// 2. Get User (GET)
GET /api/v1/users/123
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

// Response: 200 OK
{
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2023-01-01T10:00:00Z",
    "updated_at": "2023-01-01T10:00:00Z"
}

// 3. Update User (PATCH)
PATCH /api/v1/users/123
Content-Type: application/json

{
    "name": "John Smith"  // Only updating name
}

// Response: 200 OK
{
    "id": 123,
    "name": "John Smith",  // Updated
    "email": "john@example.com",  // Unchanged
    "role": "user",
    "updated_at": "2023-01-01T11:00:00Z"  // Updated timestamp
}

// 4. Error Response (400 Bad Request)
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid request data",
        "details": [
            {
                "field": "email",
                "message": "Email format is invalid"
            }
        ]
    }
}
\`\`\`

## Authentication & Authorization
\`\`\`javascript
// 1. Bearer Token (JWT)
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// 2. API Key
X-API-Key: sk_live_abc123def456...

// 3. Basic Auth (Base64 encoded)
Authorization: Basic dXNlcjpwYXNzd29yZA==

// 4. OAuth 2.0
Authorization: Bearer ya29.a0AfH6SMC7...
\`\`\`

## Pagination Patterns
\`\`\`javascript
// 1. Offset-based Pagination
GET /users?page=2&limit=20&offset=20

Response:
{
    "data": [...],
    "pagination": {
        "page": 2,
        "limit": 20,
        "total": 1000,
        "total_pages": 50
    }
}

// 2. Cursor-based Pagination (Better for large datasets)
GET /users?limit=20&cursor=eyJpZCI6MTIzfQ==

Response:
{
    "data": [...],
    "pagination": {
        "next_cursor": "eyJpZCI6MTQzfQ==",
        "has_more": true
    }
}
\`\`\`

## Filtering, Sorting, and Search
\`\`\`bash
# Filtering
GET /users?role=admin&status=active&created_after=2023-01-01

# Sorting
GET /users?sort=created_at&order=desc
GET /users?sort=-created_at  # Shorthand for desc

# Search
GET /users?search=john&fields=name,email

# Field Selection (Sparse Fieldsets)
GET /users?fields=id,name,email

# Combined
GET /users?role=admin&sort=-created_at&limit=20&fields=id,name,email
\`\`\`

## Versioning Strategies
\`\`\`bash
# 1. URL Path Versioning (Most Common)
GET /api/v1/users
GET /api/v2/users

# 2. Header Versioning
GET /api/users
Accept: application/vnd.api+json;version=1

# 3. Query Parameter Versioning
GET /api/users?version=1

# 4. Subdomain Versioning
GET https://v1.api.example.com/users
\`\`\`

## Error Handling Best Practices
\`\`\`javascript
// Consistent Error Format
{
    "error": {
        "code": "RESOURCE_NOT_FOUND",
        "message": "User with ID 123 not found",
        "timestamp": "2023-01-01T10:00:00Z",
        "path": "/api/v1/users/123",
        "details": {
            "resource_type": "user",
            "resource_id": "123"
        }
    }
}

// Validation Errors
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Request validation failed",
        "details": [
            {
                "field": "email",
                "code": "INVALID_FORMAT",
                "message": "Email must be a valid email address"
            },
            {
                "field": "password",
                "code": "TOO_SHORT",
                "message": "Password must be at least 8 characters"
            }
        ]
    }
}
\`\`\`

## Caching Headers
\`\`\`bash
# Response Headers
Cache-Control: public, max-age=3600    # Cache for 1 hour
Cache-Control: private, no-cache       # Don't cache sensitive data
ETag: "abc123def456"                   # Resource version identifier
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT

# Conditional Requests
If-None-Match: "abc123def456"          # Check if resource changed
If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT

# Response: 304 Not Modified (if unchanged)
\`\`\`

## Rate Limiting
\`\`\`bash
# Response Headers
X-RateLimit-Limit: 1000        # Requests per window
X-RateLimit-Remaining: 999     # Remaining requests
X-RateLimit-Reset: 1609459200  # Reset timestamp
Retry-After: 3600              # Seconds to wait (when 429)

# Rate Limit Exceeded Response: 429 Too Many Requests
{
    "error": {
        "code": "RATE_LIMIT_EXCEEDED",
        "message": "API rate limit exceeded",
        "retry_after": 3600
    }
}
\`\`\`

## HATEOAS (Hypermedia)
\`\`\`javascript
// Response with links to related actions
{
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "links": {
        "self": "/api/v1/users/123",
        "orders": "/api/v1/users/123/orders",
        "edit": "/api/v1/users/123",
        "delete": "/api/v1/users/123"
    }
}
\`\`\`

## Real-World Examples

### GitHub API
\`\`\`bash
# Resource-based URLs
GET /repos/octocat/Hello-World/issues
GET /repos/octocat/Hello-World/issues/1
POST /repos/octocat/Hello-World/issues

# Proper status codes and headers
201 Created
Location: /repos/octocat/Hello-World/issues/1347
\`\`\`

### Stripe API
\`\`\`bash
# Nested resources
GET /customers/cus_123/subscriptions
POST /customers/cus_123/subscriptions

# Idempotency keys for safe retries
POST /charges
Idempotency-Key: abc123def456
\`\`\`

### Twitter API v2
\`\`\`bash
# Field selection and expansions
GET /tweets/1234567890?tweet.fields=created_at,author_id&expansions=author_id

# Cursor-based pagination
GET /tweets/search/recent?query=REST&next_token=abc123
\`\`\`

## Performance Optimization
\`\`\`bash
# 1. Use appropriate HTTP methods
GET /users (cacheable)
POST /users (not cacheable)

# 2. Implement proper caching
Cache-Control: public, max-age=3600

# 3. Use compression
Accept-Encoding: gzip, deflate
Content-Encoding: gzip

# 4. Minimize payload size
GET /users?fields=id,name  # Only required fields

# 5. Batch operations
POST /users/batch
[
    {"name": "User 1", "email": "user1@example.com"},
    {"name": "User 2", "email": "user2@example.com"}
]
\`\`\`

## Interview Questions & Answers

**Q: What makes an API RESTful?**
A: Following 6 REST constraints: stateless, client-server separation, cacheable, uniform interface, layered system, and code-on-demand. Must use HTTP methods properly and resource-based URLs.

**Q: Difference between PUT and PATCH?**
A: 
- **PUT**: Replaces entire resource (idempotent)
- **PATCH**: Partial update (may not be idempotent)
- PUT requires sending complete resource, PATCH only changed fields

**Q: When to use 201 vs 200 status codes?**
A:
- **201 Created**: After successful POST that creates a resource
- **200 OK**: Successful GET, PUT, PATCH operations
- **204 No Content**: Successful DELETE or PUT with no response body

**Q: How do you handle API versioning?**
A: 
- **URL versioning**: /api/v1/users (most common, clear)
- **Header versioning**: Accept: application/vnd.api+json;version=1
- **Query parameter**: /api/users?version=1 (simple but not RESTful)
- Choose one method and be consistent

**Q: What is idempotency in REST APIs?**
A: Multiple identical requests have same effect as single request:
- **Idempotent**: GET, PUT, DELETE
- **Not idempotent**: POST, PATCH
- Important for retry logic and network reliability

**Q: How do you design RESTful URLs for nested resources?**
A:
- **Parent-child**: /users/123/orders (user's orders)
- **Limit nesting**: Max 2-3 levels deep
- **Alternative**: /orders?user_id=123 for complex queries
- Use consistent patterns across API
`
}; 