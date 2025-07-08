export const retryPattern = {
  id: 'retry-pattern',
  title: 'Retry Pattern',
  content: `
## Definition
The Retry pattern automatically retries failed operations with configurable delays and limits to handle transient failures.

## Types of Retries
- **Immediate Retry**: Retry immediately without delay
- **Fixed Delay**: Constant wait time between retries
- **Exponential Backoff**: Increasing delay between retries
- **Linear Backoff**: Linearly increasing delay
- **Random Jitter**: Add randomness to prevent thundering herd

## Key Parameters
- **Max Retry Attempts**: Maximum number of retries
- **Initial Delay**: First retry delay
- **Backoff Multiplier**: Delay increase factor
- **Max Delay**: Maximum delay between retries
- **Jitter**: Random variation in delay

## Exponential Backoff Formula
\`\`\`
delay = initial_delay * (multiplier ^ attempt) + jitter
\`\`\`

## When to Use Retries
- **Transient Failures**: Network timeouts, temporary unavailability
- **Rate Limiting**: API quota exceeded
- **Resource Contention**: Database lock timeouts
- **Infrastructure Issues**: Temporary service outages

## When NOT to Use Retries
- **Authentication Failures**: Invalid credentials
- **Authorization Errors**: Permission denied
- **Validation Errors**: Bad request data
- **Not Found Errors**: Resource doesn't exist

## Implementation Considerations
- **Idempotency**: Ensure operations can be safely retried
- **Timeout**: Set appropriate timeout for each attempt
- **Circuit Breaker**: Combine with circuit breaker pattern
- **Monitoring**: Track retry attempts and success rates

## Best Practices
- **Exponential Backoff with Jitter**: Prevent thundering herd
- **Maximum Retry Limit**: Avoid infinite retries
- **Idempotent Operations**: Safe to retry multiple times
- **Proper Error Classification**: Only retry transient errors
- **Monitoring and Alerting**: Track retry patterns

## Common Libraries
- **Polly**: .NET resilience library
- **Tenacity**: Python retry library
- **Retrying**: Python decorator for retries
- **Resilience4j**: Java resilience patterns

## Related Patterns
- **Circuit Breaker**: Stop retries when service is down
- **Timeout Pattern**: Limit time spent on retries
- **Bulkhead Pattern**: Isolate retry resources

## Interview Questions
**Q: Why is jitter important in retry patterns?**
A: Jitter prevents the thundering herd problem where multiple clients retry simultaneously, potentially overwhelming the recovering service.
`
}; 