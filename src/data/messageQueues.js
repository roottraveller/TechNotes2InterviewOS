export const messageQueues = {
  id: 'message-queues',
  title: 'Message Queues',
  content: `# Message Queues

## Definition
Message queues are communication mechanisms that allow applications to exchange messages asynchronously through a queue data structure.

## Key Concepts
- **Producer**: Sends messages to queue
- **Consumer**: Receives messages from queue
- **Queue**: Buffer that stores messages
- **Broker**: Message queue server/service
- **Asynchronous**: Non-blocking communication

## Benefits
- **Decoupling**: Loose coupling between services
- **Scalability**: Handle varying loads
- **Reliability**: Message persistence and delivery guarantees
- **Fault Tolerance**: Continue operation if components fail
- **Load Leveling**: Smooth out traffic spikes

## Message Patterns
- **Point-to-Point**: One producer, one consumer
- **Publish-Subscribe**: One producer, multiple consumers
- **Request-Reply**: Synchronous-like communication
- **Competing Consumers**: Multiple consumers share workload

## Popular Message Queues
- **RabbitMQ**: AMQP protocol, feature-rich
- **Apache Kafka**: High-throughput, distributed
- **Amazon SQS**: Managed cloud service
- **Redis**: In-memory with pub/sub
- **Apache ActiveMQ**: JMS-compliant

## Delivery Guarantees
- **At Most Once**: May lose messages
- **At Least Once**: May duplicate messages
- **Exactly Once**: Guaranteed single delivery

## Use Cases
- **Task Processing**: Background job processing
- **Event-Driven Architecture**: Service communication
- **Log Aggregation**: Centralized logging
- **Real-time Analytics**: Stream processing

## Interview Questions
**Q: What's the difference between message queues and databases?**
A: Message queues are designed for temporary message passing and consumption, while databases store persistent data for retrieval.`
}; 