export const raftConsensus = {
  id: 'raft-consensus',
  title: 'Raft Consensus Algorithm',
  content: `
    <h2>Raft Consensus Algorithm</h2>
    <p>Raft is a consensus algorithm designed to be more understandable than Paxos while providing the same guarantees. It's used to manage a replicated log across multiple servers.</p>
    
    <h3>Key Design Goals</h3>
    <ul>
      <li><strong>Understandability:</strong> Easier to understand and implement than Paxos</li>
      <li><strong>Equivalence:</strong> Provides same safety and availability guarantees as Paxos</li>
      <li><strong>Efficiency:</strong> Performs as well as Paxos in practice</li>
      <li><strong>Decomposition:</strong> Separates leader election, log replication, and safety</li>
    </ul>

    <h3>Raft Components</h3>
    
    <h4>1. Leader Election</h4>
    <ul>
      <li><strong>States:</strong> Follower, Candidate, Leader</li>
      <li><strong>Terms:</strong> Logical clock that increases monotonically</li>
      <li><strong>Election Process:</strong> Followers become candidates and request votes</li>
      <li><strong>Majority Rule:</strong> Candidate with majority votes becomes leader</li>
    </ul>

    <h4>2. Log Replication</h4>
    <ul>
      <li><strong>Leader Responsibility:</strong> Accepts client requests and replicates to followers</li>
      <li><strong>Log Entries:</strong> Each entry contains command, term, and index</li>
      <li><strong>Consistency:</strong> Leader ensures followers have identical logs</li>
      <li><strong>Commitment:</strong> Entry is committed when stored on majority of servers</li>
    </ul>

    <h4>3. Safety Properties</h4>
    <ul>
      <li><strong>Election Safety:</strong> At most one leader per term</li>
      <li><strong>Leader Append-Only:</strong> Leader never overwrites or deletes entries</li>
      <li><strong>Log Matching:</strong> If two logs contain entry with same index and term, they're identical</li>
      <li><strong>Leader Completeness:</strong> If entry is committed, it will be present in all future leaders</li>
      <li><strong>State Machine Safety:</strong> If server applies log entry at index, no other server applies different entry at same index</li>
    </ul>

    <h3>Raft Algorithm Steps</h3>
    
    <h4>Normal Operation</h4>
    <ol>
      <li><strong>Client Request:</strong> Client sends command to leader</li>
      <li><strong>Log Entry:</strong> Leader appends entry to its log</li>
      <li><strong>Replication:</strong> Leader sends AppendEntries RPCs to followers</li>
      <li><strong>Majority Acknowledgment:</strong> Leader waits for majority to acknowledge</li>
      <li><strong>Commit:</strong> Leader commits entry and applies to state machine</li>
      <li><strong>Response:</strong> Leader responds to client</li>
      <li><strong>Propagation:</strong> Leader notifies followers of commitment in next AppendEntries</li>
    </ol>

    <h4>Leader Failure</h4>
    <ol>
      <li><strong>Timeout:</strong> Followers detect leader failure via heartbeat timeout</li>
      <li><strong>Candidacy:</strong> Follower increments term and becomes candidate</li>
      <li><strong>Vote Request:</strong> Candidate requests votes from other servers</li>
      <li><strong>Election:</strong> If majority votes received, candidate becomes leader</li>
      <li><strong>Recovery:</strong> New leader replicates its log to followers</li>
    </ol>

    <h3>Advantages over Paxos</h3>
    <ul>
      <li><strong>Simplicity:</strong> Easier to understand and implement</li>
      <li><strong>Strong Leader:</strong> Simplifies log replication</li>
      <li><strong>Randomized Timeouts:</strong> Reduces election conflicts</li>
      <li><strong>Membership Changes:</strong> Built-in support for cluster reconfiguration</li>
    </ul>

    <h3>Real-World Implementations</h3>
    <ul>
      <li><strong>etcd:</strong> Kubernetes' key-value store</li>
      <li><strong>Consul:</strong> HashiCorp's service discovery tool</li>
      <li><strong>TiKV:</strong> Distributed key-value database</li>
      <li><strong>CockroachDB:</strong> Distributed SQL database</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Raft's success comes from its understandability - by making the algorithm easier to understand, it's easier to implement correctly and reason about in production systems.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://raft.github.io/" target="_blank">Raft Consensus Algorithm</a></li>
        <li><a href="https://raft.github.io/raft.pdf" target="_blank">Original Raft Paper</a></li>
        <li><a href="https://thesecretlivesofdata.com/raft/" target="_blank">Raft Visualization</a></li>
      </ul>
    </div>
  `
}; 