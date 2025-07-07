export const isolationLevels = {
  id: 'isolation-levels',
  title: 'Isolation Levels',
  content: `
    <h2>Transaction Isolation Levels</h2>
    <p>Isolation levels define the degree to which transactions are isolated from each other, balancing data consistency with system performance and concurrency.</p>
    
    <h3>The Four Standard Isolation Levels</h3>
    
    <h4>1. Read Uncommitted (Level 0)</h4>
    <ul>
      <li><strong>Description:</strong> Lowest isolation level, allows dirty reads</li>
      <li><strong>Locks:</strong> No shared locks, minimal exclusive locks</li>
      <li><strong>Allows:</strong> Dirty reads, non-repeatable reads, phantom reads</li>
      <li><strong>Performance:</strong> Highest concurrency, lowest consistency</li>
    </ul>

    <h4>2. Read Committed (Level 1)</h4>
    <ul>
      <li><strong>Description:</strong> Prevents dirty reads but allows other anomalies</li>
      <li><strong>Locks:</strong> Shared locks held only during read operation</li>
      <li><strong>Allows:</strong> Non-repeatable reads, phantom reads</li>
      <li><strong>Common Use:</strong> Default in many database systems</li>
    </ul>

    <h4>3. Repeatable Read (Level 2)</h4>
    <ul>
      <li><strong>Description:</strong> Prevents dirty and non-repeatable reads</li>
      <li><strong>Locks:</strong> Shared locks held until transaction end</li>
      <li><strong>Allows:</strong> Phantom reads (new rows in range queries)</li>
      <li><strong>Use Case:</strong> When consistent reads within transaction are critical</li>
    </ul>

    <h4>4. Serializable (Level 3)</h4>
    <ul>
      <li><strong>Description:</strong> Highest isolation level, prevents all anomalies</li>
      <li><strong>Locks:</strong> Range locks prevent phantom reads</li>
      <li><strong>Allows:</strong> No concurrency anomalies</li>
      <li><strong>Performance:</strong> Lowest concurrency, highest consistency</li>
    </ul>

    <h3>Concurrency Anomalies</h3>
    
    <h4>Dirty Read</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Time | Transaction A          | Transaction B
-----|------------------------|------------------
T1   | BEGIN                  |
T2   |                        | BEGIN
T3   | UPDATE account         |
     | SET balance = 1000     |
T4   |                        | SELECT balance
     |                        | FROM account
     |                        | -- Reads 1000 (dirty)
T5   | ROLLBACK               |
T6   |                        | -- Still thinks balance is 1000!</code></pre>
    </div>

    <h4>Non-Repeatable Read</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Time | Transaction A          | Transaction B
-----|------------------------|------------------
T1   | BEGIN                  |
T2   | SELECT balance         |
     | FROM account           |
     | -- Returns 500         |
T3   |                        | BEGIN
T4   |                        | UPDATE account
     |                        | SET balance = 1000
T5   |                        | COMMIT
T6   | SELECT balance         |
     | FROM account           |
     | -- Returns 1000 (different!)</code></pre>
    </div>

    <h4>Phantom Read</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Time | Transaction A          | Transaction B
-----|------------------------|------------------
T1   | BEGIN                  |
T2   | SELECT COUNT(*)        |
     | FROM account           |
     | WHERE balance > 100    |
     | -- Returns 5           |
T3   |                        | BEGIN
T4   |                        | INSERT INTO account
     |                        | VALUES (999, 200)
T5   |                        | COMMIT
T6   | SELECT COUNT(*)        |
     | FROM account           |
     | WHERE balance > 100    |
     | -- Returns 6 (phantom row!)</code></pre>
    </div>

    <h3>Isolation Level Comparison</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Level              | Dirty | Non-Rep | Phantom | Concurrency
-------------------|-------|---------|---------|------------
Read Uncommitted   |   ✓   |    ✓    |    ✓    |   Highest
Read Committed     |   ✗   |    ✓    |    ✓    |    High
Repeatable Read    |   ✗   |    ✗    |    ✓    |   Medium
Serializable       |   ✗   |    ✗    |    ✗    |   Lowest

✓ = Anomaly allowed
✗ = Anomaly prevented</code></pre>
    </div>

    <h3>Implementation Mechanisms</h3>
    
    <h4>Lock-Based Implementation</h4>
    <ul>
      <li><strong>Read Uncommitted:</strong> No read locks, short-duration write locks</li>
      <li><strong>Read Committed:</strong> Short-duration read locks, long-duration write locks</li>
      <li><strong>Repeatable Read:</strong> Long-duration read and write locks</li>
      <li><strong>Serializable:</strong> Range locks and predicate locks</li>
    </ul>

    <h4>MVCC Implementation</h4>
    <ul>
      <li><strong>Snapshot Isolation:</strong> Each transaction sees consistent snapshot</li>
      <li><strong>Version Chains:</strong> Multiple versions of each row maintained</li>
      <li><strong>Timestamp Ordering:</strong> Visibility based on transaction timestamps</li>
      <li><strong>No Read Locks:</strong> Readers don't block writers</li>
    </ul>

    <h3>Database-Specific Behavior</h3>
    
    <h4>PostgreSQL</h4>
    <ul>
      <li><strong>Default:</strong> Read Committed</li>
      <li><strong>Serializable:</strong> Uses Serializable Snapshot Isolation (SSI)</li>
      <li><strong>No Read Uncommitted:</strong> Treats as Read Committed</li>
      <li><strong>MVCC:</strong> Extensive use of multiversion concurrency control</li>
    </ul>

    <h4>MySQL InnoDB</h4>
    <ul>
      <li><strong>Default:</strong> Repeatable Read</li>
      <li><strong>Gap Locks:</strong> Prevents phantom reads in Repeatable Read</li>
      <li><strong>Consistent Read:</strong> Uses MVCC for non-locking reads</li>
      <li><strong>Next-Key Locking:</strong> Combination of record and gap locks</li>
    </ul>

    <h4>SQL Server</h4>
    <ul>
      <li><strong>Default:</strong> Read Committed</li>
      <li><strong>Snapshot Isolation:</strong> Available as additional option</li>
      <li><strong>Read Committed Snapshot:</strong> MVCC-based Read Committed</li>
      <li><strong>Lock Escalation:</strong> Automatic escalation to table locks</li>
    </ul>

    <h3>Choosing Isolation Levels</h3>
    
    <h4>Read Uncommitted - Use When:</h4>
    <ul>
      <li><strong>Reporting:</strong> Approximate results acceptable</li>
      <li><strong>Analytics:</strong> Dirty reads won't significantly impact analysis</li>
      <li><strong>High Throughput:</strong> Maximum concurrency required</li>
      <li><strong>Non-Critical Data:</strong> Inconsistency is acceptable</li>
    </ul>

    <h4>Read Committed - Use When:</h4>
    <ul>
      <li><strong>Web Applications:</strong> Good balance of consistency and performance</li>
      <li><strong>OLTP Systems:</strong> Standard for most transactional workloads</li>
      <li><strong>Default Choice:</strong> Safe default for most applications</li>
    </ul>

    <h4>Repeatable Read - Use When:</h4>
    <ul>
      <li><strong>Financial Systems:</strong> Consistent reads within transaction critical</li>
      <li><strong>Batch Processing:</strong> Need stable view during long operations</li>
      <li><strong>Data Migration:</strong> Consistent snapshot during migration</li>
    </ul>

    <h4>Serializable - Use When:</h4>
    <ul>
      <li><strong>Critical Transactions:</strong> Absolute consistency required</li>
      <li><strong>Audit Systems:</strong> Complete isolation necessary</li>
      <li><strong>Low Concurrency:</strong> Few concurrent transactions</li>
    </ul>

    <h3>Setting Isolation Levels</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>-- SQL Standard
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- PostgreSQL
BEGIN ISOLATION LEVEL REPEATABLE READ;

-- MySQL
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- SQL Server
SET TRANSACTION ISOLATION LEVEL SNAPSHOT;</code></pre>
    </div>

    <div class="info-note">
      <strong>💡 Best Practice:</strong>
      <p>Start with Read Committed as the default, then adjust based on specific consistency requirements and performance characteristics. Use the lowest isolation level that meets your consistency needs.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://www.postgresql.org/docs/current/transaction-iso.html" target="_blank">PostgreSQL Transaction Isolation</a></li>
        <li><a href="https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html" target="_blank">MySQL InnoDB Isolation Levels</a></li>
      </ul>
    </div>
  `
}; 