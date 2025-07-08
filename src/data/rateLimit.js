export const rateLimit = {
  id: 'rate-limit',
  title: 'Rate Limiting',
  content: `
## Definition
Rate limiting controls the number of requests a client can make to an API or service within a specific time period.

## Common Algorithms
- **Token Bucket**: Tokens added at fixed rate, consumed per request
- **Leaky Bucket**: Requests processed at fixed rate
- **Fixed Window**: Fixed time windows with request counters
- **Sliding Window**: Moving time window for more accuracy
- **Sliding Window Log**: Precise tracking with timestamps

## Token Bucket Algorithm
1. Bucket holds tokens (capacity limit)
2. Tokens added at fixed rate
3. Each request consumes tokens
4. Reject requests when bucket empty

## Rate Limiting Strategies
- **Per-User**: Limit per individual user
- **Per-IP**: Limit per IP address
- **Per-API Key**: Limit per application
- **Global**: System-wide rate limits
- **Tiered**: Different limits for different user types

## Implementation Levels
- **Application Level**: Code-based rate limiting
- **Reverse Proxy**: Nginx, HAProxy
- **API Gateway**: Centralized rate limiting
- **CDN**: Edge-based rate limiting
- **Database**: Query rate limiting

## Rate Limit Headers
- **X-RateLimit-Limit**: Maximum requests allowed
- **X-RateLimit-Remaining**: Remaining requests
- **X-RateLimit-Reset**: When limit resets
- **Retry-After**: When to retry after limit exceeded

## Benefits
- **DDoS Protection**: Prevent abuse and attacks
- **Resource Protection**: Prevent system overload
- **Fair Usage**: Ensure equitable resource access
- **Cost Control**: Manage infrastructure costs
- **SLA Compliance**: Maintain service levels

## Response Strategies
- **Reject**: Return 429 Too Many Requests
- **Queue**: Queue excess requests
- **Throttle**: Slow down request processing
- **Shed Load**: Drop lower priority requests

## Distributed Rate Limiting
- **Centralized Counter**: Shared state across instances
- **Redis**: Distributed rate limit storage
- **Consistent Hashing**: Distribute limits across nodes
- **Approximate Counting**: Trade accuracy for performance

## Best Practices
- **Graceful Degradation**: Informative error messages
- **Monitoring**: Track rate limit hits
- **Appropriate Limits**: Balance protection vs usability
- **Whitelisting**: Exempt trusted clients
- **Burst Handling**: Allow temporary spikes

## Use Cases
- **API Protection**: Prevent API abuse
- **Login Attempts**: Prevent brute force attacks
- **Resource Access**: Limit expensive operations
- **Spam Prevention**: Control message/post rates

## Interview Questions
**Q: What's the difference between token bucket and leaky bucket algorithms?**
A: Token bucket allows bursts up to bucket capacity, while leaky bucket processes requests at a constant rate regardless of arrival pattern.
`
}; 