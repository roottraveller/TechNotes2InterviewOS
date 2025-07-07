export const consistentHashingVsLoadBalancing = {
  id: "consistent-hashing-vs-load-balancing",
  title: "Consistent Hashing vs Load Balancing",
  content: `
    <h2>Consistent Hashing vs Load Balancing</h2>
    <p>Understanding the key differences between consistent hashing and load balancing approaches in distributed systems.</p>

    <h3>Consistent Hashing</h3>
    <p>Consistent hashing handles the distribution of <strong>data (data partitioning)</strong> across nodes and determines which node is responsible for each piece of data based on a consistent hashing scheme.</p>

    <h4>Key Characteristics:</h4>
    <ul>
      <li>Focuses on <strong>data placement</strong> and partitioning</li>
      <li>Determines which node stores specific data</li>
      <li>Minimizes data movement when nodes are added/removed</li>
      <li>Uses hash functions to map data to nodes</li>
      <li>Primarily used for data distribution in distributed databases</li>
    </ul>

    <h3>Load Balancing</h3>
    <p>Load balancing algorithms decide which replica or node should handle a <strong>request</strong> among the replicas based on load balancing algorithms.</p>

    <h4>Key Characteristics:</h4>
    <ul>
      <li>Focuses on <strong>request distribution</strong> and traffic management</li>
      <li>Determines which server handles incoming requests</li>
      <li>Optimizes resource utilization and response times</li>
      <li>Uses various algorithms (round-robin, least connections, etc.)</li>
      <li>Primarily used for traffic distribution in web applications</li>
    </ul>

    <h3>Key Differences</h3>
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Consistent Hashing</th>
          <th>Load Balancing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Purpose</strong></td>
          <td>Data partitioning and placement</td>
          <td>Request distribution and traffic management</td>
        </tr>
        <tr>
          <td><strong>Focus</strong></td>
          <td>Where to store data</td>
          <td>Where to send requests</td>
        </tr>
        <tr>
          <td><strong>Scope</strong></td>
          <td>Data layer</td>
          <td>Application/Network layer</td>
        </tr>
        <tr>
          <td><strong>Use Case</strong></td>
          <td>Distributed databases, caching</td>
          <td>Web servers, API gateways</td>
        </tr>
        <tr>
          <td><strong>Algorithms</strong></td>
          <td>Hash-based distribution</td>
          <td>Round-robin, least connections, etc.</td>
        </tr>
      </tbody>
    </table>

    <h3>When to Use Each</h3>
    
    <h4>Use Consistent Hashing When:</h4>
    <ul>
      <li>Building distributed databases or caches</li>
      <li>Need to partition data across multiple nodes</li>
      <li>Want to minimize data movement during scaling</li>
      <li>Dealing with key-value stores or sharded databases</li>
    </ul>

    <h4>Use Load Balancing When:</h4>
    <ul>
      <li>Distributing incoming requests across servers</li>
      <li>Need to optimize server resource utilization</li>
      <li>Want to improve application availability and performance</li>
      <li>Managing traffic to stateless web services</li>
    </ul>

    <div class="info-note">
      <strong>Note:</strong> These approaches are complementary and often used together in large-scale distributed systems. Consistent hashing for data partitioning and load balancing for request distribution.
    </div>
  `
}; 