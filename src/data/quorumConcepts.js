export const quorumConcepts = {
  id: 'quorum-concepts',
  title: 'Quorum Concepts',
  content: `
    <h2>Quorum Concepts in Distributed Systems</h2>
    <p>A quorum is the minimum number of nodes in a distributed system that must agree on an operation for it to be considered successful. Quorums are fundamental to achieving consistency and availability in distributed systems.</p>
    
    <h3>Basic Quorum Definition</h3>
    <ul>
      <li><strong>Minimum Agreement:</strong> Smallest number of nodes required to make decisions</li>
      <li><strong>Majority Rule:</strong> Typically more than half of total nodes (N/2 + 1)</li>
      <li><strong>Fault Tolerance:</strong> System remains operational despite node failures</li>
      <li><strong>Consistency Guarantee:</strong> Prevents conflicting decisions</li>
    </ul>

    <h3>Quorum Mathematics</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>For N total nodes:
- Simple Majority Quorum: Q = ⌊N/2⌋ + 1
- Can tolerate: N - Q failures

Examples:
- 3 nodes: Q = 2, tolerates 1 failure
- 5 nodes: Q = 3, tolerates 2 failures  
- 7 nodes: Q = 4, tolerates 3 failures

General rule: To tolerate F failures, need N ≥ 2F + 1 nodes</code></pre>
    </div>

    <h3>Types of Quorums</h3>
    
    <h4>1. Read Quorum (QR)</h4>
    <ul>
      <li><strong>Purpose:</strong> Number of nodes that must respond to a read operation</li>
      <li><strong>Consistency:</strong> Ensures reading most recent data</li>
      <li><strong>Performance Trade-off:</strong> Higher QR = better consistency, slower reads</li>
      <li><strong>Typical Values:</strong> 1 (eventual consistency) to N (strong consistency)</li>
    </ul>

    <h4>2. Write Quorum (QW)</h4>
    <ul>
      <li><strong>Purpose:</strong> Number of nodes that must acknowledge a write operation</li>
      <li><strong>Durability:</strong> Ensures data is persisted on sufficient nodes</li>
      <li><strong>Performance Trade-off:</strong> Higher QW = better durability, slower writes</li>
      <li><strong>Typical Values:</strong> 1 (fast writes) to N (maximum durability)</li>
    </ul>

    <h3>Quorum Consistency Rules</h3>
    
    <h4>Strong Consistency Condition</h4>
    <ul>
      <li><strong>Formula:</strong> QR + QW > N</li>
      <li><strong>Guarantee:</strong> Read and write quorums overlap</li>
      <li><strong>Result:</strong> Reads always see most recent writes</li>
      <li><strong>Example:</strong> N=5, QR=3, QW=3 (3+3 > 5)</li>
    </ul>

    <h4>Eventual Consistency</h4>
    <ul>
      <li><strong>Formula:</strong> QR + QW ≤ N</li>
      <li><strong>Behavior:</strong> Reads may not see latest writes immediately</li>
      <li><strong>Benefit:</strong> Better performance and availability</li>
      <li><strong>Example:</strong> N=5, QR=1, QW=1 (1+1 ≤ 5)</li>
    </ul>

    <h3>Common Quorum Configurations</h3>
    
    <h4>Configuration Examples</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>N=3 Cluster:
- (QR=1, QW=3): Fast reads, slow writes, strong consistency
- (QR=2, QW=2): Balanced, strong consistency  
- (QR=1, QW=1): Fast operations, eventual consistency

N=5 Cluster:
- (QR=1, QW=5): Read-optimized, strong consistency
- (QR=3, QW=3): Balanced, strong consistency
- (QR=1, QW=3): Write-optimized, strong consistency
- (QR=1, QW=1): Performance-optimized, eventual consistency</code></pre>
    </div>

    <h3>Quorum in Different Systems</h3>
    
    <h4>Apache Cassandra</h4>
    <ul>
      <li><strong>Consistency Levels:</strong> ONE, QUORUM, ALL for reads and writes</li>
      <li><strong>LOCAL_QUORUM:</strong> Quorum within single data center</li>
      <li><strong>EACH_QUORUM:</strong> Quorum in each data center</li>
      <li><strong>Tunable Consistency:</strong> Per-operation consistency levels</li>
    </ul>

    <h4>Amazon DynamoDB</h4>
    <ul>
      <li><strong>Eventually Consistent Reads:</strong> May not reflect recent writes</li>
      <li><strong>Strongly Consistent Reads:</strong> Returns most up-to-date data</li>
      <li><strong>Write Consistency:</strong> Writes acknowledged after majority of nodes</li>
    </ul>

    <h4>MongoDB Replica Sets</h4>
    <ul>
      <li><strong>Write Concern:</strong> Majority write concern ensures quorum</li>
      <li><strong>Read Preference:</strong> Primary, secondary, or majority reads</li>
      <li><strong>Arbiter Nodes:</strong> Participate in elections but don't store data</li>
    </ul>

    <h3>Quorum-Based Algorithms</h3>
    
    <h4>PBFT (Practical Byzantine Fault Tolerance)</h4>
    <ul>
      <li><strong>Requirement:</strong> N ≥ 3F + 1 nodes to tolerate F Byzantine failures</li>
      <li><strong>Phases:</strong> Pre-prepare, prepare, commit phases with quorums</li>
      <li><strong>Safety:</strong> Requires 2F + 1 nodes for each phase</li>
    </ul>

    <h4>Raft Consensus</h4>
    <ul>
      <li><strong>Leader Election:</strong> Requires majority votes to become leader</li>
      <li><strong>Log Replication:</strong> Majority acknowledgment for log entries</li>
      <li><strong>Safety:</strong> Prevents split-brain scenarios</li>
    </ul>

    <h3>Advantages of Quorum Systems</h3>
    <ul>
      <li><strong>Fault Tolerance:</strong> System continues operating despite failures</li>
      <li><strong>Consistency Control:</strong> Tunable consistency guarantees</li>
      <li><strong>Availability:</strong> System available as long as quorum exists</li>
      <li><strong>Flexibility:</strong> Can optimize for reads, writes, or balance</li>
    </ul>

    <h3>Challenges and Limitations</h3>
    <ul>
      <li><strong>Network Partitions:</strong> Quorum may not be reachable during partitions</li>
      <li><strong>Performance Impact:</strong> Higher quorums increase latency</li>
      <li><strong>Resource Usage:</strong> More nodes contacted per operation</li>
      <li><strong>Configuration Complexity:</strong> Choosing optimal quorum sizes</li>
    </ul>

    <h3>Best Practices</h3>
    
    <h4>Quorum Selection</h4>
    <ul>
      <li><strong>Odd Number of Nodes:</strong> Avoid ties in voting scenarios</li>
      <li><strong>Consider Workload:</strong> Read-heavy vs write-heavy applications</li>
      <li><strong>Geographic Distribution:</strong> Account for network latency</li>
      <li><strong>Failure Scenarios:</strong> Plan for expected failure patterns</li>
    </ul>

    <h4>Monitoring and Operations</h4>
    <ul>
      <li><strong>Quorum Health:</strong> Monitor availability of quorum nodes</li>
      <li><strong>Performance Metrics:</strong> Track read/write latencies</li>
      <li><strong>Consistency Monitoring:</strong> Detect consistency violations</li>
      <li><strong>Capacity Planning:</strong> Plan for node additions/removals</li>
    </ul>

    <h3>Real-World Example</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Cassandra CQL with quorum consistency
INSERT INTO users (id, name, email) 
VALUES (1, 'John', 'john@example.com')
USING CONSISTENCY QUORUM;

SELECT * FROM users WHERE id = 1
USING CONSISTENCY QUORUM;</code></pre>
    </div>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Quorums provide a mathematical foundation for achieving consistency and fault tolerance in distributed systems. The choice of quorum size directly impacts the CAP theorem trade-offs between consistency, availability, and partition tolerance.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://cassandra.apache.org/doc/latest/architecture/dynamo.html#quorum" target="_blank">Cassandra Quorum Consistency</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Quorum_(distributed_computing)" target="_blank">Quorum in Distributed Computing</a></li>
      </ul>
    </div>
  `
}; 