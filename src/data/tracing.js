export const tracing = {
  id: 'tracing',
  title: 'Distributed Tracing',
  content: `
    <p>Distributed tracing is a method of tracking requests as they flow through multiple services in a distributed system, providing end-to-end visibility into application performance, dependencies, and bottlenecks. It's essential for debugging complex microservices architectures and understanding system behavior.</p>

    <details>
      <summary><strong>Real-World Example: Uber's Distributed Tracing at Scale</strong></summary>
      <div class="info-note">
        Uber processes 15+ million trips daily across 10,000+ microservices using Jaeger for distributed tracing. Their tracing system handles 100+ billion spans per day, providing visibility into request flows from mobile apps through 2,000+ services including routing, pricing, matching, and payment processing. The system enables Uber to debug issues across their complex architecture, with traces showing complete request journeys from rider request to driver dispatch in under 10 seconds. Uber's tracing implementation helped reduce mean time to resolution (MTTR) from hours to minutes, identifies performance bottlenecks across services, and supports capacity planning for peak demand periods. The system processes 1+ billion API calls daily while maintaining sub-millisecond tracing overhead.
      </div>
    </details>

    <h3>Distributed Tracing Fundamentals</h3>
    <p>Understanding distributed tracing concepts is crucial for building observable microservices architectures that can be effectively monitored and debugged.</p>

    <h4>Core Tracing Concepts</h4>
    <p>Distributed tracing uses a hierarchical model to represent request flows through distributed systems.</p>

    <div class="code-block">
      <pre><code>Trace Structure Hierarchy:

Trace (Complete Request Journey):
├── Trace ID: 1234567890abcdef
├── Duration: 245ms
├── Services: 6 services involved
└── Status: Success

Root Span (API Gateway):
├── Span ID: abc123
├── Operation: GET /api/orders
├── Duration: 245ms
├── Child Spans: 3
└── Tags: {service: "api-gateway", version: "1.2.3"}

  Child Span (Order Service):
  ├── Span ID: def456
  ├── Parent ID: abc123
  ├── Operation: order.get
  ├── Duration: 180ms
  ├── Tags: {service: "order-service", user_id: "12345"}
  └── Child Spans: 2

    Child Span (Database):
    ├── Span ID: ghi789
    ├── Parent ID: def456
    ├── Operation: SELECT orders
    ├── Duration: 45ms
    ├── Tags: {db.type: "postgresql", db.name: "orders"}
    └── Logs: [{timestamp: t1, event: "query.start"}]

    Child Span (Payment Service):
    ├── Span ID: jkl012
    ├── Parent ID: def456
    ├── Operation: payment.validate
    ├── Duration: 120ms
    ├── Tags: {service: "payment-service", amount: "99.99"}
    └── Status: Success

  Child Span (Inventory Service):
  ├── Span ID: mno345
  ├── Parent ID: abc123
  ├── Operation: inventory.check
  ├── Duration: 35ms
  ├── Tags: {service: "inventory-service", product_id: "item123"}
  └── Status: Success</code></pre>
    </div>

    <h4>Trace and Span Attributes</h4>
    <p>Rich metadata attached to traces and spans provides context for debugging and analysis.</p>

    <table>
      <thead>
        <tr>
          <th>Attribute Type</th>
          <th>Description</th>
          <th>Examples</th>
          <th>Use Cases</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Identifiers</td>
          <td>Unique IDs for correlation</td>
          <td>trace_id, span_id, parent_id</td>
          <td>Linking spans, trace reconstruction</td>
        </tr>
        <tr>
          <td>Timing</td>
          <td>Temporal information</td>
          <td>start_time, duration, end_time</td>
          <td>Performance analysis, SLA monitoring</td>
        </tr>
        <tr>
          <td>Tags</td>
          <td>Key-value metadata</td>
          <td>service.name, http.method, user.id</td>
          <td>Filtering, grouping, analysis</td>
        </tr>
        <tr>
          <td>Logs</td>
          <td>Time-stamped events</td>
          <td>error.message, cache.hit, db.query</td>
          <td>Debugging, event correlation</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>Operation outcome</td>
          <td>OK, ERROR, TIMEOUT</td>
          <td>Error tracking, success rates</td>
        </tr>
      </tbody>
    </table>

    <h4>Context Propagation</h4>
    <p><strong>Concept:</strong> Passing trace context between services to maintain request correlation.</p>

    <div class="code-block">
      <pre><code>Context Propagation Methods:

1. HTTP Headers (Most Common):
   Request Headers:
   ├── X-Trace-Id: 1234567890abcdef
   ├── X-Span-Id: abc123def456
   ├── X-Parent-Span-Id: 789ghi012jkl
   ├── X-Sampled: 1
   └── X-Baggage: user_id=12345,region=us-east

2. Message Queue Headers:
   Kafka Message:
   {
     "headers": {
       "trace-id": "1234567890abcdef",
       "span-id": "abc123def456",
       "parent-span-id": "789ghi012jkl"
     },
     "payload": {...}
   }

3. gRPC Metadata:
   metadata := metadata.Pairs(
     "trace-id", "1234567890abcdef",
     "span-id", "abc123def456",
     "parent-span-id", "789ghi012jkl"
   )

4. Database Connection Context:
   // SQL comment injection
   SELECT * FROM orders 
   /* trace_id=1234567890abcdef span_id=abc123def456 */
   WHERE user_id = ?

Implementation Example (OpenTelemetry):
import { trace, context, propagation } from '@opentelemetry/api';

// Extract context from incoming request
const parentContext = propagation.extract(context.active(), request.headers);

// Start new span with parent context
const span = trace.getTracer('my-service').startSpan(
  'process-order',
  { parent: parentContext }
);

// Inject context into outgoing request
const headers = {};
propagation.inject(trace.setSpan(context.active(), span), headers);

// Make request with propagated context
await fetch('http://payment-service/validate', { headers });</code></pre>
    </div>

    <h3>Tracing Systems and Platforms</h3>
    <p>Various tracing systems provide different capabilities for collecting, storing, and analyzing distributed traces.</p>

    <h4>Open Source Tracing Systems</h4>
    <p>Community-driven tracing platforms offering flexibility and customization.</p>

    <h5>Jaeger</h5>
    <p><strong>Architecture:</strong> End-to-end distributed tracing system inspired by Google's Dapper.</p>

    <div class="code-block">
      <pre><code>Jaeger Architecture:

Application Services:
├── Service A (with Jaeger client)
├── Service B (with Jaeger client)
└── Service C (with Jaeger client)
            │
            ▼
Jaeger Agent (Local):
├── Receives spans via UDP
├── Batches spans for efficiency
├── Forwards to Jaeger Collector
└── Minimal performance impact
            │
            ▼
Jaeger Collector:
├── Receives spans from agents
├── Validates and processes spans
├── Writes to storage backend
└── Provides query API
            │
            ▼
Storage Backend:
├── Cassandra (recommended for production)
├── Elasticsearch (for search capabilities)
├── Kafka (for streaming)
└── Memory (for development)
            │
            ▼
Jaeger Query Service:
├── Provides query API
├── Serves Jaeger UI
├── Enables trace search
└── Supports analytics

Jaeger UI Features:
- Trace search and filtering
- Service dependency graph
- Performance analytics
- Span details and logs
- Comparison tools</code></pre>
    </div>

    <h5>Zipkin</h5>
    <p><strong>Architecture:</strong> Distributed tracing system with focus on simplicity and performance.</p>

    <div class="code-block">
      <pre><code>Zipkin Components:

Zipkin Server:
├── Collector: Receives spans
├── Storage: Stores trace data
├── Query API: Retrieves traces
└── Web UI: Visualizes traces

Supported Storage:
├── In-memory (development)
├── MySQL (small scale)
├── Cassandra (large scale)
└── Elasticsearch (search features)

Zipkin vs Jaeger:
┌─────────────────┬──────────────┬─────────────────┐
│    Feature      │   Zipkin     │     Jaeger      │
├─────────────────┼──────────────┼─────────────────┤
│ Deployment      │ Single JAR   │ Multiple services│
│ Storage         │ Multiple     │ Cassandra/ES    │
│ UI Features     │ Basic        │ Advanced        │
│ Performance     │ Good         │ Excellent       │
│ Ecosystem       │ Twitter      │ CNCF/Uber       │
└─────────────────┴──────────────┴─────────────────┘</code></pre>
    </div>

    <details>
      <summary><strong>Example: Twitter's Zipkin Implementation</strong></summary>
      <div class="info-note">
        Twitter originally developed Zipkin to trace requests across their microservices architecture serving 500+ million tweets daily. Their implementation handles billions of spans across thousands of services, providing visibility into tweet processing, timeline generation, and real-time features. Zipkin helped Twitter identify performance bottlenecks in their tweet delivery pipeline, optimize database queries across services, and understand service dependencies during high-traffic events. The system processes 100+ million trace spans daily, enables rapid debugging of distributed issues, and supports capacity planning for major events like elections and sports finals.
      </div>
    </details>

    <h4>Cloud-Native Tracing Services</h4>
    <p>Managed tracing services provided by major cloud platforms.</p>

    <h5>AWS X-Ray</h5>
    <p><strong>Features:</strong> Fully managed distributed tracing service integrated with AWS ecosystem.</p>

    <div class="code-block">
      <pre><code>AWS X-Ray Architecture:

Application Code:
├── X-Ray SDK integration
├── Automatic AWS service tracing
├── Custom segment creation
└── Sampling rule configuration

X-Ray Daemon:
├── Collects trace data
├── Sends to X-Ray service
├── Handles batching/retry
└── Minimal application impact

X-Ray Service:
├── Processes trace data
├── Stores traces (30 days)
├── Provides query API
└── Generates service map

X-Ray Console:
├── Service map visualization
├── Trace search and filtering
├── Performance analytics
└── Error analysis

Integration Examples:
// Lambda function tracing
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

exports.handler = async (event) => {
  const segment = AWSXRay.getSegment();
  const subsegment = segment.addNewSubsegment('business-logic');
  
  try {
    // Your business logic
    const result = await processOrder(event);
    subsegment.close();
    return result;
  } catch (error) {
    subsegment.addError(error);
    subsegment.close();
    throw error;
  }
};

// Express.js middleware
const app = express();
app.use(AWSXRay.express.openSegment('MyApp'));

app.get('/api/orders', async (req, res) => {
  const segment = AWSXRay.getSegment();
  
  // Trace database call
  const subsegment = segment.addNewSubsegment('database');
  const orders = await db.query('SELECT * FROM orders');
  subsegment.close();
  
  res.json(orders);
});

app.use(AWSXRay.express.closeSegment());</code></pre>
    </div>

    <h5>Google Cloud Trace</h5>
    <p><strong>Features:</strong> Distributed tracing system integrated with Google Cloud Platform.</p>

    <h5>Azure Application Insights</h5>
    <p><strong>Features:</strong> Application performance monitoring with distributed tracing capabilities.</p>

    <h3>OpenTelemetry Standard</h3>
    <p>OpenTelemetry provides a vendor-neutral framework for observability, including distributed tracing, metrics, and logs.</p>

    <h4>OpenTelemetry Architecture</h4>
    <div class="code-block">
      <pre><code>OpenTelemetry Components:

API Layer:
├── Language-specific APIs
├── Vendor-neutral interfaces
├── Instrumentation libraries
└── Context propagation

SDK Layer:
├── Trace/metric/log processing
├── Sampling configuration
├── Resource detection
└── Exporter management

Instrumentation:
├── Auto-instrumentation (frameworks)
├── Manual instrumentation (custom)
├── Library instrumentation
└── Infrastructure instrumentation

Collectors:
├── Receive telemetry data
├── Process and transform
├── Route to backends
└── Provide buffering/retry

Exporters:
├── Jaeger exporter
├── Zipkin exporter
├── Prometheus exporter
└── Cloud vendor exporters

OpenTelemetry Benefits:
✓ Vendor neutrality
✓ Standardized APIs
✓ Rich ecosystem
✓ Future-proof instrumentation
✓ Multi-language support</code></pre>
    </div>

    <h4>OpenTelemetry Implementation</h4>
    <div class="code-block">
      <pre><code>OpenTelemetry Setup Examples:

Node.js Implementation:
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

// Initialize SDK
const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  traceExporter: new JaegerExporter({
    endpoint: 'http://localhost:14268/api/traces',
  }),
  serviceName: 'my-service',
  serviceVersion: '1.0.0',
});

sdk.start();

// Manual instrumentation
const { trace } = require('@opentelemetry/api');

async function processOrder(orderId) {
  const tracer = trace.getTracer('order-service');
  const span = tracer.startSpan('process-order');
  
  span.setAttributes({
    'order.id': orderId,
    'order.type': 'online',
    'user.id': getCurrentUserId()
  });
  
  try {
    // Business logic
    const order = await validateOrder(orderId);
    await chargePayment(order);
    await updateInventory(order);
    
    span.setStatus({ code: SpanStatusCode.OK });
    return order;
  } catch (error) {
    span.recordException(error);
    span.setStatus({ 
      code: SpanStatusCode.ERROR, 
      message: error.message 
    });
    throw error;
  } finally {
    span.end();
  }
}

Python Implementation:
from opentelemetry import trace
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor

# Initialize tracing
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

# Configure exporter
jaeger_exporter = JaegerExporter(
    agent_host_name="localhost",
    agent_port=6831,
)

span_processor = BatchSpanProcessor(jaeger_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

# Auto-instrument Flask and requests
FlaskInstrumentor().instrument()
RequestsInstrumentor().instrument()

# Manual instrumentation
@app.route('/api/orders/<order_id>')
def get_order(order_id):
    with tracer.start_as_current_span("get-order") as span:
        span.set_attribute("order.id", order_id)
        span.set_attribute("user.id", get_current_user_id())
        
        try:
            order = fetch_order_from_db(order_id)
            span.set_attribute("order.status", order.status)
            return jsonify(order)
        except Exception as e:
            span.record_exception(e)
            span.set_status(Status(StatusCode.ERROR, str(e)))
            raise</code></pre>
    </div>

    <details>
      <summary><strong>Example: Shopify's OpenTelemetry Migration</strong></summary>
      <div class="info-note">
        Shopify migrated to OpenTelemetry to standardize observability across 2,000+ services processing $200+ billion in commerce annually. Their implementation provides unified tracing for 1+ million merchants, handling Black Friday traffic spikes of 3,000+ requests per second. OpenTelemetry enables Shopify to trace complex e-commerce workflows from storefront interactions through payment processing, inventory management, and order fulfillment. The standardized approach reduced instrumentation complexity, improved debugging capabilities across their Ruby, Go, and JavaScript services, and provided vendor-neutral observability. The system processes 100+ billion spans annually while maintaining sub-millisecond overhead impact on critical payment flows.
      </div>
    </details>

    <h3>Sampling Strategies</h3>
    <p>Sampling controls the volume of traces collected, balancing observability with performance and cost.</p>

    <h4>Sampling Types</h4>
    <table>
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Decision Point</th>
          <th>Pros</th>
          <th>Cons</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Head-based</td>
          <td>Trace start</td>
          <td>Low latency, predictable load</td>
          <td>May miss important traces</td>
        </tr>
        <tr>
          <td>Tail-based</td>
          <td>Trace completion</td>
          <td>Intelligent sampling, error focus</td>
          <td>Higher latency, complex storage</td>
        </tr>
        <tr>
          <td>Probabilistic</td>
          <td>Random percentage</td>
          <td>Simple, unbiased</td>
          <td>May miss rare events</td>
        </tr>
        <tr>
          <td>Rate-based</td>
          <td>Fixed rate limit</td>
          <td>Predictable volume</td>
          <td>May drop during spikes</td>
        </tr>
        <tr>
          <td>Adaptive</td>
          <td>Dynamic conditions</td>
          <td>Responds to system state</td>
          <td>Complex implementation</td>
        </tr>
      </tbody>
    </table>

    <h4>Sampling Implementation</h4>
    <div class="code-block">
      <pre><code>Sampling Configuration Examples:

1. Probabilistic Sampling (10%):
{
  "sampler": {
    "type": "probabilistic",
    "param": 0.1
  }
}

2. Rate-based Sampling (100 traces/second):
{
  "sampler": {
    "type": "rateLimiting",
    "param": 100
  }
}

3. Adaptive Sampling Rules:
{
  "sampling_rules": [
    {
      "service": "payment-service",
      "operation": "process-payment",
      "sample_rate": 1.0  // 100% for critical operations
    },
    {
      "service": "*",
      "operation": "health-check",
      "sample_rate": 0.01  // 1% for health checks
    },
    {
      "service": "user-service",
      "operation": "*",
      "sample_rate": 0.1,  // 10% default
      "conditions": {
        "error": true,
        "sample_rate": 1.0  // 100% for errors
      }
    }
  ]
}

4. Tail-based Sampling (OpenTelemetry Collector):
processors:
  tail_sampling:
    decision_wait: 30s
    num_traces: 100000
    policies:
      - name: error-policy
        type: status_code
        status_code: {status_codes: [ERROR]}
      - name: latency-policy
        type: latency
        latency: {threshold_ms: 1000}
      - name: probabilistic-policy
        type: probabilistic
        probabilistic: {sampling_percentage: 10}

OpenTelemetry Sampling Code:
const { TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-base');

// 10% sampling
const sampler = new TraceIdRatioBasedSampler(0.1);

const sdk = new NodeSDK({
  sampler: sampler,
  // ... other config
});

// Custom sampling logic
class CustomSampler {
  shouldSample(context, traceId, spanName, spanKind, attributes) {
    // Sample 100% of payment operations
    if (spanName.includes('payment')) {
      return { decision: SamplingDecision.RECORD_AND_SAMPLE };
    }
    
    // Sample 1% of health checks
    if (spanName.includes('health')) {
      return { decision: SamplingDecision.NOT_RECORD };
    }
    
    // Default 10% sampling
    return Math.random() < 0.1 
      ? { decision: SamplingDecision.RECORD_AND_SAMPLE }
      : { decision: SamplingDecision.NOT_RECORD };
  }
}</code></pre>
    </div>

    <h3>Tracing Performance and Optimization</h3>
    <p>Effective tracing requires balancing observability with application performance impact.</p>

    <h4>Performance Considerations</h4>
    <div class="code-block">
      <pre><code>Tracing Overhead Analysis:

Performance Impact:
├── CPU Overhead: 1-5% typical
├── Memory Overhead: 10-50MB per service
├── Network Overhead: 1-10KB per span
└── Latency Impact: 0.1-1ms per span

Optimization Strategies:

1. Efficient Span Creation:
// Bad: Creating too many spans
function processOrder(order) {
  const span1 = tracer.startSpan('validate-order');
  const span2 = tracer.startSpan('check-field-1');
  const span3 = tracer.startSpan('check-field-2');
  // ... many small spans
}

// Good: Logical span grouping
function processOrder(order) {
  const span = tracer.startSpan('validate-order');
  span.addEvent('validation-start');
  
  // Group related operations
  validateOrderFields(order);
  
  span.addEvent('validation-complete');
  span.end();
}

2. Batching and Buffering:
const batchSpanProcessor = new BatchSpanProcessor(
  new JaegerExporter(),
  {
    maxQueueSize: 1000,
    maxExportBatchSize: 100,
    scheduledDelayMillis: 1000,
    exportTimeoutMillis: 5000
  }
);

3. Async Processing:
// Non-blocking span export
const span = tracer.startSpan('operation');
// ... business logic
span.end(); // Queued for async export

4. Sampling Optimization:
// Higher sampling for errors
const errorSampler = new CustomSampler({
  errorRate: 1.0,      // 100% error traces
  successRate: 0.01,   // 1% success traces
  latencyThreshold: 1000 // 100% slow traces
});

5. Attribute Optimization:
// Limit attribute cardinality
span.setAttributes({
  'user.id': userId,           // Good: bounded values
  'user.type': userType,       // Good: enum values
  'order.amount': orderAmount, // Bad: unbounded values
  'request.url': requestUrl    // Bad: high cardinality
});

Performance Monitoring:
- Track tracing overhead metrics
- Monitor span export queue sizes
- Measure end-to-end latency impact
- Alert on sampling rate changes
- Profile memory usage patterns</code></pre>
    </div>

    <h4>Storage and Retention</h4>
    <div class="code-block">
      <pre><code>Trace Storage Considerations:

Storage Requirements:
├── Span size: 1-10KB average
├── Trace size: 10-100KB average
├── Daily volume: 1GB-1TB per service
└── Retention: 7-30 days typical

Storage Optimization:
1. Compression: 70-90% size reduction
2. Indexing: Efficient trace queries
3. Partitioning: Time-based sharding
4. Archival: Cold storage for compliance

Cassandra Storage Schema:
CREATE TABLE traces (
  trace_id text,
  span_id text,
  parent_id text,
  operation_name text,
  start_time timestamp,
  duration int,
  tags map<text, text>,
  logs list<frozen<log_entry>>,
  PRIMARY KEY (trace_id, span_id)
) WITH CLUSTERING ORDER BY (span_id ASC)
AND compaction = {'class': 'TimeWindowCompactionStrategy'}
AND default_time_to_live = 604800; -- 7 days

Elasticsearch Storage:
{
  "mappings": {
    "properties": {
      "traceID": {"type": "keyword"},
      "spanID": {"type": "keyword"},
      "operationName": {"type": "keyword"},
      "startTime": {"type": "date"},
      "duration": {"type": "long"},
      "tags": {"type": "object"},
      "logs": {"type": "nested"}
    }
  },
  "settings": {
    "index.lifecycle.name": "traces-policy",
    "index.lifecycle.rollover_alias": "traces"
  }
}</code></pre>
    </div>

    <h3>Advanced Tracing Patterns</h3>
    <p>Sophisticated tracing techniques for complex distributed systems.</p>

    <h4>Trace Correlation</h4>
    <p><strong>Concept:</strong> Linking traces across different request flows and system boundaries.</p>

    <div class="code-block">
      <pre><code>Trace Correlation Patterns:

1. Request-Response Correlation:
// Original request trace
const requestTrace = tracer.startSpan('user-request');
requestTrace.setAttributes({
  'correlation.id': correlationId,
  'request.type': 'sync'
});

// Async processing trace
const asyncTrace = tracer.startSpan('async-processing');
asyncTrace.setAttributes({
  'correlation.id': correlationId,  // Same correlation ID
  'request.type': 'async',
  'parent.trace.id': requestTrace.spanContext().traceId
});

2. Cross-System Correlation:
// Microservice A
const span = tracer.startSpan('external-api-call');
span.setAttributes({
  'external.system': 'payment-gateway',
  'external.correlation.id': externalCorrelationId
});

// External system logs
{
  "timestamp": "2023-12-01T10:30:00Z",
  "correlation_id": "ext-12345",
  "trace_id": "internal-trace-id",
  "message": "Payment processed"
}

3. Event-Driven Correlation:
// Event publisher
const publishSpan = tracer.startSpan('publish-event');
publishSpan.setAttributes({
  'event.type': 'order.created',
  'event.id': eventId
});

// Event consumer
const consumeSpan = tracer.startSpan('consume-event');
consumeSpan.setAttributes({
  'event.type': 'order.created',
  'event.id': eventId,  // Same event ID
  'consumer.group': 'order-processor'
});

4. Baggage for Cross-Service Data:
import { propagation, trace } from '@opentelemetry/api';

// Set baggage in upstream service
const baggage = propagation.setBaggage(
  propagation.getActiveBaggage(),
  'user.id', userId,
  'user.tier', userTier
);

// Access baggage in downstream service
const currentBaggage = propagation.getActiveBaggage();
const userId = currentBaggage.getEntry('user.id')?.value;
const userTier = currentBaggage.getEntry('user.tier')?.value;

span.setAttributes({
  'user.id': userId,
  'user.tier': userTier
});</code></pre>
    </div>

    <h4>Error Tracking and Root Cause Analysis</h4>
    <div class="code-block">
      <pre><code>Error Tracing Patterns:

1. Exception Propagation:
async function processPayment(paymentData) {
  const span = tracer.startSpan('process-payment');
  
  try {
    await validatePayment(paymentData);
    await chargeCard(paymentData);
    span.setStatus({ code: SpanStatusCode.OK });
  } catch (error) {
    // Record exception details
    span.recordException(error);
    span.setStatus({ 
      code: SpanStatusCode.ERROR, 
      message: error.message 
    });
    
    // Add error context
    span.setAttributes({
      'error.type': error.constructor.name,
      'error.code': error.code,
      'payment.amount': paymentData.amount,
      'payment.method': paymentData.method
    });
    
    throw error; // Re-throw for upstream handling
  } finally {
    span.end();
  }
}

2. Error Aggregation:
// Query for error patterns
SELECT 
  operation_name,
  error_type,
  COUNT(*) as error_count,
  AVG(duration) as avg_duration
FROM spans 
WHERE status = 'ERROR' 
  AND start_time > NOW() - INTERVAL '1 hour'
GROUP BY operation_name, error_type
ORDER BY error_count DESC;

3. Root Cause Analysis:
// Trace analysis for cascading failures
const errorTrace = {
  traceId: "1234567890abcdef",
  spans: [
    {
      service: "api-gateway",
      operation: "GET /api/orders",
      status: "ERROR",
      duration: 5000,
      error: "timeout"
    },
    {
      service: "order-service", 
      operation: "get-order",
      status: "ERROR",
      duration: 4500,
      error: "database timeout"
    },
    {
      service: "database",
      operation: "SELECT orders",
      status: "ERROR", 
      duration: 4000,
      error: "connection pool exhausted"
    }
  ]
};

// Root cause: Database connection pool exhaustion
// led to cascading timeouts upstream</code></pre>
    </div>

    <details>
      <summary><strong>Example: Netflix's Tracing for Microservices Debugging</strong></summary>
      <div class="info-note">
        Netflix uses distributed tracing to debug issues across 1,000+ microservices serving 260+ million subscribers. Their tracing system helped identify a critical issue where video playback failures were traced back to a single authentication service experiencing database connection pool exhaustion. The trace showed how a 50ms authentication delay cascaded through 15+ services, ultimately causing 30-second video startup delays. Netflix's implementation processes 500+ billion spans daily, enables rapid root cause analysis during outages, and provides detailed performance insights for their content delivery pipeline. The system helped reduce mean time to resolution from hours to minutes, supporting their 99.9% availability target.
      </div>
    </details>

    <h3>Tracing Best Practices</h3>
    <p>Proven strategies for implementing effective distributed tracing in production systems.</p>

    <h4>Instrumentation Guidelines</h4>
    <div class="code-block">
      <pre><code>Instrumentation Best Practices:

1. Meaningful Span Names:
// Bad: Generic names
tracer.startSpan('function');
tracer.startSpan('database');
tracer.startSpan('http');

// Good: Descriptive names
tracer.startSpan('validate-user-credentials');
tracer.startSpan('query-user-orders');
tracer.startSpan('POST /api/orders');

2. Appropriate Span Granularity:
// Too fine-grained
function processOrder(order) {
  const span1 = tracer.startSpan('validate-order-id');
  const span2 = tracer.startSpan('validate-order-amount');
  const span3 = tracer.startSpan('validate-order-items');
  // ... many small spans
}

// Good granularity
function processOrder(order) {
  const span = tracer.startSpan('validate-order');
  span.addEvent('validation-start');
  
  validateOrderId(order.id);
  validateOrderAmount(order.amount);
  validateOrderItems(order.items);
  
  span.addEvent('validation-complete');
  span.end();
}

3. Rich Span Attributes:
span.setAttributes({
  // Service context
  'service.name': 'order-service',
  'service.version': '1.2.3',
  
  // Request context
  'http.method': 'POST',
  'http.url': '/api/orders',
  'http.status_code': 200,
  
  // Business context
  'user.id': userId,
  'order.id': orderId,
  'order.amount': orderAmount,
  'order.items_count': itemsCount,
  
  // Infrastructure context
  'host.name': hostname,
  'container.id': containerId,
  'k8s.pod.name': podName
});

4. Structured Logging Integration:
const span = tracer.startSpan('process-payment');
const traceId = span.spanContext().traceId;
const spanId = span.spanContext().spanId;

// Include trace context in logs
logger.info('Processing payment', {
  trace_id: traceId,
  span_id: spanId,
  user_id: userId,
  amount: paymentAmount
});

5. Custom Events and Annotations:
span.addEvent('payment-validation-start');
span.addEvent('payment-validation-complete', {
  'validation.duration_ms': validationDuration,
  'validation.result': 'success'
});

span.addEvent('external-api-call', {
  'api.endpoint': 'https://payment-gateway.com/charge',
  'api.timeout_ms': 5000
});

6. Async Operation Handling:
async function processOrderAsync(orderId) {
  const span = tracer.startSpan('process-order-async');
  
  try {
    // Start async operations with proper context
    const promises = [
      processPayment(orderId),
      updateInventory(orderId),
      sendNotification(orderId)
    ].map(promise => 
      trace.getTracer().bind(promise, span)
    );
    
    await Promise.all(promises);
    span.setStatus({ code: SpanStatusCode.OK });
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR });
    throw error;
  } finally {
    span.end();
  }
}</code></pre>
    </div>

    <h4>Operational Considerations</h4>
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Recommendation</th>
          <th>Rationale</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sampling Rate</td>
          <td>Start with 1-10%, adjust based on volume</td>
          <td>Balance observability with performance</td>
        </tr>
        <tr>
          <td>Retention Period</td>
          <td>7-30 days for most use cases</td>
          <td>Sufficient for debugging, manageable storage</td>
        </tr>
        <tr>
          <td>Attribute Cardinality</td>
          <td>Limit to <1000 unique values per attribute</td>
          <td>Prevent storage explosion and query issues</td>
        </tr>
        <tr>
          <td>Span Duration</td>
          <td>Focus on operations >1ms</td>
          <td>Avoid noise from trivial operations</td>
        </tr>
        <tr>
          <td>Error Sampling</td>
          <td>100% sampling for errors</td>
          <td>Critical for debugging and alerting</td>
        </tr>
      </tbody>
    </table>

    <h3>Monitoring and Alerting</h3>
    <p>Proactive monitoring of tracing infrastructure and application performance.</p>

    <h4>Tracing System Health</h4>
    <div class="code-block">
      <pre><code>Monitoring Metrics:

1. Trace Collection Metrics:
├── Spans received per second
├── Span processing latency
├── Span drop rate
├── Storage utilization
└── Query response times

2. Application Impact Metrics:
├── Tracing overhead (CPU/memory)
├── Span creation latency
├── Context propagation success rate
├── Sampling effectiveness
└── Export queue sizes

3. Business Impact Metrics:
├── Service dependency mapping accuracy
├── Error detection coverage
├── Performance regression detection
└── Debugging time reduction

Alerting Rules:
# High span drop rate
- alert: HighSpanDropRate
  expr: rate(jaeger_collector_spans_dropped_total[5m]) > 100
  for: 2m
  annotations:
    summary: "High span drop rate detected"

# Tracing system unavailable
- alert: TracingSystemDown
  expr: up{job="jaeger-collector"} == 0
  for: 1m
  annotations:
    summary: "Tracing system is unavailable"

# High trace query latency
- alert: HighTraceQueryLatency
  expr: histogram_quantile(0.95, jaeger_query_duration_seconds_bucket) > 5
  for: 3m
  annotations:
    summary: "High trace query latency"

Dashboard Metrics:
- Trace volume trends
- Service dependency graphs
- Error rate by service
- Latency percentiles
- Sampling rate effectiveness</code></pre>
    </div>

    <h3>Conclusion</h3>
    <p>Distributed tracing is essential for understanding and debugging complex microservices architectures. It provides end-to-end visibility into request flows, enables rapid root cause analysis, and supports performance optimization at scale.</p>

    <p><strong>Key Implementation Principles:</strong></p>
    <ul>
      <li><strong>Start Simple:</strong> Begin with basic instrumentation and gradually add complexity</li>
      <li><strong>Focus on Value:</strong> Instrument critical paths and error scenarios first</li>
      <li><strong>Optimize Performance:</strong> Balance observability with application impact</li>
      <li><strong>Standardize Approach:</strong> Use OpenTelemetry for vendor neutrality</li>
      <li><strong>Integrate with Ecosystem:</strong> Connect tracing with logs and metrics</li>
      <li><strong>Plan for Scale:</strong> Design sampling and storage strategies for growth</li>
      <li><strong>Monitor Continuously:</strong> Track both application and tracing system health</li>
    </ul>

    <p>As distributed systems continue to grow in complexity, tracing becomes increasingly critical for maintaining system reliability, performance, and debuggability. The investment in proper tracing infrastructure pays dividends in reduced debugging time, improved system understanding, and faster incident resolution.</p>

    <h3>References</h3>
    <ul>
      <li><a href="https://opentelemetry.io/docs/" target="_blank">OpenTelemetry Documentation</a></li>
      <li><a href="https://www.jaegertracing.io/docs/" target="_blank">Jaeger Tracing Documentation</a></li>
      <li><a href="https://zipkin.io/pages/documentation.html" target="_blank">Zipkin Documentation</a></li>
      <li><a href="https://aws.amazon.com/xray/" target="_blank">AWS X-Ray Documentation</a></li>
      <li><a href="https://cloud.google.com/trace/docs" target="_blank">Google Cloud Trace Documentation</a></li>
      <li><a href="https://research.google/pubs/pub36356/" target="_blank">Google Dapper Paper</a></li>
    </ul>
  `
}; 