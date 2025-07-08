export const cacheEvictionPolicies = {
  id: 'cache-eviction-policies',
  title: 'Cache Eviction Policies',
  content: `
Cache eviction policies determine which data to remove when cache capacity is reached. Understanding these policies is crucial for optimizing cache performance and hit rates.

## Overview

When a cache reaches its capacity limit, it must decide which existing entries to remove to make space for new data. The choice of eviction policy significantly impacts:
- **Cache hit rate**: Percentage of requests served from cache
- **Performance**: Overall system response time
- **Resource utilization**: Memory and CPU usage
- **Application behavior**: User experience and throughput

## Common Eviction Policies

### 1. LRU (Least Recently Used)

**Algorithm:**
- Evicts the least recently accessed item
- Maintains access order information
- Based on temporal locality principle

**Implementation:**
\`\`\`javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
\`\`\`

**Advantages:**
- Good performance for temporal locality
- Intuitive behavior
- Well-suited for most general-purpose applications

**Disadvantages:**
- Overhead of maintaining access order
- Vulnerable to sequential scans
- Can be fooled by one-time large data accesses

**Use Cases:**
- Web page caching
- Database buffer pools
- CPU caches
- General-purpose applications

### 2. LFU (Least Frequently Used)

**Algorithm:**
- Evicts the least frequently accessed item
- Maintains frequency counters
- Based on frequency of access pattern

**Implementation:**
\`\`\`javascript
class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.frequencies = new Map();
    this.minFreq = 0;
    this.freqGroups = new Map();
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    this.updateFrequency(key);
    return this.cache.get(key);
  }
  
  put(key, value) {
    if (this.capacity === 0) return;
    
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      this.updateFrequency(key);
      return;
    }
    
    if (this.cache.size >= this.capacity) {
      this.evictLFU();
    }
    
    this.cache.set(key, value);
    this.frequencies.set(key, 1);
    this.addToFreqGroup(key, 1);
    this.minFreq = 1;
  }
  
  updateFrequency(key) {
    const freq = this.frequencies.get(key);
    this.frequencies.set(key, freq + 1);
    
    this.removeFromFreqGroup(key, freq);
    this.addToFreqGroup(key, freq + 1);
    
    if (freq === this.minFreq && this.freqGroups.get(freq).size === 0) {
      this.minFreq++;
    }
  }
  
  evictLFU() {
    const leastFreqKeys = this.freqGroups.get(this.minFreq);
    const keyToEvict = leastFreqKeys.keys().next().value;
    
    this.cache.delete(keyToEvict);
    this.frequencies.delete(keyToEvict);
    this.removeFromFreqGroup(keyToEvict, this.minFreq);
  }
}
\`\`\`

**Advantages:**
- Excellent for workloads with clear frequency patterns
- Resistant to temporal anomalies
- Good for long-term caching strategies

**Disadvantages:**
- Complex implementation
- Higher memory overhead
- Slow adaptation to changing patterns
- Age problem (old frequent items stay forever)

**Use Cases:**
- Content delivery networks
- Database query result caching
- Static content caching
- Long-term data caching

### 3. FIFO (First In, First Out)

**Algorithm:**
- Evicts the oldest item in the cache
- Simple queue-based implementation
- No consideration of access patterns

**Implementation:**
\`\`\`javascript
class FIFOCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.queue = [];
  }
  
  get(key) {
    return this.cache.has(key) ? this.cache.get(key) : -1;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      return;
    }
    
    if (this.cache.size >= this.capacity) {
      const oldestKey = this.queue.shift();
      this.cache.delete(oldestKey);
    }
    
    this.cache.set(key, value);
    this.queue.push(key);
  }
}
\`\`\`

**Advantages:**
- Simple implementation
- Low overhead
- Predictable behavior
- Fair eviction policy

**Disadvantages:**
- Ignores access patterns
- Poor performance for temporal locality
- May evict frequently used items

**Use Cases:**
- Simple caching scenarios
- When implementation simplicity is priority
- Temporary data storage
- Log rotation systems

### 4. LIFO (Last In, First Out)

**Algorithm:**
- Evicts the most recently added item
- Stack-based implementation
- Opposite of FIFO approach

**Implementation:**
\`\`\`javascript
class LIFOCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.stack = [];
  }
  
  get(key) {
    return this.cache.has(key) ? this.cache.get(key) : -1;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      return;
    }
    
    if (this.cache.size >= this.capacity) {
      const newestKey = this.stack.pop();
      this.cache.delete(newestKey);
    }
    
    this.cache.set(key, value);
    this.stack.push(key);
  }
}
\`\`\`

**Use Cases:**
- Stack-like data access patterns
- Undo operations
- Temporary computations
- Specialized applications

### 5. Random Replacement

**Algorithm:**
- Evicts a randomly selected item
- No pattern analysis required
- Probabilistically fair

**Implementation:**
\`\`\`javascript
class RandomCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.keys = [];
  }
  
  get(key) {
    return this.cache.has(key) ? this.cache.get(key) : -1;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      return;
    }
    
    if (this.cache.size >= this.capacity) {
      const randomIndex = Math.floor(Math.random() * this.keys.length);
      const randomKey = this.keys[randomIndex];
      
      this.cache.delete(randomKey);
      this.keys.splice(randomIndex, 1);
    }
    
    this.cache.set(key, value);
    this.keys.push(key);
  }
}
\`\`\`

**Advantages:**
- Simple implementation
- No overhead for tracking access patterns
- Resistant to worst-case scenarios
- Good average performance

**Disadvantages:**
- Unpredictable behavior
- May evict frequently used items
- No optimization for access patterns

**Use Cases:**
- When access patterns are completely random
- Simple caching requirements
- Testing and benchmarking
- Memory-constrained environments

## Advanced Eviction Policies

### 1. LRU-K

**Algorithm:**
- Considers K most recent accesses
- More sophisticated than simple LRU
- Better handling of sequential scans

**Characteristics:**
- Tracks K most recent access times
- Evicts item with oldest K-th access
- Commonly used: LRU-2

**Use Cases:**
- Database buffer management
- File system caches
- Applications with mixed access patterns

### 2. 2Q (Two Queue)

**Algorithm:**
- Uses two LRU queues: A1 (FIFO) and Am (LRU)
- New items enter A1
- Promoted to Am on second access
- Eviction from A1 or Am based on sizes

**Implementation Concept:**
\`\`\`javascript
class TwoQCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.a1Size = Math.floor(capacity * 0.25); // 25% for A1
    this.amSize = capacity - this.a1Size;      // 75% for Am
    
    this.a1 = new FIFOCache(this.a1Size);     // FIFO queue
    this.am = new LRUCache(this.amSize);      // LRU queue
    this.a1Out = new Set();                   // Ghost entries
  }
  
  get(key) {
    // Check Am first (hot data)
    let value = this.am.get(key);
    if (value !== -1) return value;
    
    // Check A1 (warm data)
    value = this.a1.get(key);
    if (value !== -1) {
      // Promote to Am
      this.a1.delete(key);
      this.am.put(key, value);
      return value;
    }
    
    return -1;
  }
}
\`\`\`

**Advantages:**
- Better scan resistance than LRU
- Good performance for mixed workloads
- Adaptive behavior

**Use Cases:**
- Database systems
- File systems
- Mixed read/write workloads

### 3. ARC (Adaptive Replacement Cache)

**Algorithm:**
- Dynamically balances between recency and frequency
- Uses four lists: T1, T2, B1, B2
- Self-tuning based on workload

**Characteristics:**
- T1: Recent items (LRU)
- T2: Frequent items (LRU)
- B1, B2: Ghost entries for adaptation
- Dynamically adjusts T1/T2 sizes

**Advantages:**
- Excellent adaptation to workload changes
- Combines benefits of LRU and LFU
- Self-tuning parameters

**Disadvantages:**
- Complex implementation
- Higher memory overhead
- Patent restrictions (historically)

**Use Cases:**
- High-performance storage systems
- Database buffer pools
- Enterprise caching solutions

## Policy Comparison

### Performance Characteristics

| Policy | Hit Rate | Implementation | Memory Overhead | Adaptation |
|--------|----------|----------------|-----------------|------------|
| LRU | Good | Medium | Medium | Fast |
| LFU | Excellent* | Complex | High | Slow |
| FIFO | Poor | Simple | Low | None |
| Random | Average | Simple | Low | None |
| LRU-K | Very Good | Complex | High | Medium |
| 2Q | Very Good | Medium | Medium | Medium |
| ARC | Excellent | Complex | High | Excellent |

*Depends on workload characteristics

### Workload Suitability

| Workload Type | Best Policies | Worst Policies |
|---------------|---------------|----------------|
| Temporal Locality | LRU, LRU-K, ARC | FIFO, Random |
| Frequency-based | LFU, ARC | FIFO, LIFO |
| Sequential Scans | 2Q, LRU-K, ARC | LRU, LFU |
| Random Access | Random, ARC | LRU, LFU |
| Mixed Patterns | ARC, 2Q | FIFO, LIFO |

## Implementation Considerations

### 1. Thread Safety

\`\`\`javascript
class ThreadSafeLRUCache {
  constructor(capacity) {
    this.cache = new LRUCache(capacity);
    this.lock = new ReadWriteLock();
  }
  
  get(key) {
    this.lock.readLock();
    try {
      return this.cache.get(key);
    } finally {
      this.lock.readUnlock();
    }
  }
  
  put(key, value) {
    this.lock.writeLock();
    try {
      this.cache.put(key, value);
    } finally {
      this.lock.writeUnlock();
    }
  }
}
\`\`\`

### 2. Memory Efficiency

\`\`\`javascript
// Compact LRU using doubly-linked list
class CompactLRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.head = { key: 0, value: 0 };
    this.tail = { key: 0, value: 0 };
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.cache = new Map();
  }
  
  addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }
  
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  moveToHead(node) {
    this.removeNode(node);
    this.addNode(node);
  }
  
  popTail() {
    const lastNode = this.tail.prev;
    this.removeNode(lastNode);
    return lastNode;
  }
}
\`\`\`

### 3. Performance Optimization

\`\`\`javascript
// Lock-free LRU using atomic operations
class LockFreeLRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.segments = [];
    this.segmentCount = Math.min(16, capacity);
    
    for (let i = 0; i < this.segmentCount; i++) {
      this.segments.push(new LRUCache(Math.ceil(capacity / this.segmentCount)));
    }
  }
  
  getSegment(key) {
    return this.segments[this.hash(key) % this.segmentCount];
  }
  
  hash(key) {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash + key.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash);
  }
  
  get(key) {
    return this.getSegment(key).get(key);
  }
  
  put(key, value) {
    this.getSegment(key).put(key, value);
  }
}
\`\`\`

## Best Practices

### 1. Policy Selection

\`\`\`javascript
// Decision framework for policy selection
function selectEvictionPolicy(workloadCharacteristics) {
  const {
    temporalLocality,
    frequencyPattern,
    scanResistance,
    implementationComplexity,
    memoryConstraints
  } = workloadCharacteristics;
  
  if (memoryConstraints === 'strict') {
    return 'FIFO'; // Lowest overhead
  }
  
  if (implementationComplexity === 'simple') {
    return temporalLocality ? 'LRU' : 'Random';
  }
  
  if (scanResistance === 'required') {
    return '2Q'; // Good scan resistance
  }
  
  if (frequencyPattern === 'strong') {
    return 'LFU'; // Frequency-based
  }
  
  if (workloadCharacteristics.adaptive === true) {
    return 'ARC'; // Self-tuning
  }
  
  return 'LRU'; // Default choice
}
\`\`\`

### 2. Monitoring and Tuning

\`\`\`javascript
class CacheMetrics {
  constructor() {
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
    this.startTime = Date.now();
  }
  
  recordHit() {
    this.hits++;
  }
  
  recordMiss() {
    this.misses++;
  }
  
  recordEviction() {
    this.evictions++;
  }
  
  getHitRate() {
    const total = this.hits + this.misses;
    return total > 0 ? this.hits / total : 0;
  }
  
  getEvictionRate() {
    const duration = (Date.now() - this.startTime) / 1000;
    return this.evictions / duration;
  }
  
  shouldTunePolicy() {
    const hitRate = this.getHitRate();
    const evictionRate = this.getEvictionRate();
    
    return hitRate < 0.8 || evictionRate > 100; // Thresholds
  }
}
\`\`\`

### 3. Hybrid Approaches

\`\`\`javascript
// Multi-tier cache with different policies
class HybridCache {
  constructor(l1Size, l2Size) {
    this.l1 = new LRUCache(l1Size);     // Fast, small cache
    this.l2 = new LFUCache(l2Size);     // Larger, frequency-based
  }
  
  get(key) {
    // Check L1 first
    let value = this.l1.get(key);
    if (value !== -1) {
      return value;
    }
    
    // Check L2
    value = this.l2.get(key);
    if (value !== -1) {
      // Promote to L1
      this.l1.put(key, value);
      return value;
    }
    
    return -1;
  }
  
  put(key, value) {
    // Always insert into L1
    this.l1.put(key, value);
    
    // Also insert into L2 for frequency tracking
    this.l2.put(key, value);
  }
}
\`\`\`

## Common Pitfalls

### 1. Wrong Policy Choice

\`\`\`javascript
// Anti-pattern: Using LRU for sequential scans
const badChoice = {
  workload: 'large sequential file processing',
  policy: 'LRU',
  result: 'poor hit rate due to scan pollution'
};

// Better: Use scan-resistant policy
const goodChoice = {
  workload: 'large sequential file processing',
  policy: '2Q',
  result: 'maintains cache for hot data'
};
\`\`\`

### 2. Ignoring Overhead

\`\`\`javascript
// Consider implementation overhead
const overheadComparison = {
  FIFO: { memory: 'O(1)', cpu: 'O(1)' },
  LRU: { memory: 'O(n)', cpu: 'O(1)' },
  LFU: { memory: 'O(n)', cpu: 'O(log n)' },
  ARC: { memory: 'O(n)', cpu: 'O(1)' }
};
\`\`\`

### 3. Static Configuration

\`\`\`javascript
// Anti-pattern: Fixed cache policy
const staticCache = new LRUCache(1000);

// Better: Adaptive configuration
class AdaptiveCache {
  constructor() {
    this.policy = 'LRU';
    this.cache = new LRUCache(1000);
    this.metrics = new CacheMetrics();
  }
  
  adaptPolicy() {
    if (this.metrics.shouldTunePolicy()) {
      // Switch policy based on observed patterns
      this.policy = this.selectOptimalPolicy();
      this.cache = this.createCache(this.policy);
    }
  }
}
\`\`\`

## Conclusion

Cache eviction policies are fundamental to cache performance and system efficiency. The choice of policy should be based on:

1. **Workload characteristics**: Access patterns and data locality
2. **Performance requirements**: Hit rate and latency targets
3. **Resource constraints**: Memory and CPU limitations
4. **Implementation complexity**: Development and maintenance costs

Modern systems often benefit from adaptive or hybrid approaches that can adjust to changing workload patterns. Understanding the trade-offs between different policies enables informed decisions that optimize cache effectiveness for specific use cases.

Regular monitoring and tuning of cache behavior ensures continued optimal performance as workloads evolve over time.
`
}; 