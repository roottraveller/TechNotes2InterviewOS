export const dataStructures = {
  id: 'data-structures',
  title: 'Data Structures',
  content: `
    <p>Data structures are specialized formats for organizing, storing, and manipulating data efficiently in computer programs. They provide the foundation for algorithm design and are crucial for building scalable, performant software systems. The choice of data structure significantly impacts program efficiency, memory usage, and overall system performance.</p>

    <details>
      <summary><strong>Real-World Example: Google's Search Index</strong></summary>
      <div class="info-note">
        Google's search index uses multiple data structures to handle 8.5 billion searches daily. They use hash tables for O(1) keyword lookups, B+ trees for efficient disk storage of web pages, tries for autocomplete suggestions, and inverted indexes (hash tables + arrays) to map keywords to documents. Their PageRank algorithm uses graphs to represent web links, processing 130+ trillion web pages. This combination enables sub-second search results across the entire internet.
      </div>
    </details>

    <h3>Linear Data Structures</h3>
    <p>Linear data structures organize elements in a sequential manner, where each element has a unique predecessor and successor (except for the first and last elements).</p>

    <h4>Arrays</h4>
    <p><strong>Definition:</strong> A collection of elements stored in contiguous memory locations, accessed by index.</p>

    <p><strong>Characteristics:</strong></p>
    <ul>
      <li><strong>Fixed Size:</strong> Size determined at creation time</li>
      <li><strong>Random Access:</strong> O(1) access time using index</li>
      <li><strong>Contiguous Memory:</strong> Elements stored sequentially</li>
      <li><strong>Cache Friendly:</strong> Good spatial locality</li>
    </ul>

    <p><strong>Time Complexity:</strong></p>
    <ul>
      <li><strong>Access:</strong> O(1)</li>
      <li><strong>Search:</strong> O(n) unsorted, O(log n) sorted</li>
      <li><strong>Insertion:</strong> O(n) - requires shifting elements</li>
      <li><strong>Deletion:</strong> O(n) - requires shifting elements</li>
    </ul>

    <p><strong>Use Cases:</strong> Mathematical operations, lookup tables, implementing other data structures</p>

    <h4>Dynamic Arrays (Vectors)</h4>
    <p><strong>Definition:</strong> Resizable arrays that can grow or shrink during runtime.</p>

    <div class="code-block">
      <pre><code>Dynamic Array Growth Strategy:
Initial: [1, 2, 3] (capacity: 3)
Add 4:   [1, 2, 3, 4, _, _, _] (capacity: 7, doubled + 1)
Add 5:   [1, 2, 3, 4, 5, _, _] (capacity: 7)

Amortized Analysis:
- Individual insertion: O(1) amortized
- Worst case insertion: O(n) when resizing
- Space complexity: O(n)</code></pre>
    </div>

    <h4>Linked Lists</h4>
    <p><strong>Definition:</strong> A linear collection of nodes where each node contains data and a reference to the next node.</p>

    <p><strong>Types:</strong></p>
    <ul>
      <li><strong>Singly Linked:</strong> Each node points to the next node</li>
      <li><strong>Doubly Linked:</strong> Each node has pointers to both next and previous nodes</li>
      <li><strong>Circular Linked:</strong> Last node points back to the first node</li>
    </ul>

    <div class="code-block">
      <pre><code>Singly Linked List Structure:
[Data|Next] -> [Data|Next] -> [Data|Next] -> NULL

Doubly Linked List Structure:
NULL <- [Prev|Data|Next] <-> [Prev|Data|Next] <-> [Prev|Data|Next] -> NULL

Memory Layout Comparison:
Array:       [A][B][C][D] (contiguous)
Linked List: [A]-->[B]-->[C]-->[D] (scattered)</code></pre>
    </div>

    <p><strong>Time Complexity:</strong></p>
    <table>
      <thead>
        <tr>
          <th>Operation</th>
          <th>Array</th>
          <th>Linked List</th>
          <th>Dynamic Array</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Access</td>
          <td>O(1)</td>
          <td>O(n)</td>
          <td>O(1)</td>
        </tr>
        <tr>
          <td>Search</td>
          <td>O(n)</td>
          <td>O(n)</td>
          <td>O(n)</td>
        </tr>
        <tr>
          <td>Insertion</td>
          <td>O(n)</td>
          <td>O(1)*</td>
          <td>O(1) amortized</td>
        </tr>
        <tr>
          <td>Deletion</td>
          <td>O(n)</td>
          <td>O(1)*</td>
          <td>O(n)</td>
        </tr>
      </tbody>
    </table>
    <p><em>* At known position</em></p>

    <h4>Stacks</h4>
    <p><strong>Definition:</strong> A Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end (top).</p>

    <p><strong>Core Operations:</strong></p>
    <ul>
      <li><strong>Push:</strong> Add element to top - O(1)</li>
      <li><strong>Pop:</strong> Remove element from top - O(1)</li>
      <li><strong>Peek/Top:</strong> View top element - O(1)</li>
      <li><strong>IsEmpty:</strong> Check if stack is empty - O(1)</li>
    </ul>

    <div class="code-block">
      <pre><code>Stack Operations:
Initial: []
Push 1:  [1]
Push 2:  [1, 2]
Push 3:  [1, 2, 3]
Pop:     [1, 2] (returns 3)
Peek:    [1, 2] (returns 2, doesn't remove)

Stack Implementation (Array-based):
class Stack {
    constructor() {
        this.items = [];
        this.top = -1;
    }
    
    push(item) {
        this.items[++this.top] = item;
    }
    
    pop() {
        return this.top >= 0 ? this.items[this.top--] : null;
    }
}</code></pre>
    </div>

    <p><strong>Applications:</strong></p>
    <ul>
      <li><strong>Function Call Management:</strong> Call stack for recursion</li>
      <li><strong>Expression Evaluation:</strong> Parsing mathematical expressions</li>
      <li><strong>Undo Operations:</strong> Text editors, image editing</li>
      <li><strong>Browser History:</strong> Back button functionality</li>
    </ul>

    <h4>Queues</h4>
    <p><strong>Definition:</strong> A First-In-First-Out (FIFO) data structure where elements are added at the rear and removed from the front.</p>

    <p><strong>Core Operations:</strong></p>
    <ul>
      <li><strong>Enqueue:</strong> Add element to rear - O(1)</li>
      <li><strong>Dequeue:</strong> Remove element from front - O(1)</li>
      <li><strong>Front:</strong> View front element - O(1)</li>
      <li><strong>IsEmpty:</strong> Check if queue is empty - O(1)</li>
    </ul>

    <div class="code-block">
      <pre><code>Queue Operations:
Initial:    []
Enqueue 1:  [1]
Enqueue 2:  [1, 2]
Enqueue 3:  [1, 2, 3]
Dequeue:    [2, 3] (returns 1)
Front:      [2, 3] (returns 2, doesn't remove)

Circular Queue Implementation:
┌─────────────────────────────────────────────────────────────┐
│  0   1   2   3   4   5   6   7   (indices)                 │
│ [A] [B] [C] [ ] [ ] [ ] [ ] [ ]   (array)                  │
│  ↑           ↑                                              │
│ front       rear                                            │
└─────────────────────────────────────────────────────────────┘</code></pre>
    </div>

    <p><strong>Queue Variants:</strong></p>
    <ul>
      <li><strong>Circular Queue:</strong> Fixed-size queue with wraparound</li>
      <li><strong>Priority Queue:</strong> Elements have priorities</li>
      <li><strong>Deque:</strong> Double-ended queue (insertion/deletion at both ends)</li>
    </ul>

    <details>
      <summary><strong>Example: Netflix's Video Streaming Queue</strong></summary>
      <div class="info-note">
        Netflix uses queues extensively for video streaming. When you click play, video chunks are queued for download and buffering. They use priority queues to prioritize higher-quality video segments and circular buffers to manage the 3-second video buffer. For live streaming, they use deques to handle variable bitrate encoding, ensuring smooth playback for 230+ million subscribers. Their queue-based architecture processes 1+ billion hours of video monthly with 99.9% uptime.
      </div>
    </details>

    <h3>Non-Linear Data Structures</h3>
    <p>Non-linear data structures organize elements in a hierarchical or interconnected manner, allowing for more complex relationships between elements.</p>

    <h4>Trees</h4>
    <p><strong>Definition:</strong> A hierarchical data structure consisting of nodes connected by edges, with a single root node and no cycles.</p>

    <p><strong>Tree Terminology:</strong></p>
    <ul>
      <li><strong>Root:</strong> Top node with no parent</li>
      <li><strong>Parent:</strong> Node with child nodes</li>
      <li><strong>Child:</strong> Node with a parent</li>
      <li><strong>Leaf:</strong> Node with no children</li>
      <li><strong>Height:</strong> Longest path from root to leaf</li>
      <li><strong>Depth:</strong> Distance from root to a node</li>
    </ul>

    <div class="code-block">
      <pre><code>Binary Tree Structure:
       A (root, height=0)
      / \\
     B   C (level 1, height=1)
    / \\ / \\
   D  E F  G (leaves, height=2)

Tree Traversals:
Inorder (Left, Root, Right):   D, B, E, A, F, C, G
Preorder (Root, Left, Right):  A, B, D, E, C, F, G
Postorder (Left, Right, Root): D, E, B, F, G, C, A
Level-order (BFS):             A, B, C, D, E, F, G</code></pre>
    </div>

    <h4>Binary Search Trees (BST)</h4>
    <p><strong>Definition:</strong> A binary tree where left children are smaller than parent, and right children are larger.</p>

    <p><strong>Properties:</strong></p>
    <ul>
      <li><strong>Ordering:</strong> Left subtree < Node < Right subtree</li>
      <li><strong>Inorder Traversal:</strong> Gives sorted sequence</li>
      <li><strong>Search Efficiency:</strong> O(log n) average, O(n) worst case</li>
    </ul>

    <div class="code-block">
      <pre><code>BST Example:
       8
      / \\
     3   10
    / \\   \\
   1   6   14
      / \\  /
     4   7 13

Search for 6:
8 > 6, go left
3 < 6, go right
6 = 6, found! (3 comparisons)</code></pre>
    </div>

    <h4>Balanced Trees</h4>
    <p><strong>AVL Trees:</strong> Self-balancing BST where heights of subtrees differ by at most 1.</p>
    <p><strong>Red-Black Trees:</strong> Self-balancing BST with color properties ensuring O(log n) operations.</p>

    <table>
      <thead>
        <tr>
          <th>Tree Type</th>
          <th>Search</th>
          <th>Insert</th>
          <th>Delete</th>
          <th>Space</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Binary Search Tree</td>
          <td>O(n)</td>
          <td>O(n)</td>
          <td>O(n)</td>
          <td>O(n)</td>
          <td>No</td>
        </tr>
        <tr>
          <td>AVL Tree</td>
          <td>O(log n)</td>
          <td>O(log n)</td>
          <td>O(log n)</td>
          <td>O(n)</td>
          <td>Strict</td>
        </tr>
        <tr>
          <td>Red-Black Tree</td>
          <td>O(log n)</td>
          <td>O(log n)</td>
          <td>O(log n)</td>
          <td>O(n)</td>
          <td>Relaxed</td>
        </tr>
        <tr>
          <td>B-Tree</td>
          <td>O(log n)</td>
          <td>O(log n)</td>
          <td>O(log n)</td>
          <td>O(n)</td>
          <td>Yes</td>
        </tr>
      </tbody>
    </table>

    <h4>Heaps</h4>
    <p><strong>Definition:</strong> A complete binary tree that satisfies the heap property (max-heap: parent ≥ children, min-heap: parent ≤ children).</p>

    <p><strong>Heap Operations:</strong></p>
    <ul>
      <li><strong>Insert:</strong> Add element and heapify up - O(log n)</li>
      <li><strong>Extract-Max/Min:</strong> Remove root and heapify down - O(log n)</li>
      <li><strong>Peek:</strong> View root element - O(1)</li>
      <li><strong>Build Heap:</strong> Create heap from array - O(n)</li>
    </ul>

    <div class="code-block">
      <pre><code>Max Heap Example:
       100
      /    \\
     19      36
    /  \\    /  \\
   17   3  25   1

Array Representation: [100, 19, 36, 17, 3, 25, 1]
Parent of i: (i-1)/2
Left child of i: 2*i+1
Right child of i: 2*i+2

Heap Insert (50):
1. Add to end: [100, 19, 36, 17, 3, 25, 1, 50]
2. Heapify up: Compare 50 with parent 17, swap
3. Result: [100, 50, 36, 19, 3, 25, 1, 17]</code></pre>
    </div>

    <h4>Tries (Prefix Trees)</h4>
    <p><strong>Definition:</strong> A tree-like data structure for storing strings where each node represents a character.</p>

    <p><strong>Applications:</strong></p>
    <ul>
      <li><strong>Autocomplete:</strong> Search suggestions</li>
      <li><strong>Spell Checkers:</strong> Word validation</li>
      <li><strong>IP Routing:</strong> Longest prefix matching</li>
      <li><strong>Dictionary:</strong> Word storage and retrieval</li>
    </ul>

    <div class="code-block">
      <pre><code>Trie for words: "CAT", "CAR", "CARD", "CARE", "CAREFUL"

       ROOT
        |
        C
        |
        A
        |
        T*   R
             |
             D*   E*
                  |
                  F
                  |
                  U
                  |
                  L*

* = End of word
Search "CAR": O(3) - length of word
All words with prefix "CAR": O(k) - k = number of words</code></pre>
    </div>

    <details>
      <summary><strong>Example: Google's Autocomplete System</strong></summary>
      <div class="info-note">
        Google's autocomplete uses tries to handle 6+ billion searches daily. Their trie stores millions of query prefixes with popularity scores. When you type "face", it traverses the trie in O(4) time and returns top suggestions like "facebook", "facetime". They use compressed tries to save memory and distributed tries across data centers. This system provides sub-100ms response times for autocomplete suggestions, processing 40,000+ queries per second with 99.9% accuracy.
      </div>
    </details>

    <h3>Hash-Based Data Structures</h3>
    <p>Hash-based structures use hash functions to map keys to array indices, providing fast average-case performance for insertion, deletion, and lookup operations.</p>

    <h4>Hash Tables</h4>
    <p><strong>Definition:</strong> A data structure that implements an associative array using a hash function to compute array indices.</p>

    <p><strong>Hash Function Properties:</strong></p>
    <ul>
      <li><strong>Deterministic:</strong> Same input always produces same output</li>
      <li><strong>Uniform Distribution:</strong> Spreads keys evenly across array</li>
      <li><strong>Fast Computation:</strong> O(1) hash calculation</li>
      <li><strong>Avalanche Effect:</strong> Small input changes cause large output changes</li>
    </ul>

    <div class="code-block">
      <pre><code>Hash Table with Chaining:
Hash Function: h(key) = key % 7

Key-Value Pairs: (10, "A"), (22, "B"), (31, "C"), (4, "D"), (15, "E")

Index | Linked List
------|-------------
  0   | NULL
  1   | (22, "B") -> (15, "E")
  2   | NULL
  3   | (10, "A") -> (31, "C")
  4   | (4, "D")
  5   | NULL
  6   | NULL

Collision Resolution:
- Chaining: Store colliding elements in linked lists
- Open Addressing: Find next available slot (linear/quadratic probing)</code></pre>
    </div>

    <h4>Hash Table Performance</h4>
    <table>
      <thead>
        <tr>
          <th>Operation</th>
          <th>Average Case</th>
          <th>Worst Case</th>
          <th>Best Case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Search</td>
          <td>O(1)</td>
          <td>O(n)</td>
          <td>O(1)</td>
        </tr>
        <tr>
          <td>Insert</td>
          <td>O(1)</td>
          <td>O(n)</td>
          <td>O(1)</td>
        </tr>
        <tr>
          <td>Delete</td>
          <td>O(1)</td>
          <td>O(n)</td>
          <td>O(1)</td>
        </tr>
      </tbody>
    </table>

    <h4>Load Factor and Resizing</h4>
    <p><strong>Load Factor:</strong> α = n/m (n = elements, m = buckets)</p>
    <ul>
      <li><strong>Low Load Factor (α < 0.5):</strong> Wastes space but fewer collisions</li>
      <li><strong>High Load Factor (α > 0.75):</strong> Saves space but more collisions</li>
      <li><strong>Optimal Range:</strong> 0.5 ≤ α ≤ 0.75</li>
    </ul>

    <h4>Bloom Filters</h4>
    <p><strong>Definition:</strong> A probabilistic data structure that tests whether an element is in a set, with possible false positives but no false negatives.</p>

    <div class="code-block">
      <pre><code>Bloom Filter Operation:
Bit Array: [0, 0, 0, 0, 0, 0, 0, 0] (size 8)
Hash Functions: h1(x) = x % 8, h2(x) = (x * 3) % 8

Insert "apple":
h1("apple") = 2, h2("apple") = 6
Result: [0, 0, 1, 0, 0, 0, 1, 0]

Insert "banana":
h1("banana") = 1, h2("banana") = 3
Result: [0, 1, 1, 1, 0, 0, 1, 0]

Query "apple": Check positions 2 and 6 → Both 1 → "Possibly in set"
Query "orange": Check positions 7 and 5 → Position 7 is 0 → "Definitely not in set"</code></pre>
    </div>

    <h3>Graphs</h3>
    <p><strong>Definition:</strong> A collection of vertices (nodes) connected by edges, representing relationships between entities.</p>

    <h4>Graph Types</h4>
    <ul>
      <li><strong>Directed vs Undirected:</strong> Edges have direction or not</li>
      <li><strong>Weighted vs Unweighted:</strong> Edges have weights or not</li>
      <li><strong>Cyclic vs Acyclic:</strong> Contains cycles or not</li>
      <li><strong>Connected vs Disconnected:</strong> All vertices reachable or not</li>
    </ul>

    <h4>Graph Representations</h4>
    <div class="code-block">
      <pre><code>Graph: A-B, A-C, B-C, B-D, C-D

Adjacency Matrix:
   A B C D
A [0 1 1 0]
B [1 0 1 1]
C [1 1 0 1]
D [0 1 1 0]

Adjacency List:
A: [B, C]
B: [A, C, D]
C: [A, B, D]
D: [B, C]

Space Complexity:
- Adjacency Matrix: O(V²)
- Adjacency List: O(V + E)</code></pre>
    </div>

    <h4>Graph Algorithms</h4>
    <table>
      <thead>
        <tr>
          <th>Algorithm</th>
          <th>Purpose</th>
          <th>Time Complexity</th>
          <th>Space Complexity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>DFS</td>
          <td>Graph traversal</td>
          <td>O(V + E)</td>
          <td>O(V)</td>
        </tr>
        <tr>
          <td>BFS</td>
          <td>Shortest path (unweighted)</td>
          <td>O(V + E)</td>
          <td>O(V)</td>
        </tr>
        <tr>
          <td>Dijkstra</td>
          <td>Shortest path (weighted)</td>
          <td>O((V + E) log V)</td>
          <td>O(V)</td>
        </tr>
        <tr>
          <td>Kruskal</td>
          <td>Minimum spanning tree</td>
          <td>O(E log E)</td>
          <td>O(V)</td>
        </tr>
      </tbody>
    </table>

    <details>
      <summary><strong>Example: Facebook's Social Graph</strong></summary>
      <div class="info-note">
        Facebook's social graph represents 3+ billion users and their relationships using distributed graph databases. They use adjacency lists to store friend connections, enabling friend suggestions through graph traversal algorithms. Their graph stores 1+ trillion edges (friendships, likes, comments) and uses graph algorithms like BFS for "People You May Know" and PageRank variants for news feed ranking. The system handles 22+ billion social interactions daily with sub-second response times.
      </div>
    </details>

    <h3>Specialized Data Structures</h3>
    <p>Advanced data structures designed for specific use cases and performance requirements.</p>

    <h4>Segment Trees</h4>
    <p><strong>Purpose:</strong> Efficiently answer range queries and updates on arrays.</p>
    <p><strong>Applications:</strong> Range sum queries, range minimum queries, lazy propagation</p>
    <p><strong>Time Complexity:</strong> O(log n) for query and update, O(n) for build</p>

    <h4>Fenwick Trees (Binary Indexed Trees)</h4>
    <p><strong>Purpose:</strong> Efficiently calculate prefix sums and update array elements.</p>
    <p><strong>Applications:</strong> Cumulative frequency tables, range sum queries</p>
    <p><strong>Time Complexity:</strong> O(log n) for query and update</p>

    <h4>Disjoint Set (Union-Find)</h4>
    <p><strong>Purpose:</strong> Track connected components in a graph efficiently.</p>
    <p><strong>Applications:</strong> Kruskal's algorithm, network connectivity, percolation</p>
    <p><strong>Time Complexity:</strong> O(α(n)) amortized (α = inverse Ackermann function)</p>

    <h4>Skip Lists</h4>
    <p><strong>Purpose:</strong> Probabilistic alternative to balanced trees for sorted data.</p>
    <p><strong>Applications:</strong> Database indexing, concurrent data structures</p>
    <p><strong>Time Complexity:</strong> O(log n) expected for search, insert, delete</p>

    <h3>Data Structure Selection Guide</h3>
    <p>Choosing the right data structure depends on your specific requirements and use cases.</p>

    <h4>Selection Criteria</h4>
    <table>
      <thead>
        <tr>
          <th>Requirement</th>
          <th>Recommended Structure</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fast random access</td>
          <td>Array, Dynamic Array</td>
          <td>O(1) index-based access</td>
        </tr>
        <tr>
          <td>Frequent insertions/deletions</td>
          <td>Linked List, Deque</td>
          <td>O(1) operations at known positions</td>
        </tr>
        <tr>
          <td>LIFO operations</td>
          <td>Stack</td>
          <td>Natural LIFO behavior</td>
        </tr>
        <tr>
          <td>FIFO operations</td>
          <td>Queue</td>
          <td>Natural FIFO behavior</td>
        </tr>
        <tr>
          <td>Fast lookups</td>
          <td>Hash Table</td>
          <td>O(1) average case</td>
        </tr>
        <tr>
          <td>Sorted data</td>
          <td>BST, Balanced Trees</td>
          <td>Maintains order, O(log n) operations</td>
        </tr>
        <tr>
          <td>Priority-based processing</td>
          <td>Heap, Priority Queue</td>
          <td>O(log n) priority operations</td>
        </tr>
        <tr>
          <td>String prefix matching</td>
          <td>Trie</td>
          <td>Efficient prefix operations</td>
        </tr>
        <tr>
          <td>Graph relationships</td>
          <td>Adjacency List/Matrix</td>
          <td>Natural graph representation</td>
        </tr>
      </tbody>
    </table>

    <h4>Performance Comparison</h4>
    <div class="code-block">
      <pre><code>Operation Performance Summary:

Data Structure    | Access | Search | Insert | Delete | Space
------------------|--------|--------|--------|--------|-------
Array             | O(1)   | O(n)   | O(n)   | O(n)   | O(n)
Dynamic Array     | O(1)   | O(n)   | O(1)*  | O(n)   | O(n)
Linked List       | O(n)   | O(n)   | O(1)   | O(1)   | O(n)
Stack             | O(n)   | O(n)   | O(1)   | O(1)   | O(n)
Queue             | O(n)   | O(n)   | O(1)   | O(1)   | O(n)
Hash Table        | N/A    | O(1)*  | O(1)*  | O(1)*  | O(n)
Binary Search Tree| O(log n)| O(log n)| O(log n)| O(log n)| O(n)
Heap              | O(1)   | O(n)   | O(log n)| O(log n)| O(n)
Trie              | O(m)   | O(m)   | O(m)   | O(m)   | O(ALPHABET_SIZE * N * M)

* = Amortized or average case
m = length of string</code></pre>
    </div>

    <h3>Memory Considerations</h3>
    <p>Understanding memory usage and cache performance is crucial for optimal data structure selection.</p>

    <h4>Memory Layout Impact</h4>
    <ul>
      <li><strong>Arrays:</strong> Excellent cache locality, minimal memory overhead</li>
      <li><strong>Linked Lists:</strong> Poor cache locality, pointer overhead (8 bytes per node)</li>
      <li><strong>Trees:</strong> Moderate cache locality, structure overhead</li>
      <li><strong>Hash Tables:</strong> Good cache locality with open addressing</li>
    </ul>

    <h4>Cache Performance</h4>
    <div class="code-block">
      <pre><code>Cache Line Effects (64-byte cache lines):

Array Access Pattern:
[A][B][C][D][E][F][G][H] - Sequential access loads entire cache line
Cache hits: 7/8 accesses = 87.5% hit rate

Linked List Access Pattern:
[A]-->[B]-->[C]-->[D] - Random memory locations
Cache hits: 0/4 accesses = 0% hit rate

Performance Impact:
- Array: ~1 cycle per access (cache hit)
- Linked List: ~300 cycles per access (cache miss)</code></pre>
    </div>

    <h3>Conclusion</h3>
    <p>Data structures form the foundation of efficient algorithm design and system performance. The choice of data structure significantly impacts program efficiency, memory usage, and scalability. Understanding the trade-offs between different structures enables developers to make informed decisions based on specific requirements.</p>

    <p>Key principles for data structure selection:</p>
    <ul>
      <li><strong>Analyze Access Patterns:</strong> Understand how data will be accessed and modified</li>
      <li><strong>Consider Time Complexity:</strong> Balance between different operation requirements</li>
      <li><strong>Evaluate Memory Usage:</strong> Consider both space complexity and cache performance</li>
      <li><strong>Think About Scalability:</strong> How performance changes with data size</li>
      <li><strong>Consider Concurrency:</strong> Thread safety and parallel access requirements</li>
    </ul>

    <p>Mastering data structures is essential for technical interviews and building high-performance software systems. The key is understanding not just how each structure works, but when and why to use each one.</p>

    <h3>References</h3>
    <ul>
      <li><a href="https://www.geeksforgeeks.org/data-structures/" target="_blank">GeeksforGeeks Data Structures</a></li>
      <li><a href="https://visualgo.net/en" target="_blank">VisuAlgo - Data Structure Visualizations</a></li>
      <li><a href="https://www.bigocheatsheet.com/" target="_blank">Big O Cheat Sheet</a></li>
      <li><a href="https://github.com/trekhleb/javascript-algorithms" target="_blank">JavaScript Algorithms and Data Structures</a></li>
      <li><a href="https://www.coursera.org/learn/algorithms-part1" target="_blank">Princeton Algorithms Course</a></li>
    </ul>
  `
}; 