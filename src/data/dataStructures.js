export const dataStructures = {
  id: 'data-structures',
  title: 'Data Structures',
  content: `# Data Structures

## Definition
Data structures are specialized formats for organizing, storing, and manipulating data efficiently in computer programs.

## Linear Data Structures
- **Array**: Fixed-size sequential collection
- **Linked List**: Dynamic sequential collection with pointers
- **Stack**: Last-In-First-Out (LIFO) structure
- **Queue**: First-In-First-Out (FIFO) structure
- **Deque**: Double-ended queue

## Non-Linear Data Structures
- **Tree**: Hierarchical structure with nodes
- **Graph**: Nodes connected by edges
- **Heap**: Complete binary tree with heap property
- **Trie**: Prefix tree for string operations

## Hash-Based Structures
- **Hash Table**: Key-value pairs with hash function
- **Hash Set**: Unique elements using hashing
- **Bloom Filter**: Probabilistic membership testing

## Tree Types
- **Binary Tree**: Each node has at most two children
- **Binary Search Tree**: Ordered binary tree
- **AVL Tree**: Self-balancing binary search tree
- **Red-Black Tree**: Self-balancing binary search tree
- **B-Tree**: Multi-way tree for databases

## Time Complexity (Big O)
- **Access**: O(1) for arrays, O(n) for linked lists
- **Search**: O(log n) for balanced trees, O(n) for linear
- **Insertion**: O(1) for stacks/queues, O(log n) for balanced trees
- **Deletion**: Similar to insertion complexity

## Space Complexity
- **Arrays**: O(n) contiguous memory
- **Linked Lists**: O(n) with pointer overhead
- **Trees**: O(n) with structure overhead
- **Hash Tables**: O(n) with load factor considerations

## Use Cases
- **Arrays**: Random access, mathematical operations
- **Linked Lists**: Dynamic size, frequent insertions/deletions
- **Stacks**: Function calls, expression evaluation
- **Queues**: Task scheduling, breadth-first search
- **Trees**: Hierarchical data, searching, sorting
- **Hash Tables**: Fast lookups, caching

## Implementation Considerations
- **Memory Usage**: Space efficiency
- **Cache Performance**: Locality of reference
- **Thread Safety**: Concurrent access
- **Garbage Collection**: Memory management

## Interview Questions
**Q: When would you use a linked list over an array?**
A: When you need frequent insertions/deletions at arbitrary positions and don't need random access to elements.`
}; 