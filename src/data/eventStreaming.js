export const eventStreaming = {
  id: 'event-streaming',
  title: 'Event Streaming',
  content: `
## Definition
Event streaming is the practice of capturing, storing, and processing continuous streams of events in real-time.

## Key Concepts
- **Event**: A record of something that happened
- **Stream**: Continuous flow of events
- **Event Log**: Immutable sequence of events
- **Stream Processing**: Real-time event analysis
- **Event Sourcing**: Store events as primary data

## Event Streaming Platforms
- **Apache Kafka**: Distributed streaming platform
- **Amazon Kinesis**: AWS managed streaming
- **Apache Pulsar**: Cloud-native messaging
- **Google Pub/Sub**: Google Cloud messaging
- **Azure Event Hubs**: Microsoft streaming service

## Stream Processing
- **Real-time**: Process events as they arrive
- **Windowing**: Group events by time windows
- **Aggregation**: Calculate metrics over streams
- **Filtering**: Select relevant events
- **Transformation**: Modify event data

## Event Sourcing Pattern
- Store events instead of current state
- Rebuild state by replaying events
- Complete audit trail
- Time travel capabilities

## CQRS (Command Query Responsibility Segregation)
- Separate read and write models
- Optimize for different access patterns
- Often used with event sourcing

## Use Cases
- **Real-time Analytics**: Live dashboards
- **Fraud Detection**: Immediate threat response
- **IoT Data Processing**: Sensor data streams
- **User Activity Tracking**: Behavioral analytics
- **Microservices Communication**: Event-driven architecture

## Benefits
- **Scalability**: Handle high-volume data
- **Real-time Processing**: Immediate insights
- **Fault Tolerance**: Replay capability
- **Decoupling**: Loose service coupling

## Challenges
- **Complexity**: Distributed system challenges
- **Ordering**: Event sequence guarantees
- **Exactly-Once Processing**: Difficult to achieve
- **Schema Evolution**: Handling data changes

## Interview Questions
**Q: What's the difference between event streaming and traditional messaging?**
A: Event streaming focuses on continuous data flows and real-time processing, while traditional messaging is more about discrete message exchange.
`
}; 