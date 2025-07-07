export const consistentHashing = {
  id: "consistent-hashing",
  title: "Consistent Hashing",
  content: `
    <h2>Consistent Hashing</h2>
    <p>Consistent Hashing is a technique used in distributed systems to distribute data across multiple nodes while minimizing the need for data movement when nodes are added or removed from the system.</p>

    <h3>How It Works</h3>
    <p>The result of applying a hash function to information or data (e.g. hash(data) = digest) is called a message digest or digest, or hash value.</p>

    <p>Whenever the system needs to read or write data, the first step it performs is to apply the hashing algorithm to the key. The output of this hashing algorithm determines within which range the data lies and hence, on which node the data will be stored.</p>

    <h3>Key Concepts</h3>
    <ul>
      <li><strong>Coordinator Node:</strong> Each key is assigned to a coordinator node (the node that falls first in the hash range), which first stores the data locally and then replicates it to N−1 clockwise successor nodes on the ring.</li>
      <li><strong>Virtual Nodes (Vnodes):</strong> Since there can be heterogeneous machines in the clusters, some servers might hold more Vnodes than others.</li>
      <li><strong>Client Fallback:</strong> If a client cannot contact the coordinator node, it sends the request to a node holding a replica.</li>
    </ul>

    <h3>Internal Working</h3>
    <p>The entire hash value produced by a hash function is mapped onto a circular ring. Each server's hash i.e. hash(Node IP address) is positioned on this ring. When hashing a key i.e. hash(key), its resulting hash value is also placed on the ring, and stored to the nearest server or node in the clockwise direction.</p>

    <h3>Implementation Approaches</h3>
    <ul>
      <li><strong>Circular Array Ring:</strong> Store the hash range in a sorted array sorted by the start hash value. Use binary search to quickly locate the correct partition for a given hash value.</li>
      <li><strong>BST:</strong> Use a range query data structure tree like a segment tree.</li>
      <li><strong>Skip List:</strong> HashMap + DLL</li>
      <li><strong>Hash Table:</strong> Direct hash table implementation</li>
    </ul>

    <div class="reference-links">
      <h4>📚 References</h4>
      <ul>
        <li><a href="https://www.educative.io/courses/grokking-the-system-design-interview/B81vnyp0GpY" target="_blank">Grokking System Design - Consistent Hashing</a></li>
        <li><a href="https://www.toptal.com/big-data/consistent-hashing" target="_blank">Consistent Hashing - Toptal</a></li>
        <li><a href="https://highscalability.com/consistent-hashing-algorithm/" target="_blank">Consistent Hashing Algorithm</a></li>
        <li><a href="https://github.com/roottraveller/DSAlgo-HowToDoIt-learningcode/tree/master/consistent-hashing-implementation" target="_blank">Implementation Example</a></li>
      </ul>
    </div>
  `
}; 