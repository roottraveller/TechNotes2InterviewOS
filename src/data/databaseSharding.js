export const databaseSharding = {
  id: 'database-sharding',
  title: 'Database Sharding',
  content: `
    <h2>Database Sharding</h2>
    <p>Database sharding is a database architecture pattern that involves splitting a large database into smaller, more manageable pieces called shards, distributed across multiple servers.</p>

    <h3>What is Sharding?</h3>
    
    <h4>Definition</h4>
    <ul>
      <li>Horizontal partitioning of data across multiple database instances</li>
      <li>Each shard contains a subset of the total data</li>
      <li>Shards are independent and can be hosted on different servers</li>
      <li>Application logic determines which shard to query</li>
    </ul>

    <h4>Sharding vs Partitioning</h4>
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Partitioning</th>
          <th>Sharding</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Scope</strong></td>
          <td>Single database instance</td>
          <td>Multiple database instances</td>
        </tr>
        <tr>
          <td><strong>Hardware</strong></td>
          <td>Same server</td>
          <td>Different servers</td>
        </tr>
        <tr>
          <td><strong>Scalability</strong></td>
          <td>Vertical scaling</td>
          <td>Horizontal scaling</td>
        </tr>
        <tr>
          <td><strong>Complexity</strong></td>
          <td>Lower</td>
          <td>Higher</td>
        </tr>
      </tbody>
    </table>

    <h3>Sharding Strategies</h3>

    <h4>1. Range-Based Sharding</h4>
    <ul>
      <li>Data divided based on ranges of shard key values</li>
      <li>Example: Users A-M on Shard 1, N-Z on Shard 2</li>
      <li><strong>Pros:</strong> Simple to implement, range queries efficient</li>
      <li><strong>Cons:</strong> Potential hotspots, uneven distribution</li>
    </ul>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Range-based sharding example
function getShardByRange(userId) {
  const firstChar = userId.charAt(0).toUpperCase();
  if (firstChar >= 'A' && firstChar <= 'M') {
    return 'shard1';
  } else {
    return 'shard2';
  }
}

// Query routing
const shard = getShardByRange('john_doe');
const user = await shards[shard].query('SELECT * FROM users WHERE id = ?', [userId]);</code></pre>
    </div>

    <h4>2. Hash-Based Sharding</h4>
    <ul>
      <li>Hash function applied to shard key</li>
      <li>Result determines target shard</li>
      <li><strong>Pros:</strong> Even distribution, no hotspots</li>
      <li><strong>Cons:</strong> Range queries difficult, resharding complex</li>
    </ul>

    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Hash-based sharding
function getShardByHash(userId, numShards) {
  const hash = hashFunction(userId);
  return hash % numShards;
}

// Consistent hashing for better resharding
class ConsistentHashRing {
  constructor() {
    this.ring = new Map();
    this.sortedKeys = [];
  }

  addShard(shardId) {
    for (let i = 0; i < 100; i++) { // Virtual nodes
      const key = hashFunction(\`\${shardId}:\${i}\`);
      this.ring.set(key, shardId);
    }
    this.sortedKeys = Array.from(this.ring.keys()).sort((a, b) => a - b);
  }

  getShard(key) {
    const hash = hashFunction(key);
    const index = this.sortedKeys.findIndex(k => k >= hash);
    const targetKey = index === -1 ? this.sortedKeys[0] : this.sortedKeys[index];
    return this.ring.get(targetKey);
  }
}</code></pre>
    </div>

    <h4>3. Directory-Based Sharding</h4>
    <ul>
      <li>Lookup service maintains mapping of keys to shards</li>
      <li>Flexible shard assignment</li>
      <li><strong>Pros:</strong> Dynamic rebalancing, complex routing logic</li>
      <li><strong>Cons:</strong> Additional complexity, lookup service bottleneck</li>
    </ul>

    <h4>4. Geographic Sharding</h4>
    <ul>
      <li>Data distributed based on geographic location</li>
      <li>Reduces latency for location-based queries</li>
      <li>Compliance with data residency requirements</li>
    </ul>

    <h3>Shard Key Selection</h3>

    <h4>Characteristics of Good Shard Keys</h4>
    <ul>
      <li><strong>High Cardinality:</strong> Many distinct values</li>
      <li><strong>Even Distribution:</strong> Values spread uniformly</li>
      <li><strong>Query Pattern Alignment:</strong> Supports common queries</li>
      <li><strong>Immutable:</strong> Values don't change over time</li>
    </ul>

    <h4>Common Shard Key Patterns</h4>
    <table>
      <thead>
        <tr>
          <th>Pattern</th>
          <th>Use Case</th>
          <th>Example</th>
          <th>Considerations</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>User ID</strong></td>
          <td>User-centric applications</td>
          <td>Social media, e-commerce</td>
          <td>Good for user-specific queries</td>
        </tr>
        <tr>
          <td><strong>Timestamp</strong></td>
          <td>Time-series data</td>
          <td>Logs, metrics, events</td>
          <td>Hot spots on recent data</td>
        </tr>
        <tr>
          <td><strong>Geographic Region</strong></td>
          <td>Location-based services</td>
          <td>Ride sharing, delivery</td>
          <td>Uneven geographic distribution</td>
        </tr>
        <tr>
          <td><strong>Tenant ID</strong></td>
          <td>Multi-tenant applications</td>
          <td>SaaS platforms</td>
          <td>Tenant size variations</td>
        </tr>
      </tbody>
    </table>

    <h3>Cross-Shard Operations</h3>

    <h4>Challenges</h4>
    <ul>
      <li>Queries spanning multiple shards</li>
      <li>Distributed transactions</li>
      <li>Maintaining referential integrity</li>
      <li>Aggregations across shards</li>
    </ul>

    <h4>Solutions</h4>

    <h5>Scatter-Gather Pattern</h5>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Scatter-gather for cross-shard queries
async function searchUsersAcrossShards(searchTerm) {
  const promises = shards.map(shard => 
    shard.query('SELECT * FROM users WHERE name LIKE ?', [\`%\${searchTerm}%\`])
  );
  
  const results = await Promise.all(promises);
  return results.flat().sort((a, b) => a.name.localeCompare(b.name));
}

// Aggregation across shards
async function getTotalUserCount() {
  const promises = shards.map(shard => 
    shard.query('SELECT COUNT(*) as count FROM users')
  );
  
  const results = await Promise.all(promises);
  return results.reduce((total, result) => total + result[0].count, 0);
}</code></pre>
    </div>

    <h5>Denormalization</h5>
    <ul>
      <li>Replicate frequently accessed data across shards</li>
      <li>Trade storage for query performance</li>
      <li>Eventual consistency considerations</li>
    </ul>

    <h3>Resharding Strategies</h3>

    <h4>When to Reshard</h4>
    <ul>
      <li>Uneven data distribution (hotspots)</li>
      <li>Individual shard reaching capacity limits</li>
      <li>Performance degradation</li>
      <li>Adding or removing shards</li>
    </ul>

    <h4>Resharding Approaches</h4>

    <h5>1. Stop-and-Copy</h5>
    <ul>
      <li>Stop application, redistribute data, restart</li>
      <li>Simple but requires downtime</li>
      <li>Suitable for smaller datasets</li>
    </ul>

    <h5>2. Online Resharding</h5>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Online resharding process
class OnlineResharding {
  async reshard(sourceShards, targetShards) {
    // Phase 1: Start dual writes
    await this.enableDualWrites(sourceShards, targetShards);
    
    // Phase 2: Copy existing data
    await this.copyExistingData(sourceShards, targetShards);
    
    // Phase 3: Switch reads to new shards
    await this.switchReads(targetShards);
    
    // Phase 4: Stop dual writes, cleanup old shards
    await this.cleanup(sourceShards);
  }
  
  async enableDualWrites(sourceShards, targetShards) {
    // Write to both old and new shards
    this.dualWriteMode = true;
  }
  
  async copyExistingData(sourceShards, targetShards) {
    // Background process to copy data
    for (const sourceShard of sourceShards) {
      await this.copyShardData(sourceShard, targetShards);
    }
  }
}</code></pre>
    </div>

    <h3>Monitoring and Maintenance</h3>

    <h4>Key Metrics</h4>
    <ul>
      <li><strong>Shard Distribution:</strong> Data size per shard</li>
      <li><strong>Query Performance:</strong> Response times per shard</li>
      <li><strong>Hot Spots:</strong> Uneven query distribution</li>
      <li><strong>Cross-Shard Queries:</strong> Frequency and performance</li>
      <li><strong>Connection Pool Usage:</strong> Per-shard connections</li>
    </ul>

    <h4>Maintenance Tasks</h4>
    <ul>
      <li>Regular rebalancing based on usage patterns</li>
      <li>Monitoring shard health and performance</li>
      <li>Backup and recovery procedures per shard</li>
      <li>Schema migrations across all shards</li>
    </ul>

    <h3>Advantages and Disadvantages</h3>

    <h4>Advantages</h4>
    <ul>
      <li><strong>Horizontal Scalability:</strong> Add more servers as needed</li>
      <li><strong>Performance:</strong> Smaller datasets, faster queries</li>
      <li><strong>Fault Isolation:</strong> Failure affects only one shard</li>
      <li><strong>Geographic Distribution:</strong> Data closer to users</li>
    </ul>

    <h4>Disadvantages</h4>
    <ul>
      <li><strong>Complexity:</strong> Application and operational complexity</li>
      <li><strong>Cross-Shard Operations:</strong> Difficult and expensive</li>
      <li><strong>Rebalancing:</strong> Complex resharding operations</li>
      <li><strong>Consistency:</strong> Maintaining consistency across shards</li>
    </ul>

    <h3>Alternatives to Sharding</h3>

    <h4>Before Sharding, Consider:</h4>
    <ul>
      <li><strong>Vertical Scaling:</strong> Upgrade hardware resources</li>
      <li><strong>Read Replicas:</strong> Scale read operations</li>
      <li><strong>Caching:</strong> Reduce database load</li>
      <li><strong>Query Optimization:</strong> Improve existing queries</li>
      <li><strong>Archiving:</strong> Move old data to separate storage</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li>Start simple, shard only when necessary</li>
      <li>Choose shard keys carefully based on query patterns</li>
      <li>Design application to be shard-aware from the beginning</li>
      <li>Implement comprehensive monitoring and alerting</li>
      <li>Plan for resharding and rebalancing operations</li>
      <li>Use consistent hashing for better distribution</li>
      <li>Minimize cross-shard operations in application design</li>
      <li>Test failure scenarios and recovery procedures</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Sharding is a powerful technique for scaling databases horizontally, but it introduces significant complexity. Carefully evaluate whether simpler scaling approaches can meet your needs before implementing sharding.</p>
    </div>
  `
}; 