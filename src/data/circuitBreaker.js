export const circuitBreaker = {
  id: 'circuit-breaker',
  title: 'Circuit Breaker Pattern',
  content: `
## Definition
The Circuit Breaker pattern prevents cascading failures in distributed systems by monitoring service calls and stopping requests when failures exceed a threshold.

## States
- **Closed**: Normal operation, requests pass through
- **Open**: Failure threshold exceeded, requests fail fast
- **Half-Open**: Testing if service has recovered

## State Transitions
1. **Closed → Open**: When failure rate exceeds threshold
2. **Open → Half-Open**: After timeout period
3. **Half-Open → Closed**: When test requests succeed
4. **Half-Open → Open**: When test requests fail

## Key Parameters
- **Failure Threshold**: Number/percentage of failures to trigger
- **Timeout**: How long to wait before testing recovery
- **Success Threshold**: Successful calls needed to close circuit
- **Monitoring Window**: Time period for failure calculation

## Benefits
- **Fail Fast**: Immediate failure response
- **Resource Protection**: Prevent resource exhaustion
- **Graceful Degradation**: Fallback mechanisms
- **System Stability**: Prevent cascade failures
- **Recovery Time**: Allow services to recover

## Implementation Considerations
- **Fallback Mechanisms**: Default responses or cached data
- **Monitoring**: Track circuit breaker state and metrics
- **Configuration**: Tunable thresholds and timeouts
- **Logging**: Record state changes and failures

## Common Libraries
- **Hystrix**: Netflix's circuit breaker (deprecated)
- **Resilience4j**: Java resilience library
- **Polly**: .NET resilience library
- **Opossum**: Node.js circuit breaker

## Use Cases
- **Microservices**: Service-to-service communication
- **External APIs**: Third-party service calls
- **Database Connections**: Database failure protection
- **Network Calls**: Unreliable network protection

## Related Patterns
- **Retry Pattern**: Automatic retry with backoff
- **Bulkhead Pattern**: Isolate critical resources
- **Timeout Pattern**: Prevent hanging requests

## Interview Questions
**Q: How does a circuit breaker prevent cascading failures?**
A: By failing fast when a service is down, preventing resource exhaustion and allowing the system to maintain stability while the failing service recovers.
`
}; 