export const timestampingProtocol = {
  id: 'timestamping-protocol',
  title: 'Timestamping Protocol',
  content: `
<p>A concurrency control method that uses timestamps to order transactions and ensure serializability without using locks, thereby avoiding deadlocks.</p>
    
    <h3>How Timestamping Works</h3>
    <ul>
      <li><strong>Unique Timestamps:</strong> Each transaction gets a unique timestamp when it starts</li>
      <li><strong>Ordering:</strong> Timestamps define the serialization order of transactions</li>
      <li><strong>Data Item Timestamps:</strong> Each data item maintains read and write timestamps</li>
      <li><strong>Conflict Resolution:</strong> Uses timestamp comparison to resolve conflicts</li>
    </ul>

    <h3>Timestamp Assignment</h3>
    <h4>Common Methods:</h4>
    <ul>
      <li><strong>System Clock:</strong> Use current system time</li>
      <li><strong>Logical Counter:</strong> Incrementing counter for each transaction</li>
      <li><strong>Transaction ID:</strong> Use unique transaction identifier</li>
      <li><strong>Hybrid Approach:</strong> Combination of system time and counter</li>
    </ul>

    <h3>Data Item Metadata</h3>
    <p>Each data item X maintains:</p>
    <ul>
      <li><strong>R-timestamp(X):</strong> Timestamp of last transaction that read X</li>
      <li><strong>W-timestamp(X):</strong> Timestamp of last transaction that wrote X</li>
      <li><strong>Value:</strong> Current value of the data item</li>
    </ul>

    <h3>Basic Timestamp Ordering Protocol</h3>
    
    <h4>Read Operation Rules</h4>
    <p>When transaction Ti wants to read data item X:</p>
    <ol>
      <li><strong>Check Write Timestamp:</strong> If TS(Ti) < W-timestamp(X), abort Ti (reading obsolete data)</li>
      <li><strong>Allow Read:</strong> If TS(Ti) ≥ W-timestamp(X), allow read</li>
      <li><strong>Update R-timestamp:</strong> Set R-timestamp(X) = max(R-timestamp(X), TS(Ti))</li>
    </ol>

    <h4>Write Operation Rules</h4>
    <p>When transaction Ti wants to write data item X:</p>
    <ol>
      <li><strong>Check Read Timestamp:</strong> If TS(Ti) < R-timestamp(X), abort Ti (overwriting needed data)</li>
      <li><strong>Check Write Timestamp:</strong> If TS(Ti) < W-timestamp(X), abort Ti (obsolete write)</li>
      <li><strong>Allow Write:</strong> If both checks pass, allow write</li>
      <li><strong>Update W-timestamp:</strong> Set W-timestamp(X) = TS(Ti)</li>
    </ol>

    <h3>Example Execution</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Initial State:
Data Item A: R-ts(A)=0, W-ts(A)=0, Value=100
Data Item B: R-ts(B)=0, W-ts(B)=0, Value=200

Transaction T1 (TS=10):
1. Read A: TS(10) ≥ W-ts(0) ✓ → R-ts(A)=10
2. Write B: TS(10) ≥ R-ts(0) and TS(10) ≥ W-ts(0) ✓ → W-ts(B)=10

Transaction T2 (TS=5):
3. Read A: TS(5) ≥ W-ts(0) ✓ → R-ts(A)=max(10,5)=10
4. Write A: TS(5) < R-ts(10) ✗ → ABORT T2</code></pre>
    </div>

    <h3>Timestamp Ordering Variants</h3>
    
    <h4>1. Basic Timestamp Ordering</h4>
    <ul>
      <li><strong>Strict Rules:</strong> Follows basic read/write rules</li>
      <li><strong>High Abort Rate:</strong> Many transactions may be aborted</li>
      <li><strong>No Deadlocks:</strong> Eliminates deadlock possibility</li>
    </ul>

    <h4>2. Conservative Timestamp Ordering</h4>
    <ul>
      <li><strong>Wait for Smaller Timestamps:</strong> Wait for all smaller timestamp transactions</li>
      <li><strong>Reduced Aborts:</strong> Fewer transaction aborts</li>
      <li><strong>Increased Waiting:</strong> More waiting time</li>
    </ul>

    <h4>3. Multiversion Timestamp Ordering</h4>
    <ul>
      <li><strong>Multiple Versions:</strong> Maintain multiple versions of each data item</li>
      <li><strong>Version Selection:</strong> Read appropriate version based on timestamp</li>
      <li><strong>Better Concurrency:</strong> Reduces conflicts and aborts</li>
    </ul>

    <h3>Thomas Write Rule</h3>
    <p>An optimization for write operations:</p>
    <ul>
      <li><strong>Obsolete Write Detection:</strong> If TS(Ti) < W-timestamp(X), instead of aborting</li>
      <li><strong>Ignore Write:</strong> Simply ignore the write operation (don't abort)</li>
      <li><strong>Reasoning:</strong> The write is obsolete and won't affect final result</li>
      <li><strong>Benefit:</strong> Reduces unnecessary transaction aborts</li>
    </ul>

    <h3>Advantages</h3>
    <ul>
      <li><strong>Deadlock-Free:</strong> No possibility of deadlocks</li>
      <li><strong>No Lock Management:</strong> Eliminates lock overhead</li>
      <li><strong>Guaranteed Progress:</strong> System always makes progress</li>
      <li><strong>Serializability:</strong> Ensures serializable execution</li>
    </ul>

    <h3>Disadvantages</h3>
    <ul>
      <li><strong>High Abort Rate:</strong> Many transactions may be aborted and restarted</li>
      <li><strong>Starvation:</strong> Long-running transactions may be repeatedly aborted</li>
      <li><strong>Timestamp Overhead:</strong> Maintaining timestamps for all data items</li>
      <li><strong>Cascading Rollbacks:</strong> Uncommitted data may cause cascading aborts</li>
    </ul>

    <h3>Comparison with 2PL</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Aspect              | 2PL           | Timestamping
--------------------|---------------|-------------
Deadlocks           | Possible      | Impossible
Lock Management     | Required      | Not Required
Abort Rate          | Lower         | Higher
Starvation          | Possible      | Possible
Implementation      | Complex       | Simpler
Concurrency         | Moderate      | Higher (with MVCC)</code></pre>
    </div>

    <h3>Real-World Applications</h3>
    <ul>
      <li><strong>Distributed Databases:</strong> Useful in distributed transaction processing</li>
      <li><strong>Real-Time Systems:</strong> Predictable behavior for real-time applications</li>
      <li><strong>MVCC Systems:</strong> Combined with multiversion concurrency control</li>
      <li><strong>Conflict Resolution:</strong> Used in replicated database systems</li>
    </ul>

    <div class="info-note">
      <strong>💡 Modern Usage:</strong>
      <p>While pure timestamping protocols are less common in commercial databases, the concepts are widely used in distributed systems, NoSQL databases, and multiversion concurrency control systems.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://www.scaler.com/topics/dbms/timestamp-based-protocol/" target="_blank">Timestamp-Based Protocol</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Timestamp-based_concurrency_control" target="_blank">Timestamp-Based Concurrency Control</a></li>
      </ul>
    </div>
`
}; 