export const concurrencyControlProblems = {
  id: 'concurrency-control-problems',
  title: 'Concurrency Control Problems in Database',
  content: `
    <h2>Concurrency Control Problems in Database</h2>
    <p>When multiple transactions execute concurrently in a database, various problems can arise that compromise data integrity and consistency. Understanding these problems is crucial for designing robust database systems.</p>

    <h3>1. Dirty Read</h3>
    <p>A transaction (T1) modifies data, and Transaction (T2) reads this data before T1 commits its changes to the database. If T1 rolls back its changes later, T2 will have read data that was never actually committed to the database.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Example of Dirty Read:

Time    Transaction T1              Transaction T2
----    --------------              --------------
t1      BEGIN TRANSACTION          
t2      UPDATE account 
        SET balance = 1000
        WHERE id = 1
t3                                  BEGIN TRANSACTION
t4                                  SELECT balance FROM account
                                    WHERE id = 1
                                    -- Reads 1000 (uncommitted)
t5      ROLLBACK
        -- Balance reverts to 
        -- original value
t6                                  -- T2 has dirty data!
                                    COMMIT</code></pre>
    </div>

    <h3>2. Non-Repeatable Reads</h3>
    <p>Non-repeatable reads can occur where a transaction (T1) might read the same row multiple times but get different results if another transaction (T2) modifies and commits that row in between.</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Example of Non-Repeatable Read:

Time    Transaction T1              Transaction T2
----    --------------              --------------
t1      BEGIN TRANSACTION          
t2      SELECT balance FROM account
        WHERE id = 1
        -- Reads 500
t3                                  BEGIN TRANSACTION
t4                                  UPDATE account
                                    SET balance = 1000
                                    WHERE id = 1
t5                                  COMMIT
t6      SELECT balance FROM account
        WHERE id = 1
        -- Now reads 1000!
        -- Same query, different result
t7      COMMIT</code></pre>
    </div>

    <h3>3. Phantom Reads</h3>
    <p>A phantom read occurs when a transaction (T1) retrieves a set of rows that satisfy a certain condition, and then, during the course of the transaction, another transaction (T2) inserts or deletes rows that also meet the condition. Consequently, when the first transaction (T1) retrieves the same set of rows again, it encounters new rows (phantoms) or finds that some rows it previously retrieved are now missing.</p>

    <div class="info-note">
      <strong>💡 Note:</strong> Phantom - something (as a ghost) that seems to be there but is not real.
    </div>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Example of Phantom Read:

Time    Transaction T1              Transaction T2
----    --------------              --------------
t1      BEGIN TRANSACTION          
t2      SELECT COUNT(*) FROM employees
        WHERE dept = 'Sales'
        -- Returns 10
t3                                  BEGIN TRANSACTION
t4                                  INSERT INTO employees
                                    VALUES ('John', 'Sales')
t5                                  COMMIT
t6      SELECT COUNT(*) FROM employees
        WHERE dept = 'Sales'
        -- Now returns 11!
        -- Phantom row appeared
t7      COMMIT</code></pre>
    </div>

    <h3>4. Lost Update</h3>
    <p>Lost Update occurs in a concurrent access scenario when one transaction (T1) updates a piece of data, and before it commits its changes, another transaction (T2) updates the same data based on the original (stale) version it read. As a result, when T1 commits its changes, they are overwritten by the changes made by T2, leading to the loss of T1's updates.</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Example of Lost Update:

Time    Transaction T1              Transaction T2
----    --------------              --------------
t1      BEGIN TRANSACTION          BEGIN TRANSACTION
t2      SELECT balance FROM account
        WHERE id = 1
        -- Reads 1000
t3                                  SELECT balance FROM account
                                    WHERE id = 1
                                    -- Also reads 1000
t4      -- Add 100
        UPDATE account
        SET balance = 1100
        WHERE id = 1
t5                                  -- Add 200
                                    UPDATE account
                                    SET balance = 1200
                                    WHERE id = 1
t6      COMMIT
t7                                  COMMIT
        -- T1's update is lost!
        -- Final balance is 1200, not 1300</code></pre>
    </div>

    <h3>5. Dirty Write</h3>
    <p>It occurs when one transaction (T1) overwrites uncommitted data modifications made by another transaction (T2).</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Example of Dirty Write:

Time    Transaction T1              Transaction T2
----    --------------              --------------
t1      BEGIN TRANSACTION          
t2      UPDATE product
        SET price = 100
        WHERE id = 1
        -- Not committed yet
t3                                  BEGIN TRANSACTION
t4                                  UPDATE product
                                    SET price = 150
                                    WHERE id = 1
                                    -- Overwrites uncommitted data
t5      ROLLBACK
        -- T1's change discarded
t6                                  COMMIT
        -- T2's change based on 
        -- invalid state</code></pre>
    </div>

    <h3>Summary of Problems</h3>
    
    <table>
      <thead>
        <tr>
          <th>Problem</th>
          <th>Description</th>
          <th>Impact</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Dirty Read</strong></td>
          <td>Reading uncommitted data</td>
          <td>Incorrect data, cascading errors</td>
        </tr>
        <tr>
          <td><strong>Non-Repeatable Read</strong></td>
          <td>Same query returns different results</td>
          <td>Inconsistent analysis, logic errors</td>
        </tr>
        <tr>
          <td><strong>Phantom Read</strong></td>
          <td>New rows appear/disappear in result set</td>
          <td>Incorrect aggregations, incomplete processing</td>
        </tr>
        <tr>
          <td><strong>Lost Update</strong></td>
          <td>Updates overwritten by concurrent transaction</td>
          <td>Data loss, incorrect final state</td>
        </tr>
        <tr>
          <td><strong>Dirty Write</strong></td>
          <td>Overwriting uncommitted changes</td>
          <td>Data corruption, invalid state</td>
        </tr>
      </tbody>
    </table>

    <h3>Prevention Mechanisms</h3>
    <ul>
      <li><strong>Isolation Levels:</strong> Use appropriate transaction isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)</li>
      <li><strong>Locking Mechanisms:</strong> Implement pessimistic or optimistic locking strategies</li>
      <li><strong>MVCC:</strong> Use Multi-Version Concurrency Control for better concurrency</li>
      <li><strong>Timestamps:</strong> Use timestamp ordering protocols</li>
      <li><strong>Validation:</strong> Implement validation-based concurrency control</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://www.scaler.com/topics/dbms/concurrency-control-in-dbms/" target="_blank">Concurrency Control in DBMS - Scaler</a></li>
    </ul>
  `
}; 