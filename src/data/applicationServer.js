export const applicationServer = {
  id: 'application-server',
  title: 'Application Server',
  content: `
    <p>An application server is a software framework that provides an environment for running applications and services. It acts as a middleware layer between the operating system and applications, offering enterprise-level services like transaction management, security, database connectivity, and business logic execution.</p>

    <h3>Core Functions & Services</h3>
    <p>Application servers provide a comprehensive runtime environment with enterprise-grade services and capabilities.</p>

    <h4>Business Logic Execution</h4>
    <ul>
      <li><strong>Application hosting:</strong> Runs and manages application code and components</li>
      <li><strong>Service orchestration:</strong> Coordinates multiple services and components</li>
      <li><strong>Process management:</strong> Handles application lifecycle and resource allocation</li>
      <li><strong>Runtime environment:</strong> Provides execution context for applications</li>
    </ul>

    <details>
      <summary><strong>Example: E-commerce Order Processing</strong></summary>
      <div class="info-note">
        When you place an order on Amazon, the application server (like WebLogic or JBoss) executes the business logic: validates your payment, checks inventory, calculates shipping, applies discounts, and coordinates with multiple services. The server manages the entire transaction, ensuring all steps complete successfully or roll back if any step fails.
      </div>
    </details>

    <h4>Transaction Management</h4>
    <ul>
      <li><strong>ACID compliance:</strong> Ensures data consistency and integrity</li>
      <li><strong>Distributed transactions:</strong> Manages transactions across multiple resources</li>
      <li><strong>Two-phase commit:</strong> Coordinates commit/rollback across systems</li>
      <li><strong>Connection pooling:</strong> Optimizes database connections</li>
    </ul>

    <details>
      <summary><strong>Example: Banking Transaction Processing</strong></summary>
      <div class="info-note">
        A bank's application server handles money transfers by managing distributed transactions. When transferring $1000 from Account A to Account B, the server ensures both the debit and credit operations complete successfully. If either fails, the entire transaction rolls back, maintaining data consistency across multiple database systems.
      </div>
    </details>

    <h4>Security & Authentication</h4>
    <ul>
      <li><strong>Authentication:</strong> Verifies user identity and credentials</li>
      <li><strong>Authorization:</strong> Controls access to resources and operations</li>
      <li><strong>Role-based security:</strong> Manages permissions based on user roles</li>
      <li><strong>SSL/TLS termination:</strong> Handles secure communication</li>
    </ul>

    <div class="code-block">
      <div class="code-label">ARCHITECTURE</div>
      <pre><code>// Application Server Architecture
┌─────────────────────────────────────────────────────┐
│                Application Server                   │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   Web       │  │  Business   │  │   Data      │  │
│  │ Container   │  │   Logic     │  │  Access     │  │
│  │             │  │  Services   │  │   Layer     │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ Transaction │  │  Security   │  │ Connection  │  │
│  │  Manager    │  │  Manager    │  │    Pool     │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   JMS       │  │   JNDI      │  │    EJB      │  │
│  │ Messaging   │  │  Naming     │  │ Container   │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
                          │
                ┌─────────┼─────────┐
                │         │         │
          ┌───────────┐ ┌───────────┐ ┌───────────┐
          │ Database  │ │   LDAP    │ │ Message   │
          │  Server   │ │  Server   │ │  Queue    │
          └───────────┘ └───────────┘ └───────────┘</code></pre>
    </div>

    <h3>Application Server vs Web Server</h3>
    <p>Understanding the distinction between application servers and web servers is crucial for system architecture decisions.</p>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Web Server</th>
            <th>Application Server</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Primary Function</strong></td>
            <td>Serve static content (HTML, CSS, JS)</td>
            <td>Execute business logic and dynamic content</td>
          </tr>
          <tr>
            <td><strong>Content Type</strong></td>
            <td>Static files</td>
            <td>Dynamic, generated content</td>
          </tr>
          <tr>
            <td><strong>Protocols</strong></td>
            <td>HTTP/HTTPS</td>
            <td>HTTP, RMI, CORBA, EJB</td>
          </tr>
          <tr>
            <td><strong>Transaction Support</strong></td>
            <td>None</td>
            <td>Full ACID transaction support</td>
          </tr>
          <tr>
            <td><strong>Database Integration</strong></td>
            <td>Limited</td>
            <td>Advanced connection pooling, ORM</td>
          </tr>
          <tr>
            <td><strong>Security</strong></td>
            <td>Basic authentication</td>
            <td>Enterprise security, SSO, RBAC</td>
          </tr>
          <tr>
            <td><strong>Scalability</strong></td>
            <td>Horizontal scaling</td>
            <td>Vertical and horizontal scaling</td>
          </tr>
          <tr>
            <td><strong>Examples</strong></td>
            <td>Apache HTTP, Nginx, IIS</td>
            <td>WebLogic, JBoss, WebSphere</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Popular Application Servers</h3>

    <h4>Java-Based Application Servers</h4>
    <ul>
      <li><strong>Apache Tomcat:</strong> Lightweight servlet container, widely used</li>
      <li><strong>JBoss/WildFly:</strong> Open-source Java EE server with full enterprise features</li>
      <li><strong>Oracle WebLogic:</strong> Enterprise-grade server with advanced clustering</li>
      <li><strong>IBM WebSphere:</strong> Enterprise server with strong IBM ecosystem integration</li>
      <li><strong>Eclipse Jetty:</strong> Lightweight, embeddable servlet container</li>
    </ul>

    <details>
      <summary><strong>Example: Netflix's Tomcat Usage</strong></summary>
      <div class="info-note">
        Netflix uses thousands of Tomcat instances to serve their streaming platform. Each Tomcat server handles specific microservices like user authentication, recommendation engine, or video metadata. They've optimized Tomcat for their specific needs, running lightweight instances that can be quickly deployed and scaled across their global infrastructure.
      </div>
    </details>

    <h4>Non-Java Application Servers</h4>
    <ul>
      <li><strong>Node.js:</strong> JavaScript runtime for server-side applications</li>
      <li><strong>ASP.NET Core:</strong> Microsoft's cross-platform web framework</li>
      <li><strong>Django/Flask:</strong> Python web frameworks with application server capabilities</li>
      <li><strong>Ruby on Rails:</strong> Ruby framework with integrated application server</li>
      <li><strong>Express.js:</strong> Minimal Node.js web application framework</li>
    </ul>

    <details>
      <summary><strong>Example: LinkedIn's Node.js Migration</strong></summary>
      <div class="info-note">
        LinkedIn migrated their mobile backend from Ruby on Rails to Node.js application servers. This change reduced their server count from 30 to 3 servers while improving performance 20x. Node.js's event-driven architecture was perfect for handling LinkedIn's real-time messaging and notification requirements.
      </div>
    </details>

    <h3>Enterprise Services & Features</h3>

    <h4>Java EE Services</h4>
    <ul>
      <li><strong>Enterprise JavaBeans (EJB):</strong> Component architecture for business logic</li>
      <li><strong>Java Message Service (JMS):</strong> Asynchronous messaging</li>
      <li><strong>Java Naming and Directory Interface (JNDI):</strong> Naming services</li>
      <li><strong>Java Transaction API (JTA):</strong> Transaction management</li>
      <li><strong>Java Database Connectivity (JDBC):</strong> Database access</li>
    </ul>

    <h4>Clustering & High Availability</h4>
    <ul>
      <li><strong>Load balancing:</strong> Distribute requests across multiple instances</li>
      <li><strong>Session replication:</strong> Share session data across cluster nodes</li>
      <li><strong>Failover support:</strong> Automatic recovery from node failures</li>
      <li><strong>Hot deployment:</strong> Update applications without downtime</li>
    </ul>

    <h4>Management & Monitoring</h4>
    <ul>
      <li><strong>JMX (Java Management Extensions):</strong> Runtime monitoring and management</li>
      <li><strong>Performance metrics:</strong> CPU, memory, thread pool monitoring</li>
      <li><strong>Application profiling:</strong> Performance analysis and optimization</li>
      <li><strong>Log management:</strong> Centralized logging and analysis</li>
    </ul>

    <div class="code-block">
      <div class="code-label">DEPLOYMENT ARCHITECTURE</div>
      <pre><code>// Typical Enterprise Deployment
                    ┌─────────────────┐
                    │  Load Balancer  │
                    │   (F5/HAProxy)  │
                    └─────────┬───────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
        ┌───────────┐   ┌───────────┐   ┌───────────┐
        │App Server │   │App Server │   │App Server │
        │  Node 1   │   │  Node 2   │   │  Node 3   │
        │(WebLogic) │   │(WebLogic) │   │(WebLogic) │
        └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
              │               │               │
              └───────────────┼───────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   Database        │
                    │   Cluster         │
                    │ (Oracle RAC)      │
                    └───────────────────┘</code></pre>
    </div>

    <h3>Configuration & Deployment</h3>

    <h4>Deployment Models</h4>
    <ul>
      <li><strong>Standalone deployment:</strong> Single server instance</li>
      <li><strong>Cluster deployment:</strong> Multiple coordinated instances</li>
      <li><strong>Cloud deployment:</strong> Container-based or serverless</li>
      <li><strong>Hybrid deployment:</strong> Mix of on-premise and cloud</li>
    </ul>

    <h4>Configuration Management</h4>
    <ul>
      <li><strong>Environment-specific configs:</strong> Dev, test, production settings</li>
      <li><strong>Resource definitions:</strong> Data sources, connection pools</li>
      <li><strong>Security configurations:</strong> Authentication realms, SSL certificates</li>
      <li><strong>Performance tuning:</strong> JVM settings, thread pools, caching</li>
    </ul>

    <details>
      <summary><strong>Example: Uber's Microservices Architecture</strong></summary>
      <div class="info-note">
        Uber runs thousands of microservices on application servers across multiple data centers. Each service runs in its own container with specific resource allocations. Their platform automatically handles deployment, scaling, and failover, allowing them to deploy code changes thousands of times per day while maintaining 99.99% uptime.
      </div>
    </details>

    <h3>Performance & Scalability</h3>

    <h4>Performance Optimization</h4>
    <ul>
      <li><strong>JVM tuning:</strong> Garbage collection, heap size optimization</li>
      <li><strong>Connection pooling:</strong> Database connection management</li>
      <li><strong>Caching strategies:</strong> Application-level and distributed caching</li>
      <li><strong>Thread pool management:</strong> Optimize concurrent request handling</li>
    </ul>

    <h4>Scalability Patterns</h4>
    <ul>
      <li><strong>Horizontal scaling:</strong> Add more server instances</li>
      <li><strong>Vertical scaling:</strong> Increase server resources</li>
      <li><strong>Auto-scaling:</strong> Dynamic resource allocation based on load</li>
      <li><strong>Microservices:</strong> Decompose applications into smaller services</li>
    </ul>

    <h4>Monitoring & Diagnostics</h4>
    <ul>
      <li><strong>Application metrics:</strong> Response time, throughput, error rates</li>
      <li><strong>Resource monitoring:</strong> CPU, memory, disk, network usage</li>
      <li><strong>Distributed tracing:</strong> Track requests across multiple services</li>
      <li><strong>Health checks:</strong> Automated service health monitoring</li>
    </ul>

    <h3>Modern Trends & Evolution</h3>

    <h4>Containerization & Orchestration</h4>
    <ul>
      <li><strong>Docker containers:</strong> Lightweight, portable application packaging</li>
      <li><strong>Kubernetes:</strong> Container orchestration and management</li>
      <li><strong>Service mesh:</strong> Advanced networking and security for microservices</li>
      <li><strong>Serverless:</strong> Function-as-a-Service platforms</li>
    </ul>

    <h4>Cloud-Native Application Servers</h4>
    <ul>
      <li><strong>Spring Boot:</strong> Opinionated framework for microservices</li>
      <li><strong>Quarkus:</strong> Kubernetes-native Java framework</li>
      <li><strong>Micronaut:</strong> JVM-based framework for microservices</li>
      <li><strong>Vert.x:</strong> Event-driven application framework</li>
    </ul>

    <details>
      <summary><strong>Example: Spotify's Microservices Platform</strong></summary>
      <div class="info-note">
        Spotify runs over 3,000 microservices on their custom application platform built on Kubernetes. Each service is independently deployable and scalable. Their platform provides automatic service discovery, load balancing, and monitoring, allowing development teams to focus on business logic rather than infrastructure concerns.
      </div>
    </details>

    <h3>Best Practices</h3>

    <h4>Development Best Practices</h4>
    <ul>
      <li><strong>Stateless design:</strong> Avoid storing session state in application servers</li>
      <li><strong>Dependency injection:</strong> Use IoC containers for better testability</li>
      <li><strong>Configuration externalization:</strong> Keep configs outside application code</li>
      <li><strong>Error handling:</strong> Implement comprehensive exception handling</li>
      <li><strong>Logging strategy:</strong> Structured logging with appropriate levels</li>
    </ul>

    <h4>Operational Best Practices</h4>
    <ul>
      <li><strong>Automated deployment:</strong> CI/CD pipelines for consistent deployments</li>
      <li><strong>Blue-green deployments:</strong> Zero-downtime deployment strategy</li>
      <li><strong>Capacity planning:</strong> Monitor and plan for resource requirements</li>
      <li><strong>Disaster recovery:</strong> Backup and recovery procedures</li>
      <li><strong>Security hardening:</strong> Regular security updates and patches</li>
    </ul>

    <h4>Performance Best Practices</h4>
    <ul>
      <li><strong>Load testing:</strong> Regular performance testing under load</li>
      <li><strong>Database optimization:</strong> Query optimization and indexing</li>
      <li><strong>Caching strategy:</strong> Multi-level caching implementation</li>
      <li><strong>Resource monitoring:</strong> Proactive monitoring and alerting</li>
      <li><strong>Profiling:</strong> Regular application profiling and optimization</li>
    </ul>

    <div class="reference-links">
      <h4>References</h4>
      <ul>
        <li><a href="https://docs.oracle.com/javaee/7/tutorial/overview003.htm" target="_blank">Oracle: Java EE Application Servers</a></li>
        <li><a href="https://www.redhat.com/en/topics/middleware/what-is-application-server" target="_blank">Red Hat: What is an Application Server?</a></li>
        <li><a href="https://tomcat.apache.org/tomcat-9.0-doc/architecture-overview.html" target="_blank">Apache Tomcat: Architecture Overview</a></li>
        <li><a href="https://www.ibm.com/docs/en/was/9.0.5?topic=overview-websphere-application-server" target="_blank">IBM: WebSphere Application Server</a></li>
      </ul>
    </div>
  `
}; 