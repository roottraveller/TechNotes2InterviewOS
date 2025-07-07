export const activeActiveVsActivePassive = {
  id: 'active-active-vs-active-passive',
  title: 'Active-Active vs Active-Passive',
  content: `
    <h2>Active-Active vs Active-Passive (Hot/Cold) Setup</h2>
    <p>Multi-node architectures are fundamental patterns for achieving high availability, fault tolerance, and scalability in distributed systems. The choice between active-active and active-passive configurations significantly impacts system performance, complexity, and resource utilization.</p>

    <h3>Active-Active Configuration</h3>
    <p>In an active-active configuration, all servers or resources in the system are actively serving traffic and processing requests simultaneously.</p>
    
    <h4>Characteristics</h4>
    <ul>
      <li><strong>All nodes active:</strong> Every server handles production traffic</li>
      <li><strong>Load distribution:</strong> Traffic is distributed across all nodes</li>
      <li><strong>Resource utilization:</strong> Maximum use of available resources</li>
      <li><strong>No idle capacity:</strong> All servers contribute to processing</li>
      <li><strong>Symmetric design:</strong> All nodes have equal capabilities</li>
    </ul>

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
      <li><strong>Higher cost:</strong> All nodes need full capacity</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
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
    <p>In an active-passive configuration, one server (or a group of servers) is designated as active (hot), while the remaining servers are passive (cold) or standby. When an active or hot server goes down, one of the passive or cold servers elects itself as a hot server.</p>
    
    <h4>Characteristics</h4>
    <ul>
      <li><strong>Primary/Secondary model:</strong> One active, others standby</li>
      <li><strong>Idle resources:</strong> Passive nodes wait for failover</li>
      <li><strong>Automatic failover:</strong> Passive becomes active on failure</li>
      <li><strong>Data replication:</strong> Continuous sync to passive nodes</li>
      <li><strong>Health monitoring:</strong> Constant checking of active node</li>
    </ul>

    <h4>Advantages</h4>
    <ul>
      <li><strong>Simpler implementation:</strong> No complex synchronization</li>
      <li><strong>Data consistency:</strong> Single source of truth</li>
      <li><strong>Predictable performance:</strong> Known capacity</li>
      <li><strong>Easier troubleshooting:</strong> Single active path</li>
      <li><strong>Lower complexity:</strong> Simpler architecture</li>
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
      <div class="code-label">CODE</div>
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

    <h3>Comparison Table</h3>
    
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
          <td>Resource Utilization</td>
          <td>High (all nodes active)</td>
          <td>Low (passive nodes idle)</td>
        </tr>
        <tr>
          <td>Throughput</td>
          <td>High (distributed load)</td>
          <td>Limited to active node</td>
        </tr>
        <tr>
          <td>Failover Time</td>
          <td>Instant (already active)</td>
          <td>Minutes (activation needed)</td>
        </tr>
        <tr>
          <td>Complexity</td>
          <td>High</td>
          <td>Low</td>
        </tr>
        <tr>
          <td>Data Consistency</td>
          <td>Complex (multi-master)</td>
          <td>Simple (single master)</td>
        </tr>
        <tr>
          <td>Cost Efficiency</td>
          <td>Better (using all resources)</td>
          <td>Worse (idle resources)</td>
        </tr>
        <tr>
          <td>Scalability</td>
          <td>Excellent</td>
          <td>Limited</td>
        </tr>
      </tbody>
    </table>

    <h3>Implementation Examples</h3>
    
    <h4>Active-Active Implementations</h4>
    <ul>
      <li><strong>Database:</strong> Galera Cluster, Cassandra, CockroachDB</li>
      <li><strong>Web Servers:</strong> Multiple Nginx/Apache behind LB</li>
      <li><strong>Application Servers:</strong> Kubernetes pods</li>
      <li><strong>Message Queues:</strong> RabbitMQ cluster</li>
      <li><strong>Cache:</strong> Redis Cluster</li>
    </ul>

    <h4>Active-Passive Implementations</h4>
    <ul>
      <li><strong>Database:</strong> MySQL with replica, PostgreSQL streaming</li>
      <li><strong>File Systems:</strong> DRBD (Distributed Replicated Block Device)</li>
      <li><strong>Applications:</strong> Traditional HA clusters</li>
      <li><strong>Network:</strong> VRRP (Virtual Router Redundancy Protocol)</li>
    </ul>

    <h3>Hybrid Approaches</h3>
    
    <h4>Active-Active with Passive Backup</h4>
    <p>Combines benefits of both approaches:</p>
    <ul>
      <li>Multiple active nodes for normal operation</li>
      <li>Additional passive nodes for disaster recovery</li>
      <li>Best of both worlds but higher cost</li>
    </ul>

    <h4>Read Replicas Pattern</h4>
    <p>Common in database systems:</p>
    <ul>
      <li>Active-Active for read operations</li>
      <li>Active-Passive for write operations</li>
      <li>Balances consistency and performance</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Hybrid Architecture Example
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Primary    │     │   Read      │     │   Read      │
│  (Active)   │────▶│  Replica 1  │     │  Replica 2  │
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

    <h3>Decision Factors</h3>
    
    <h4>Choose Active-Active When:</h4>
    <ul>
      <li>High throughput requirements</li>
      <li>Need for horizontal scaling</li>
      <li>Geographic distribution needed</li>
      <li>Cost of downtime is very high</li>
      <li>Read-heavy workloads</li>
      <li>Microservices architecture</li>
    </ul>

    <h4>Choose Active-Passive When:</h4>
    <ul>
      <li>Simplicity is priority</li>
      <li>Strong consistency required</li>
      <li>Limited technical expertise</li>
      <li>Stateful applications</li>
      <li>Legacy system constraints</li>
      <li>Budget constraints for complexity</li>
    </ul>

    <h3>Best Practices</h3>
    
    <h4>For Active-Active</h4>
    <ul>
      <li><strong>Conflict resolution:</strong> Implement robust mechanisms</li>
      <li><strong>Load balancing:</strong> Use appropriate algorithms</li>
      <li><strong>Health checks:</strong> Comprehensive monitoring</li>
      <li><strong>Data partitioning:</strong> Consider sharding strategies</li>
      <li><strong>Session management:</strong> Use distributed sessions</li>
    </ul>

    <h4>For Active-Passive</h4>
    <ul>
      <li><strong>Failover testing:</strong> Regular drills</li>
      <li><strong>Replication lag:</strong> Monitor closely</li>
      <li><strong>Automated failover:</strong> Implement carefully</li>
      <li><strong>Documentation:</strong> Clear runbooks</li>
      <li><strong>Passive node maintenance:</strong> Keep updated</li>
    </ul>

    <h3>Real-World Examples</h3>
    
    <h4>Netflix (Active-Active)</h4>
    <ul>
      <li>Multiple regions serving content</li>
      <li>Each region fully active</li>
      <li>Chaos engineering for resilience</li>
    </ul>

    <h4>Traditional Banking (Active-Passive)</h4>
    <ul>
      <li>Primary data center active</li>
      <li>DR site on standby</li>
      <li>Scheduled failover tests</li>
    </ul>
  `
}; 