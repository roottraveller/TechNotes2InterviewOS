export const hintedHandoff = {
  id: 'hinted-handoff',
  title: 'Hinted Handoff',
  content: `
<p>Hinted handoff is a technique used in distributed databases to improve write availability during temporary node failures by storing write operations intended for unavailable nodes and replaying them when the nodes recover.</p>
    
    <h3>How Hinted Handoff Works</h3>
    <ul>
      <li><strong>Normal Operation:</strong> Writes are sent to designated replica nodes</li>
      <li><strong>Node Failure:</strong> When a replica node is unavailable, coordinator stores a "hint"</li>
      <li><strong>Hint Storage:</strong> Another node temporarily stores the write operation</li>
      <li><strong>Recovery:</strong> When failed node recovers, hints are replayed to synchronize data</li>
    </ul>

    <h3>The Hinting Process</h3>
    
    <h4>Step-by-Step Flow</h4>
    <ol>
      <li><strong>Write Request:</strong> Client sends write to coordinator node</li>
      <li><strong>Replica Selection:</strong> Coordinator identifies target replica nodes</li>
      <li><strong>Failure Detection:</strong> One or more replicas are unavailable</li>
      <li><strong>Hint Creation:</strong> Coordinator creates hint containing write data and target info</li>
      <li><strong>Hint Storage:</strong> Hint stored on available node (often coordinator itself)</li>
      <li><strong>Recovery Detection:</strong> Failed node comes back online</li>
      <li><strong>Hint Replay:</strong> Stored hints are sent to recovered node</li>
      <li><strong>Synchronization:</strong> Node applies missed writes and becomes consistent</li>
    </ol>

    <h3>Example Scenario</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Cluster: Nodes A, B, C, D, E
Replication Factor: 3
Write Key: "user123"
Target Replicas: B, C, D

Scenario:
1. Client writes "user123" data to Node A (coordinator)
2. Node A tries to write to B, C, D
3. Node C is down/unreachable
4. Node A successfully writes to B and D
5. Node A stores hint for Node C: 
   Hint = {target: C, key: "user123", data: {...}, timestamp: T1}
6. When Node C recovers, Node A sends the hint
7. Node C applies the missed write and becomes consistent</code></pre>
    </div>

    <h3>Benefits of Hinted Handoff</h3>
    <ul>
      <li><strong>Improved Availability:</strong> Writes succeed even when some replicas are down</li>
      <li><strong>Eventual Consistency:</strong> Ensures all replicas eventually receive all writes</li>
      <li><strong>Reduced Repair Overhead:</strong> Minimizes data that needs repair mechanisms</li>
      <li><strong>Faster Recovery:</strong> Nodes catch up quickly when they return online</li>
    </ul>

    <h3>Implementation Details</h3>
    
    <h4>Hint Storage</h4>
    <ul>
      <li><strong>Local Storage:</strong> Hints stored on local disk of hinting node</li>
      <li><strong>Hint Format:</strong> Contains target node, key, value, timestamp, TTL</li>
      <li><strong>Compression:</strong> Hints may be compressed to save space</li>
      <li><strong>Batching:</strong> Multiple hints can be batched for efficiency</li>
    </ul>

    <h4>Hint Management</h4>
    <ul>
      <li><strong>TTL (Time To Live):</strong> Hints expire after configured time</li>
      <li><strong>Size Limits:</strong> Maximum hint storage per node</li>
      <li><strong>Cleanup:</strong> Expired hints are periodically cleaned up</li>
      <li><strong>Monitoring:</strong> Track hint queue sizes and replay rates</li>
    </ul>

    <h3>Cassandra Implementation</h3>
    
    <h4>Configuration Parameters</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># cassandra.yaml
hinted_handoff_enabled: true
max_hint_window_in_ms: 10800000  # 3 hours
hinted_handoff_throttle_in_kb: 1024
max_hints_delivery_threads: 2
hints_directory: /var/lib/cassandra/hints
hints_flush_period_in_ms: 10000
max_hints_file_size_in_mb: 128</code></pre>
    </div>

    <h4>Hint Replay Process</h4>
    <ul>
      <li><strong>Detection:</strong> Gossip protocol detects node recovery</li>
      <li><strong>Scheduling:</strong> Hint replay scheduled for recovered node</li>
      <li><strong>Throttling:</strong> Replay rate limited to avoid overwhelming node</li>
      <li><strong>Verification:</strong> Timestamps ensure hints aren't stale</li>
    </ul>

    <h3>DynamoDB Implementation</h3>
    <ul>
      <li><strong>Automatic:</strong> Hinted handoff handled transparently</li>
      <li><strong>Sloppy Quorums:</strong> Writes succeed with temporary replicas</li>
      <li><strong>Anti-entropy:</strong> Background process ensures consistency</li>
      <li><strong>Merkle Trees:</strong> Used to identify inconsistent data</li>
    </ul>

    <h3>Limitations and Challenges</h3>
    
    <h4>Storage Overhead</h4>
    <ul>
      <li><strong>Disk Usage:</strong> Hints consume additional storage space</li>
      <li><strong>Memory Impact:</strong> Hint metadata kept in memory</li>
      <li><strong>I/O Overhead:</strong> Additional disk writes for hint storage</li>
    </ul>

    <h4>Consistency Considerations</h4>
    <ul>
      <li><strong>Temporary Inconsistency:</strong> Data temporarily inconsistent across replicas</li>
      <li><strong>Hint Loss:</strong> If hinting node fails, hints may be lost</li>
      <li><strong>Ordering Issues:</strong> Hints may be applied out of order</li>
    </ul>

    <h4>Performance Impact</h4>
    <ul>
      <li><strong>Write Latency:</strong> Slight increase due to hint creation</li>
      <li><strong>Recovery Load:</strong> Node recovery can be I/O intensive</li>
      <li><strong>Network Traffic:</strong> Additional traffic during hint replay</li>
    </ul>

    <h3>Best Practices</h3>
    
    <h4>Configuration</h4>
    <ul>
      <li><strong>Reasonable TTL:</strong> Set hint TTL based on expected downtime</li>
      <li><strong>Storage Limits:</strong> Configure appropriate hint storage limits</li>
      <li><strong>Throttling:</strong> Set replay throttling to avoid overwhelming recovering nodes</li>
    </ul>

    <h4>Monitoring</h4>
    <ul>
      <li><strong>Hint Queues:</strong> Monitor hint queue sizes per node</li>
      <li><strong>Replay Rates:</strong> Track hint replay throughput</li>
      <li><strong>Storage Usage:</strong> Monitor hint storage consumption</li>
      <li><strong>Failure Patterns:</strong> Identify frequently failing nodes</li>
    </ul>

    <h3>Alternatives and Complementary Techniques</h3>
    
    <h4>Read Repair</h4>
    <ul>
      <li><strong>On-Demand:</strong> Repairs inconsistencies during reads</li>
      <li><strong>Complementary:</strong> Works alongside hinted handoff</li>
      <li><strong>Immediate:</strong> Fixes inconsistencies as they're discovered</li>
    </ul>

    <h4>Anti-Entropy Repair</h4>
    <ul>
      <li><strong>Scheduled:</strong> Periodic full repair operations</li>
      <li><strong>Comprehensive:</strong> Ensures all data is consistent</li>
      <li><strong>Resource Intensive:</strong> Uses significant network and CPU</li>
    </ul>

    <h3>Real-World Considerations</h3>
    <ul>
      <li><strong>Network Partitions:</strong> Long partitions may exceed hint TTL</li>
      <li><strong>Cascading Failures:</strong> Multiple node failures can overwhelm hinting</li>
      <li><strong>Clock Skew:</strong> Time synchronization important for hint ordering</li>
      <li><strong>Capacity Planning:</strong> Account for hint storage in capacity planning</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Hinted handoff is a crucial technique for maintaining high availability in distributed databases, but it's not a complete solution. It works best in combination with other consistency mechanisms like read repair and anti-entropy processes.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://cassandra.apache.org/doc/latest/operating/hints.html" target="_blank">Cassandra Hinted Handoff</a></li>
        <li><a href="https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf" target="_blank">Amazon Dynamo Paper</a></li>
      </ul>
    </div>
`
}; 