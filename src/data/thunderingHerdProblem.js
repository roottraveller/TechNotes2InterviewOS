export const thunderingHerdProblem = {
  id: 'thundering-herd-problem',
  title: 'Thundering Herd Problem',
  content: `
<p>The thundering herd problem occurs when multiple processes or threads simultaneously wake up or activate to handle an event, but only one can actually process it, leading to wasted resources and potential system overload.</p>
    
    <h3>What is Thundering Herd?</h3>
    <ul>
      <li><strong>Definition:</strong> Large number of processes awakened simultaneously to handle single event</li>
      <li><strong>Waste:</strong> Only one process can handle the event, others waste CPU cycles</li>
      <li><strong>Contention:</strong> Processes compete for same resource causing lock contention</li>
      <li><strong>Performance Impact:</strong> System performance degrades due to unnecessary context switching</li>
    </ul>

    <h3>Common Scenarios</h3>
    
    <h4>1. Cache Expiration</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Scenario:
1. Popular cache key expires at exactly 12:00:00
2. 1000 concurrent requests arrive at 12:00:01
3. All requests find cache miss
4. All 1000 requests query database simultaneously
5. Database gets overwhelmed
6. Only first response needed, others wasted

Result: Database overload, poor response times</code></pre>
    </div>

    <h4>2. Connection Pool Exhaustion</h4>
    <ul>
      <li><strong>Scenario:</strong> All connections in pool are busy</li>
      <li><strong>Problem:</strong> Many threads wait for connection to become available</li>
      <li><strong>Issue:</strong> When connection is released, all waiting threads wake up</li>
      <li><strong>Result:</strong> Only one thread gets connection, others waste cycles</li>
    </ul>

    <h4>3. File Locking</h4>
    <ul>
      <li><strong>Scenario:</strong> Multiple processes waiting for file lock</li>
      <li><strong>Problem:</strong> When lock is released, all processes wake up</li>
      <li><strong>Issue:</strong> Only one process can acquire lock</li>
      <li><strong>Result:</strong> Unnecessary context switching and CPU usage</li>
    </ul>

    <h3>Real-World Examples</h3>
    
    <h4>Web Application Cache</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Problematic code - thundering herd
public String getPopularData(String key) {
    String data = cache.get(key);
    if (data == null) {
        // Multiple threads execute this simultaneously
        data = database.query(key);
        cache.put(key, data, 3600); // 1 hour TTL
    }
    return data;
}</code></pre>
    </div>

    <h4>Database Connection Pool</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Problematic pattern
while (true) {
    Connection conn = pool.getConnection(); // Blocking call
    if (conn != null) {
        // Process request
        break;
    }
    // All threads wake up when connection available
    Thread.sleep(10); // Doesn't solve the problem
}</code></pre>
    </div>

    <h3>Solutions and Mitigation Strategies</h3>
    
    <h4>1. Cache Stampede Prevention</h4>
    
    <h5>Lock-Based Approach</h5>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>private final ConcurrentHashMap<String, Object> locks = new ConcurrentHashMap<>();

public String getDataWithLock(String key) {
    String data = cache.get(key);
    if (data == null) {
        Object lock = locks.computeIfAbsent(key, k -> new Object());
        synchronized (lock) {
            // Double-check after acquiring lock
            data = cache.get(key);
            if (data == null) {
                data = database.query(key);
                cache.put(key, data, 3600);
            }
        }
        locks.remove(key); // Clean up
    }
    return data;
}</code></pre>
    </div>

    <h5>Probabilistic Early Expiration</h5>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public String getDataWithProbabilisticRefresh(String key) {
    CacheItem item = cache.getWithMetadata(key);
    
    if (item == null) {
        return refreshData(key);
    }
    
    // Probabilistic early refresh
    long timeToExpire = item.expiryTime - System.currentTimeMillis();
    long totalTTL = item.ttl;
    
    // Probability increases as expiry approaches
    double refreshProbability = Math.exp(-timeToExpire / totalTTL);
    
    if (Math.random() < refreshProbability) {
        // Refresh asynchronously
        CompletableFuture.runAsync(() -> refreshData(key));
    }
    
    return item.data;
}</code></pre>
    </div>

    <h4>2. Jittered Expiration</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Add randomness to cache TTL
public void cacheWithJitter(String key, String data, int baseTTL) {
    // Add random jitter (±20% of base TTL)
    int jitter = (int) (baseTTL * 0.2 * Math.random());
    int actualTTL = baseTTL + jitter - (int)(baseTTL * 0.1);
    
    cache.put(key, data, actualTTL);
}</code></pre>
    </div>

    <h4>3. Queue-Based Processing</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Use queue to serialize access
public class ThrottledProcessor {
    private final BlockingQueue<Request> requestQueue;
    private final ExecutorService singleThreadExecutor;
    
    public ThrottledProcessor() {
        this.requestQueue = new LinkedBlockingQueue<>();
        this.singleThreadExecutor = Executors.newSingleThreadExecutor();
        startProcessor();
    }
    
    private void startProcessor() {
        singleThreadExecutor.submit(() -> {
            while (true) {
                try {
                    Request request = requestQueue.take();
                    processRequest(request);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
    }
}</code></pre>
    </div>

    <h4>4. Circuit Breaker Pattern</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>public class CircuitBreaker {
    private enum State { CLOSED, OPEN, HALF_OPEN }
    
    private State state = State.CLOSED;
    private int failureCount = 0;
    private long lastFailureTime = 0;
    private final int failureThreshold = 5;
    private final long timeout = 60000; // 1 minute
    
    public String callService(String key) throws Exception {
        if (state == State.OPEN) {
            if (System.currentTimeMillis() - lastFailureTime > timeout) {
                state = State.HALF_OPEN;
            } else {
                throw new Exception("Circuit breaker is OPEN");
            }
        }
        
        try {
            String result = database.query(key);
            onSuccess();
            return result;
        } catch (Exception e) {
            onFailure();
            throw e;
        }
    }
}</code></pre>
    </div>

    <h3>System-Level Solutions</h3>
    
    <h4>1. Load Balancer Configuration</h4>
    <ul>
      <li><strong>Connection Limits:</strong> Limit concurrent connections per backend</li>
      <li><strong>Request Queuing:</strong> Queue requests instead of rejecting them</li>
      <li><strong>Health Checks:</strong> Prevent routing to overloaded servers</li>
      <li><strong>Circuit Breakers:</strong> Fail fast when backend is overloaded</li>
    </ul>

    <h4>2. Database Optimization</h4>
    <ul>
      <li><strong>Connection Pooling:</strong> Proper pool sizing and configuration</li>
      <li><strong>Query Optimization:</strong> Reduce query execution time</li>
      <li><strong>Read Replicas:</strong> Distribute read load across replicas</li>
      <li><strong>Caching Layers:</strong> Multiple levels of caching</li>
    </ul>

    <h4>3. Infrastructure Scaling</h4>
    <ul>
      <li><strong>Auto-scaling:</strong> Automatically scale based on load</li>
      <li><strong>Resource Limits:</strong> Set appropriate CPU and memory limits</li>
      <li><strong>Monitoring:</strong> Alert on resource exhaustion</li>
      <li><strong>Capacity Planning:</strong> Plan for peak loads</li>
    </ul>

    <h3>Prevention Best Practices</h3>
    
    <h4>Cache Design</h4>
    <ul>
      <li><strong>Staggered Expiration:</strong> Don't expire all items at once</li>
      <li><strong>Warm-up Strategies:</strong> Pre-populate cache before expiration</li>
      <li><strong>Layered Caching:</strong> Multiple cache levels with different TTLs</li>
      <li><strong>Async Refresh:</strong> Refresh cache asynchronously</li>
    </ul>

    <h4>Application Design</h4>
    <ul>
      <li><strong>Graceful Degradation:</strong> Serve stale data when necessary</li>
      <li><strong>Rate Limiting:</strong> Limit request rate per client</li>
      <li><strong>Bulkhead Pattern:</strong> Isolate resources to prevent cascade failures</li>
      <li><strong>Timeout Configuration:</strong> Set appropriate timeouts</li>
    </ul>

    <h3>Monitoring and Detection</h3>
    
    <h4>Key Metrics</h4>
    <ul>
      <li><strong>Response Time Spikes:</strong> Sudden increases in response time</li>
      <li><strong>Error Rate Increases:</strong> Higher than normal error rates</li>
      <li><strong>Resource Utilization:</strong> CPU, memory, and I/O spikes</li>
      <li><strong>Queue Depths:</strong> Growing queues indicate bottlenecks</li>
    </ul>

    <h4>Alerting</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Example monitoring metrics
public class ThunderingHerdMonitor {
    private final MeterRegistry meterRegistry;
    private final Counter cacheHits;
    private final Counter cacheMisses;
    private final Timer databaseQueryTime;
    
    public void recordCacheHit() {
        cacheHits.increment();
    }
    
    public void recordCacheMiss() {
        cacheMisses.increment();
    }
    
    public void recordDatabaseQuery(Duration duration) {
        databaseQueryTime.record(duration);
    }
}</code></pre>
    </div>

    <div class="info-note">
      <strong>💡 Key Insight:</strong>
      <p>The thundering herd problem is often a symptom of poor resource management and lack of coordination between concurrent processes. Prevention is better than mitigation - design systems to avoid the conditions that create thundering herds.</p>
    </div>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://en.wikipedia.org/wiki/Thundering_herd_problem" target="_blank">Thundering Herd Problem - Wikipedia</a></li>
        <li><a href="https://instagram-engineering.com/thundering-herds-promises-82191c8af57d" target="_blank">Instagram Engineering - Thundering Herds & Promises</a></li>
      </ul>
    </div>
`
}; 