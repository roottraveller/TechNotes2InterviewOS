export const timeoutPattern = {
  id: 'timeout-pattern',
  title: 'Timeout Pattern',
  content: `
## Definition
The Timeout pattern sets a maximum time limit for operations to complete, preventing indefinite blocking and resource exhaustion.

## Types of Timeouts
- **Connection Timeout**: Time to establish connection
- **Read Timeout**: Time to read response after connection
- **Write Timeout**: Time to write request data
- **Request Timeout**: Total time for entire request
- **Idle Timeout**: Time before closing idle connections

## Benefits
- **Resource Protection**: Prevent resource exhaustion
- **Predictable Behavior**: Known maximum wait times
- **Better User Experience**: Avoid hanging operations
- **System Stability**: Prevent cascade failures
- **Debugging**: Easier to identify slow operations

## Implementation Strategies
- **Socket Timeouts**: Network-level timeouts
- **HTTP Client Timeouts**: Request/response timeouts
- **Database Query Timeouts**: SQL execution limits
- **Thread Pool Timeouts**: Task execution limits
- **Application-level Timeouts**: Business logic timeouts

## Timeout Configuration
- **Conservative**: Longer timeouts for reliability
- **Aggressive**: Shorter timeouts for responsiveness
- **Adaptive**: Dynamic timeouts based on conditions
- **Layered**: Different timeouts at different levels

## Handling Timeout Failures
- **Graceful Degradation**: Fallback to cached data
- **Retry with Backoff**: Retry with longer timeouts
- **Circuit Breaker**: Stop requests after timeouts
- **User Notification**: Inform users of delays

## Best Practices
- **Set Appropriate Timeouts**: Balance reliability vs responsiveness
- **Hierarchical Timeouts**: Shorter timeouts at lower levels
- **Monitoring**: Track timeout occurrences
- **Graceful Handling**: Proper cleanup on timeout
- **Documentation**: Clear timeout policies

## Common Timeout Values
- **DNS Resolution**: 5-30 seconds
- **HTTP Requests**: 30-60 seconds
- **Database Queries**: 30-300 seconds
- **File Operations**: 30-120 seconds
- **Network Connections**: 5-30 seconds

## Related Patterns
- **Circuit Breaker**: Fail fast after timeouts
- **Retry Pattern**: Retry with adjusted timeouts
- **Bulkhead Pattern**: Isolate timeout-prone operations

## Monitoring and Alerting
- **Timeout Frequency**: Track timeout occurrences
- **Operation Duration**: Monitor operation times
- **Success Rate**: Measure completion rates
- **Performance Trends**: Identify degradation patterns

## Interview Questions
**Q: How do you determine appropriate timeout values?**
A: Consider operation complexity, network conditions, user expectations, and system capacity while monitoring actual performance patterns.
`
}; 