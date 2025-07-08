export const http = {
  id: 'http',
  title: 'HTTP (HyperText Transfer Protocol)',
  content: `
## Definition
HTTP is a stateless, request-response protocol for transmitting data between web servers and clients. Powers 99% of web traffic and handles 4.6 billion internet users daily.

## HTTP Request Structure
\`\`\`http
GET /api/users/123 HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0 (Chrome/91.0)
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Cache-Control: no-cache
Content-Type: application/json
Content-Length: 85

{"name": "John Doe", "email": "john@example.com"}
\`\`\`

## HTTP Response Structure
\`\`\`http
HTTP/1.1 200 OK
Date: Wed, 21 Oct 2023 07:28:00 GMT
Server: nginx/1.18.0
Content-Type: application/json; charset=utf-8
Content-Length: 157
Cache-Control: public, max-age=3600
ETag: "abc123def456"
Set-Cookie: sessionId=abc123; HttpOnly; Secure

{"id": 123, "name": "John Doe", "email": "john@example.com", "created_at": "2023-01-01T10:00:00Z"}
\`\`\`

## HTTP Methods & Properties
| Method | Idempotent | Safe | Cacheable | Use Case | Request Body |
|--------|------------|------|-----------|----------|--------------|
| **GET** | ✅ | ✅ | ✅ | Retrieve data | ❌ |
| **POST** | ❌ | ❌ | ❌ | Create resource | ✅ |
| **PUT** | ✅ | ❌ | ❌ | Replace resource | ✅ |
| **PATCH** | ❌ | ❌ | ❌ | Partial update | ✅ |
| **DELETE** | ✅ | ❌ | ❌ | Remove resource | ❌ |
| **HEAD** | ✅ | ✅ | ✅ | Get headers only | ❌ |
| **OPTIONS** | ✅ | ✅ | ❌ | Get allowed methods | ❌ |

## Status Codes (Essential for Interviews)
\`\`\`bash
# 1xx - Informational (Rare)
100 Continue           # Client should continue request
101 Switching Protocols # WebSocket upgrade

# 2xx - Success
200 OK                 # Standard success
201 Created           # Resource created (POST)
202 Accepted          # Async processing started
204 No Content        # Success, no response body (DELETE)

# 3xx - Redirection
301 Moved Permanently  # SEO-friendly redirect
302 Found             # Temporary redirect
304 Not Modified      # Cached version is valid
307 Temporary Redirect # Method preserved redirect

# 4xx - Client Error
400 Bad Request       # Invalid request syntax
401 Unauthorized      # Authentication required
403 Forbidden         # Valid auth, insufficient permissions
404 Not Found         # Resource doesn't exist
405 Method Not Allowed # HTTP method not supported
409 Conflict          # Resource conflict (duplicate)
422 Unprocessable Entity # Validation error
429 Too Many Requests # Rate limiting

# 5xx - Server Error
500 Internal Server Error # Generic server error
502 Bad Gateway          # Upstream server error
503 Service Unavailable  # Server overloaded
504 Gateway Timeout      # Upstream timeout
\`\`\`

## HTTP Headers Categories

### Request Headers
\`\`\`http
# Client Information
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml,application/xml;q=0.9
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br

# Authentication
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Cookie: sessionId=abc123; userId=456

# Content Information
Content-Type: application/json
Content-Length: 123
Content-Encoding: gzip

# Caching
Cache-Control: no-cache
If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT
If-None-Match: "abc123def456"

# Custom Headers
X-API-Key: sk_live_abc123...
X-Request-ID: req_xyz789
\`\`\`

### Response Headers
\`\`\`http
# Server Information
Server: nginx/1.18.0 (Ubuntu)
Date: Wed, 21 Oct 2023 07:28:00 GMT

# Content Information
Content-Type: application/json; charset=utf-8
Content-Length: 1547
Content-Encoding: gzip
Content-Language: en

# Caching
Cache-Control: public, max-age=3600, must-revalidate
ETag: "abc123def456"
Last-Modified: Wed, 21 Oct 2023 06:28:00 GMT
Expires: Thu, 22 Oct 2023 07:28:00 GMT

# Security
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block

# CORS
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
\`\`\`

## HTTP Caching Mechanisms
\`\`\`bash
# Cache-Control Directives
public              # Can be cached by any cache
private             # Only browser cache, not CDN
no-cache           # Must revalidate with server
no-store           # Never cache (sensitive data)
max-age=3600       # Cache for 1 hour
must-revalidate    # Must check with server when stale

# ETag (Entity Tag) - Resource Version
Response: ETag: "abc123def456"
Request:  If-None-Match: "abc123def456"
Response: 304 Not Modified (if unchanged)

# Last-Modified - Timestamp-based
Response: Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT
Request:  If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT
Response: 304 Not Modified (if not modified)
\`\`\`

## Content Negotiation
\`\`\`http
# Client preferences
Accept: application/json, application/xml;q=0.8, text/plain;q=0.5
Accept-Language: en-US,en;q=0.9,es;q=0.8
Accept-Encoding: gzip, deflate, br

# Server response
Content-Type: application/json; charset=utf-8
Content-Language: en-US
Content-Encoding: gzip
Vary: Accept, Accept-Language, Accept-Encoding
\`\`\`

## HTTP Cookies
\`\`\`http
# Set cookie (Response)
Set-Cookie: sessionId=abc123; Domain=.example.com; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600

# Send cookie (Request)
Cookie: sessionId=abc123; userId=456; theme=dark

# Cookie Attributes
HttpOnly    # Prevents JavaScript access (XSS protection)
Secure      # Only sent over HTTPS
SameSite    # CSRF protection (Strict/Lax/None)
Max-Age     # Expiration in seconds
Domain      # Cookie scope
Path        # URL path scope
\`\`\`

## HTTP/1.1 vs HTTP/2 vs HTTP/3
| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---------|----------|--------|--------|
| **Transport** | TCP | TCP | QUIC (UDP) |
| **Multiplexing** | ❌ (head-of-line blocking) | ✅ (streams) | ✅ (improved) |
| **Header Compression** | ❌ | ✅ (HPACK) | ✅ (QPACK) |
| **Server Push** | ❌ | ✅ | ✅ |
| **Connection Setup** | 3 RTT (TCP + TLS) | 3 RTT | 1 RTT |
| **Adoption** | 95% | 50% | 25% |

## Real-World Examples

### RESTful API Request/Response
\`\`\`http
# Create user
POST /api/v1/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{"name": "John Doe", "email": "john@example.com"}

# Response
HTTP/1.1 201 Created
Location: /api/v1/users/123
Content-Type: application/json

{"id": 123, "name": "John Doe", "email": "john@example.com"}
\`\`\`

### File Upload (Multipart)
\`\`\`http
POST /upload HTTP/1.1
Host: files.example.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="document.pdf"
Content-Type: application/pdf

[Binary file content]
------WebKitFormBoundary7MA4YWxkTrZu0gW--
\`\`\`

### CORS Preflight Request
\`\`\`http
# Preflight request
OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

# Preflight response
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
\`\`\`

## Performance Optimization
\`\`\`bash
# 1. Compression
Accept-Encoding: gzip, deflate, br
Content-Encoding: gzip
# Reduces payload by 60-80%

# 2. Keep-Alive Connections
Connection: keep-alive
Keep-Alive: timeout=5, max=1000
# Reuse TCP connections

# 3. Conditional Requests
If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT
# Avoid unnecessary transfers

# 4. HTTP/2 Features
# Multiplexing: Multiple requests per connection
# Server Push: Proactively send resources
# Header Compression: Reduce overhead

# 5. CDN Integration
Cache-Control: public, max-age=31536000  # 1 year
# Cache static assets globally
\`\`\`

## Security Headers
\`\`\`http
# XSS Protection
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Content-Security-Policy: default-src 'self'

# Clickjacking Protection
X-Frame-Options: DENY

# HTTPS Enforcement
Strict-Transport-Security: max-age=31536000; includeSubDomains

# Referrer Policy
Referrer-Policy: strict-origin-when-cross-origin
\`\`\`

## Interview Questions & Answers

**Q: What's the difference between PUT and PATCH?**
A: 
- **PUT**: Replaces entire resource (idempotent)
- **PATCH**: Partial update (not necessarily idempotent)
- PUT requires complete resource data, PATCH only changed fields

**Q: Explain HTTP caching mechanisms.**
A:
- **Cache-Control**: Directives like max-age, no-cache, public/private
- **ETag**: Resource version identifier for validation
- **Last-Modified**: Timestamp-based validation
- **304 Not Modified**: Server response when cached version is valid

**Q: What is HTTP/2 and its benefits?**
A:
- **Multiplexing**: Multiple requests per connection (no head-of-line blocking)
- **Header compression**: HPACK reduces overhead
- **Server push**: Proactively send resources
- **Binary protocol**: More efficient than text-based HTTP/1.1

**Q: How does CORS work?**
A:
- **Same-origin policy**: Browsers block cross-origin requests by default
- **CORS headers**: Server allows specific origins, methods, headers
- **Preflight**: OPTIONS request for complex requests
- **Simple requests**: GET/POST with basic headers skip preflight

**Q: What are idempotent HTTP methods?**
A: Methods that produce same result when called multiple times:
- **Idempotent**: GET, PUT, DELETE, HEAD, OPTIONS
- **Not idempotent**: POST, PATCH
- Important for retry logic and caching

**Q: Explain the difference between 401 and 403 status codes.**
A:
- **401 Unauthorized**: Authentication required (missing/invalid credentials)
- **403 Forbidden**: Valid authentication but insufficient permissions
- 401 suggests user should authenticate, 403 means access is denied
`
}; 