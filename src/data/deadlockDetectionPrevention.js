export const deadlockDetectionPrevention = {
  id: 'deadlock-detection-prevention',
  title: 'Deadlock Detection and Prevention',
  content: `
<p>Deadlocks occur when two or more transactions wait indefinitely for each other to release resources. Understanding detection and prevention strategies is crucial for database system design.</p>
    
    <h3>What is a Deadlock?</h3>
    <ul>
      <li><strong>Definition:</strong> Circular wait condition where transactions block each other indefinitely</li>
      <li><strong>Resource Types:</strong> Locks on database objects (tables, rows, pages)</li>
      <li><strong>Impact:</strong> System throughput degradation and transaction failures</li>
      <li><strong>Inevitability:</strong> Cannot be completely eliminated in concurrent systems</li>
    </ul>

    <h3>Deadlock Example</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Time | Transaction A          | Transaction B
-----|------------------------|------------------
T1   | BEGIN                  | BEGIN
T2   | LOCK account_1         |
T3   |                        | LOCK account_2
T4   | -- Try to lock         |
     | account_2 (WAIT)       |
T5   |                        | -- Try to lock
     |                        | account_1 (WAIT)
     | 
     | DEADLOCK! Both transactions wait forever</code></pre>
    </div>

    <h3>Deadlock Prevention Strategies</h3>
    
    <h4>1. Resource Ordering</h4>
    <ul>
      <li><strong>Concept:</strong> Always acquire locks in the same predetermined order</li>
      <li><strong>Implementation:</strong> Order resources by ID, name, or hash value</li>
      <li><strong>Advantage:</strong> Eliminates circular wait conditions</li>
      <li><strong>Limitation:</strong> May not be practical for complex applications</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Good: Always lock accounts in ID order
if (account1_id < account2_id) {
    LOCK account1, account2;
} else {
    LOCK account2, account1;
}</code></pre>
    </div>

    <h4>2. Timeout-Based Prevention</h4>
    <ul>
      <li><strong>Concept:</strong> Set maximum wait time for lock acquisition</li>
      <li><strong>Implementation:</strong> Abort transaction if timeout exceeded</li>
      <li><strong>Advantage:</strong> Simple to implement, bounds wait time</li>
      <li><strong>Limitation:</strong> May abort transactions unnecessarily</li>
    </ul>

    <h4>3. Timestamp-Based Prevention</h4>
    
    <h5>Wait-Die Scheme</h5>
    <ul>
      <li><strong>Rule:</strong> Older transaction waits, younger transaction dies</li>
      <li><strong>Logic:</strong> If TS(Ti) < TS(Tj), Ti waits; else Ti aborts</li>
      <li><strong>Characteristic:</strong> Non-preemptive approach</li>
    </ul>

    <h5>Wound-Wait Scheme</h5>
    <ul>
      <li><strong>Rule:</strong> Older transaction wounds (aborts) younger, younger waits</li>
      <li><strong>Logic:</strong> If TS(Ti) < TS(Tj), Tj aborts; else Ti waits</li>
      <li><strong>Characteristic:</strong> Preemptive approach</li>
    </ul>

    <h3>Deadlock Detection</h3>
    
    <h4>Wait-For Graph</h4>
    <ul>
      <li><strong>Structure:</strong> Directed graph where nodes are transactions</li>
      <li><strong>Edges:</strong> Ti → Tj means Ti waits for resource held by Tj</li>
      <li><strong>Cycle Detection:</strong> Deadlock exists if graph contains cycles</li>
      <li><strong>Algorithm:</strong> Use DFS or similar graph traversal</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Wait-For Graph Example:
T1 → T2 → T3 → T1  (Cycle detected = Deadlock!)

Transactions:
- T1 waits for resource held by T2
- T2 waits for resource held by T3  
- T3 waits for resource held by T1</code></pre>
    </div>

    <h4>Detection Algorithm</h4>
    <ol>
      <li><strong>Build Graph:</strong> Create wait-for graph from current lock states</li>
      <li><strong>Cycle Detection:</strong> Use DFS to detect cycles</li>
      <li><strong>Victim Selection:</strong> Choose transaction to abort if cycle found</li>
      <li><strong>Recovery:</strong> Abort victim and restart if necessary</li>
    </ol>

    <h3>Deadlock Resolution</h3>
    
    <h4>Victim Selection Criteria</h4>
    <ul>
      <li><strong>Age:</strong> Abort younger transactions (less work lost)</li>
      <li><strong>Progress:</strong> Abort transaction with least progress</li>
      <li><strong>Resources:</strong> Abort transaction holding fewest resources</li>
      <li><strong>Rollback Cost:</strong> Minimize rollback overhead</li>
      <li><strong>Priority:</strong> Consider transaction priority levels</li>
    </ul>

    <h4>Recovery Actions</h4>
    <ul>
      <li><strong>Complete Rollback:</strong> Abort entire transaction</li>
      <li><strong>Partial Rollback:</strong> Rollback to savepoint (if supported)</li>
      <li><strong>Resource Release:</strong> Release all locks held by victim</li>
      <li><strong>Restart:</strong> Automatically restart aborted transaction</li>
    </ul>

    <h3>Database System Implementations</h3>
    
    <h4>MySQL InnoDB</h4>
    <ul>
      <li><strong>Detection:</strong> Automatic deadlock detection using wait-for graph</li>
      <li><strong>Resolution:</strong> Abort transaction with smallest number of rows</li>
      <li><strong>Timeout:</strong> innodb_lock_wait_timeout (default 50 seconds)</li>
      <li><strong>Monitoring:</strong> SHOW ENGINE INNODB STATUS</li>
    </ul>

    <h4>PostgreSQL</h4>
    <ul>
      <li><strong>Detection:</strong> Periodic deadlock detection (every 1 second)</li>
      <li><strong>Resolution:</strong> Abort one transaction in deadlock cycle</li>
      <li><strong>Timeout:</strong> deadlock_timeout parameter</li>
      <li><strong>Logging:</strong> Log deadlock details for analysis</li>
    </ul>

    <h4>SQL Server</h4>
    <ul>
      <li><strong>Detection:</strong> Lock monitor checks every 5 seconds</li>
      <li><strong>Resolution:</strong> Choose deadlock victim based on cost</li>
      <li><strong>Priority:</strong> SET DEADLOCK_PRIORITY to influence victim selection</li>
      <li><strong>Monitoring:</strong> Deadlock graph events and traces</li>
    </ul>

    <h3>Best Practices</h3>
    
    <h4>Application Design</h4>
    <ul>
      <li><strong>Short Transactions:</strong> Keep transactions as brief as possible</li>
      <li><strong>Consistent Ordering:</strong> Access resources in consistent order</li>
      <li><strong>Avoid User Interaction:</strong> Don't wait for user input during transactions</li>
      <li><strong>Use Appropriate Isolation:</strong> Use lowest isolation level that meets requirements</li>
    </ul>

    <h4>Database Design</h4>
    <ul>
      <li><strong>Proper Indexing:</strong> Reduce lock duration with efficient queries</li>
      <li><strong>Partitioning:</strong> Reduce contention through data partitioning</li>
      <li><strong>Lock Granularity:</strong> Use row-level locking when possible</li>
      <li><strong>Connection Pooling:</strong> Manage connections efficiently</li>
    </ul>

    <h4>Monitoring and Debugging</h4>
    <ul>
      <li><strong>Deadlock Logs:</strong> Enable and monitor deadlock logging</li>
      <li><strong>Lock Waits:</strong> Monitor lock wait times and patterns</li>
      <li><strong>Query Analysis:</strong> Identify problematic query patterns</li>
      <li><strong>Load Testing:</strong> Test under realistic concurrent loads</li>
    </ul>

    <h3>Deadlock Monitoring Queries</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>-- MySQL: Check recent deadlocks
SHOW ENGINE INNODB STATUS;

-- PostgreSQL: Enable deadlock logging
SET log_lock_waits = on;
SET deadlock_timeout = '1s';

-- SQL Server: Deadlock graph
SELECT * FROM sys.dm_exec_requests 
WHERE blocking_session_id > 0;</code></pre>
    </div>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Deadlocks are a natural consequence of concurrent access patterns. The goal is not to eliminate them entirely but to detect and resolve them quickly with minimal impact on system performance.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html" target="_blank">MySQL InnoDB Deadlocks</a></li>
        <li><a href="https://www.postgresql.org/docs/current/explicit-locking.html" target="_blank">PostgreSQL Explicit Locking</a></li>
      </ul>
    </div>
`
}; 