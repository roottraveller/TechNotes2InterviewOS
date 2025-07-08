export const eventStreaming = {
  id: 'event-streaming',
  title: 'Event Streaming',
  content: `
    <h2>Event Streaming</h2>
    <p>Event streaming captures, stores, and processes continuous streams of events in real-time, enabling organizations to react to data as it happens rather than in batches.</p>

    <h3>Event Streaming vs Traditional Messaging</h3>
    <table>
      <tr>
        <th>Aspect</th>
        <th>Event Streaming</th>
        <th>Traditional Messaging</th>
      </tr>
      <tr>
        <td>Data Model</td>
        <td>Immutable event log</td>
        <td>Mutable message queues</td>
      </tr>
      <tr>
        <td>Processing</td>
        <td>Real-time, continuous</td>
        <td>Batch, discrete</td>
      </tr>
      <tr>
        <td>Storage</td>
        <td>Persistent, replayable</td>
        <td>Temporary, consumed once</td>
      </tr>
      <tr>
        <td>Scalability</td>
        <td>Horizontal partitioning</td>
        <td>Vertical scaling</td>
      </tr>
      <tr>
        <td>Use Case</td>
        <td>Analytics, monitoring</td>
        <td>Task distribution</td>
      </tr>
    </table>

    <h3>Apache Kafka Architecture</h3>
    <div class="code-block">
      <pre><code>Kafka Cluster Architecture:

┌─────────────────────────────────────────────────┐
│                Producers                        │
│  ┌─────────────────────────────────────────────┐│
│  │  Applications sending events               ││
│  │  Batch writes, async/sync modes            ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              Kafka Brokers                      │
│  ┌─────────────────────────────────────────────┐│
│  │  Topic: user-events                        ││
│  │  ├── Partition 0: [msg1, msg2, msg3...]   ││
│  │  ├── Partition 1: [msg4, msg5, msg6...]   ││
│  │  └── Partition 2: [msg7, msg8, msg9...]   ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│                Consumers                        │
│  ┌─────────────────────────────────────────────┐│
│  │  Consumer Groups: Parallel processing      ││
│  │  Offset tracking: Resume from last read    ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Key Components:
├── Topics: Logical event categories
├── Partitions: Horizontal scaling units
├── Brokers: Kafka server instances
├── Producers: Event publishers
├── Consumers: Event processors
├── Consumer Groups: Parallel processing
└── Offsets: Position tracking in partitions

Performance Characteristics:
├── Throughput: 1M+ messages/second per broker
├── Latency: Sub-millisecond to few milliseconds
├── Storage: Petabyte-scale retention
├── Replication: 3x default replication factor
└── Availability: 99.9% uptime with proper setup</code></pre>
    </div>

    <h3>Stream Processing Patterns</h3>
    <div class="code-block">
      <pre><code>Stream Processing Operations:

1. Windowing Operations:
├── Tumbling Window: Fixed, non-overlapping intervals
│   └── Example: Count events every 5 minutes
├── Sliding Window: Fixed size, overlapping intervals
│   └── Example: Moving average over last 10 minutes
├── Session Window: Dynamic, activity-based grouping
│   └── Example: User session events
└── Global Window: All events in single window

2. Aggregation Functions:
├── Count: Number of events
├── Sum: Numeric aggregation
├── Min/Max: Extreme values
├── Average: Mean calculation
├── Distinct: Unique value counting
└── Custom: User-defined aggregations

3. Join Operations:
├── Stream-Stream Join: Combine two streams
├── Stream-Table Join: Enrich stream with table data
├── Window Join: Time-bounded joins
└── Interval Join: Join within time intervals

4. Filtering and Transformation:
├── Filter: Select events based on criteria
├── Map: Transform event structure
├── FlatMap: One-to-many transformations
├── Reduce: Aggregate operations
└── Branch: Split stream into multiple outputs

Example Stream Processing (Kafka Streams):

KStream&lt;String, UserEvent&gt; events = builder.stream("user-events");
KTable&lt;String, Long&gt; userCounts = events
    .filter((key, event) -&gt; event.getType().equals("click"))
    .groupByKey()
    .windowedBy(TimeWindows.of(Duration.ofMinutes(5)))
    .count();</code></pre>
    </div>

    <details>
      <summary><strong>Example: Netflix's Real-Time Event Processing</strong></summary>
      <div class="info-note">
        Netflix processes 8+ billion events daily using Apache Kafka and Flink, handling 260+ million subscriber interactions in real-time. Their event streaming infrastructure powers recommendation engines, fraud detection, and content optimization with sub-second latency. The system processes 500+ billion events monthly, maintains 99.99% availability, and scales to handle traffic spikes during popular show releases. Netflix's stream processing enables real-time personalization for 15,000+ titles, A/B testing for UI changes, and immediate detection of streaming quality issues across 190+ countries.
      </div>
    </details>

    <h3>Event Sourcing Architecture</h3>
    <div class="code-block">
      <pre><code>Event Sourcing Pattern:

Traditional State Storage:
┌─────────────────────────────────────────────────┐
│              Database                           │
│  ┌─────────────────────────────────────────────┐│
│  │  User ID: 123                              ││
│  │  Balance: $1,500                           ││
│  │  Status: Active                            ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Event Sourcing Storage:
┌─────────────────────────────────────────────────┐
│              Event Store                        │
│  ┌─────────────────────────────────────────────┐│
│  │  1. UserCreated(id=123, name="Alice")      ││
│  │  2. DepositMade(id=123, amount=1000)       ││
│  │  3. WithdrawalMade(id=123, amount=200)     ││
│  │  4. DepositMade(id=123, amount=700)        ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│            State Reconstruction                 │
│  ┌─────────────────────────────────────────────┐│
│  │  Replay events → Current state: $1,500     ││
│  │  Time travel → State at event 2: $1,000    ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Benefits:
├── Complete Audit Trail: Every change recorded
├── Time Travel: Reconstruct state at any point
├── Debugging: Replay events to reproduce issues
├── Analytics: Rich historical data
├── Compliance: Immutable audit log
└── Scalability: Append-only writes

Challenges:
├── Complexity: More complex than CRUD
├── Storage: Growing event log size
├── Performance: Event replay overhead
├── Schema Evolution: Handling event changes
└── Snapshots: Periodic state snapshots needed</code></pre>
    </div>

    <h3>Platform Comparison</h3>
    <table>
      <tr>
        <th>Platform</th>
        <th>Throughput</th>
        <th>Latency</th>
        <th>Retention</th>
        <th>Best For</th>
      </tr>
      <tr>
        <td>Apache Kafka</td>
        <td>1M+ msg/sec</td>
        <td>2-5ms</td>
        <td>Unlimited</td>
        <td>High-throughput streaming</td>
      </tr>
      <tr>
        <td>Amazon Kinesis</td>
        <td>1000 records/sec per shard</td>
        <td>70ms average</td>
        <td>1-365 days</td>
        <td>AWS ecosystem integration</td>
      </tr>
      <tr>
        <td>Apache Pulsar</td>
        <td>2.5M+ msg/sec</td>
        <td>5ms</td>
        <td>Unlimited</td>
        <td>Multi-tenancy, geo-replication</td>
      </tr>
      <tr>
        <td>Google Pub/Sub</td>
        <td>1M+ msg/sec</td>
        <td>100ms</td>
        <td>7 days</td>
        <td>GCP services integration</td>
      </tr>
      <tr>
        <td>Azure Event Hubs</td>
        <td>1M+ events/sec</td>
        <td>64ms</td>
        <td>1-7 days</td>
        <td>Azure ecosystem</td>
      </tr>
    </table>

    <h3>CQRS with Event Streaming</h3>
    <div class="code-block">
      <pre><code>CQRS Architecture:

Command Side (Write):
┌─────────────────────────────────────────────────┐
│              Command Handler                    │
│  ┌─────────────────────────────────────────────┐│
│  │  Business Logic, Validation                 ││
│  │  Generate Events                            ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              Event Store                        │
│  ┌─────────────────────────────────────────────┐│
│  │  Append-only Event Log                     ││
│  │  Source of Truth                           ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Query Side (Read):
┌─────────────────────────────────────────────────┐
│              Event Projections                  │
│  ┌─────────────────────────────────────────────┐│
│  │  Read Model 1: User Dashboard              ││
│  │  Read Model 2: Analytics View              ││
│  │  Read Model 3: Reporting View              ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Benefits:
├── Scalability: Independent scaling of reads/writes
├── Performance: Optimized read models
├── Flexibility: Multiple views of same data
├── Evolution: Add new read models without migration
└── Availability: Read models can be eventually consistent

Implementation Patterns:
├── Event Sourcing + CQRS: Full event-driven architecture
├── Traditional Write + Event Streaming: Hybrid approach
├── Materialized Views: Precomputed query results
├── Polyglot Persistence: Different databases for different models
└── Event Replay: Rebuild read models from events</code></pre>
    </div>

    <details>
      <summary><strong>Example: Uber's Real-Time Event Processing</strong></summary>
      <div class="info-note">
        Uber processes 100+ billion events daily using Apache Kafka, handling 15+ million trips and 5+ billion location updates in real-time. Their event streaming infrastructure powers dynamic pricing, driver matching, and fraud detection with sub-second response times. The system processes 1+ trillion events monthly, maintains 99.99% availability during peak hours, and scales to handle demand spikes during events and bad weather. Uber's stream processing enables real-time ETAs, surge pricing calculations, and immediate safety alerts across 10,000+ cities worldwide.
      </div>
    </details>

    <h3>Stream Processing Frameworks</h3>
    <div class="code-block">
      <pre><code>Popular Stream Processing Frameworks:

1. Apache Kafka Streams:
├── Native Kafka integration
├── Exactly-once processing
├── Stateful processing support
├── Java/Scala APIs
└── Embedded in applications

2. Apache Flink:
├── Low-latency processing (<10ms)
├── Event-time processing
├── Fault tolerance via checkpointing
├── Batch and stream unified API
└── Complex event processing

3. Apache Spark Streaming:
├── Micro-batch processing
├── Integration with Spark ecosystem
├── Machine learning integration
├── Structured streaming API
└── High throughput

4. Apache Storm:
├── Real-time processing
├── Guaranteed message processing
├── Distributed computing
├── Multiple language support
└── Mature ecosystem

Performance Comparison:
├── Latency: Flink (1-10ms) > Storm (10-100ms) > Spark (100ms-1s)
├── Throughput: Spark > Flink > Storm > Kafka Streams
├── Fault Tolerance: All provide at-least-once, some exactly-once
├── Ease of Use: Kafka Streams > Spark > Flink > Storm
└── Ecosystem: Spark > Flink > Storm > Kafka Streams</code></pre>
    </div>

    <h3>Event Streaming Use Cases</h3>
    <div class="code-block">
      <pre><code>Real-World Applications:

1. Financial Services:
├── Fraud Detection: Real-time transaction monitoring
├── Risk Management: Market data processing
├── Algorithmic Trading: Low-latency order processing
├── Compliance: Audit trail generation
└── Customer Analytics: Behavioral analysis

2. E-commerce:
├── Recommendation Engines: Real-time personalization
├── Inventory Management: Stock level monitoring
├── Price Optimization: Dynamic pricing
├── Customer Journey: User behavior tracking
└── Fraud Prevention: Payment monitoring

3. IoT and Manufacturing:
├── Sensor Data Processing: Equipment monitoring
├── Predictive Maintenance: Anomaly detection
├── Quality Control: Real-time inspection
├── Supply Chain: Logistics tracking
└── Energy Management: Usage optimization

4. Media and Entertainment:
├── Content Recommendation: User preference analysis
├── Ad Targeting: Real-time bidding
├── Content Analytics: Engagement metrics
├── Live Streaming: Video processing
└── Gaming: Player behavior analysis

5. Healthcare:
├── Patient Monitoring: Vital signs tracking
├── Drug Discovery: Research data processing
├── Epidemic Tracking: Disease spread monitoring
├── Medical Imaging: Real-time analysis
└── Telemedicine: Remote patient care

Performance Requirements:
├── Latency: 1ms (trading) to 1s (analytics)
├── Throughput: 1K to 10M+ events/second
├── Availability: 99.9% to 99.99%
├── Durability: Minutes to years
└── Consistency: Eventual to strong</code></pre>
    </div>

    <details>
      <summary><strong>Example: LinkedIn's Event Streaming Infrastructure</strong></summary>
      <div class="info-note">
        LinkedIn processes 4+ trillion events daily using Apache Kafka (which they created), handling 900+ million member interactions and 60+ billion API calls. Their event streaming infrastructure powers the LinkedIn feed, job recommendations, and professional network analytics with sub-100ms latency. The system processes 1+ exabyte of data monthly, maintains 99.99% availability, and scales to handle traffic spikes during major professional events. LinkedIn's stream processing enables real-time notifications, content ranking, and personalized job matching for 950+ million professionals worldwide.
      </div>
    </details>

    <h3>Event Streaming Challenges</h3>
    <div class="code-block">
      <pre><code>Technical Challenges:

1. Ordering Guarantees:
├── Partition-level ordering: Within partition only
├── Global ordering: Single partition (limits scalability)
├── Causal ordering: Preserve cause-effect relationships
├── Timestamp ordering: Event-time vs processing-time
└── Out-of-order events: Late-arriving data handling

2. Exactly-Once Processing:
├── Idempotent processing: Safe to replay
├── Deduplication: Remove duplicate events
├── Transactional processing: Atomic operations
├── Checkpointing: Consistent state snapshots
└── Failure recovery: Resume from last checkpoint

3. Schema Evolution:
├── Forward compatibility: New fields added
├── Backward compatibility: Old consumers work
├── Schema registry: Centralized schema management
├── Versioning: Multiple schema versions
└── Migration: Gradual schema changes

4. Backpressure Handling:
├── Flow control: Slow consumers handling
├── Buffering: Temporary storage
├── Load shedding: Drop low-priority events
├── Circuit breakers: Prevent cascade failures
└── Auto-scaling: Dynamic resource allocation

5. Monitoring and Observability:
├── Lag monitoring: Consumer lag tracking
├── Throughput metrics: Events per second
├── Error tracking: Failed message handling
├── Latency monitoring: End-to-end timing
└── Resource utilization: CPU, memory, network

Solutions:
├── Kafka: Idempotent producers, transactions
├── Flink: Exactly-once via checkpointing
├── Schema Registry: Confluent Schema Registry
├── Monitoring: Prometheus, Grafana, Datadog
└── Testing: Stream processing test frameworks</code></pre>
    </div>

    <h3>Event Streaming Best Practices</h3>
    <div class="code-block">
      <pre><code>Implementation Guidelines:

1. Event Design:
├── Immutable events: Never modify published events
├── Rich context: Include relevant metadata
├── Versioning: Plan for schema evolution
├── Timestamps: Include event and processing time
└── Correlation IDs: Track related events

2. Partitioning Strategy:
├── Key selection: Ensure even distribution
├── Partition count: Balance parallelism vs overhead
├── Rebalancing: Handle partition reassignment
├── Hot partitions: Avoid uneven load
└── Scaling: Plan for partition growth

3. Consumer Design:
├── Idempotent processing: Handle duplicate events
├── Error handling: Dead letter queues
├── Offset management: Manual vs automatic commits
├── Batch processing: Process multiple events together
└── Graceful shutdown: Clean consumer termination

4. Performance Optimization:
├── Batch size: Optimize for throughput vs latency
├── Compression: Reduce network overhead
├── Connection pooling: Reuse connections
├── Async processing: Non-blocking operations
└── Memory management: Prevent memory leaks

5. Operational Excellence:
├── Monitoring: Comprehensive metrics collection
├── Alerting: Proactive issue detection
├── Capacity planning: Predict resource needs
├── Disaster recovery: Multi-region replication
└── Testing: Load testing, chaos engineering

Security Considerations:
├── Authentication: SASL, OAuth, mTLS
├── Authorization: ACLs, RBAC
├── Encryption: TLS in transit, encryption at rest
├── Audit logging: Track access and changes
└── Network security: VPC, firewall rules</code></pre>
    </div>

    <h3>Interview Questions & Answers</h3>
    <div class="code-block">
      <pre><code>Common Interview Questions:

Q: What's the difference between event streaming and traditional messaging?
A: Event streaming uses immutable event logs with persistent storage and 
   real-time processing, while traditional messaging uses temporary queues 
   with discrete message consumption.

Q: How does Kafka ensure message ordering?
A: Kafka guarantees ordering within a partition only. Messages with the 
   same key go to the same partition, ensuring order for related events.

Q: What is exactly-once processing and why is it difficult?
A: Exactly-once means each event is processed exactly once, even with 
   failures. It's difficult due to network failures, duplicates, and 
   distributed system challenges.

Q: How do you handle backpressure in event streaming?
A: Use flow control, buffering, load shedding, circuit breakers, and 
   auto-scaling. Monitor consumer lag and implement proper error handling.

Q: What's the difference between event sourcing and event streaming?
A: Event sourcing is a data storage pattern using events as primary data.
   Event streaming is a processing pattern for real-time event flows.

Q: How do you choose partition count in Kafka?
A: Consider parallelism needs, consumer count, throughput requirements, 
   and rebalancing overhead. Start with 2-3x consumer count.

Q: What are the trade-offs between stream processing frameworks?
A: Flink: Low latency, complex. Spark: High throughput, batch-friendly.
   Kafka Streams: Simple, embedded. Storm: Mature, flexible.

Q: How do you handle schema evolution in event streaming?
A: Use schema registry, maintain backward/forward compatibility, version 
   schemas, and implement gradual migration strategies.

Q: What's the CAP theorem impact on event streaming?
A: Most systems choose availability and partition tolerance, accepting 
   eventual consistency. Some use consensus algorithms for consistency.

Q: How do you monitor event streaming systems?
A: Track consumer lag, throughput, error rates, latency, resource usage.
   Use tools like Prometheus, Grafana, and platform-specific monitoring.</code></pre>
    </div>

    <h3>Key Takeaways</h3>
    <ul>
      <li><strong>Real-Time Processing:</strong> Process events as they happen, not in batches</li>
      <li><strong>Scalability:</strong> Horizontal scaling through partitioning and consumer groups</li>
      <li><strong>Durability:</strong> Persistent event logs enable replay and fault tolerance</li>
      <li><strong>Ordering:</strong> Guaranteed within partitions, use consistent partitioning keys</li>
      <li><strong>Exactly-Once:</strong> Difficult but achievable with proper design and tooling</li>
      <li><strong>Schema Evolution:</strong> Plan for change with versioning and compatibility</li>
      <li><strong>Monitoring:</strong> Essential for distributed streaming systems</li>
    </ul>

    <h3>References</h3>
    <ul>
      <li><a href="https://kafka.apache.org/documentation/" target="_blank">Apache Kafka Documentation</a></li>
      <li><a href="https://flink.apache.org/what-is-flink/flink-architecture/" target="_blank">Apache Flink Architecture</a></li>
      <li><a href="https://pulsar.apache.org/docs/concepts-overview/" target="_blank">Apache Pulsar Concepts</a></li>
      <li><a href="https://aws.amazon.com/kinesis/" target="_blank">Amazon Kinesis</a></li>
      <li><a href="https://cloud.google.com/pubsub/docs/overview" target="_blank">Google Pub/Sub</a></li>
      <li><a href="https://martinfowler.com/articles/201701-event-driven.html" target="_blank">Event-Driven Architecture</a></li>
    </ul>
  `
}; 