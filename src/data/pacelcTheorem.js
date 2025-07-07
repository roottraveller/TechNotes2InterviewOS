export const pacelcTheorem = {
  id: "pacelc-theorem",
  title: "PACELC Theorem",
  content: `
    <h2>PACELC Theorem</h2>
    <p>PACELC is an extension of the CAP theorem.</p>

    <h3>The PACELC Trade-off</h3>
    <p>If there is a partition (<strong>P</strong>), a distributed system can tradeoff between availability (<strong>A</strong>) and consistency (<strong>C</strong>), else (<strong>E</strong>), when the system is running normally in the absence of partitions, the system can tradeoff between latency (<strong>L</strong>) and consistency (<strong>C</strong>).</p>

    <h3>Breaking Down PACELC</h3>
    <ul>
      <li><strong>P</strong> - Partition: Network partition occurs</li>
      <li><strong>A</strong> - Availability: System remains available</li>
      <li><strong>C</strong> - Consistency: Data consistency across nodes</li>
      <li><strong>E</strong> - Else: Normal operation (no partitions)</li>
      <li><strong>L</strong> - Latency: Response time performance</li>
      <li><strong>C</strong> - Consistency: Data consistency during normal operation</li>
    </ul>

    <div class="info-note">
      <strong>Key Insight:</strong> PACELC extends CAP by considering the trade-offs that exist even when the system is operating normally without network partitions.
    </div>
  `
}; 