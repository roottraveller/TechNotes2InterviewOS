export const loadBalancer = {
  id: "load-balancer",
  title: "Load Balancer",
  content: `
    <h2>Load Balancer (LB)</h2>
    <p>LB is responsible for Traffic Distribution, High Availability, Scalability, Session Persistence, Health Checks, SSL Termination, Content-Based Routing, Rate Limiting, Logging and Monitoring etc.</p>

    <h3>Examples</h3>
    <ul>
      <li>HAProxy (High Availability Proxy)</li>
      <li>Nginx</li>
      <li>AWS ELB (Elastic Load Balancing)</li>
      <li>Azure Load Balancer</li>
      <li>Google Cloud Load Balancing</li>
    </ul>

    <h3>Health Checks</h3>
    <p>If a server fails a health check, it is automatically removed from the pool, and traffic will not be forwarded to it until it responds to the health checks again.</p>

    <h3>Types of Load Balancing Technology</h3>
    <ul>
      <li><strong>Hardware Load Balancers:</strong> Dedicated physical devices</li>
      <li><strong>Software Load Balancers:</strong> Software-based solutions</li>
    </ul>

    <h3>Types of Load Balancer</h3>
    
    <h4>Application Load Balancer (L7 Balancer)</h4>
    <p>Provides advanced routing features and can make routing decisions based on HTTP headers, session information, request/response data, and content. Supports features like SSL termination, content-based routing, and host-based routing. Ideal for modern web applications with complex routing requirements and microservices architectures.</p>

    <h4>Network Load Balancer (L4 Balancer)</h4>
    <p>Routes traffic based on IP address and port information only.</p>

    <h4>DNS Load Balancer</h4>
    <p>Distributes traffic across multiple servers using DNS (Domain Name System) resolution. Works by resolving domain names to multiple IP addresses, each corresponding to a different server.</p>

    <h3>Load Balancing Algorithms</h3>

    <h4>Dynamic Load Balancing Algorithms</h4>
    <ul>
      <li><strong>Least Connection:</strong> Routes requests to the server with the fewest active connections</li>
      <li><strong>Weighted Least Connection:</strong> Considers both connection count and server capacity</li>
      <li><strong>Least Response Time:</strong> Routes to the server with the fastest response time</li>
      <li><strong>Resource-based:</strong> Routes based on server resource utilization</li>
      <li><strong>Adaptive Load Balancing:</strong> Adjusts routing based on real-time conditions</li>
      <li><strong>Dynamic Proximity-based:</strong> Routes based on geographic proximity</li>
    </ul>

    <h4>Static Load Balancing Algorithms</h4>
    <ul>
      <li><strong>Round Robin:</strong> Distributes requests sequentially across servers</li>
      <li><strong>Weighted Round Robin:</strong> Assigns weights to servers based on their capacity</li>
      <li><strong>IP Hash:</strong> Uses hash of client IP address to determine server assignment. This ensures that requests from the same client are always routed to the same server, which can be useful for maintaining session state.</li>
      <li><strong>Static Proximity-based:</strong> Routes based on predefined geographic regions</li>
      <li><strong>Static Content-based:</strong> Routes based on content type or URL patterns</li>
    </ul>

    <div class="reference-links">
      <h4>📚 References</h4>
      <ul>
        <li><a href="https://www.scaler.com/topics/aws/load-balancing/" target="_blank">Load Balancing - AWS</a></li>
        <li><a href="https://www.nginx.com/resources/glossary/load-balancing/" target="_blank">Load Balancing - Nginx</a></li>
        <li><a href="https://blog.bytebytego.com/p/ep47-common-load-balancing-algorithms" target="_blank">Common Load Balancing Algorithms</a></li>
      </ul>
    </div>
  `
}; 