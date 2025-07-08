export const retryPattern = {
  id: 'retry-pattern',
  title: 'Retry Pattern',
  content: `
## Definition
The Retry pattern automatically retries failed operations with configurable delays to handle transient failures. Used by 95% of distributed systems to achieve 99.9% reliability.

## Retry Strategies Comparison
| Strategy | Use Case | Pros | Cons | Example Delay |
|----------|----------|------|------|---------------|
| **Immediate** | Fast recovery expected | No delay | Can overwhelm service | 0ms |
| **Fixed Delay** | Predictable load | Simple, consistent | May hit rate limits | 1s, 1s, 1s |
| **Linear Backoff** | Gradual recovery | Moderate load increase | Slower than exponential | 1s, 2s, 3s |
| **Exponential Backoff** | Unknown recovery time | Fast + respectful | Can get very long | 1s, 2s, 4s, 8s |
| **Exponential + Jitter** | Production systems | Prevents thundering herd | Most complex | 1s±200ms, 2s±400ms |

## Implementation Examples

### 1. Exponential Backoff with Jitter
\`\`\`javascript
class RetryHandler {
    constructor(maxRetries = 3, baseDelay = 1000, maxDelay = 30000) {
        this.maxRetries = maxRetries;
        this.baseDelay = baseDelay;
        this.maxDelay = maxDelay;
    }
    
    async executeWithRetry(operation, context = {}) {
        let lastError;
        
        for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;
                
                // Don't retry non-transient errors
                if (!this.isRetriableError(error) || attempt === this.maxRetries) {
                    throw error;
                }
                
                // Calculate delay with jitter
                const delay = this.calculateDelay(attempt);
                console.log(\`Retry attempt \${attempt + 1} after \${delay}ms\`);
                await this.sleep(delay);
            }
        }
        
        throw lastError;
    }
    
    calculateDelay(attempt) {
        // Exponential backoff: 2^attempt * baseDelay
        const exponentialDelay = Math.min(
            this.baseDelay * Math.pow(2, attempt),
            this.maxDelay
        );
        
        // Add jitter (±25% randomness)
        const jitter = exponentialDelay * 0.25 * (Math.random() - 0.5);
        return Math.floor(exponentialDelay + jitter);
    }
    
    isRetriableError(error) {
        const retriableCodes = [408, 429, 500, 502, 503, 504];
        return retriableCodes.includes(error.status) || 
               error.code === 'ECONNRESET' ||
               error.code === 'ETIMEDOUT';
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Usage
const retryHandler = new RetryHandler(3, 1000, 30000);

const result = await retryHandler.executeWithRetry(async () => {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
        throw new Error(\`HTTP \${response.status}\`);
    }
    return response.json();
});
\`\`\`

### 2. Database Retry with Circuit Breaker
\`\`\`python
import asyncio
import random
from datetime import datetime, timedelta

class DatabaseRetryHandler:
    def __init__(self, max_retries=3, base_delay=0.1, max_delay=60):
        self.max_retries = max_retries
        self.base_delay = base_delay
        self.max_delay = max_delay
        self.circuit_open = False
        self.failure_count = 0
        self.last_failure_time = None
        self.circuit_timeout = 60  # seconds
    
    async def execute_query(self, query_func, *args, **kwargs):
        # Check circuit breaker
        if self.circuit_open:
            if datetime.now() - self.last_failure_time > timedelta(seconds=self.circuit_timeout):
                self.circuit_open = False
                self.failure_count = 0
            else:
                raise Exception("Circuit breaker is open")
        
        for attempt in range(self.max_retries + 1):
            try:
                result = await query_func(*args, **kwargs)
                # Reset on success
                self.failure_count = 0
                return result
                
            except Exception as e:
                if not self.is_retriable_db_error(e) or attempt == self.max_retries:
                    self.failure_count += 1
                    if self.failure_count >= 5:
                        self.circuit_open = True
                        self.last_failure_time = datetime.now()
                    raise e
                
                # Calculate delay
                delay = min(
                    self.base_delay * (2 ** attempt) + random.uniform(0, 0.1),
                    self.max_delay
                )
                await asyncio.sleep(delay)
    
    def is_retriable_db_error(self, error):
        retriable_errors = [
            'connection timeout',
            'deadlock detected',
            'lock wait timeout',
            'connection reset'
        ]
        return any(err in str(error).lower() for err in retriable_errors)
\`\`\`

### 3. HTTP Client with Retry
\`\`\`java
public class HttpRetryClient {
    private static final int MAX_RETRIES = 3;
    private static final long BASE_DELAY_MS = 1000;
    private static final long MAX_DELAY_MS = 30000;
    
    public <T> T executeWithRetry(Supplier<T> operation) throws Exception {
        Exception lastException = null;
        
        for (int attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                return operation.get();
            } catch (Exception e) {
                lastException = e;
                
                if (!isRetriableException(e) || attempt == MAX_RETRIES) {
                    throw e;
                }
                
                long delay = calculateDelay(attempt);
                Thread.sleep(delay);
            }
        }
        
        throw lastException;
    }
    
    private long calculateDelay(int attempt) {
        long exponentialDelay = Math.min(
            BASE_DELAY_MS * (long) Math.pow(2, attempt),
            MAX_DELAY_MS
        );
        
        // Add jitter
        long jitter = (long) (exponentialDelay * 0.1 * Math.random());
        return exponentialDelay + jitter;
    }
    
    private boolean isRetriableException(Exception e) {
        if (e instanceof SocketTimeoutException || 
            e instanceof ConnectException) {
            return true;
        }
        
        if (e instanceof HttpRetryException) {
            int code = ((HttpRetryException) e).responseCode();
            return code == 429 || code >= 500;
        }
        
        return false;
    }
}
\`\`\`

## Error Classification (Critical for Interviews)

### Retriable Errors (Retry These)
\`\`\`bash
# Network Errors
ECONNRESET    # Connection reset by peer
ETIMEDOUT     # Operation timed out
ECONNREFUSED  # Connection refused (temporary)

# HTTP Status Codes
408  # Request Timeout
429  # Too Many Requests (rate limiting)
500  # Internal Server Error
502  # Bad Gateway
503  # Service Unavailable
504  # Gateway Timeout

# Database Errors
Deadlock detected
Lock wait timeout exceeded
Connection timeout
Connection pool exhausted
\`\`\`

### Non-Retriable Errors (Don't Retry)
\`\`\`bash
# Client Errors (4xx)
400  # Bad Request - fix the request
401  # Unauthorized - fix credentials
403  # Forbidden - permission issue
404  # Not Found - resource doesn't exist
422  # Unprocessable Entity - validation error

# Application Errors
NullPointerException
IllegalArgumentException
ValidationException
AuthenticationException
\`\`\`

## Real-World Examples

### AWS SDK Retry Configuration
\`\`\`javascript
// AWS SDK built-in retry with exponential backoff
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB({
    region: 'us-east-1',
    retryDelayOptions: {
        customBackoff: function(retryCount) {
            // Custom exponential backoff with jitter
            const baseDelay = 100; // 100ms
            const exponentialDelay = baseDelay * Math.pow(2, retryCount);
            const jitter = Math.random() * 0.1 * exponentialDelay;
            return exponentialDelay + jitter;
        }
    },
    maxRetries: 3
});

// DynamoDB automatically retries on:
// - ProvisionedThroughputExceededException
// - ThrottlingException  
// - Internal server errors (5xx)
\`\`\`

### Netflix Hystrix Pattern
\`\`\`java
@HystrixCommand(
    commandProperties = {
        @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000"),
        @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
        @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50")
    },
    fallbackMethod = "getFallbackData"
)
public String getExternalData() {
    // Hystrix handles retries automatically with:
    // - Exponential backoff
    // - Circuit breaker integration
    // - Timeout management
    return externalService.getData();
}
\`\`\`

### Kubernetes Pod Restart Policy
\`\`\`yaml
apiVersion: v1
kind: Pod
spec:
  restartPolicy: Always  # Retry failed containers
  containers:
  - name: app
    image: myapp:latest
    # Kubernetes uses exponential backoff for restarts:
    # 10s, 20s, 40s, 80s, 160s, then 300s (max)
\`\`\`

## Performance Impact Analysis
\`\`\`bash
# Without Retries
Success Rate: 95%
Average Latency: 100ms
P99 Latency: 200ms

# With Exponential Backoff (3 retries)
Success Rate: 99.9% (5% failures become 0.1%)
Average Latency: 120ms (+20% overhead)
P99 Latency: 8.2s (worst case: 100ms + 1s + 2s + 4s + processing)

# Optimization: Fast first retry, then exponential
Retry delays: 100ms, 1s, 4s
Average Latency: 110ms (better)
P99 Latency: 5.2s (better)
\`\`\`

## Monitoring & Metrics
\`\`\`javascript
class RetryMetrics {
    constructor() {
        this.metrics = {
            totalAttempts: 0,
            successfulAttempts: 0,
            failedAttempts: 0,
            retriesByAttempt: [0, 0, 0, 0], // attempts 1-4
            avgRetryDelay: 0
        };
    }
    
    recordAttempt(attempt, success, delay) {
        this.metrics.totalAttempts++;
        this.metrics.retriesByAttempt[attempt]++;
        
        if (success) {
            this.metrics.successfulAttempts++;
        } else {
            this.metrics.failedAttempts++;
        }
        
        // Update average delay
        this.metrics.avgRetryDelay = 
            (this.metrics.avgRetryDelay + delay) / 2;
    }
    
    getSuccessRate() {
        return this.metrics.successfulAttempts / this.metrics.totalAttempts;
    }
    
    getRetryDistribution() {
        return this.metrics.retriesByAttempt.map((count, index) => ({
            attempt: index + 1,
            count,
            percentage: (count / this.metrics.totalAttempts) * 100
        }));
    }
}
\`\`\`

## Interview Questions & Answers

**Q: Why use exponential backoff instead of fixed delay?**
A: Exponential backoff adapts to service recovery time. If service is overwhelmed, longer delays give it time to recover. Fixed delays might keep hitting a struggling service. Also prevents thundering herd when multiple clients retry simultaneously.

**Q: What is jitter and why is it important?**
A: Jitter adds randomness to retry delays (±10-25%). Without jitter, all clients retry at exact same intervals, creating traffic spikes that can overwhelm recovering services. Jitter spreads retries over time.

**Q: How do you decide maximum retry attempts?**
A: Consider:
- **User experience**: 3-5 retries max for user-facing requests (total <10s)
- **Background jobs**: More retries acceptable (10-20)
- **Cost**: Each retry consumes resources
- **SLA requirements**: Balance reliability vs latency

**Q: When should you NOT retry?**
A: Don't retry:
- **4xx errors**: Client errors (bad request, unauthorized, not found)
- **Business logic errors**: Validation failures, duplicate records
- **Non-idempotent operations**: Operations that change state unpredictably
- **Authentication/authorization failures**: Won't succeed on retry

**Q: How do you implement retries for non-idempotent operations?**
A: 
- **Idempotency keys**: Include unique key to detect duplicates
- **Database constraints**: Use unique constraints to prevent duplicates
- **Check-then-act**: Verify operation wasn't already completed
- **Saga pattern**: Compensating transactions for rollback

**Q: What's the difference between retry pattern and circuit breaker?**
A:
- **Retry**: Handles individual request failures, keeps trying
- **Circuit breaker**: Stops all requests when service is failing, prevents cascade failures
- **Combined**: Circuit breaker prevents retries when service is down, retry handles transient failures when circuit is closed
`
}; 