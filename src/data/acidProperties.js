export const acidProperties = {
  id: "acid-properties",
  title: "ACID Properties",
  content: `
    <p>ACID properties are a set of guarantees for database transactions to ensure data validity despite errors, power failures, and other mishaps. They are typically associated with traditional relational databases and emphasize strong consistency.</p>

    <h3>Atomicity</h3>
    <p>Atomicity ensures that a transaction is treated as a single, indivisible unit. It either succeeds completely or fails completely. If any part of a transaction fails, the entire transaction is rolled back, and the database is left unchanged.</p>
    <details>
      <summary><strong>Example</strong></summary>
      <div class="info-note">
        A bank transfer from Account A to Account B. The transaction involves two operations: debiting A and crediting B. If the system crashes after debiting A but before crediting B, atomicity ensures the debit is rolled back, leaving the database in its original state.
      </div>
    </details>

    <h3>Consistency</h3>
    <p>Consistency ensures that a transaction brings the database from one valid state to another. It enforces all predefined rules, such as constraints, cascades, and triggers. Any transaction that violates the database's consistency rules will be aborted.</p>
    <details>
      <summary><strong>Example</strong></summary>
      <div class="info-note">
        In a banking application, a consistency rule might be that the sum of all account balances must remain constant. A transfer transaction must not alter this total sum. If it does, it violates consistency and is rolled back.
      </div>
    </details>

    <h3>Isolation</h3>
    <p>Isolation ensures that the concurrent execution of transactions results in a system state that would be obtained if transactions were executed serially. Each transaction is isolated from others, preventing them from interfering with one another.</p>
    <details>
      <summary><strong>Example</strong></summary>
      <div class="info-note">
        If one transaction is calculating the total balance of all accounts while another is transferring money, isolation ensures the calculation sees the state either before or after the transfer, but not an inconsistent state in between.
      </div>
    </details>

    <h3>Durability</h3>
    <p>Durability ensures that once a transaction has been committed, it will remain so, even in the event of power loss, crashes, or errors. The changes are permanently stored, typically in non-volatile memory.</p>
    <details>
      <summary><strong>Example</strong></summary>
      <div class="info-note">
        Once you receive a confirmation for your ATM cash withdrawal, the change in your account balance is permanent. Even if the system fails immediately after, your new balance is guaranteed to persist.
      </div>
    </details>

    <h3>ACID vs. BASE</h3>
    <p>While ACID is common in relational databases, many NoSQL databases follow the BASE philosophy, which prioritizes availability over strict consistency.</p>
    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>ACID</th>
            <th>BASE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Stands for</strong></td>
            <td>Atomicity, Consistency, Isolation, Durability</td>
            <td>Basically Available, Soft state, Eventually consistent</td>
          </tr>
          <tr>
            <td><strong>Consistency</strong></td>
            <td>Strong & Immediate</td>
            <td>Eventual Consistency</td>
          </tr>
          <tr>
            <td><strong>Availability</strong></td>
            <td>May sacrifice availability during partitions</td>
            <td>Prioritizes availability</td>
          </tr>
          <tr>
            <td><strong>Model</strong></td>
            <td>Pessimistic (prevents conflicts)</td>
            <td>Optimistic (resolves conflicts later)</td>
          </tr>
          <tr>
            <td><strong>Use Cases</strong></td>
            <td>Financial systems, e-commerce, OLTP</td>
            <td>Social media, analytics, IoT, where availability is key</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="reference-links">
      <h4>References</h4>
      <ul>
        <li><a href="https://www.educative.io/answers/what-are-acid-properties-in-a-database" target="_blank">What are ACID Properties in a Database</a></li>
        <li><a href="https://www.scaler.com/topics/dbms/acid-properties-in-dbms/" target="_blank">ACID Properties in DBMS</a></li>
      </ul>
    </div>
  `
}; 