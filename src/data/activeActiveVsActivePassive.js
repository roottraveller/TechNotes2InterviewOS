export const activeActiveVsActivePassive = {
  id: 'active-active-vs-active-passive',
  title: 'Active-Active vs Active-Passive',
  content: `
    <p>Multi-node architectures are fundamental patterns for achieving high availability, fault tolerance, and scalability in distributed systems. The choice between active-active and active-passive configurations significantly impacts system performance, complexity, and resource utilization.</p>

    <h3>Active-Active Configuration</h3>
    <p>In an active-active configuration, all servers or resources in the system are actively serving traffic and processing requests simultaneously. This approach maximizes resource utilization and provides immediate failover capabilities.</p>
    
    <h4>Key Characteristics</h4>
    <ul>
      <li><strong>All nodes active:</strong> Every server handles production traffic</li>
      <li><strong>Load distribution:</strong> Traffic is distributed across all nodes</li>
      <li><strong>Resource utilization:</strong> Maximum use of available resources</li>
      <li><strong>No idle capacity:</strong> All servers contribute to processing</li>
      <li><strong>Symmetric design:</strong> All nodes have equal capabilities</li>
    </ul>

    <details>
      <summary><strong>Real-World Example: Netflix Global CDN</strong></summary>
      <div class="info-note">
        Netflix operates an active-active architecture across multiple AWS regions. When you stream a movie, content is served from the nearest active edge location. If the US-East region experiences issues, traffic seamlessly routes to US-West or other regions without interruption. All regions actively serve users simultaneously, providing 99.99% availability.
      </div>
    </details>

    <h4>Advantages</h4>
    <ul>
      <li><strong>Higher throughput:</strong> All resources actively process requests</li>
      <li><strong>Better resource utilization:</strong> No idle servers</li>
      <li><strong>Instant failover:</strong> Other nodes already handling traffic</li>
      <li><strong>Load balancing:</strong> Distributes workload evenly</li>
      <li><strong>Scalability:</strong> Easy to add more active nodes</li>
    </ul>

    <h4>Challenges</h4>
    <ul>
      <li><strong>Data consistency:</strong> Synchronization across active nodes</li>
      <li><strong>Conflict resolution:</strong> Handling concurrent updates</li>
      <li><strong>Complexity:</strong> More complex to implement and maintain</li>
      <li><strong>Split-brain scenarios:</strong> Network partitions can cause issues</li>
      <li><strong>Higher operational cost:</strong> All nodes need full capacity</li>
    </ul>

    <div class="code-block">
      <div class="code-label">ARCHITECTURE</div>
      <pre><code>// Active-Active Architecture
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Node A    │     │   Node B    │     │   Node C    │
│  (Active)   │     │  (Active)   │     │  (Active)   │
│  33% Load   │     │  33% Load   │     │  33% Load   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┴───────────────────┘
                          │
                   Load Balancer
                          │
                      Clients

// Configuration Example (HAProxy)
backend web_servers
    balance roundrobin
    server web1 192.168.1.10:80 check
    server web2 192.168.1.11:80 check
    server web3 192.168.1.12:80 check</code></pre>
    </div>

    <h3>Active-Passive Configuration</h3>
    <p>In an active-passive configuration, one server (or a group of servers) is designated as active (hot), while the remaining servers are passive (cold) or standby. The passive nodes remain idle until a failover event occurs.</p>
    
    <h4>Key Characteristics</h4>
    <ul>
      <li><strong>Primary/Secondary model:</strong> One active, others standby</li>
      <li><strong>Idle resources:</strong> Passive nodes wait for failover</li>
      <li><strong>Automatic failover:</strong> Passive becomes active on failure</li>
      <li><strong>Data replication:</strong> Continuous sync to passive nodes</li>
      <li><strong>Health monitoring:</strong> Constant checking of active node</li>
    </ul>

    <details>
      <summary><strong>Real-World Example: Traditional Banking Systems</strong></summary>
      <div class="info-note">
        Many banks use active-passive setups for their core banking systems. The primary data center in New York handles all transactions, while a disaster recovery site in Chicago remains on standby with replicated data. If the primary site fails, operations switch to Chicago within 15-30 minutes, ensuring critical financial data remains consistent and secure.
      </div>
    </details>

    <h4>Advantages</h4>
    <ul>
      <li><strong>Simpler implementation:</strong> No complex synchronization</li>
      <li><strong>Data consistency:</strong> Single source of truth</li>
      <li><strong>Predictable performance:</strong> Known capacity limits</li>
      <li><strong>Easier troubleshooting:</strong> Single active path</li>
      <li><strong>Lower complexity:</strong> Simpler architecture and maintenance</li>
    </ul>

    <h4>Challenges</h4>
    <ul>
      <li><strong>Resource waste:</strong> Passive nodes are idle</li>
      <li><strong>Failover time:</strong> Takes time to activate passive node</li>
      <li><strong>Single point of processing:</strong> Limited by active node capacity</li>
      <li><strong>Cost inefficiency:</strong> Paying for idle resources</li>
      <li><strong>Scaling limitations:</strong> Can't distribute load</li>
    </ul>

    <div class="code-block">
      <div class="code-label">ARCHITECTURE</div>
      <pre><code>// Active-Passive Architecture
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Node A    │     │   Node B    │     │   Node C    │
│  (Active)   │     │  (Passive)  │     │  (Passive)  │
│  100% Load  │     │   Standby   │     │   Standby   │
└──────┬──────┘     └─────────────┘     └─────────────┘
       │                   ↑                     ↑
       │                   └──────Replication────┘
       │
   Load Balancer
       │
    Clients

// Failover Process
1. Active node fails
2. Health check detects failure
3. Passive node promoted to active
4. DNS/Load balancer updated
5. Traffic redirected to new active</code></pre>
    </div>

    <h3>Detailed Comparison</h3>
    
    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Active-Active</th>
            <th>Active-Passive</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Resource Utilization</strong></td>
            <td>High (all nodes active)</td>
            <td>Low (passive nodes idle)</td>
          </tr>
          <tr>
            <td><strong>Throughput</strong></td>
            <td>High (distributed load)</td>
            <td>Limited to active node</td>
          </tr>
          <tr>
            <td><strong>Failover Time</strong></td>
            <td>Instant (already active)</td>
            <td>Minutes (activation needed)</td>
          </tr>
          <tr>
            <td><strong>Implementation Complexity</strong></td>
            <td>High</td>
            <td>Low</td>
          </tr>
          <tr>
            <td><strong>Data Consistency</strong></td>
            <td>Complex (multi-master)</td>
            <td>Simple (single master)</td>
          </tr>
          <tr>
            <td><strong>Cost Efficiency</strong></td>
            <td>Better (using all resources)</td>
            <td>Worse (idle resources)</td>
          </tr>
          <tr>
            <td><strong>Scalability</strong></td>
            <td>Excellent (horizontal)</td>
            <td>Limited (vertical only)</td>
          </tr>
          <tr>
            <td><strong>Operational Overhead</strong></td>
            <td>High (coordination needed)</td>
            <td>Medium (simpler monitoring)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Implementation Examples</h3>
    
    <h4>Active-Active Implementations</h4>
    <ul>
      <li><strong>Databases:</strong> Galera Cluster, Cassandra, CockroachDB</li>
      <li><strong>Web Servers:</strong> Multiple Nginx/Apache behind load balancer</li>
      <li><strong>Application Servers:</strong> Kubernetes pods with horizontal scaling</li>
      <li><strong>Message Queues:</strong> RabbitMQ cluster, Apache Kafka</li>
      <li><strong>Caching:</strong> Redis Cluster, Memcached distributed</li>
      <li><strong>CDN:</strong> CloudFlare, AWS CloudFront edge locations</li>
    </ul>

    <details>
      <summary><strong>Example: E-commerce Platform Active-Active Setup</strong></summary>
      <div class="info-note">
        Amazon's e-commerce platform runs active-active across multiple availability zones. When you browse products, your requests are handled by any available server. If one zone goes down during Black Friday, the other zones continue serving millions of customers without interruption, maintaining 99.99% uptime during peak traffic.
      </div>
    </details>

    <h4>Active-Passive Implementations</h4>
    <ul>
      <li><strong>Databases:</strong> MySQL with replica, PostgreSQL streaming replication</li>
      <li><strong>File Systems:</strong> DRBD (Distributed Replicated Block Device)</li>
      <li><strong>Applications:</strong> Traditional HA clusters with Pacemaker</li>
      <li><strong>Network Equipment:</strong> VRRP (Virtual Router Redundancy Protocol)</li>
      <li><strong>Storage:</strong> SAN replication to DR site</li>
    </ul>

    <details>
      <summary><strong>Example: Hospital Management System</strong></summary>
      <div class="info-note">
        A hospital's patient management system uses active-passive configuration. The primary server handles all patient records, appointments, and billing. A secondary server in a different building maintains real-time copies. If the primary fails, the secondary takes over within 5 minutes, ensuring critical patient data remains accessible during emergencies.
      </div>
    </details>

    <h3>Hybrid Approaches</h3>
    
    <h4>Active-Active with Passive Backup</h4>
    <p>Combines benefits of both approaches for maximum resilience:</p>
    <ul>
      <li>Multiple active nodes for normal operation</li>
      <li>Additional passive nodes for disaster recovery</li>
      <li>Best of both worlds but higher infrastructure cost</li>
    </ul>

    <h4>Read Replicas Pattern</h4>
    <p>Common in database systems for optimized performance:</p>
    <ul>
      <li>Active-Active for read operations (multiple read replicas)</li>
      <li>Active-Passive for write operations (single master)</li>
      <li>Balances consistency with read performance</li>
    </ul>

    <div class="code-block">
      <div class="code-label">HYBRID ARCHITECTURE</div>
      <pre><code>// Read Replicas Pattern
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Primary    │     │   Read      │     │   Read      │
│  (Master)   │────▶│  Replica 1  │     │  Replica 2  │
│  Read/Write │     │  (Active)   │     │  (Active)   │
└─────────────┘     │  Read Only  │     │  Read Only  │
                    └─────────────┘     └─────────────┘
                            │                   │
                            └───────────────────┘
                                      │
                              Read Load Balancer
                                      │
                                  Clients</code></pre>
    </div>

    <h3>Decision Framework</h3>
    
    <h4>Choose Active-Active When:</h4>
    <ul>
      <li><strong>High throughput requirements:</strong> Need to handle massive concurrent users</li>
      <li><strong>Global distribution:</strong> Users spread across different regions</li>
      <li><strong>Zero downtime tolerance:</strong> Cost of downtime extremely high</li>
      <li><strong>Read-heavy workloads:</strong> More reads than writes</li>
      <li><strong>Microservices architecture:</strong> Stateless services that can scale horizontally</li>
      <li><strong>Cloud-native applications:</strong> Designed for distributed environments</li>
    </ul>

    <h4>Choose Active-Passive When:</h4>
    <ul>
      <li><strong>Strong consistency required:</strong> Financial or critical data systems</li>
      <li><strong>Limited technical expertise:</strong> Simpler to manage and troubleshoot</li>
      <li><strong>Stateful applications:</strong> Complex state management requirements</li>
      <li><strong>Legacy system constraints:</strong> Existing systems not designed for distribution</li>
      <li><strong>Regulatory compliance:</strong> Strict audit and data control requirements</li>
      <li><strong>Budget constraints:</strong> Lower operational complexity costs</li>
    </ul>

    <h3>Best Practices</h3>
    
    <h4>For Active-Active Systems</h4>
    <ul>
      <li><strong>Implement robust conflict resolution:</strong> Handle concurrent updates gracefully</li>
      <li><strong>Use appropriate load balancing:</strong> Round-robin, least connections, or geographic</li>
      <li><strong>Comprehensive health checks:</strong> Monitor application and infrastructure layers</li>
      <li><strong>Consider data partitioning:</strong> Shard data to reduce conflicts</li>
      <li><strong>Session management:</strong> Use distributed sessions or stateless design</li>
      <li><strong>Circuit breakers:</strong> Prevent cascade failures between nodes</li>
    </ul>

    <h4>For Active-Passive Systems</h4>
    <ul>
      <li><strong>Regular failover testing:</strong> Practice disaster recovery procedures</li>
      <li><strong>Monitor replication lag:</strong> Ensure data synchronization is current</li>
      <li><strong>Automated failover logic:</strong> Implement carefully with proper safeguards</li>
      <li><strong>Maintain clear runbooks:</strong> Document procedures for manual intervention</li>
      <li><strong>Keep passive nodes updated:</strong> Regular patching and maintenance</li>
      <li><strong>Network redundancy:</strong> Multiple paths between active and passive sites</li>
    </ul>

    <div class="reference-links">
      <h4>References</h4>
      <ul>
        <li><a href="https://aws.amazon.com/builders-library/static-stability-using-availability-zones/" target="_blank">AWS: Static Stability Using Availability Zones</a></li>
        <li><a href="https://netflixtechblog.com/active-active-for-multi-regional-resiliency-c47719f6685b" target="_blank">Netflix: Active-Active for Multi-Regional Resiliency</a></li>
        <li><a href="https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/dmz/secure-vnet-dmz" target="_blank">Microsoft: High Availability Architecture Patterns</a></li>
      </ul>
    </div>
  `
}; 