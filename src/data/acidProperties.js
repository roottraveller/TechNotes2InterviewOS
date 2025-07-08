export const acidProperties = {
  id: "acid-properties",
  title: "ACID Properties",
  content: `
<p>ACID properties are typically associated with traditional relational databases and emphasize strong consistency.</p>

    <h3>Atomicity</h3>
    <p>Atomicity ensures that a transaction either succeeds completely or fails completely. If any part of a transaction fails, the entire transaction is rolled back, and the database is left unchanged.</p>

    <h3>Consistency</h3>
    <p>Consistency ensures that the database remains in a valid state before and after the execution of a transaction. It ensures any transaction will bring the database from one valid state to another, and prevents the database from entering an invalid state.</p>

    <h3>Isolation</h3>
    <p>Isolation ensures that the execution of multiple transactions concurrently does not interfere with each other.</p>

    <h3>Durability</h3>
    <p>Durability ensures that once a transaction is committed, it's permanently stored in the database and should not be lost even in the event of system failures (e.g., power outage, or hardware failure).</p>

    <div class="reference-links">
      <h4>📚 References</h4>
      <ul>
        <li><a href="https://www.educative.io/answers/what-are-acid-properties-in-a-database" target="_blank">What are ACID Properties in a Database</a></li>
        <li><a href="https://www.scaler.com/topics/dbms/acid-properties-in-dbms/" target="_blank">ACID Properties in DBMS</a></li>
      </ul>
    </div>
`
}; 