export const apiGateway = {
  id: 'api-gateway',
  title: 'API Gateway',
  content: `
    <p>An API Gateway is a server that acts as a single entry point for multiple backend services in a microservices architecture. It handles routing, authentication, rate limiting, and other cross-cutting concerns, providing a unified interface for clients while abstracting the complexity of the underlying service ecosystem.</p>

    <h3>Core Functions</h3>
    <p>API Gateways serve as the central hub for managing API traffic and implementing common functionality across all services.</p>

    <h4>Request Routing & Load Balancing</h4>
    <ul>
      <li><strong>Intelligent routing:</strong> Direct requests to appropriate backend services</li>
      <li><strong>Load distribution:</strong> Balance traffic across multiple service instances</li>
      <li><strong>Health checking:</strong> Monitor service availability and route around failures</li>
      <li><strong>Circuit breaking:</strong> Prevent cascade failures in distributed systems</li>
    </ul>

    <details>
      <summary><strong>Example: E-commerce API Routing</strong></summary>
      <div class="info-note">
        When you browse an e-commerce site like Amazon, the API Gateway routes <code>/products/*</code> requests to the Product Service, <code>/users/*</code> to User Service, and <code>/orders/*</code> to Order Service. If the Product Service has 5 instances, the gateway automatically distributes load and routes around any unhealthy instances, ensuring 99.9% availability.
      </div>
    </details>

    <h4>Authentication & Authorization</h4>
    <ul>
      <li><strong>Centralized security:</strong> Single point for authentication logic</li>
      <li><strong>Token validation:</strong> JWT, OAuth, API key verification</li>
      <li><strong>Role-based access:</strong> Control permissions at the gateway level</li>
      <li><strong>Security policies:</strong> Enforce consistent security across all APIs</li>
    </ul>

    <details>
      <summary><strong>Example: Banking API Security</strong></summary>
      <div class="info-note">
        A banking API Gateway validates JWT tokens for all requests. When you check your account balance via mobile app, the gateway verifies your authentication token, checks if you have permission to access account data, and only then forwards the request to the Account Service. This prevents unauthorized access and ensures consistent security across all banking operations.
      </div>
    </details>

    <h4>Rate Limiting & Throttling</h4>
    <ul>
      <li><strong>Usage control:</strong> Prevent API abuse and ensure fair usage</li>
      <li><strong>Tiered limits:</strong> Different limits for different client types</li>
      <li><strong>Burst handling:</strong> Allow temporary spikes within limits</li>
      <li><strong>Quota management:</strong> Track and enforce usage quotas</li>
    </ul>

    <div class="code-block">
      <div class="code-label">ARCHITECTURE</div>
      <pre><code>// API Gateway Architecture
                    ┌─────────────────┐
                    │   API Gateway   │
                    │                 │
                    │ ┌─────────────┐ │
                    │ │ Rate Limit  │ │
                    │ │ Auth/Authz  │ │
                    │ │ Routing     │ │
                    │ │ Monitoring  │ │
                    │ └─────────────┘ │
                    └─────────┬───────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
        ┌───────────┐   ┌───────────┐   ┌───────────┐
        │  User     │   │  Product  │   │  Order    │
        │  Service  │   │  Service  │   │  Service  │
        │  :8001    │   │  :8002    │   │  :8003    │
        └───────────┘   └───────────┘   └───────────┘

// Request Flow
Client → API Gateway → Authentication → Rate Limiting → Routing → Backend Service</code></pre>
    </div>

    <h3>Key Features & Capabilities</h3>

    <h4>Protocol Translation & Transformation</h4>
    <ul>
      <li><strong>Protocol bridging:</strong> HTTP to gRPC, WebSocket, or messaging queues</li>
      <li><strong>Data transformation:</strong> Convert between JSON, XML, and other formats</li>
      <li><strong>Request/Response modification:</strong> Add headers, modify payloads</li>
      <li><strong>API versioning:</strong> Handle multiple API versions simultaneously</li>
    </ul>

    <h4>Monitoring & Analytics</h4>
    <ul>
      <li><strong>Real-time metrics:</strong> Request counts, latency, error rates</li>
      <li><strong>Distributed tracing:</strong> Track requests across multiple services</li>
      <li><strong>Logging:</strong> Centralized request/response logging</li>
      <li><strong>Alerting:</strong> Automated notifications for issues</li>
    </ul>

    <h4>Caching & Performance</h4>
    <ul>
      <li><strong>Response caching:</strong> Store frequently requested data</li>
      <li><strong>Cache invalidation:</strong> Smart cache refresh strategies</li>
      <li><strong>Compression:</strong> Reduce bandwidth usage</li>
      <li><strong>Connection pooling:</strong> Optimize backend connections</li>
    </ul>

    <h3>Common Implementation Patterns</h3>

    <h4>Backend for Frontend (BFF)</h4>
    <p>Separate gateways optimized for different client types (mobile, web, IoT).</p>
    <ul>
      <li>Mobile BFF: Optimized for limited bandwidth and battery</li>
      <li>Web BFF: Rich data sets for browser applications</li>
      <li>Partner BFF: External API access with different security requirements</li>
    </ul>

    <details>
      <summary><strong>Example: Netflix BFF Pattern</strong></summary>
      <div class="info-note">
        Netflix uses different API Gateways for their mobile apps versus web browsers. The mobile BFF returns compressed data optimized for small screens and limited bandwidth, while the web BFF provides richer metadata for the full browser experience. Each BFF aggregates data from multiple microservices to create client-specific responses.
      </div>
    </details>

    <h4>Microservices Gateway</h4>
    <p>Central entry point for microservices architecture with service discovery integration.</p>
    <ul>
      <li>Dynamic service registration and discovery</li>
      <li>Automatic load balancing across service instances</li>
      <li>Circuit breaker patterns for resilience</li>
      <li>Distributed tracing and monitoring</li>
    </ul>

    <h4>Legacy Modernization</h4>
    <p>Gradually modernize legacy systems by exposing them through modern APIs.</p>
    <ul>
      <li>Protocol translation from modern REST to legacy SOAP/RPC</li>
      <li>Data format transformation</li>
      <li>Security layer addition to legacy systems</li>
      <li>Gradual migration path to microservices</li>
    </ul>

    <h3>Popular API Gateway Solutions</h3>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Gateway</th>
            <th>Type</th>
            <th>Key Strengths</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Amazon API Gateway</strong></td>
            <td>Managed Service</td>
            <td>AWS integration, serverless, auto-scaling</td>
            <td>AWS-centric architectures</td>
          </tr>
          <tr>
            <td><strong>Kong</strong></td>
            <td>Open Source</td>
            <td>Plugin ecosystem, high performance</td>
            <td>Flexible, customizable deployments</td>
          </tr>
          <tr>
            <td><strong>Envoy Proxy</strong></td>
            <td>Open Source</td>
            <td>High performance, observability, CNCF</td>
            <td>Cloud-native, service mesh</td>
          </tr>
          <tr>
            <td><strong>Azure API Management</strong></td>
            <td>Managed Service</td>
            <td>Enterprise features, developer portal</td>
            <td>Microsoft ecosystem, enterprise</td>
          </tr>
          <tr>
            <td><strong>Zuul (Netflix)</strong></td>
            <td>Open Source</td>
            <td>Battle-tested at scale, Java ecosystem</td>
            <td>Java-based microservices</td>
          </tr>
          <tr>
            <td><strong>Istio Gateway</strong></td>
            <td>Service Mesh</td>
            <td>Kubernetes native, security, observability</td>
            <td>Kubernetes, service mesh architectures</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Benefits & Advantages</h3>

    <h4>For Development Teams</h4>
    <ul>
      <li><strong>Simplified client integration:</strong> Single endpoint for multiple services</li>
      <li><strong>Cross-cutting concerns:</strong> Centralized implementation of common features</li>
      <li><strong>Service abstraction:</strong> Hide backend complexity from clients</li>
      <li><strong>Faster development:</strong> Reusable security and monitoring components</li>
    </ul>

    <h4>For Operations</h4>
    <ul>
      <li><strong>Centralized monitoring:</strong> Single point for observability</li>
      <li><strong>Consistent security:</strong> Uniform security policies</li>
      <li><strong>Traffic management:</strong> Control and shape API traffic</li>
      <li><strong>Analytics:</strong> Unified API usage insights</li>
    </ul>

    <h4>For Business</h4>
    <ul>
      <li><strong>API monetization:</strong> Usage tracking and billing</li>
      <li><strong>Partner integration:</strong> Controlled external API access</li>
      <li><strong>Compliance:</strong> Centralized audit and logging</li>
      <li><strong>Time to market:</strong> Faster API deployment</li>
    </ul>

    <h3>Challenges & Considerations</h3>

    <h4>Technical Challenges</h4>
    <ul>
      <li><strong>Single point of failure:</strong> Gateway outage affects all services</li>
      <li><strong>Performance bottleneck:</strong> Additional network hop and processing</li>
      <li><strong>Latency overhead:</strong> Authentication and routing add latency</li>
      <li><strong>Configuration complexity:</strong> Managing routing rules and policies</li>
    </ul>

    <h4>Operational Challenges</h4>
    <ul>
      <li><strong>High availability requirements:</strong> Must be highly resilient</li>
      <li><strong>Scaling considerations:</strong> Gateway must scale with traffic</li>
      <li><strong>Monitoring complexity:</strong> Need comprehensive observability</li>
      <li><strong>Version management:</strong> Coordinating API and gateway versions</li>
    </ul>

    <details>
      <summary><strong>Example: Handling Gateway Failures</strong></summary>
      <div class="info-note">
        Uber runs multiple API Gateway instances across different availability zones. When one gateway fails, traffic automatically routes to healthy instances within seconds. They also implement circuit breakers so that if a backend service fails, the gateway fails fast rather than timing out, preventing cascade failures across their entire platform.
      </div>
    </details>

    <h3>Security Features</h3>

    <h4>Authentication Methods</h4>
    <ul>
      <li><strong>API Keys:</strong> Simple token-based authentication</li>
      <li><strong>OAuth 2.0/OpenID Connect:</strong> Industry-standard authorization</li>
      <li><strong>JWT (JSON Web Tokens):</strong> Stateless token authentication</li>
      <li><strong>mTLS:</strong> Mutual TLS for service-to-service communication</li>
    </ul>

    <h4>Security Policies</h4>
    <ul>
      <li><strong>IP whitelisting/blacklisting:</strong> Network-level access control</li>
      <li><strong>CORS policies:</strong> Cross-origin resource sharing management</li>
      <li><strong>Request validation:</strong> Schema validation and input sanitization</li>
      <li><strong>DDoS protection:</strong> Rate limiting and traffic shaping</li>
    </ul>

    <div class="code-block">
      <div class="code-label">SECURITY FLOW</div>
      <pre><code>// API Gateway Security Flow
1. Client Request → API Gateway
2. Extract & Validate Token (JWT/API Key)
3. Check Rate Limits & IP Whitelist
4. Validate Request Schema
5. Apply Security Headers
6. Forward to Backend Service
7. Transform & Return Response

// Example JWT Validation
{
  "sub": "user123",
  "aud": "api-gateway",
  "iss": "auth-service",
  "exp": 1640995200,
  "iat": 1640991600,
  "scope": "read:products write:orders"
}</code></pre>
    </div>

    <h3>Best Practices</h3>

    <h4>Design Principles</h4>
    <ul>
      <li><strong>Keep it lightweight:</strong> Minimize processing overhead</li>
      <li><strong>Fail fast:</strong> Quick error responses, avoid timeouts</li>
      <li><strong>Stateless design:</strong> Don't store session state in gateway</li>
      <li><strong>Horizontal scaling:</strong> Design for multiple gateway instances</li>
      <li><strong>Circuit breakers:</strong> Implement failure isolation patterns</li>
    </ul>

    <h4>Operational Excellence</h4>
    <ul>
      <li><strong>Comprehensive monitoring:</strong> Track all key metrics</li>
      <li><strong>Automated deployment:</strong> CI/CD for gateway configurations</li>
      <li><strong>Blue-green deployments:</strong> Zero-downtime updates</li>
      <li><strong>Regular testing:</strong> Load testing and chaos engineering</li>
      <li><strong>Documentation:</strong> Keep API documentation up to date</li>
    </ul>

    <h4>Performance Optimization</h4>
    <ul>
      <li><strong>Caching strategies:</strong> Cache frequently accessed data</li>
      <li><strong>Connection pooling:</strong> Reuse backend connections</li>
      <li><strong>Compression:</strong> Reduce payload sizes</li>
      <li><strong>Async processing:</strong> Non-blocking request handling</li>
      <li><strong>Geographic distribution:</strong> Deploy gateways closer to users</li>
    </ul>

    <div class="reference-links">
      <h4>References</h4>
      <ul>
        <li><a href="https://microservices.io/patterns/apigateway.html" target="_blank">Microservices.io: API Gateway Pattern</a></li>
        <li><a href="https://aws.amazon.com/api-gateway/api-gateway-patterns/" target="_blank">AWS: API Gateway Patterns and Best Practices</a></li>
        <li><a href="https://konghq.com/learning-center/api-gateway/" target="_blank">Kong: API Gateway Learning Center</a></li>
        <li><a href="https://docs.microsoft.com/en-us/azure/architecture/microservices/design/gateway" target="_blank">Microsoft: API Gateway Design Patterns</a></li>
      </ul>
    </div>
  `
}; 