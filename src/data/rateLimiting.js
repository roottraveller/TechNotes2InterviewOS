export const rateLimiting = {
  id: 'rate-limiting',
  title: 'Rate Limiting',
  content: `
    <h2>Rate Limiting</h2>
    <p>Rate limiting is used to control the rate at which clients or users can access a particular resource or service over a specified period of time. It helps prevent abuse, misuse, or overloading of the system by limiting the number of requests or transactions that can be processed within a given timeframe.</p>

    <h3>Why Rate Limiting?</h3>
    
    <h4>Protection Against</h4>
    <ul>
      <li><strong>DDoS Attacks:</strong> Prevents overwhelming the system</li>
      <li><strong>Brute Force:</strong> Limits password guessing attempts</li>
      <li><strong>Resource Exhaustion:</strong> Prevents single user monopolizing resources</li>
      <li><strong>API Abuse:</strong> Controls excessive API usage</li>
      <li><strong>Cost Control:</strong> Manages third-party API costs</li>
    </ul>

    <h4>Benefits</h4>
    <ul>
      <li><strong>Fair Usage:</strong> Ensures equitable resource distribution</li>
      <li><strong>System Stability:</strong> Prevents overload</li>
      <li><strong>Quality of Service:</strong> Maintains performance for all users</li>
      <li><strong>Revenue Protection:</strong> Enforces pricing tiers</li>
      <li><strong>Security:</strong> Mitigates various attack vectors</li>
    </ul>

    <h3>Rate Limiting Algorithms</h3>
    
    <h4>1. Token Bucket</h4>
    <p>Uses a fixed-size token bucket. Each request consumes a token if available, else rate-limited. Tokens are refilled at a fixed rate.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Token Bucket Implementation
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }
  
  consume(tokens = 1) {
    this.refill();
    
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }
  
  refill() {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;
    const tokensToAdd = timePassed * this.refillRate;
    
    this.tokens = Math.min(
      this.capacity,
      this.tokens + tokensToAdd
    );
    this.lastRefill = now;
  }
}

// Usage: 10 requests per second
const bucket = new TokenBucket(10, 10);
if (bucket.consume()) {
  // Process request
} else {
  // Rate limited
}</code></pre>
    </div>

    <h4>2. Leaking Bucket</h4>
    <p>Uses a virtual "bucket/queue" with a fixed capacity and a constant leak rate. Requests are added to the bucket if not full, else rate-limited.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Leaking Bucket Implementation
class LeakingBucket {
  constructor(capacity, leakRate) {
    this.capacity = capacity;
    this.queue = [];
    this.leakRate = leakRate;
    this.lastLeak = Date.now();
    
    // Start leaking
    this.startLeaking();
  }
  
  async add(request) {
    this.leak();
    
    if (this.queue.length >= this.capacity) {
      throw new Error('Rate limit exceeded');
    }
    
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
    });
  }
  
  leak() {
    const now = Date.now();
    const timePassed = (now - this.lastLeak) / 1000;
    const requestsToProcess = Math.floor(timePassed * this.leakRate);
    
    for (let i = 0; i < requestsToProcess && this.queue.length > 0; i++) {
      const { request, resolve } = this.queue.shift();
      resolve(request);
    }
    
    this.lastLeak = now;
  }
  
  startLeaking() {
    setInterval(() => this.leak(), 100); // Check every 100ms
  }
}</code></pre>
    </div>

    <h4>3. Fixed Window Counter</h4>
    <p>Requests are counted within fixed time intervals or windows. If the number of requests exceeds the allowed threshold, the request is rate-limited. The window is reset at a fixed time interval.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Fixed Window Counter Implementation
class FixedWindowCounter {
  constructor(windowSize, limit) {
    this.windowSize = windowSize; // in milliseconds
    this.limit = limit;
    this.windows = new Map();
  }
  
  allow(key) {
    const now = Date.now();
    const window = Math.floor(now / this.windowSize);
    
    // Clean old windows
    this.cleanup(window);
    
    // Get current window count
    const windowKey = \`\${key}:\${window}\`;
    const count = this.windows.get(windowKey) || 0;
    
    if (count >= this.limit) {
      return false;
    }
    
    this.windows.set(windowKey, count + 1);
    return true;
  }
  
  cleanup(currentWindow) {
    for (const [key, _] of this.windows) {
      const window = parseInt(key.split(':')[1]);
      if (window < currentWindow - 1) {
        this.windows.delete(key);
      }
    }
  }
}

// 100 requests per minute
const limiter = new FixedWindowCounter(60000, 100);</code></pre>
    </div>

    <h4>4. Sliding Window (Production)</h4>
    <p>Requests within the current rolling or sliding window are counted, and if they exceed the threshold, further requests are rate-limited.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Sliding Window Log Implementation
class SlidingWindowLog {
  constructor(windowSize, limit) {
    this.windowSize = windowSize; // in milliseconds
    this.limit = limit;
    this.requests = new Map(); // userId -> timestamps[]
  }
  
  allow(userId) {
    const now = Date.now();
    const windowStart = now - this.windowSize;
    
    // Get user's request timestamps
    let timestamps = this.requests.get(userId) || [];
    
    // Remove old timestamps outside window
    timestamps = timestamps.filter(t => t > windowStart);
    
    // Check if limit exceeded
    if (timestamps.length >= this.limit) {
      return false;
    }
    
    // Add current timestamp
    timestamps.push(now);
    this.requests.set(userId, timestamps);
    
    return true;
  }
}

// Sliding Window Counter (Hybrid approach)
class SlidingWindowCounter {
  constructor(windowSize, limit) {
    this.windowSize = windowSize;
    this.limit = limit;
    this.previousWindow = new Map();
    this.currentWindow = new Map();
    this.windowStart = Date.now();
  }
  
  allow(key) {
    const now = Date.now();
    
    // Check if we need to slide the window
    if (now - this.windowStart >= this.windowSize) {
      this.previousWindow = this.currentWindow;
      this.currentWindow = new Map();
      this.windowStart = now;
    }
    
    // Calculate weight for previous window
    const windowProgress = (now - this.windowStart) / this.windowSize;
    const previousWeight = 1 - windowProgress;
    
    // Get counts
    const currentCount = this.currentWindow.get(key) || 0;
    const previousCount = this.previousWindow.get(key) || 0;
    
    // Calculate weighted count
    const weightedCount = (previousCount * previousWeight) + currentCount;
    
    if (weightedCount >= this.limit) {
      return false;
    }
    
    this.currentWindow.set(key, currentCount + 1);
    return true;
  }
}</code></pre>
    </div>

    <h3>Implementation Strategies</h3>
    
    <h4>1. Client-Side Rate Limiting</h4>
    <ul>
      <li><strong>SDK/Library:</strong> Built into client libraries</li>
      <li><strong>Retry Logic:</strong> Exponential backoff</li>
      <li><strong>Local Throttling:</strong> Prevents unnecessary requests</li>
      <li><strong>Cooperative:</strong> Relies on client compliance</li>
    </ul>

    <h4>2. Server-Side Rate Limiting</h4>
    <ul>
      <li><strong>API Gateway:</strong> Centralized rate limiting</li>
      <li><strong>Application Level:</strong> In-app implementation</li>
      <li><strong>Middleware:</strong> Framework middleware</li>
      <li><strong>Reverse Proxy:</strong> Nginx, HAProxy</li>
    </ul>

    <h4>3. Distributed Rate Limiting</h4>
    <ul>
      <li><strong>Redis-based:</strong> Shared counter storage</li>
      <li><strong>Sticky Sessions:</strong> Route to same server</li>
      <li><strong>Gossip Protocol:</strong> Sync between nodes</li>
      <li><strong>Token Bucket Service:</strong> Centralized token management</li>
    </ul>

    <h3>Rate Limiter Response</h3>
    
    <p>The rate limiter returns HTTP response code 429 - Too Many Requests with the following HTTP headers to the client:</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1623456789
Retry-After: 58
Content-Type: application/json

{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "API rate limit exceeded",
    "retry_after": 58
  }
}

// Header Meanings:
// X-RateLimit-Limit: Max requests per window
// X-RateLimit-Remaining: Requests left in current window
// X-RateLimit-Reset: Unix timestamp when limit resets
// Retry-After: Seconds until next request allowed</code></pre>
    </div>

    <h3>Hard vs Soft Rate Limiting</h3>
    
    <h4>Hard Rate Limiting</h4>
    <ul>
      <li><strong>Strict Enforcement:</strong> No exceptions</li>
      <li><strong>Immediate Rejection:</strong> 429 response</li>
      <li><strong>No Grace Period:</strong> Exact limit</li>
      <li><strong>Use Case:</strong> Security, cost control</li>
    </ul>

    <h4>Soft Rate Limiting</h4>
    <ul>
      <li><strong>Flexible:</strong> Allows burst traffic</li>
      <li><strong>Grace Period:</strong> Warning before blocking</li>
      <li><strong>Degraded Service:</strong> Reduced functionality</li>
      <li><strong>Use Case:</strong> User experience, elasticity</li>
    </ul>

    <h3>Rate Limiting Examples</h3>
    
    <h4>Popular Libraries</h4>
    <ul>
      <li><strong>express-rate-limit (Node.js):</strong> Express middleware</li>
      <li><strong>Resilience4j (Java):</strong> Rate limiter module</li>
      <li><strong>rack-attack (Ruby):</strong> Rack middleware</li>
      <li><strong>django-ratelimit (Python):</strong> Django decorator</li>
      <li><strong>Bucket4j (Java):</strong> Token bucket implementation</li>
      <li><strong>golang.org/x/time/rate (Go):</strong> Official rate limiter</li>
    </ul>

    <h4>Infrastructure Solutions</h4>
    <ul>
      <li><strong>Nginx:</strong> ngx_http_limit_req_module</li>
      <li><strong>HAProxy:</strong> stick-table rate limiting</li>
      <li><strong>Cloudflare:</strong> Rate limiting rules</li>
      <li><strong>AWS API Gateway:</strong> Usage plans and API keys</li>
      <li><strong>Kong:</strong> Rate limiting plugin</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Redis-based Distributed Rate Limiter
class RedisRateLimiter {
  constructor(redisClient, options) {
    this.redis = redisClient;
    this.keyPrefix = options.keyPrefix || 'rate_limit:';
    this.limit = options.limit;
    this.window = options.window; // seconds
  }
  
  async checkLimit(identifier) {
    const key = \`\${this.keyPrefix}\${identifier}\`;
    const multi = this.redis.multi();
    
    const now = Date.now();
    const window = now - (this.window * 1000);
    
    // Remove old entries
    multi.zremrangebyscore(key, 0, window);
    
    // Count requests in current window
    multi.zcard(key);
    
    // Add current request
    multi.zadd(key, now, \`\${now}:\${Math.random()}\`);
    
    // Set expiry
    multi.expire(key, this.window + 1);
    
    const results = await multi.exec();
    const count = results[1][1];
    
    return {
      allowed: count < this.limit,
      count: count,
      remaining: Math.max(0, this.limit - count),
      resetAt: now + (this.window * 1000)
    };
  }
}

// Usage with Express
app.use(async (req, res, next) => {
  const limiter = new RedisRateLimiter(redis, {
    limit: 100,
    window: 60 // 1 minute
  });
  
  const result = await limiter.checkLimit(req.ip);
  
  res.setHeader('X-RateLimit-Limit', limiter.limit);
  res.setHeader('X-RateLimit-Remaining', result.remaining);
  res.setHeader('X-RateLimit-Reset', Math.floor(result.resetAt / 1000));
  
  if (!result.allowed) {
    return res.status(429).json({
      error: 'Too many requests'
    });
  }
  
  next();
});</code></pre>
    </div>

    <h3>Rate Limiting Strategies</h3>
    
    <h4>By Resource Type</h4>
    <ul>
      <li><strong>API Endpoints:</strong> Different limits per endpoint</li>
      <li><strong>User Tiers:</strong> Free vs paid users</li>
      <li><strong>Operation Type:</strong> Read vs write operations</li>
      <li><strong>Content Type:</strong> Images vs text</li>
    </ul>

    <h4>By Identifier</h4>
    <ul>
      <li><strong>IP Address:</strong> Per IP limiting</li>
      <li><strong>User ID:</strong> Authenticated user limits</li>
      <li><strong>API Key:</strong> Per application limits</li>
      <li><strong>Session ID:</strong> Per session limits</li>
      <li><strong>Combination:</strong> Multi-factor identification</li>
    </ul>

    <h3>Best Practices</h3>
    
    <h4>Design Considerations</h4>
    <ul>
      <li><strong>Graceful Degradation:</strong> Provide limited service</li>
      <li><strong>Clear Communication:</strong> Informative error messages</li>
      <li><strong>Appropriate Limits:</strong> Based on actual usage patterns</li>
      <li><strong>Monitoring:</strong> Track rate limit hits</li>
      <li><strong>Flexibility:</strong> Easy to adjust limits</li>
    </ul>

    <h4>Implementation Tips</h4>
    <ul>
      <li><strong>Use Standard Headers:</strong> Follow RFC 6585</li>
      <li><strong>Consider Bursts:</strong> Allow short spikes</li>
      <li><strong>Whitelist Critical:</strong> Emergency overrides</li>
      <li><strong>Test Thoroughly:</strong> Load testing</li>
      <li><strong>Document Limits:</strong> Clear API documentation</li>
    </ul>

    <h3>Common Pitfalls</h3>
    
    <h4>Implementation Issues</h4>
    <ul>
      <li><strong>Race Conditions:</strong> Concurrent request handling</li>
      <li><strong>Clock Skew:</strong> Distributed system time sync</li>
      <li><strong>Memory Leaks:</strong> Not cleaning old data</li>
      <li><strong>Unfair Distribution:</strong> Behind NAT/proxy</li>
    </ul>

    <h4>User Experience</h4>
    <ul>
      <li><strong>Sudden Blocks:</strong> No warning before limit</li>
      <li><strong>Unclear Errors:</strong> Confusing messages</li>
      <li><strong>No Recovery Path:</strong> How to get unblocked</li>
      <li><strong>Lost Work:</strong> Failed uploads/submissions</li>
    </ul>
  `
}; 