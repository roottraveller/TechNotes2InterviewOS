export const microservices = {
  id: 'microservices',
  title: 'Microservices Architecture',
  content: `
## Definition
Microservices is an architectural pattern that structures an application as a collection of small, autonomous services.

## Key Characteristics
- **Single Responsibility**: Each service has one business function
- **Independently Deployable**: Services can be deployed separately
- **Decentralized**: No central coordination
- **Technology Agnostic**: Different tech stacks per service
- **Fault Tolerant**: Failure isolation

## Benefits
- **Scalability**: Scale services independently
- **Flexibility**: Different technologies per service
- **Resilience**: Isolated failures
- **Team Autonomy**: Independent development teams
- **Faster Deployment**: Smaller, focused deployments

## Challenges
- **Complexity**: Distributed system complexity
- **Network Latency**: Inter-service communication
- **Data Consistency**: Distributed transactions
- **Monitoring**: Distributed tracing needed
- **Testing**: Complex integration testing

## Communication Patterns
- **Synchronous**: HTTP/REST, gRPC
- **Asynchronous**: Message queues, event streaming
- **Service Mesh**: Infrastructure layer for communication

## Design Patterns
- **API Gateway**: Single entry point
- **Circuit Breaker**: Prevent cascade failures
- **Saga Pattern**: Distributed transactions
- **Event Sourcing**: Event-driven state management

## Interview Questions
**Q: What are the main challenges of microservices?**
A: Distributed system complexity, network latency, data consistency, and monitoring difficulties.
`
}; 