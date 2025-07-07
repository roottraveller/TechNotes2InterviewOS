export const verticalVsHorizontalScaling = {
  id: 'vertical-vs-horizontal-scaling',
  title: 'Vertical vs Horizontal Scaling',
  content: `
    <h2>Vertical Scaling vs Horizontal Scaling</h2>
    <p>Scaling is the capability of a system to handle increased load. There are two primary approaches to scaling: vertical scaling (scaling up) and horizontal scaling (scaling out). Each has its own advantages, limitations, and use cases.</p>

    <h3>Vertical Scaling (Scale Up)</h3>
    <p>Vertical scaling involves adding more power (CPU, RAM, Storage) to an existing server. It's like upgrading your computer with better components.</p>
    
    <h4>Characteristics</h4>
    <ul>
      <li><strong>Single Machine:</strong> Upgrade existing hardware</li>
      <li><strong>More Resources:</strong> Add CPU, RAM, SSD, GPU</li>
      <li><strong>Simplicity:</strong> No application changes needed</li>
      <li><strong>Immediate Effect:</strong> Instant performance boost</li>
      <li><strong>Limited by Hardware:</strong> Physical constraints exist</li>
    </ul>

    <h4>Advantages</h4>
    <ul>
      <li><strong>Simple Implementation:</strong> No code changes required</li>
      <li><strong>Data Consistency:</strong> No distributed system complexity</li>
      <li><strong>Lower Latency:</strong> No network calls between nodes</li>
      <li><strong>Licensing:</strong> Often cheaper software licenses</li>
      <li><strong>Administration:</strong> Easier to manage one server</li>
    </ul>

    <h4>Disadvantages</h4>
    <ul>
      <li><strong>Hardware Limits:</strong> Maximum capacity constraints</li>
      <li><strong>Single Point of Failure:</strong> One server down = system down</li>
      <li><strong>Expensive:</strong> High-end hardware costs exponentially more</li>
      <li><strong>Downtime:</strong> Upgrades require system shutdown</li>
      <li><strong>Diminishing Returns:</strong> Performance gains decrease</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Vertical Scaling Example
// Before: Small EC2 Instance
{
  "instance_type": "t2.micro",
  "vCPU": 1,
  "memory": "1 GB",
  "network": "Low to Moderate",
  "cost": "$0.0116/hour"
}

// After: Large EC2 Instance
{
  "instance_type": "m5.24xlarge",
  "vCPU": 96,
  "memory": "384 GB",
  "network": "25 Gbps",
  "cost": "$4.608/hour"
}

// According to Amazon RDS, you can get a database 
// server with 24 TB of RAM!
{
  "instance_type": "db.x1e.32xlarge",
  "vCPU": 128,
  "memory": "3,904 GB",
  "storage": "Up to 64 TB",
  "cost": "$26.688/hour"
}</code></pre>
    </div>

    <h3>Horizontal Scaling (Scale Out)</h3>
    <p>Horizontal scaling involves adding more servers to your resource pool. It's like adding more computers to work together.</p>
    
    <h4>Characteristics</h4>
    <ul>
      <li><strong>Multiple Machines:</strong> Add more servers</li>
      <li><strong>Distributed System:</strong> Load spread across nodes</li>
      <li><strong>Complexity:</strong> Requires architecture changes</li>
      <li><strong>Theoretically Limitless:</strong> Keep adding servers</li>
      <li><strong>Load Balancing:</strong> Distribute requests</li>
    </ul>

    <h4>Advantages</h4>
    <ul>
      <li><strong>Fault Tolerance:</strong> System survives node failures</li>
      <li><strong>Cost Effective:</strong> Use commodity hardware</li>
      <li><strong>Incremental Growth:</strong> Add capacity as needed</li>
      <li><strong>Geographic Distribution:</strong> Servers in multiple locations</li>
      <li><strong>No Downtime:</strong> Add nodes without stopping</li>
    </ul>

    <h4>Disadvantages</h4>
    <ul>
      <li><strong>Complexity:</strong> Distributed system challenges</li>
      <li><strong>Data Consistency:</strong> Synchronization issues</li>
      <li><strong>Network Latency:</strong> Inter-node communication</li>
      <li><strong>Development Effort:</strong> Application must support it</li>
      <li><strong>Administration:</strong> More servers to manage</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Horizontal Scaling Example
// Before: Single Server
┌─────────────────┐
│   Web Server    │
│   Database      │
│   Application   │
│  (All-in-One)   │
└─────────────────┘

// After: Distributed System
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Web Server 1│  │ Web Server 2│  │ Web Server 3│
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────────────┴────────────────┘
                       │
                Load Balancer
                       │
       ┌───────────────┴───────────────┐
       │                               │
┌──────▼──────┐                ┌──────▼──────┐
│   App       │                │   App       │
│  Server 1   │                │  Server 2   │
└──────┬──────┘                └──────┬──────┘
       │                               │
       └───────────────┬───────────────┘
                       │
              ┌────────▼────────┐
              │   Database      │
              │   Cluster       │
              └─────────────────┘</code></pre>
    </div>

    <h3>Comparison Table</h3>
    
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Vertical Scaling</th>
          <th>Horizontal Scaling</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Approach</td>
          <td>Add resources to single node</td>
          <td>Add more nodes</td>
        </tr>
        <tr>
          <td>Complexity</td>
          <td>Simple</td>
          <td>Complex</td>
        </tr>
        <tr>
          <td>Fault Tolerance</td>
          <td>Single point of failure</td>
          <td>High availability</td>
        </tr>
        <tr>
          <td>Performance Limit</td>
          <td>Hardware constraints</td>
          <td>Theoretically unlimited</td>
        </tr>
        <tr>
          <td>Cost Pattern</td>
          <td>Exponential</td>
          <td>Linear</td>
        </tr>
        <tr>
          <td>Data Consistency</td>
          <td>Simple</td>
          <td>Complex</td>
        </tr>
        <tr>
          <td>Downtime</td>
          <td>Required for upgrades</td>
          <td>Zero downtime possible</td>
        </tr>
        <tr>
          <td>Load Balancing</td>
          <td>Not needed</td>
          <td>Essential</td>
        </tr>
      </tbody>
    </table>

    <h3>When to Use Vertical Scaling</h3>
    
    <h4>Good Use Cases</h4>
    <ul>
      <li><strong>Legacy Applications:</strong> Can't be distributed</li>
      <li><strong>Databases:</strong> ACID compliance requirements</li>
      <li><strong>Quick Fixes:</strong> Temporary performance boost</li>
      <li><strong>Small Applications:</strong> Simple architecture</li>
      <li><strong>Predictable Load:</strong> Known maximum capacity</li>
    </ul>

    <h4>Examples</h4>
    <ul>
      <li>Traditional RDBMS (MySQL, PostgreSQL)</li>
      <li>In-memory caches (Redis single instance)</li>
      <li>Development environments</li>
      <li>Small business applications</li>
    </ul>

    <h3>When to Use Horizontal Scaling</h3>
    
    <h4>Good Use Cases</h4>
    <ul>
      <li><strong>Web Applications:</strong> Stateless services</li>
      <li><strong>Microservices:</strong> Distributed by design</li>
      <li><strong>Big Data:</strong> Massive datasets</li>
      <li><strong>Global Applications:</strong> Geographic distribution</li>
      <li><strong>Variable Load:</strong> Unpredictable traffic</li>
    </ul>

    <h4>Examples</h4>
    <ul>
      <li>Web servers (Nginx, Apache)</li>
      <li>NoSQL databases (Cassandra, MongoDB)</li>
      <li>Container orchestration (Kubernetes)</li>
      <li>Content delivery networks</li>
      <li>Search engines (Elasticsearch)</li>
    </ul>

    <h3>Hybrid Approach</h3>
    
    <p>Many systems use both scaling strategies:</p>
    
    <h4>Database Example</h4>
    <ul>
      <li><strong>Vertical:</strong> Scale up master database</li>
      <li><strong>Horizontal:</strong> Add read replicas</li>
      <li><strong>Result:</strong> High write performance + read scalability</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Hybrid Scaling Architecture
┌─────────────────┐
│  Load Balancer  │
└────────┬────────┘
         │
┌────────▼────────┐
│  Web Tier       │
│  (Horizontal)   │
│  ┌───┐ ┌───┐   │
│  │N1 │ │N2 │...│
│  └───┘ └───┘   │
└────────┬────────┘
         │
┌────────▼────────┐
│   App Tier      │
│  (Horizontal)   │
│  ┌───┐ ┌───┐   │
│  │A1 │ │A2 │...│
│  └───┘ └───┘   │
└────────┬────────┘
         │
┌────────▼────────┐
│  Database       │
│  (Vertical +    │
│   Read Replicas)│
│  ┌─────────┐   │
│  │ Master  │   │
│  │(Scaled) │   │
│  └────┬────┘   │
│       │        │
│  ┌────▼───┐    │
│  │Replicas│    │
│  └────────┘    │
└─────────────────┘</code></pre>
    </div>

    <h3>Implementation Considerations</h3>
    
    <h4>For Vertical Scaling</h4>
    <ul>
      <li><strong>Monitor Resources:</strong> CPU, memory, disk I/O</li>
      <li><strong>Plan Downtime:</strong> Schedule maintenance windows</li>
      <li><strong>Backup First:</strong> Before hardware changes</li>
      <li><strong>Test Performance:</strong> Verify improvements</li>
      <li><strong>Cost Analysis:</strong> ROI calculation</li>
    </ul>

    <h4>For Horizontal Scaling</h4>
    <ul>
      <li><strong>Stateless Design:</strong> No server-specific data</li>
      <li><strong>Session Management:</strong> Distributed sessions</li>
      <li><strong>Data Partitioning:</strong> Sharding strategy</li>
      <li><strong>Service Discovery:</strong> Dynamic node registration</li>
      <li><strong>Monitoring:</strong> Distributed tracing</li>
    </ul>

    <h3>Real-World Examples</h3>
    
    <h4>Stack Overflow (Vertical Scaling)</h4>
    <ul>
      <li>Runs on just a few servers</li>
      <li>Massive SQL Server instances</li>
      <li>All data in RAM model</li>
      <li>Proves vertical scaling can go far</li>
    </ul>

    <h4>Netflix (Horizontal Scaling)</h4>
    <ul>
      <li>Thousands of microservices</li>
      <li>Auto-scaling based on demand</li>
      <li>Geographic distribution</li>
      <li>Fault tolerance built-in</li>
    </ul>

    <h3>Cost Considerations</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Cost Comparison Example (AWS)

// Vertical Scaling
1 x m5.24xlarge = $4.608/hour
Total: $4.608/hour

// Horizontal Scaling (equivalent capacity)
24 x m5.xlarge = 24 x $0.192/hour = $4.608/hour
Total: $4.608/hour (same cost, better availability)

// But consider:
- Load balancer costs
- Data transfer between nodes
- Operational complexity
- Software licensing (per node vs per core)</code></pre>
    </div>

    <h3>Future Trends</h3>
    
    <h4>Serverless (Beyond Horizontal)</h4>
    <ul>
      <li>Automatic scaling</li>
      <li>Pay per execution</li>
      <li>No server management</li>
      <li>Example: AWS Lambda, Google Cloud Functions</li>
    </ul>

    <h4>Edge Computing</h4>
    <ul>
      <li>Distributed to edge locations</li>
      <li>Minimal latency</li>
      <li>Geographic scale</li>
      <li>Example: Cloudflare Workers</li>
    </ul>
  `
}; 