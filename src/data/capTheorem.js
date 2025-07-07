export const capTheorem = {
  id: "cap-theorem",
  title: "CAP Theorem",
  content: `
    <h2>CAP Theorem</h2>
    <p>CAP theorem highlights the trade-offs in distributed systems.</p>

    <h3>Consistency</h3>
    <p>Consistency means all clients see the same data at the same time no matter which node they connect to.</p>

    <h3>Availability</h3>
    <p>Availability means any client which requests data gets a response even if some of the nodes are down.</p>

    <h3>Partition Tolerance</h3>
    <p>A partition indicates a communication break between two nodes. Partition tolerance means the system continues to operate despite network partitions.</p>

    <div class="info-note">
      <strong>Key Insight:</strong> According to CAP theorem, a distributed system can only guarantee two of the three properties at any given time.
    </div>

    <div class="reference-links">
      <h4>📚 References</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=BlkAOdFjGa8&list=PLGo1-Ya-AEQDFaT8RFh-lTQrh7RJCs4Ly&index=9" target="_blank">CAP Theorem Explained (Video)</a></li>
        <li><a href="https://www.scaler.com/topics/cap-theorem-mongodb/" target="_blank">CAP Theorem MongoDB</a></li>
      </ul>
    </div>
  `
}; 