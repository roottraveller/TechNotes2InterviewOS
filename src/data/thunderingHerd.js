export const thunderingHerd = {
  id: 'thundering-herd-problem',
  title: 'Thundering Herd Problem',
  content: `
<p>The Thundering Herd Problem can occur in distributed systems when multiple clients or processes simultaneously request the same resource that has recently become available or has been updated. This simultaneous surge of requests can overwhelm the system, leading to increased latency, resource contention, and potentially system instability.</p>

    <h3>What is Thundering Herd?</h3>
    <p><strong>Thundering Herd means a sudden surge of activity or requests directed at a resource or a system.</strong></p>

    <h3>Common Scenarios</h3>
    
    <h4>Cache Invalidation</h4>
    <ul>
      <li>When a popular cached item expires, multiple clients simultaneously try to fetch and rebuild the cache</li>
      <li>All requests hit the backend database or service at once</li>
      <li>Can cause database overload and cascading failures</li>
    </ul>

    <h4>Service Restart</h4>
    <ul>
      <li>When a service comes back online after downtime</li>
      <li>All waiting clients immediately reconnect</li>
      <li>Connection surge can overwhelm the newly started service</li>
    </ul>

    <h4>Lock Release</h4>
    <ul>
      <li>When a distributed lock is released</li>
      <li>Multiple waiting processes compete for the lock simultaneously</li>
      <li>Can cause CPU spikes and contention</li>
    </ul>

    <h3>Mitigation Strategies</h3>
    
    <h4>1. Jittered Backoff</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Add random delay to prevent simultaneous requests
import random
import time

def jittered_retry(base_delay=1.0, max_jitter=0.5):
    """Add randomness to retry delays"""
    jitter = random.uniform(0, max_jitter)
    delay = base_delay + jitter
    time.sleep(delay)
    
# Example usage
for attempt in range(max_retries):
    try:
        result = fetch_resource()
        break
    except ResourceUnavailable:
        jittered_retry(base_delay=2**attempt)</code></pre>
    </div>

    <h4>2. Request Coalescing</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Combine multiple requests for the same resource
class RequestCoalescer:
    def __init__(self):
        self.pending_requests = {}
        self.locks = {}
    
    async def get_resource(self, key):
        # If request already pending, wait for it
        if key in self.pending_requests:
            return await self.pending_requests[key]
        
        # Create new request promise
        future = asyncio.Future()
        self.pending_requests[key] = future
        
        try:
            # Only one request actually fetches
            result = await fetch_from_backend(key)
            future.set_result(result)
            return result
        finally:
            del self.pending_requests[key]</code></pre>
    </div>

    <h4>3. Probabilistic Early Expiration</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Refresh cache before actual expiration
def should_refresh_cache(ttl, elapsed_time, beta=1.0):
    """
    Probabilistically determine if cache should be refreshed
    based on XFetch algorithm
    """
    import math
    import random
    
    # Calculate probability of refresh
    remaining_ttl = ttl - elapsed_time
    if remaining_ttl <= 0:
        return True
    
    # Probability increases as we approach expiration
    probability = 1 - math.exp(-elapsed_time * beta / ttl)
    return random.random() < probability

# Usage in cache implementation
class ProbabilisticCache:
    def get(self, key):
        entry = self.cache.get(key)
        if not entry:
            return None
            
        elapsed = time.time() - entry.timestamp
        if should_refresh_cache(entry.ttl, elapsed):
            # Refresh in background
            asyncio.create_task(self.refresh_entry(key))
            
        return entry.value</code></pre>
    </div>

    <h4>4. Circuit Breaker Pattern</h4>
    <ul>
      <li>Detect when backend is overwhelmed</li>
      <li>Fail fast instead of adding more load</li>
      <li>Gradually allow requests through when system recovers</li>
    </ul>

    <h4>5. Rate Limiting</h4>
    <ul>
      <li>Limit the number of requests per time window</li>
      <li>Use token bucket or sliding window algorithms</li>
      <li>Prevent any single event from triggering too many requests</li>
    </ul>

    <h3>Real-World Examples</h3>
    
    <h4>Facebook's Thundering Herd Solution</h4>
    <ul>
      <li>Uses "Lease" mechanism for cache updates</li>
      <li>Only one client gets a lease to update cache</li>
      <li>Other clients wait for the lease holder to complete</li>
    </ul>

    <h4>Netflix's Approach</h4>
    <ul>
      <li>Request collapsing at multiple layers</li>
      <li>Hystrix circuit breakers to prevent cascading failures</li>
      <li>Adaptive concurrency limits</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>Add Randomness:</strong> Use jitter in retry delays and cache expiration</li>
      <li><strong>Implement Request Deduplication:</strong> Coalesce identical requests</li>
      <li><strong>Use Gradual Rollouts:</strong> Slowly increase traffic to recovering services</li>
      <li><strong>Monitor and Alert:</strong> Track request spikes and system load</li>
      <li><strong>Design for Failure:</strong> Assume thundering herds will happen</li>
      <li><strong>Test at Scale:</strong> Simulate thundering herd scenarios in testing</li>
    </ul>

    <h3>Related Concepts</h3>
    <ul>
      <li><strong>Cache Stampede:</strong> Specific case of thundering herd for cache systems</li>
      <li><strong>Connection Storms:</strong> Thundering herd for network connections</li>
      <li><strong>Retry Storms:</strong> Cascading retries causing additional load</li>
      <li><strong>Cold Start Problem:</strong> Related issue when systems start without warm caches</li>
    </ul>
`
}; 