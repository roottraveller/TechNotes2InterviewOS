export const cacheStrategies = {
  id: 'cache-strategies',
  title: 'Cache Strategies',
  content: `
<p>Cache strategies define how data is read from and written to cache in relation to the underlying data store. Choosing the right caching strategy is crucial for optimizing application performance and maintaining data consistency.</p>

    <h3>Reading Data from Cache</h3>
    
    <h4>Cache-Aside (Lazy Loading)</h4>
    <p>The application code is responsible for managing the cache. If the data is found in the cache, it's cache hit and data is returned to the application. If not, its cache miss, the application fetches the data from the underlying data store, stores it in the cache for future use, and then returns it to the application.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Cache-Aside Pattern Implementation
def get_user(user_id):
    # Try to get from cache first
    user = cache.get(f"user:{user_id}")
    
    if user is None:
        # Cache miss - fetch from database
        user = database.query("SELECT * FROM users WHERE id = ?", user_id)
        
        if user:
            # Store in cache for future requests
            cache.set(f"user:{user_id}", user, ttl=3600)
    
    return user

# Advantages:
# - Only requested data is cached
# - Cache can use different data model than database
# - Resilient to cache failures

# Disadvantages:
# - Initial request is slow (cache miss)
# - Possible data inconsistency
# - Extra code complexity</code></pre>
    </div>

    <h4>Read-Through</h4>
    <p>The cache itself is responsible for managing the cache and automatically fetching data from the underlying data store when it's not found in the cache. When the application requests data, the cache checks if it's available. If not, it automatically fetches it from the data store, populates the cache, and then returns the data to the application.</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Read-Through Pattern (Cache Library Handles Loading)
class ReadThroughCache:
    def __init__(self, data_loader):
        self.cache = {}
        self.data_loader = data_loader
    
    def get(self, key):
        if key in self.cache:
            return self.cache[key]
        
        # Cache automatically loads from data store
        value = self.data_loader(key)
        if value is not None:
            self.cache[key] = value
        
        return value

# Usage
cache = ReadThroughCache(
    data_loader=lambda key: database.get(key)
)
user = cache.get("user:123")  # Cache handles everything</code></pre>
    </div>

    <h3>Writing Data to Cache</h3>
    
    <h4>Write-Around</h4>
    <p>The data is written directly to the underlying data store (e.g., SSD), bypassing the cache. This strategy is useful for write-heavy workloads.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Write-Around Pattern
def update_user(user_id, user_data):
    # Write directly to database, bypass cache
    database.update("UPDATE users SET ... WHERE id = ?", 
                   user_data, user_id)
    
    # Invalidate cache entry (optional)
    cache.delete(f"user:{user_id}")
    
    # Next read will fetch fresh data from database

# Use when:
# - Data is written once, read infrequently
# - Write performance is critical
# - Can tolerate cache misses on reads</code></pre>
    </div>

    <h4>Write-Through</h4>
    <p>The data is written to both the cache and the underlying data store synchronously. This ensures that the data in the cache is always consistent with the data in the underlying data store but can introduce additional latency for write operations.</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Write-Through Pattern
def update_user(user_id, user_data):
    # Write to cache
    cache.set(f"user:{user_id}", user_data)
    
    # Write to database (synchronous)
    database.update("UPDATE users SET ... WHERE id = ?", 
                   user_data, user_id)
    
    # Both writes must succeed
    # Data is always consistent

# Advantages:
# - Cache always has latest data
# - Simplifies cache consistency
# - Good for read-heavy workloads

# Disadvantages:
# - Higher write latency
# - Cache churn for infrequently read data</code></pre>
    </div>

    <h4>Write-Back (Write-Behind)</h4>
    <p>The data is written to the cache first and then asynchronously written to the underlying data store. This can improve write performance since writes are acknowledged as soon as they're written to the cache, but there's a risk of data loss if the cache fails before data is written to the data store. write-ahead-log (WAL) can be used for this.</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Write-Back Pattern
class WriteBackCache:
    def __init__(self):
        self.cache = {}
        self.dirty_keys = set()
        self.wal = WriteAheadLog()  # For durability
    
    def set(self, key, value):
        # Log to WAL first for durability
        self.wal.append(('SET', key, value))
        
        # Write to cache immediately
        self.cache[key] = value
        self.dirty_keys.add(key)
        
        # Return immediately (fast writes)
        return True
    
    def flush_to_database(self):
        # Periodically flush dirty entries to database
        for key in self.dirty_keys:
            value = self.cache[key]
            database.update(key, value)
        
        self.dirty_keys.clear()
        self.wal.checkpoint()</code></pre>
    </div>

    <h4>Write-Behind</h4>
    <p>Similar to Write-Back, but the actual write to the data store is deferred until a later time, often during periods of low activity, and may involve batching or aggregating data before writing it to the data store.</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Write-Behind with Batching
class WriteBehindCache:
    def __init__(self, batch_size=100, flush_interval=60):
        self.cache = {}
        self.write_buffer = []
        self.batch_size = batch_size
        self.flush_interval = flush_interval
        self.last_flush = time.time()
    
    def set(self, key, value):
        self.cache[key] = value
        self.write_buffer.append((key, value))
        
        # Check if we should flush
        if len(self.write_buffer) >= self.batch_size:
            self.flush_batch()
    
    def flush_batch(self):
        if not self.write_buffer:
            return
        
        # Batch write to database
        database.batch_update(self.write_buffer)
        self.write_buffer.clear()
        self.last_flush = time.time()</code></pre>
    </div>

    <h3>Cache Strategy Comparison</h3>
    
    <table>
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Read Performance</th>
          <th>Write Performance</th>
          <th>Consistency</th>
          <th>Use Case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cache-Aside</strong></td>
          <td>Good (after warm-up)</td>
          <td>Good</td>
          <td>Eventual</td>
          <td>General purpose</td>
        </tr>
        <tr>
          <td><strong>Read-Through</strong></td>
          <td>Good (after warm-up)</td>
          <td>N/A</td>
          <td>Eventual</td>
          <td>Read-heavy workloads</td>
        </tr>
        <tr>
          <td><strong>Write-Around</strong></td>
          <td>Poor (cache misses)</td>
          <td>Best</td>
          <td>Eventual</td>
          <td>Write once, read rarely</td>
        </tr>
        <tr>
          <td><strong>Write-Through</strong></td>
          <td>Best</td>
          <td>Poor</td>
          <td>Strong</td>
          <td>Read-heavy, consistency critical</td>
        </tr>
        <tr>
          <td><strong>Write-Back</strong></td>
          <td>Best</td>
          <td>Best</td>
          <td>Weak</td>
          <td>Write-heavy workloads</td>
        </tr>
      </tbody>
    </table>

    <h3>Choosing the Right Strategy</h3>
    
    <h4>Consider These Factors</h4>
    <ul>
      <li><strong>Read/Write Ratio:</strong> Read-heavy vs write-heavy workload</li>
      <li><strong>Consistency Requirements:</strong> Strong vs eventual consistency</li>
      <li><strong>Latency Tolerance:</strong> Acceptable read/write latencies</li>
      <li><strong>Data Loss Tolerance:</strong> Can you afford to lose writes?</li>
      <li><strong>Complexity:</strong> Implementation and maintenance overhead</li>
    </ul>

    <h4>Common Patterns</h4>
    <ul>
      <li><strong>Session Data:</strong> Write-through for consistency</li>
      <li><strong>Product Catalog:</strong> Cache-aside with long TTL</li>
      <li><strong>Analytics Data:</strong> Write-behind with batching</li>
      <li><strong>User Profiles:</strong> Read-through with moderate TTL</li>
      <li><strong>Audit Logs:</strong> Write-around (skip cache)</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>Set Appropriate TTLs:</strong> Balance freshness vs performance</li>
      <li><strong>Handle Cache Failures:</strong> Graceful degradation to database</li>
      <li><strong>Monitor Hit Rates:</strong> Track cache effectiveness</li>
      <li><strong>Implement Cache Warming:</strong> Pre-populate critical data</li>
      <li><strong>Use Cache Invalidation:</strong> Keep data consistent</li>
      <li><strong>Consider Cache Stampede:</strong> Prevent thundering herd</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://codeahoy.com/2017/08/11/caching-strategies-and-how-to-choose-the-right-one/" target="_blank">Caching Strategies and How to Choose the Right One</a></li>
      <li><a href="https://blog.bytebytego.com/p/top-caching-strategies" target="_blank">Top Caching Strategies - ByteByteGo</a></li>
    </ul>
`
}; 