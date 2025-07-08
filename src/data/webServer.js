export const webServer = {
  id: 'web-server',
  title: 'Web Server',
  content: `
    <h2>Web Server</h2>
    <p>A web server is a computer system that processes HTTP requests and delivers web content to clients over the internet or intranet, handling both static and dynamic content delivery.</p>

    <h3>Core Components & Architecture</h3>
    <table>
      <tr>
        <th>Component</th>
        <th>Function</th>
        <th>Performance Impact</th>
        <th>Scalability Factor</th>
      </tr>
      <tr>
        <td>HTTP Engine</td>
        <td>Request/Response processing</td>
        <td>High - Core functionality</td>
        <td>Connection handling model</td>
      </tr>
      <tr>
        <td>Static File Handler</td>
        <td>Serves static content</td>
        <td>Medium - I/O bound</td>
        <td>Caching effectiveness</td>
      </tr>
      <tr>
        <td>Dynamic Content Processor</td>
        <td>Executes server-side code</td>
        <td>High - CPU intensive</td>
        <td>Application logic complexity</td>
      </tr>
      <tr>
        <td>Connection Manager</td>
        <td>Manages client connections</td>
        <td>Critical - Resource usage</td>
        <td>Concurrent connection limits</td>
      </tr>
      <tr>
        <td>Security Module</td>
        <td>Authentication, SSL/TLS</td>
        <td>Medium - Encryption overhead</td>
        <td>Security vs performance trade-off</td>
      </tr>
    </table>

    <h3>Web Server Types & Comparison</h3>
    <div class="code-block">
      <pre><code>Popular Web Servers Comparison:

Apache HTTP Server (httpd):
├── Architecture: Multi-process/multi-threaded
├── Market Share: 35% (2024)
├── Performance: 2,000-5,000 req/sec
├── Memory Usage: 15-25MB per process
├── Strengths: Mature, extensive modules, .htaccess
├── Weaknesses: Higher memory usage, slower static files
├── Use Cases: Traditional web hosting, PHP applications
└── Configuration: httpd.conf, virtual hosts

Nginx:
├── Architecture: Event-driven, asynchronous
├── Market Share: 33% (2024)
├── Performance: 10,000-50,000 req/sec
├── Memory Usage: 2-4MB base + 1-2MB per worker
├── Strengths: High performance, reverse proxy, load balancing
├── Weaknesses: Less flexible module system
├── Use Cases: High-traffic sites, microservices, CDN
└── Configuration: nginx.conf, server blocks

Microsoft IIS:
├── Architecture: Multi-threaded, integrated with Windows
├── Market Share: 8% (2024)
├── Performance: 3,000-8,000 req/sec
├── Memory Usage: 20-40MB base
├── Strengths: Windows integration, ASP.NET support
├── Weaknesses: Windows-only, licensing costs
├── Use Cases: Enterprise Windows environments
└── Configuration: IIS Manager, web.config

Apache Tomcat:
├── Architecture: Java-based application server
├── Market Share: 15% (Java applications)
├── Performance: 1,000-3,000 req/sec
├── Memory Usage: 100-500MB (JVM overhead)
├── Strengths: Java ecosystem, servlet container
├── Weaknesses: Higher resource usage, Java-specific
├── Use Cases: Java web applications, enterprise systems
└── Configuration: server.xml, context.xml

LiteSpeed:
├── Architecture: Event-driven, Apache-compatible
├── Market Share: 5% (2024)
├── Performance: 20,000-80,000 req/sec
├── Memory Usage: 4-8MB per process
├── Strengths: High performance, Apache compatibility
├── Weaknesses: Commercial licensing, smaller community
├── Use Cases: High-performance hosting, WordPress
└── Configuration: Apache-style configuration

Caddy:
├── Architecture: Go-based, automatic HTTPS
├── Market Share: 2% (2024)
├── Performance: 15,000-40,000 req/sec
├── Memory Usage: 10-20MB base
├── Strengths: Automatic SSL, simple configuration
├── Weaknesses: Newer, smaller ecosystem
├── Use Cases: Modern web applications, microservices
└── Configuration: Caddyfile, JSON config</code></pre>
    </div>

    <details>
      <summary><strong>Example: Netflix's Web Server Infrastructure</strong></summary>
      <div class="info-note">
        Netflix operates 15,000+ web servers globally to handle 1+ billion hours of content streaming daily. Their infrastructure uses a combination of Nginx for edge caching and custom Java-based application servers for content delivery. Netflix's web servers handle 100+ million concurrent connections during peak hours, with average response times under 100ms globally. The platform processes 2+ billion API requests daily through their microservices architecture, utilizing automatic scaling to handle traffic spikes up to 10x normal load. Netflix achieves 99.99% uptime through geographic distribution, intelligent load balancing, and chaos engineering practices that continuously test server resilience.
      </div>
    </details>

    <h3>Request Processing Models</h3>
    <div class="code-block">
      <pre><code>Connection Handling Models:

1. Multi-Process Model (Apache MPM Prefork):
┌─────────────────────────────────────────────────────────────┐
│                    Master Process                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Process Pool                               ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  Process 1  │  Process 2  │  Process 3  │  Process N│││
│  │  │  (Request)  │  (Request)  │  (Request)  │  (Request)│││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

Characteristics:
├── Isolation: Each request in separate process
├── Stability: Process crash doesn't affect others
├── Memory: High memory usage (15-25MB per process)
├── Scalability: Limited by process creation overhead
├── Performance: 100-1,000 concurrent connections
└── Use Case: Stability-critical applications

2. Multi-Threaded Model (Apache MPM Worker):
┌─────────────────────────────────────────────────────────────┐
│                    Master Process                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Worker Processes                           ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  Process 1        │  Process 2        │  Process N  │││
│  │  │  ┌─────────────────┐ ┌─────────────────┐ ┌─────────┐│││
│  │  │  │Thread│Thread│..│ │Thread│Thread│..│ │Thread│..│││
│  │  │  └─────────────────┘ └─────────────────┘ └─────────┘│││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

Characteristics:
├── Efficiency: Lower memory usage than multi-process
├── Scalability: 1,000-10,000 concurrent connections
├── Complexity: Thread synchronization required
├── Stability: Thread crash can affect process
├── Performance: Better resource utilization
└── Use Case: High-traffic web applications

3. Event-Driven Model (Nginx, Node.js):
┌─────────────────────────────────────────────────────────────┐
│                    Master Process                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Worker Processes                           ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  Worker 1      │  Worker 2      │  Worker N        │││
│  │  │  ┌───────────────┐ ┌───────────────┐ ┌─────────────┐│││
│  │  │  │ Event Loop    │ │ Event Loop    │ │ Event Loop  │││
│  │  │  │ ┌───────────┐ │ │ ┌───────────┐ │ │ ┌─────────┐ │││
│  │  │  │ │Connection │ │ │ │Connection │ │ │ │Connection│││
│  │  │  │ │   Pool    │ │ │ │   Pool    │ │ │ │   Pool  │││
│  │  │  │ └───────────┘ │ │ └───────────┘ │ │ └─────────┘ │││
│  │  │  └───────────────┘ └───────────────┘ └─────────────┘│││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

Characteristics:
├── Efficiency: Single-threaded event loop
├── Scalability: 10,000-100,000+ concurrent connections
├── Memory: Very low memory usage (2-4MB per worker)
├── Performance: High throughput for I/O-bound operations
├── Limitations: CPU-intensive tasks block event loop
└── Use Case: High-concurrency, I/O-intensive applications

Performance Comparison:
├── Multi-Process: 100-1,000 connections, 15-25MB per connection
├── Multi-Threaded: 1,000-10,000 connections, 2-8MB per connection
├── Event-Driven: 10,000-100,000+ connections, 0.1-1MB per connection
├── Hybrid: Combines models for optimal performance
└── Async I/O: Non-blocking operations for better throughput</code></pre>
    </div>

    <h3>HTTP Request Lifecycle</h3>
    <div class="code-block">
      <pre><code>Complete HTTP Request Processing:

1. Connection Establishment:
├── TCP handshake (3-way)
├── SSL/TLS handshake (if HTTPS)
├── Connection pooling check
├── Keep-alive negotiation
└── Resource allocation

2. Request Parsing:
├── HTTP method validation (GET, POST, etc.)
├── URL parsing and normalization
├── Header parsing and validation
├── Content-Length/Transfer-Encoding handling
├── Authentication header processing
└── Request body parsing (if applicable)

3. Request Routing:
├── Virtual host resolution
├── URL path matching
├── Rewrite rules processing
├── Directory traversal security check
├── Access control validation
└── Handler selection

4. Content Generation:
├── Static file serving:
│   ├── File system access
│   ├── MIME type determination
│   ├── Cache header generation
│   ├── Compression (gzip/brotli)
│   └── Range request handling
├── Dynamic content processing:
│   ├── Application server communication
│   ├── Database queries
│   ├── Template rendering
│   ├── API calls
│   └── Business logic execution

5. Response Generation:
├── Status code determination
├── Response headers construction
├── Content-Type setting
├── Cache control headers
├── Security headers (HSTS, CSP, etc.)
├── Compression application
└── Response body preparation

6. Response Delivery:
├── HTTP response line
├── Response headers transmission
├── Response body streaming
├── Connection management (keep-alive/close)
├── Logging and monitoring
└── Resource cleanup

Performance Metrics:
├── Connection time: 10-100ms
├── Request parsing: 1-10ms
├── Static file serving: 1-50ms
├── Dynamic content: 10-1000ms
├── Response generation: 1-10ms
├── Total response time: 50-500ms
└── Throughput: 100-50,000 requests/second

Optimization Techniques:
├── Connection pooling: Reuse TCP connections
├── HTTP/2 multiplexing: Multiple requests per connection
├── Compression: Reduce response size
├── Caching: Avoid redundant processing
├── CDN integration: Geographic distribution
├── Load balancing: Distribute requests
├── Asynchronous processing: Non-blocking I/O
└── Resource optimization: Minimize overhead</code></pre>
    </div>

    <h3>Caching Strategies</h3>
    <div class="code-block">
      <pre><code>Web Server Caching Layers:

1. Browser Cache:
├── Location: Client-side browser
├── Control: Cache-Control, Expires headers
├── Duration: Minutes to months
├── Scope: Per-user, per-browser
├── Invalidation: Manual refresh, TTL expiration
└── Performance: Eliminates network requests

2. CDN Cache:
├── Location: Edge servers globally
├── Control: Cache policies, TTL settings
├── Duration: Minutes to days
├── Scope: Geographic regions
├── Invalidation: API calls, TTL expiration
└── Performance: Reduced latency, bandwidth

3. Reverse Proxy Cache:
├── Location: Between client and web server
├── Control: Nginx proxy_cache, Varnish
├── Duration: Seconds to hours
├── Scope: All users, shared cache
├── Invalidation: Manual purge, TTL expiration
└── Performance: Reduced backend load

4. Application Cache:
├── Location: Web server memory/disk
├── Control: Application-specific logic
├── Duration: Seconds to minutes
├── Scope: Server-specific or shared
├── Invalidation: Application-triggered
└── Performance: Faster dynamic content

5. Database Query Cache:
├── Location: Database server or application
├── Control: Query result caching
├── Duration: Seconds to minutes
├── Scope: Query-specific
├── Invalidation: Data modifications
└── Performance: Reduced database load

Cache Headers Configuration:
├── Cache-Control: max-age=3600, public/private
├── Expires: Absolute expiration time
├── ETag: Resource version identifier
├── Last-Modified: Resource modification time
├── Vary: Response variation factors
└── Pragma: HTTP/1.0 compatibility

Cache Invalidation Strategies:
├── TTL (Time To Live): Automatic expiration
├── Manual purge: Explicit cache clearing
├── Tag-based: Invalidate related content
├── Versioning: URL-based cache busting
├── Conditional requests: If-Modified-Since
└── Surrogate keys: Grouped invalidation

Performance Impact:
├── Cache hit rate: 80-95% typical
├── Response time reduction: 50-90%
├── Bandwidth savings: 60-80%
├── Server load reduction: 70-95%
├── Database query reduction: 80-99%
└── CDN cost savings: 40-70%</code></pre>
    </div>

    <details>
      <summary><strong>Example: Amazon's Web Server Architecture</strong></summary>
      <div class="info-note">
        Amazon operates 100,000+ web servers across 200+ data centers globally to handle 2+ billion requests daily. Their architecture uses a mix of custom C++ servers for high-performance services and Java-based application servers for business logic. Amazon's web servers achieve 99.99% availability through multi-zone redundancy, automatic failover, and intelligent traffic routing. The platform handles traffic spikes up to 100x normal load during events like Prime Day, processing 50+ million requests per minute at peak. Amazon's infrastructure includes advanced caching layers, real-time monitoring, and machine learning-based auto-scaling that adjusts capacity within seconds based on demand patterns.
      </div>
    </details>

    <h3>Security Considerations</h3>
    <div class="code-block">
      <pre><code>Web Server Security Framework:

1. Transport Layer Security:
├── TLS 1.3 implementation
├── Perfect Forward Secrecy
├── HSTS (HTTP Strict Transport Security)
├── Certificate management
├── Cipher suite optimization
└── OCSP stapling

2. Authentication & Authorization:
├── Basic authentication
├── Digest authentication
├── JWT token validation
├── OAuth 2.0 integration
├── LDAP/Active Directory
├── Multi-factor authentication
└── API key management

3. Input Validation & Sanitization:
├── SQL injection prevention
├── XSS protection
├── CSRF tokens
├── Request size limits
├── File upload restrictions
├── Path traversal prevention
└── Command injection protection

4. Security Headers:
├── Content-Security-Policy (CSP)
├── X-Frame-Options
├── X-Content-Type-Options
├── X-XSS-Protection
├── Referrer-Policy
├── Feature-Policy
└── Strict-Transport-Security

5. Rate Limiting & DDoS Protection:
├── Request rate limiting
├── IP-based throttling
├── Geographic blocking
├── Bot detection
├── Traffic shaping
├── Connection limits
└── Resource consumption monitoring

6. Access Control:
├── IP whitelisting/blacklisting
├── Geographic restrictions
├── User-agent filtering
├── Referrer validation
├── Time-based access
├── Role-based permissions
└── API access control

Common Attack Vectors:
├── DDoS attacks: Traffic flooding
├── SQL injection: Database manipulation
├── XSS: Cross-site scripting
├── CSRF: Cross-site request forgery
├── Directory traversal: File system access
├── Brute force: Password attacks
├── Man-in-the-middle: Traffic interception
└── Privilege escalation: Unauthorized access

Security Best Practices:
├── Regular security updates
├── Minimal attack surface
├── Principle of least privilege
├── Security monitoring & logging
├── Incident response procedures
├── Penetration testing
├── Security audits
└── Compliance frameworks (SOC 2, PCI DSS)

Monitoring & Alerting:
├── Failed authentication attempts
├── Unusual traffic patterns
├── Error rate spikes
├── Resource consumption anomalies
├── Security event correlation
├── Real-time threat detection
└── Automated response systems</code></pre>
    </div>

    <h3>Performance Optimization</h3>
    <div class="code-block">
      <pre><code>Web Server Performance Tuning:

1. Connection Optimization:
├── Keep-alive connections: Reduce TCP overhead
├── Connection pooling: Reuse existing connections
├── HTTP/2 multiplexing: Multiple requests per connection
├── Connection limits: Prevent resource exhaustion
├── Timeout configuration: Optimize resource usage
└── TCP tuning: Kernel-level optimizations

2. Content Optimization:
├── Compression: gzip/brotli for text content
├── Minification: CSS/JavaScript optimization
├── Image optimization: WebP, AVIF formats
├── Resource bundling: Reduce HTTP requests
├── Lazy loading: Load content on demand
└── Progressive rendering: Improve perceived performance

3. Caching Strategies:
├── Static content caching: Long-term browser cache
├── Dynamic content caching: Short-term server cache
├── CDN integration: Geographic distribution
├── Database query caching: Reduce database load
├── Application-level caching: In-memory storage
└── Cache warming: Preload frequently accessed content

4. Resource Management:
├── Memory allocation: Optimize buffer sizes
├── CPU utilization: Balance load across cores
├── I/O optimization: Asynchronous operations
├── Database connections: Connection pooling
├── File handle limits: System resource management
└── Garbage collection: Memory cleanup optimization

5. Load Balancing:
├── Round-robin: Equal distribution
├── Least connections: Route to less busy servers
├── IP hash: Consistent routing
├── Geographic routing: Proximity-based
├── Health checks: Monitor server status
└── Failover: Automatic server switching

Performance Metrics:

Response Time Targets:
├── Static content: <100ms
├── Dynamic content: <500ms
├── API responses: <200ms
├── Database queries: <100ms
├── Third-party APIs: <1000ms
└── Page load time: <3 seconds

Throughput Benchmarks:
├── Nginx: 10,000-50,000 req/sec
├── Apache: 2,000-5,000 req/sec
├── IIS: 3,000-8,000 req/sec
├── Tomcat: 1,000-3,000 req/sec
├── Node.js: 5,000-15,000 req/sec
└── Go servers: 20,000-100,000 req/sec

Resource Usage:
├── Memory per connection: 1-25MB
├── CPU per request: 0.1-10ms
├── Disk I/O: 10-1000 IOPS
├── Network bandwidth: 1-100 Mbps
├── File descriptors: 1024-65536
└── Thread/process limits: 100-10000

Monitoring Tools:
├── Apache Bench (ab): Load testing
├── Siege: Stress testing
├── JMeter: Performance testing
├── New Relic: Application monitoring
├── Nagios: Infrastructure monitoring
├── Grafana: Metrics visualization
└── ELK Stack: Log analysis

Optimization Techniques:
├── HTTP/2 Server Push: Preload resources
├── Service Workers: Client-side caching
├── Edge computing: Distributed processing
├── Microservices: Scalable architecture
├── Containerization: Resource isolation
├── Auto-scaling: Dynamic capacity
└── Performance budgets: Resource limits</code></pre>
    </div>

    <h3>Modern Web Server Features</h3>
    <div class="code-block">
      <pre><code>Advanced Web Server Capabilities:

1. HTTP/2 & HTTP/3 Support:
├── Multiplexing: Multiple requests per connection
├── Server Push: Proactive resource delivery
├── Header compression: HPACK algorithm
├── Stream prioritization: Critical resource first
├── Binary protocol: Efficient parsing
├── QUIC protocol: HTTP/3 over UDP
└── 0-RTT resumption: Faster reconnection

2. WebSocket Support:
├── Protocol upgrade: HTTP to WebSocket
├── Bidirectional communication: Real-time data
├── Connection persistence: Long-lived connections
├── Message framing: Efficient data transfer
├── Compression: Per-message deflate
└── Subprotocol negotiation: Application-specific protocols

3. Server-Sent Events (SSE):
├── Unidirectional streaming: Server to client
├── Automatic reconnection: Built-in resilience
├── Event types: Custom message categories
├── Connection management: Long-polling alternative
├── Browser compatibility: Wide support
└── Fallback mechanisms: Graceful degradation

4. Content Delivery Features:
├── Edge computing: Distributed processing
├── Geographic routing: Proximity-based serving
├── Bandwidth throttling: Quality of service
├── Range requests: Partial content delivery
├── Multipart responses: Efficient data transfer
└── Adaptive bitrate: Dynamic quality adjustment

5. API Gateway Functionality:
├── Request routing: Service discovery
├── Rate limiting: API throttling
├── Authentication: Token validation
├── Request transformation: Data mapping
├── Response aggregation: Multiple service calls
├── Circuit breaker: Fault tolerance
└── Monitoring: API analytics

6. Microservices Support:
├── Service mesh integration: Istio, Linkerd
├── Container orchestration: Kubernetes
├── Health checks: Service monitoring
├── Load balancing: Service discovery
├── Circuit breakers: Fault isolation
├── Distributed tracing: Request tracking
└── Configuration management: Dynamic updates

7. DevOps Integration:
├── Blue-green deployment: Zero-downtime updates
├── Canary releases: Gradual rollouts
├── A/B testing: Traffic splitting
├── Feature flags: Dynamic configuration
├── Monitoring integration: Metrics collection
├── Log aggregation: Centralized logging
└── Alerting: Automated notifications

8. Security Enhancements:
├── Web Application Firewall (WAF)
├── DDoS protection: Traffic filtering
├── Bot detection: Automated threat response
├── Threat intelligence: Security feeds
├── Vulnerability scanning: Automated security
├── Compliance monitoring: Regulatory requirements
└── Zero-trust architecture: Continuous verification

Performance Considerations:
├── Memory efficiency: Optimized data structures
├── CPU utilization: Multi-core processing
├── Network optimization: Bandwidth management
├── Storage performance: I/O optimization
├── Scalability: Horizontal scaling
├── Reliability: Fault tolerance
└── Maintainability: Operational simplicity

Modern Architecture Patterns:
├── Serverless: Function-as-a-Service
├── JAMstack: JavaScript, APIs, Markup
├── Headless CMS: Decoupled content management
├── Progressive Web Apps: App-like experience
├── Single Page Applications: Client-side routing
├── Micro-frontends: Modular UI architecture
└── Edge computing: Distributed processing</code></pre>
    </div>

    <details>
      <summary><strong>Example: Google's Web Server Infrastructure</strong></summary>
      <div class="info-note">
        Google operates 1+ million web servers across 70+ data centers globally to handle 8.5+ billion searches daily. Their custom web server technology processes 40,000+ searches per second with average response times under 200ms. Google's infrastructure includes advanced load balancing, automatic failover, and intelligent traffic routing that adapts to real-time conditions. The platform handles massive traffic spikes during breaking news events, scaling to 100,000+ queries per second. Google's web servers achieve 99.99% uptime through geographic redundancy, predictive scaling, and continuous deployment practices that push thousands of updates daily without service interruption.
      </div>
    </details>

    <h3>Interview Questions & Answers</h3>
    <div class="code-block">
      <pre><code>Common Interview Questions:

Q: What's the difference between a web server and an application server?
A: Web server handles HTTP requests and serves static content, while application 
   server executes business logic and dynamic applications. Web servers focus on 
   protocol handling, application servers on application execution.

Q: How do you handle 10,000 concurrent connections?
A: Use event-driven architecture (like Nginx), implement connection pooling, 
   optimize TCP settings, use HTTP/2 multiplexing, and implement proper 
   load balancing with health checks.

Q: Explain the HTTP request lifecycle in a web server.
A: 1) TCP connection establishment, 2) HTTP request parsing, 3) routing and 
   authentication, 4) content generation/retrieval, 5) response generation, 
   6) response delivery, 7) connection management.

Q: How do you optimize web server performance?
A: Enable compression, implement caching layers, use CDN, optimize database 
   queries, enable HTTP/2, implement connection pooling, and use asynchronous 
   I/O operations.

Q: What are the main security threats to web servers?
A: DDoS attacks, SQL injection, XSS, CSRF, directory traversal, brute force 
   attacks, and man-in-the-middle attacks. Mitigate with WAF, input validation, 
   HTTPS, rate limiting, and security headers.

Q: How do you scale web servers horizontally?
A: Use load balancers, implement session management (sticky sessions or 
   stateless design), use shared storage, implement health checks, and 
   ensure database scalability.

Q: What's the difference between Apache and Nginx?
A: Apache uses multi-process/threaded model, better for dynamic content. 
   Nginx uses event-driven model, better for static content and high 
   concurrency. Nginx is more memory-efficient, Apache more flexible.

Q: How do you implement caching in web servers?
A: Multiple layers: browser cache (Cache-Control headers), CDN cache, 
   reverse proxy cache (Nginx/Varnish), application cache (Redis/Memcached), 
   and database query cache.

Q: What's HTTP/2 and how does it improve performance?
A: HTTP/2 provides multiplexing (multiple requests per connection), server 
   push, header compression, and binary protocol. Reduces latency and 
   improves resource utilization.

Q: How do you monitor web server performance?
A: Monitor response times, throughput, error rates, resource usage (CPU/memory), 
   connection counts, and cache hit rates. Use tools like New Relic, Grafana, 
   and custom metrics.</code></pre>
    </div>

    <h3>Key Takeaways</h3>
    <ul>
      <li><strong>Architecture Models:</strong> Multi-process, multi-threaded, and event-driven approaches</li>
      <li><strong>Performance:</strong> 100-50,000 requests/second depending on server type and configuration</li>
      <li><strong>Caching:</strong> Multiple layers from browser to database for optimal performance</li>
      <li><strong>Security:</strong> HTTPS, input validation, rate limiting, and security headers essential</li>
      <li><strong>Scalability:</strong> Load balancing, horizontal scaling, and proper resource management</li>
      <li><strong>Modern Features:</strong> HTTP/2, WebSockets, microservices support, and API gateway functionality</li>
      <li><strong>Monitoring:</strong> Response times, throughput, error rates, and resource utilization</li>
    </ul>

    <h3>References</h3>
    <ul>
      <li><a href="https://httpd.apache.org/docs/" target="_blank">Apache HTTP Server Documentation</a></li>
      <li><a href="https://nginx.org/en/docs/" target="_blank">Nginx Documentation</a></li>
      <li><a href="https://tools.ietf.org/html/rfc7540" target="_blank">RFC 7540: HTTP/2</a></li>
      <li><a href="https://tools.ietf.org/html/rfc7541" target="_blank">RFC 7541: HPACK Header Compression</a></li>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP" target="_blank">MDN HTTP Documentation</a></li>
      <li><a href="https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project" target="_blank">OWASP Top 10 Security Risks</a></li>
    </ul>
  `
}; 