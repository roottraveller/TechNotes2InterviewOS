export const mvcc = {
  id: 'mvcc',
  title: 'MVCC (Multi-Version Concurrency Control)',
  content: `
    <h2>Multi-Version Concurrency Control (MVCC)</h2>
    <p>MVCC maintains multiple versions of each data item in the database to support concurrent read and write operations without blocking.</p>
    
    <h3>How MVCC Works</h3>
    <ul>
      <li><strong>Version Creation:</strong> When a transaction updates data, a new version is created instead of overwriting</li>
      <li><strong>Timestamping:</strong> Each version is timestamped with the transaction's start time</li>
      <li><strong>Visibility Rules:</strong> New versions are not visible to other transactions until the updating transaction commits</li>
      <li><strong>Concurrent Access:</strong> Other transactions continue reading old versions until the update completes</li>
    </ul>

    <h3>Key Benefits</h3>
    <ul>
      <li><strong>No Read Blocking:</strong> Readers never block writers and vice versa</li>
      <li><strong>Consistency:</strong> Each transaction sees a consistent snapshot of data</li>
      <li><strong>High Concurrency:</strong> Multiple transactions can operate simultaneously</li>
      <li><strong>Deadlock Reduction:</strong> Fewer locks needed, reducing deadlock potential</li>
    </ul>

    <h3>Implementation Details</h3>
    <ul>
      <li><strong>Version Storage:</strong> Multiple versions stored with metadata</li>
      <li><strong>Garbage Collection:</strong> Obsolete versions are cleaned up periodically</li>
      <li><strong>Transaction IDs:</strong> Each transaction gets a unique identifier</li>
      <li><strong>Snapshot Isolation:</strong> Transactions see data as of their start time</li>
    </ul>

    <h3>Databases Using MVCC</h3>
    <ul>
      <li><strong>PostgreSQL:</strong> Native MVCC implementation</li>
      <li><strong>Oracle:</strong> Uses MVCC with undo segments</li>
      <li><strong>MySQL InnoDB:</strong> MVCC with undo logs</li>
      <li><strong>SQL Server:</strong> Row versioning with MVCC</li>
    </ul>

    <div class="info-note">
      <strong>💡 Trade-offs:</strong>
      <p>MVCC provides excellent concurrency but requires additional storage for multiple versions and periodic cleanup of obsolete data.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://www.postgresql.org/docs/current/mvcc.html" target="_blank">PostgreSQL MVCC Documentation</a></li>
        <li><a href="https://www.scaler.com/topics/dbms/concurrency-control-in-dbms/" target="_blank">Concurrency Control in DBMS</a></li>
      </ul>
    </div>
  `
}; 