export const paxosConsensus = {
  id: 'paxos-consensus',
  title: 'Paxos Consensus Algorithm',
  content: `
<p>Paxos is a family of protocols for solving consensus in a network of unreliable processors, designed to work even when nodes fail or messages are lost.</p>
    
    <h3>Three-Phase Protocol</h3>
    
    <h4>Phase 1: Prepare</h4>
    <ul>
      <li><strong>Proposer Action:</strong> Selects a proposal number (ballot number) and sends a "prepare" message to a majority of acceptors</li>
      <li><strong>Acceptor Response:</strong> If the proposal number is higher than any previously seen, acceptor promises not to accept lower-numbered proposals</li>
      <li><strong>Return Value:</strong> Acceptor returns the highest-numbered proposal it has accepted (if any)</li>
    </ul>

    <h4>Phase 2: Accept</h4>
    <ul>
      <li><strong>Proposer Action:</strong> If majority of acceptors respond to prepare, proposer sends "accept" message with proposal number and value</li>
      <li><strong>Value Selection:</strong> Uses the value from the highest-numbered proposal returned in Phase 1, or chooses its own value if none returned</li>
      <li><strong>Acceptor Response:</strong> Accepts the proposal if it hasn't promised to ignore it</li>
    </ul>

    <h4>Phase 3: Learn</h4>
    <ul>
      <li><strong>Decision:</strong> Once a proposer receives acceptance from a majority of acceptors, the value is considered chosen</li>
      <li><strong>Notification:</strong> The proposer informs all nodes (learners) of the chosen value</li>
      <li><strong>Completion:</strong> All nodes learn the consensus result</li>
    </ul>

    <h3>Key Properties</h3>
    <ul>
      <li><strong>Safety:</strong> Only one value can be chosen</li>
      <li><strong>Liveness:</strong> Some value will eventually be chosen (under certain conditions)</li>
      <li><strong>Fault Tolerance:</strong> Works as long as a majority of nodes are functioning</li>
    </ul>

    <h3>Paxos Variants</h3>
    <ul>
      <li><strong>Basic Paxos:</strong> Single-value consensus</li>
      <li><strong>Multi-Paxos:</strong> Sequence of consensus decisions with optimizations</li>
      <li><strong>Fast Paxos:</strong> Reduces message delays in common cases</li>
      <li><strong>Flexible Paxos:</strong> Relaxes quorum requirements</li>
    </ul>

    <h3>Challenges</h3>
    <ul>
      <li><strong>Complexity:</strong> Difficult to understand and implement correctly</li>
      <li><strong>Livelock:</strong> Competing proposers can prevent progress</li>
      <li><strong>Performance:</strong> Multiple round trips can impact latency</li>
      <li><strong>Leader Election:</strong> Often needs a separate mechanism to choose a distinguished proposer</li>
    </ul>

    <div class="info-note">
      <strong>💡 Industry Adoption:</strong>
      <p>While Paxos is theoretically elegant, many systems use Raft instead due to its simpler design and easier implementation.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://medium.com/designing-distributed-systems/paxos-a-distributed-consensus-algorithm-41946d5d7d9" target="_blank">Paxos Algorithm Explained</a></li>
        <li><a href="https://www.scylladb.com/glossary/paxos-consensus-algorithm/" target="_blank">Paxos Consensus Algorithm</a></li>
        <li><a href="https://medium.com/designing-distributed-systems/flexible-paxos-relaxing-the-quorum-constraint-89caec294083" target="_blank">Flexible Paxos</a></li>
      </ul>
    </div>
`
}; 