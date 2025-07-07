export const distributedConsensus = {
  id: 'distributed-consensus',
  title: 'Distributed Consensus',
  content: `
    <h2>Distributed Consensus</h2>
    <p>Consensus in distributed systems refers to the process by which a group of nodes or processes agree on a single value or sequence of values despite faulty nodes, message delays, and network partitions.</p>
    
    <h3>Why Consensus is Important</h3>
    <ul>
      <li><strong>Leader Election:</strong> Choosing a coordinator node in distributed systems</li>
      <li><strong>Distributed Locking:</strong> Ensuring mutual exclusion across nodes</li>
      <li><strong>Atomic Commit:</strong> Ensuring all nodes commit or abort transactions together</li>
      <li><strong>State Machine Replication:</strong> Keeping replicas synchronized</li>
    </ul>

    <h3>Consensus Challenges</h3>
    <ul>
      <li><strong>Network Partitions:</strong> Nodes may become isolated from each other</li>
      <li><strong>Node Failures:</strong> Servers can crash or become unresponsive</li>
      <li><strong>Message Delays:</strong> Network latency and packet loss</li>
      <li><strong>Byzantine Failures:</strong> Nodes may behave maliciously or arbitrarily</li>
    </ul>

    <h3>FLP Impossibility Theorem</h3>
    <div class="info-note">
      <strong>📚 Theoretical Foundation:</strong>
      <p>The Fischer-Lynch-Paterson theorem proves that it's impossible to achieve consensus in an asynchronous distributed system if even one process can fail, even if messages are never lost.</p>
    </div>

    <h3>Practical Consensus Algorithms</h3>
    <ul>
      <li><strong>Paxos:</strong> Classic consensus algorithm, complex but theoretically sound</li>
      <li><strong>Raft:</strong> Simpler alternative to Paxos, easier to understand and implement</li>
      <li><strong>PBFT:</strong> Practical Byzantine Fault Tolerance for malicious failures</li>
      <li><strong>Tendermint:</strong> Byzantine fault-tolerant consensus for blockchain</li>
    </ul>

    <h3>Consensus Properties</h3>
    <ul>
      <li><strong>Agreement:</strong> All correct processes decide on the same value</li>
      <li><strong>Validity:</strong> If all processes propose the same value, that value is decided</li>
      <li><strong>Termination:</strong> All correct processes eventually decide on some value</li>
    </ul>

    <h3>Real-World Applications</h3>
    <ul>
      <li><strong>Distributed Databases:</strong> Ensuring consistent replication</li>
      <li><strong>Blockchain:</strong> Agreeing on the next block</li>
      <li><strong>Configuration Management:</strong> Consistent system configuration</li>
      <li><strong>Service Discovery:</strong> Maintaining service registry consistency</li>
    </ul>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://raft.github.io/" target="_blank">Raft Consensus Algorithm</a></li>
        <li><a href="https://lamport.azurewebsites.net/pubs/paxos-simple.pdf" target="_blank">Paxos Made Simple</a></li>
      </ul>
    </div>
  `
}; 