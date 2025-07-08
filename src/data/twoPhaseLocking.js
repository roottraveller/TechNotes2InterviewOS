export const twoPhaseLocking = {
  id: 'two-phase-locking',
  title: 'Two-Phase Locking (2PL)',
  content: `
<p>A concurrency control protocol that ensures serializability by dividing each transaction into two distinct phases: a growing phase where locks are acquired, and a shrinking phase where locks are released.</p>
    
    <h3>The Two Phases</h3>
    
    <h4>Phase 1: Growing Phase (Expanding)</h4>
    <ul>
      <li><strong>Lock Acquisition:</strong> Transaction can acquire locks on data items</li>
      <li><strong>No Release:</strong> Cannot release any locks during this phase</li>
      <li><strong>Read/Write Operations:</strong> Perform actual data operations</li>
      <li><strong>Duration:</strong> Continues until first lock is released</li>
    </ul>

    <h4>Phase 2: Shrinking Phase (Contracting)</h4>
    <ul>
      <li><strong>Lock Release:</strong> Transaction can only release locks</li>
      <li><strong>No Acquisition:</strong> Cannot acquire any new locks</li>
      <li><strong>Completion:</strong> Phase ends when all locks are released</li>
      <li><strong>Commit/Abort:</strong> Transaction commits or aborts</li>
    </ul>

    <h3>2PL Protocol Rules</h3>
    <ol>
      <li><strong>Before Reading:</strong> Transaction must acquire shared (S) lock on data item</li>
      <li><strong>Before Writing:</strong> Transaction must acquire exclusive (X) lock on data item</li>
      <li><strong>Lock Compatibility:</strong> Follow standard lock compatibility matrix</li>
      <li><strong>Phase Restriction:</strong> Once a lock is released, no new locks can be acquired</li>
      <li><strong>Lock Release:</strong> All locks must be released before transaction completion</li>
    </ol>

    <h3>Lock Compatibility Matrix</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>        |  S  |  X  |
    ----+-----+-----+
    S   | ✓   | ✗   |
    ----+-----+-----+
    X   | ✗   | ✗   |
    
    ✓ = Compatible (can coexist)
    ✗ = Incompatible (must wait)</code></pre>
    </div>

    <h3>2PL Variants</h3>
    
    <h4>1. Basic 2PL</h4>
    <ul>
      <li><strong>Standard Protocol:</strong> Follows basic two-phase rules</li>
      <li><strong>Deadlock Possible:</strong> Can lead to deadlock situations</li>
      <li><strong>Cascading Rollback:</strong> May cause cascading aborts</li>
    </ul>

    <h4>2. Conservative 2PL (Static 2PL)</h4>
    <ul>
      <li><strong>Pre-declaration:</strong> All locks acquired before transaction starts</li>
      <li><strong>Deadlock-Free:</strong> Eliminates deadlock possibility</li>
      <li><strong>Reduced Concurrency:</strong> Lower concurrency due to early locking</li>
      <li><strong>Practical Issues:</strong> Difficult to predict all needed locks</li>
    </ul>

    <h4>3. Strict 2PL</h4>
    <ul>
      <li><strong>Hold Until End:</strong> All exclusive locks held until transaction commits/aborts</li>
      <li><strong>Prevents Cascading:</strong> Eliminates cascading rollbacks</li>
      <li><strong>Most Common:</strong> Widely used in commercial databases</li>
      <li><strong>Recovery Friendly:</strong> Simplifies recovery procedures</li>
    </ul>

    <h4>4. Rigorous 2PL</h4>
    <ul>
      <li><strong>All Locks Held:</strong> Both shared and exclusive locks held until end</li>
      <li><strong>Maximum Safety:</strong> Highest level of isolation</li>
      <li><strong>Lowest Concurrency:</strong> Most restrictive variant</li>
      <li><strong>Simplified Implementation:</strong> Easier to implement and reason about</li>
    </ul>

    <h3>Example Transaction Flow</h3>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Transaction T1:
Growing Phase:
  1. Acquire S-lock on A    // Read A
  2. Acquire X-lock on B    // Write B
  3. Acquire S-lock on C    // Read C
  4. Perform operations...

Shrinking Phase:
  5. Release S-lock on A    // First release - shrinking starts
  6. Release X-lock on B    // Cannot acquire new locks now
  7. Release S-lock on C
  8. COMMIT</code></pre>
    </div>

    <h3>Advantages</h3>
    <ul>
      <li><strong>Serializability:</strong> Guarantees serializable schedules</li>
      <li><strong>Conflict Resolution:</strong> Handles read-write and write-write conflicts</li>
      <li><strong>Widely Implemented:</strong> Standard in most database systems</li>
      <li><strong>Theoretical Foundation:</strong> Well-understood mathematical properties</li>
    </ul>

    <h3>Disadvantages</h3>
    <ul>
      <li><strong>Deadlock Risk:</strong> Can lead to deadlock situations</li>
      <li><strong>Reduced Concurrency:</strong> Blocking reduces system throughput</li>
      <li><strong>Lock Overhead:</strong> Memory and CPU overhead for lock management</li>
      <li><strong>Cascading Rollbacks:</strong> In basic 2PL, failures can cascade</li>
    </ul>

    <h3>Deadlock Handling</h3>
    <ul>
      <li><strong>Detection:</strong> Use wait-for graphs to detect cycles</li>
      <li><strong>Prevention:</strong> Timestamp-based ordering (wound-wait, wait-die)</li>
      <li><strong>Avoidance:</strong> Conservative 2PL or resource ordering</li>
      <li><strong>Resolution:</strong> Abort victim transaction and restart</li>
    </ul>

    <div class="info-note">
      <strong>💡 Real-World Usage:</strong>
      <p>Most commercial databases (MySQL InnoDB, PostgreSQL, SQL Server) use Strict 2PL as their default concurrency control mechanism, often combined with MVCC for better performance.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://www.scaler.com/topics/dbms/two-phase-locking-protocol/" target="_blank">Two-Phase Locking Protocol</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Two-phase_locking" target="_blank">Two-Phase Locking - Wikipedia</a></li>
      </ul>
    </div>
`
}; 