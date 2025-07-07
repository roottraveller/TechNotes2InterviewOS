export const caching = {
  id: 'caching',
  title: 'Caching Strategies',
  content: `
    <h2>Caching Strategies</h2>
    <p>Caching is a technique used to store frequently accessed data in a fast storage layer to improve application performance and reduce latency.</p>

    <h3>Types of Caching</h3>
    
    <h4>1. Browser Caching</h4>
    <ul>
      <li><strong>Local Storage:</strong> Persistent storage with no expiration</li>
      <li><strong>Session Storage:</strong> Storage that expires when tab closes</li>
      <li><strong>HTTP Cache:</strong> Browser caches resources based on HTTP headers</li>
      <li><strong>Service Worker Cache:</strong> Programmable cache for offline support</li>
    </ul>

    <h4>2. Application-Level Caching</h4>
    <ul>
      <li><strong>In-Memory Cache:</strong> Data stored in application memory (Redis, Memcached)</li>
      <li><strong>Database Query Cache:</strong> Cached results of expensive database queries</li>
      <li><strong>Object Cache:</strong> Cached computed objects or data structures</li>
    </ul>

    <h4>3. System-Level Caching</h4>
    <ul>
      <li><strong>CPU Cache:</strong> L1, L2, L3 caches for processor optimization</li>
      <li><strong>Operating System Cache:</strong> File system and memory caching</li>
      <li><strong>Proxy Cache:</strong> Reverse proxy caching (Nginx, Varnish)</li>
    </ul>

    <h3>Cache Patterns</h3>

    <h4>Cache-Aside (Lazy Loading)</h4>
    <div class="code-block">
      <span class="code-label">CODE</span>
      <pre><code>// Application manages cache directly
function getData(key) {
  // Check cache first
  let data = cache.get(key);
  if (data === null) {
    // Cache miss - fetch from database
    data = database.get(key);
    // Store in cache for future requests
    cache.set(key, data, TTL);
  }
  return data;
}</code></pre>
    </div>

    <h4>Write-Through</h4>
    <ul>
      <li>Data is written to cache and database simultaneously</li>
      <li>Ensures cache consistency but adds write latency</li>
      <li>Good for read-heavy workloads with consistent data</li>
    </ul>

    <h4>Write-Behind (Write-Back)</h4>
    <ul>
      <li>Data written to cache immediately, database updated asynchronously</li>
      <li>Lower write latency but risk of data loss</li>
      <li>Suitable for write-heavy applications</li>
    </ul>

    <h4>Refresh-Ahead</h4>
    <ul>
      <li>Cache refreshes data before expiration</li>
      <li>Prevents cache misses for frequently accessed data</li>
      <li>Requires prediction of access patterns</li>
    </ul>

    <h3>Cache Eviction Policies</h3>

    <table>
      <thead>
        <tr>
          <th>Policy</th>
          <th>Description</th>
          <th>Use Case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>LRU</strong></td>
          <td>Least Recently Used</td>
          <td>General purpose, good temporal locality</td>
        </tr>
        <tr>
          <td><strong>LFU</strong></td>
          <td>Least Frequently Used</td>
          <td>Data with clear access frequency patterns</td>
        </tr>
        <tr>
          <td><strong>FIFO</strong></td>
          <td>First In, First Out</td>
          <td>Simple implementation, limited effectiveness</td>
        </tr>
        <tr>
          <td><strong>TTL</strong></td>
          <td>Time To Live</td>
          <td>Data with natural expiration times</td>
        </tr>
        <tr>
          <td><strong>Random</strong></td>
          <td>Random eviction</td>
          <td>Simple, works well with uniform access</td>
        </tr>
      </tbody>
    </table>

    <h3>Cache Hierarchies</h3>
    <p>Multi-level caching systems for optimal performance:</p>
    
    <ol>
      <li><strong>L1 Cache:</strong> CPU registers and instruction cache</li>
      <li><strong>L2 Cache:</strong> Application memory cache (Redis)</li>
      <li><strong>L3 Cache:</strong> Distributed cache (Redis Cluster)</li>
      <li><strong>L4 Cache:</strong> Database query cache</li>
      <li><strong>L5 Cache:</strong> Disk-based cache</li>
    </ol>

    <h3>Cache Challenges</h3>

    <h4>Cache Invalidation</h4>
    <ul>
      <li><strong>Cache Stampede:</strong> Multiple requests fetch same data simultaneously</li>
      <li><strong>Cache Penetration:</strong> Queries for non-existent data bypass cache</li>
      <li><strong>Cache Avalanche:</strong> Mass cache expiration causes database overload</li>
    </ul>

    <h4>Consistency Issues</h4>
    <ul>
      <li><strong>Stale Data:</strong> Cache contains outdated information</li>
      <li><strong>Race Conditions:</strong> Concurrent updates cause inconsistency</li>
      <li><strong>Cache Coherence:</strong> Multiple cache instances synchronization</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li>Set appropriate TTL values based on data volatility</li>
      <li>Use cache keys with consistent naming conventions</li>
      <li>Monitor cache hit/miss ratios and adjust strategies</li>
      <li>Implement circuit breakers for cache failures</li>
      <li>Use compression for large cached objects</li>
      <li>Consider cache warming for critical data</li>
      <li>Implement proper error handling for cache operations</li>
    </ul>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>Effective caching requires understanding your data access patterns, consistency requirements, and performance goals. The right caching strategy can improve application performance by orders of magnitude.</p>
    </div>
  `
}; 