export const optimisticVsPessimisticLocking = {
  id: 'optimistic-vs-pessimistic-locking',
  title: 'Optimistic vs Pessimistic Locking',
  content: `
    <h2>Optimistic vs Pessimistic Locking</h2>
    <p>Two fundamental approaches to handling concurrent access to shared resources in database systems and distributed applications.</p>
    
    <h3>Pessimistic Locking</h3>
    <h4>How it Works</h4>
    <ul>
      <li><strong>Lock First:</strong> Acquire locks before accessing data</li>
      <li><strong>Block Others:</strong> Other transactions wait until lock is released</li>
      <li><strong>Guaranteed Consistency:</strong> Prevents concurrent modifications</li>
      <li><strong>Hold Until Commit:</strong> Locks held for entire transaction duration</li>
    </ul>

    <h4>Advantages</h4>
    <ul>
      <li><strong>Data Integrity:</strong> Guarantees no conflicting updates</li>
      <li><strong>Predictable:</strong> Consistent behavior under high contention</li>
      <li><strong>Simple Logic:</strong> Straightforward to implement and reason about</li>
    </ul>

    <h4>Disadvantages</h4>
    <ul>
      <li><strong>Performance Impact:</strong> Blocking reduces concurrency</li>
      <li><strong>Deadlock Risk:</strong> Can lead to deadlock situations</li>
      <li><strong>Lock Overhead:</strong> Resource consumption for lock management</li>
      <li><strong>Reduced Throughput:</strong> Lower system throughput under contention</li>
    </ul>

    <h3>Optimistic Locking</h3>
    <h4>How it Works</h4>
    <ul>
      <li><strong>Assume No Conflicts:</strong> Don't acquire locks during read/modify</li>
      <li><strong>Version Checking:</strong> Use version numbers or timestamps</li>
      <li><strong>Validate at Commit:</strong> Check for conflicts before committing</li>
      <li><strong>Retry on Conflict:</strong> Rollback and retry if conflict detected</li>
    </ul>

    <h4>Advantages</h4>
    <ul>
      <li><strong>High Concurrency:</strong> No blocking during read/modify phase</li>
      <li><strong>No Deadlocks:</strong> Eliminates deadlock scenarios</li>
      <li><strong>Better Performance:</strong> Higher throughput with low contention</li>
      <li><strong>Scalability:</strong> Scales better with increasing concurrent users</li>
    </ul>

    <h4>Disadvantages</h4>
    <ul>
      <li><strong>Retry Overhead:</strong> Performance degrades with high contention</li>
      <li><strong>Starvation Risk:</strong> Some transactions may never succeed</li>
      <li><strong>Complex Logic:</strong> More complex error handling and retry logic</li>
      <li><strong>Wasted Work:</strong> Rollback means discarding completed work</li>
    </ul>

    <h3>Implementation Examples</h3>
    
    <h4>Pessimistic Locking (SQL)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>-- Acquire exclusive lock
SELECT * FROM accounts 
WHERE account_id = 123 
FOR UPDATE;

-- Perform updates
UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 123;

COMMIT;</code></pre>
    </div>

    <h4>Optimistic Locking (SQL)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>-- Read with version
SELECT balance, version 
FROM accounts 
WHERE account_id = 123;

-- Update with version check
UPDATE accounts 
SET balance = balance - 100, 
    version = version + 1
WHERE account_id = 123 
  AND version = @original_version;

-- Check if update succeeded
IF @@ROWCOUNT = 0 
  ROLLBACK; -- Conflict detected</code></pre>
    </div>

    <h3>When to Use Each Approach</h3>
    
    <h4>Use Pessimistic Locking When:</h4>
    <ul>
      <li><strong>High Contention:</strong> Many concurrent updates to same data</li>
      <li><strong>Critical Data:</strong> Data integrity is paramount</li>
      <li><strong>Long Transactions:</strong> Transactions take significant time</li>
      <li><strong>Simple Requirements:</strong> Straightforward consistency needs</li>
    </ul>

    <h4>Use Optimistic Locking When:</h4>
    <ul>
      <li><strong>Low Contention:</strong> Conflicts are rare</li>
      <li><strong>Read-Heavy Workloads:</strong> More reads than writes</li>
      <li><strong>High Concurrency:</strong> Need maximum throughput</li>
      <li><strong>Web Applications:</strong> Stateless web applications</li>
    </ul>

    <div class="info-note">
      <strong>💡 Best Practice:</strong>
      <p>Many modern systems use a hybrid approach: optimistic locking for most operations with pessimistic locking for critical sections or high-contention scenarios.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://www.scaler.com/topics/dbms/concurrency-control-in-dbms/" target="_blank">Database Concurrency Control</a></li>
        <li><a href="https://vladmihalcea.com/optimistic-vs-pessimistic-locking/" target="_blank">Optimistic vs Pessimistic Locking</a></li>
      </ul>
    </div>
  `
}; 