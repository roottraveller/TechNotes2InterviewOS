export const bulkhead = {
  id: 'bulkhead',
  title: 'Bulkhead Pattern',
  content: `# Bulkhead Pattern

## Definition
The Bulkhead pattern isolates critical resources to prevent failures in one part of the system from affecting other parts.

## Concept Origin
Named after ship bulkheads that prevent water from flooding the entire ship if one compartment is breached.

## Types of Bulkheads
- **Thread Pool Isolation**: Separate thread pools for different operations
- **Connection Pool Isolation**: Separate database connections
- **CPU/Memory Isolation**: Resource allocation limits
- **Network Isolation**: Separate network channels
- **Service Isolation**: Dedicated service instances

## Implementation Strategies
- **Resource Partitioning**: Divide resources into isolated pools
- **Queue Isolation**: Separate message queues
- **Database Isolation**: Separate database instances
- **Compute Isolation**: Containers or VMs

## Benefits
- **Fault Isolation**: Contain failures to specific areas
- **Resource Protection**: Prevent resource starvation
- **Performance Isolation**: Maintain SLA for critical functions
- **Predictable Behavior**: Isolated resource allocation
- **Easier Debugging**: Clear failure boundaries

## Trade-offs
- **Resource Overhead**: Additional resource allocation
- **Complexity**: More components to manage
- **Cost**: Higher infrastructure costs
- **Coordination**: Cross-bulkhead communication challenges

## Examples
- **Thread Pools**: Separate pools for critical vs non-critical tasks
- **Database Connections**: Read/write connection separation
- **API Rate Limits**: Per-client or per-service limits
- **Kubernetes Namespaces**: Resource isolation in clusters

## Monitoring
- **Resource Utilization**: Track usage per bulkhead
- **Performance Metrics**: Response times per partition
- **Failure Rates**: Isolated failure tracking
- **Capacity Planning**: Resource allocation optimization

## Related Patterns
- **Circuit Breaker**: Fail fast when bulkhead is full
- **Retry Pattern**: Retry with different bulkheads
- **Timeout Pattern**: Prevent resource blocking

## Best Practices
- **Right-size Bulkheads**: Balance isolation vs efficiency
- **Monitor Resource Usage**: Track utilization patterns
- **Graceful Degradation**: Fallback when bulkhead full
- **Regular Review**: Adjust partitioning based on usage

## Interview Questions
**Q: When would you use the Bulkhead pattern?**
A: When you need to isolate critical resources to prevent failures in one area from affecting the entire system, especially in high-availability applications.`
}; 