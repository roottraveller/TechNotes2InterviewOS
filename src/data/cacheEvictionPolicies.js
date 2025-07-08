export const cacheEvictionPolicies = {
  id: 'cache-eviction-policies',
  title: 'Cache Eviction Policies',
  content: `
    <p>Cache eviction policies determine which data to remove when cache capacity is reached. Understanding these policies is crucial for optimizing cache performance and hit rates in distributed systems, databases, and applications where memory is a limited resource.</p>

    <details>
      <summary><strong>Real-World Example: Redis Memory Management</strong></summary>
      <div class="info-note">
        When Redis reaches its <code>maxmemory</code> limit, it must evict keys to make room for new data. Netflix uses Redis with LRU eviction for session storage, ensuring frequently accessed user sessions remain in memory while inactive sessions are automatically removed. This approach maintains sub-millisecond response times for 200+ million users worldwide.
      </div>
    </details>

    <h3>Core Concepts</h3>
    <p>When a cache reaches its capacity limit, it must decide which existing entries to remove to make space for new data. The choice of eviction policy significantly impacts system performance and resource utilization.</p>

    <h4>Impact on System Performance</h4>
    <ul>
      <li><strong>Cache hit rate:</strong> Percentage of requests served from cache</li>
      <li><strong>Performance:</strong> Overall system response time and throughput</li>
      <li><strong>Resource utilization:</strong> Memory and CPU usage efficiency</li>
      <li><strong>Application behavior:</strong> User experience and system reliability</li>
    </ul>

    <h3>Fundamental Eviction Policies</h3>
    <p>Different eviction policies optimize for different access patterns and system requirements, each with distinct advantages and trade-offs.</p>

    <h4>1. LRU (Least Recently Used)</h4>
    <p><strong>Algorithm:</strong> Evicts the least recently accessed item, maintaining access order information based on the temporal locality principle.</p>

    <details>
      <summary><strong>Example: CPU Cache Implementation</strong></summary>
      <div class="info-note">
        Modern CPUs use LRU-approximation algorithms in their L2 and L3 caches. When Intel's Core i9 processor needs to evict cache lines, it removes the least recently used data, ensuring frequently accessed instructions and data remain available for fast execution. This approach achieves 95%+ hit rates for typical workloads.
      </div>
    </details>

    <div class="code-block">
      <h5>Implementation Example:</h5>
      <pre><code>class LRUCache {
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
}</code></pre>
    </div>

    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Excellent performance for workloads with temporal locality</li>
      <li>Intuitive behavior that matches human expectations</li>
      <li>Well-suited for most general-purpose applications</li>
      <li>O(1) access time with proper implementation</li>
    </ul>

    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Overhead of maintaining access order information</li>
      <li>Vulnerable to sequential scans (cache pollution)</li>
      <li>Can be fooled by one-time large data accesses</li>
      <li>Memory overhead for tracking access order</li>
    </ul>

    <h4>2. LFU (Least Frequently Used)</h4>
    <p><strong>Algorithm:</strong> Evicts the least frequently accessed item by maintaining frequency counters, based on the frequency of access patterns over time.</p>

    <details>
      <summary><strong>Example: CDN Content Optimization</strong></summary>
      <div class="info-note">
        Cloudflare uses LFU-based algorithms in their edge caches to optimize content delivery. Popular content like viral videos or trending articles accumulate high frequency counts and remain cached across multiple edge locations, while less popular content is evicted. This approach reduces origin server load by 90%+ for frequently accessed content.
      </div>
    </details>

    <div class="code-block">
      <h5>Implementation Concept:</h5>
      <pre><code>class LFUCache {
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
  
  updateFrequency(key) {
    const freq = this.frequencies.get(key);
    this.frequencies.set(key, freq + 1);
    
    // Update frequency groups
    this.removeFromFreqGroup(key, freq);
    this.addToFreqGroup(key, freq + 1);
    
    if (freq === this.minFreq && 
        this.freqGroups.get(freq).size === 0) {
      this.minFreq++;
    }
  }
}</code></pre>
    </div>

    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Excellent for workloads with clear frequency patterns</li>
      <li>Resistant to temporal anomalies and one-time accesses</li>
      <li>Good for long-term caching strategies</li>
      <li>Optimal for content distribution networks</li>
    </ul>

    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Complex implementation with higher memory overhead</li>
      <li>Slow adaptation to changing access patterns</li>
      <li>Age problem (old frequent items may stay forever)</li>
      <li>Poor performance for rapidly changing workloads</li>
    </ul>

    <h4>3. FIFO (First In, First Out)</h4>
    <p><strong>Algorithm:</strong> Evicts the oldest item in the cache using a simple queue-based implementation with no consideration of access patterns.</p>

    <details>
      <summary><strong>Example: Log Buffer Management</strong></summary>
      <div class="info-note">
        Apache Kafka uses FIFO-based log segment management where the oldest log segments are deleted first when disk space limits are reached. This ensures a predictable retention policy where data is removed in the order it was written, maintaining data consistency and simplifying storage management for streaming applications processing terabytes of data daily.
      </div>
    </details>

    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Simple implementation with minimal overhead</li>
      <li>Predictable and fair eviction behavior</li>
      <li>Good for scenarios where age matters more than usage</li>
      <li>Excellent for time-based data retention</li>
    </ul>

    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Completely ignores access patterns</li>
      <li>Poor performance for workloads with temporal locality</li>
      <li>May evict frequently used items</li>
      <li>Not suitable for performance-critical caching</li>
    </ul>

    <h4>4. Random Replacement</h4>
    <p><strong>Algorithm:</strong> Evicts a randomly selected item with no pattern analysis required, providing probabilistically fair behavior.</p>

    <details>
      <summary><strong>Example: Database Buffer Pool Fallback</strong></summary>
      <div class="info-note">
        PostgreSQL uses random replacement as a fallback strategy when its sophisticated buffer management algorithms can't determine an optimal eviction candidate. This prevents worst-case scenarios where complex algorithms might fail, ensuring the database continues operating even under unpredictable workloads with consistent average performance.
      </div>
    </details>

    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Simplest possible implementation</li>
      <li>No overhead for tracking access patterns</li>
      <li>Resistant to worst-case scenarios</li>
      <li>Good average performance across varied workloads</li>
    </ul>

    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Unpredictable behavior</li>
      <li>May randomly evict frequently used items</li>
      <li>No optimization for any access patterns</li>
      <li>Poor for applications requiring predictable performance</li>
    </ul>

    <h3>Advanced Eviction Policies</h3>
    <p>Sophisticated algorithms designed to handle complex workloads and provide adaptive behavior for enterprise systems.</p>

    <h4>1. ARC (Adaptive Replacement Cache)</h4>
    <p><strong>Algorithm:</strong> Dynamically balances between recency (LRU) and frequency (LFU) using four lists (T1, T2, B1, B2) with self-tuning parameters based on workload characteristics.</p>

    <details>
      <summary><strong>Example: ZFS Storage System</strong></summary>
      <div class="info-note">
        ZFS uses ARC for its buffer cache, automatically adapting between recent and frequent data access patterns. In a typical file server, ARC might allocate 70% of cache to recently accessed files during backup operations, then dynamically shift to 60% frequent data during normal workday operations, maintaining optimal performance across different usage patterns.
      </div>
    </details>

    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Excellent adaptation to changing workload patterns</li>
      <li>Combines benefits of both LRU and LFU</li>
      <li>Self-tuning parameters require no manual configuration</li>
      <li>Optimal performance across mixed workloads</li>
    </ul>

    <h4>2. 2Q (Two Queue)</h4>
    <p><strong>Algorithm:</strong> Uses two LRU queues where new items enter A1 (FIFO), get promoted to Am (LRU) on second access, providing scan resistance while maintaining simplicity.</p>

    <details>
      <summary><strong>Example: Database Query Result Cache</strong></summary>
      <div class="info-note">
        MySQL's query cache uses 2Q-inspired algorithms to handle mixed workloads. One-time analytical queries (like monthly reports) stay in the A1 queue and are quickly evicted, while frequently accessed queries (like user profile lookups) get promoted to the Am queue, ensuring that regular application queries maintain fast response times even during heavy analytical workloads.
      </div>
    </details>

    <h3>Policy Comparison & Selection</h3>
    <p>Understanding the trade-offs between different eviction policies helps in making informed decisions for specific use cases.</p>

    <table>
      <thead>
        <tr>
          <th>Policy</th>
          <th>Hit Rate</th>
          <th>Implementation</th>
          <th>Memory Overhead</th>
          <th>Adaptation Speed</th>
          <th>Best Use Cases</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>LRU</td>
          <td>Good</td>
          <td>Medium</td>
          <td>Medium</td>
          <td>Fast</td>
          <td>General-purpose, web caching</td>
        </tr>
        <tr>
          <td>LFU</td>
          <td>Excellent*</td>
          <td>Complex</td>
          <td>High</td>
          <td>Slow</td>
          <td>CDN, static content</td>
        </tr>
        <tr>
          <td>FIFO</td>
          <td>Poor</td>
          <td>Simple</td>
          <td>Low</td>
          <td>None</td>
          <td>Log rotation, time-based retention</td>
        </tr>
        <tr>
          <td>Random</td>
          <td>Average</td>
          <td>Simple</td>
          <td>Low</td>
          <td>None</td>
          <td>Unpredictable workloads</td>
        </tr>
        <tr>
          <td>ARC</td>
          <td>Excellent</td>
          <td>Complex</td>
          <td>High</td>
          <td>Excellent</td>
          <td>Enterprise storage, databases</td>
        </tr>
        <tr>
          <td>2Q</td>
          <td>Very Good</td>
          <td>Medium</td>
          <td>Medium</td>
          <td>Medium</td>
          <td>Mixed workloads, scan resistance</td>
        </tr>
      </tbody>
    </table>

    <h3>Implementation Best Practices</h3>
    <p>Practical considerations for implementing and optimizing cache eviction policies in production systems.</p>

    <h4>1. Thread Safety Considerations</h4>
    <div class="code-block">
      <pre><code>class ThreadSafeLRUCache {
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
}</code></pre>
    </div>

    <h4>2. Performance Monitoring</h4>
    <div class="code-block">
      <pre><code>class CacheMetrics {
  constructor() {
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
    this.startTime = Date.now();
  }
  
  getHitRate() {
    const total = this.hits + this.misses;
    return total > 0 ? this.hits / total : 0;
  }
  
  shouldTunePolicy() {
    const hitRate = this.getHitRate();
    const evictionRate = this.getEvictionRate();
    
    return hitRate < 0.8 || evictionRate > 100;
  }
}</code></pre>
    </div>

    <h4>3. Hybrid Approaches</h4>
    <div class="code-block">
      <pre><code>// Multi-tier cache with different policies
class HybridCache {
  constructor(l1Size, l2Size) {
    this.l1 = new LRUCache(l1Size);     // Fast, small cache
    this.l2 = new LFUCache(l2Size);     // Larger, frequency-based
  }
  
  get(key) {
    // Check L1 first
    let value = this.l1.get(key);
    if (value !== -1) return value;
    
    // Check L2 and promote if found
    value = this.l2.get(key);
    if (value !== -1) {
      this.l1.put(key, value);
      return value;
    }
    
    return -1;
  }
}</code></pre>
    </div>

    <h3>Common Pitfalls & Solutions</h3>
    <p>Understanding common mistakes and how to avoid them when implementing cache eviction policies.</p>

    <h4>1. Wrong Policy Selection</h4>
    <ul>
      <li><strong>Problem:</strong> Using LRU for sequential scans causes cache pollution</li>
      <li><strong>Solution:</strong> Use scan-resistant policies like 2Q or ARC</li>
      <li><strong>Example:</strong> Database full-table scans should not evict frequently accessed index pages</li>
    </ul>

    <h4>2. Ignoring Implementation Overhead</h4>
    <ul>
      <li><strong>Problem:</strong> Complex policies may consume more resources than they save</li>
      <li><strong>Solution:</strong> Consider memory and CPU overhead in policy selection</li>
      <li><strong>Example:</strong> LFU's frequency tracking may use more memory than the cached data</li>
    </ul>

    <h4>3. Static Configuration</h4>
    <ul>
      <li><strong>Problem:</strong> Fixed policies can't adapt to changing workloads</li>
      <li><strong>Solution:</strong> Implement adaptive or hybrid approaches</li>
      <li><strong>Example:</strong> Switch between LRU and LFU based on observed access patterns</li>
    </ul>

    <h3>Conclusion</h3>
    <p>Cache eviction policies are fundamental to system performance and resource efficiency. The optimal choice depends on workload characteristics, performance requirements, resource constraints, and implementation complexity. Modern systems often benefit from adaptive or hybrid approaches that can adjust to changing patterns.</p>

    <p>Key considerations for policy selection:</p>
    <ul>
      <li><strong>Workload analysis:</strong> Understand access patterns and data locality</li>
      <li><strong>Performance targets:</strong> Define acceptable hit rates and latency requirements</li>
      <li><strong>Resource constraints:</strong> Consider memory and CPU limitations</li>
      <li><strong>Operational complexity:</strong> Balance sophistication with maintainability</li>
    </ul>

    <p>Regular monitoring and tuning ensure continued optimal performance as workloads evolve, making cache eviction policy selection a critical aspect of system architecture and performance optimization.</p>

    <h3>References</h3>
    <ul>
      <li><a href="https://en.wikipedia.org/wiki/Cache_replacement_policies" target="_blank">Cache Replacement Policies - Wikipedia</a></li>
      <li><a href="https://redis.io/topics/lru-cache" target="_blank">Redis LRU Cache Documentation</a></li>
      <li><a href="https://dl.acm.org/doi/10.1145/1113361.1113364" target="_blank">ARC: A Self-Tuning, Low Overhead Replacement Cache</a></li>
      <li><a href="https://www.usenix.org/conference/fast-03/2q-low-overhead-high-performance-buffer-management-replacement-algorithm" target="_blank">2Q: A Low Overhead High Performance Buffer Management Replacement Algorithm</a></li>
    </ul>
  `
}; 