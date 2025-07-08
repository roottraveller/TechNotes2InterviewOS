export const monitoringObservability = {
  id: 'monitoring-observability',
  title: 'Monitoring and Observability',
  content: `
<p>Monitoring and observability are critical for maintaining healthy, reliable systems. While monitoring tells you when something is wrong, observability helps you understand why it's wrong and how to fix it.</p>

    <h3>Monitoring vs Observability</h3>
    
    <h4>Monitoring</h4>
    <ul>
      <li><strong>Definition:</strong> Collecting, processing, and alerting on predefined metrics</li>
      <li><strong>Focus:</strong> Known unknowns - problems you anticipate</li>
      <li><strong>Questions:</strong> "Is the system working?" "Are we meeting SLAs?"</li>
      <li><strong>Approach:</strong> Dashboard-driven, threshold-based alerts</li>
    </ul>

    <h4>Observability</h4>
    <ul>
      <li><strong>Definition:</strong> Understanding internal system state from external outputs</li>
      <li><strong>Focus:</strong> Unknown unknowns - problems you didn't anticipate</li>
      <li><strong>Questions:</strong> "Why is this happening?" "What changed?"</li>
      <li><strong>Approach:</strong> Exploration-driven, high-cardinality data</li>
    </ul>

    <h3>Three Pillars of Observability</h3>
    
    <h4>1. Metrics</h4>
    <p>Numeric measurements collected over time.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Types of Metrics
Counter: Only increases (requests, errors)
Gauge: Can go up or down (CPU usage, memory)
Histogram: Distribution of values (request latency)
Summary: Similar to histogram with percentiles

// Example Prometheus Metrics
http_requests_total{method="GET", status="200"} 1234
cpu_usage_percent{instance="web-01"} 45.2
request_duration_seconds{quantile="0.99"} 0.128</code></pre>
    </div>

    <h4>2. Logs</h4>
    <p>Timestamped records of discrete events.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Structured Logging Example
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "ERROR",
  "service": "payment-api",
  "trace_id": "abc123",
  "user_id": "user_456",
  "message": "Payment processing failed",
  "error": {
    "type": "InvalidCardError",
    "code": "CARD_DECLINED",
    "provider": "stripe"
  },
  "context": {
    "amount": 99.99,
    "currency": "USD",
    "attempt": 2
  }
}</code></pre>
    </div>

    <h4>3. Traces</h4>
    <p>End-to-end journey of requests through distributed systems.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Distributed Trace Example
Trace ID: 7b3a4c2d1e5f
┌─────────────────────────────────────────┐
│ Frontend (25ms)                         │
└─────┬───────────────────────────────────┘
      │
      ├─┬─ API Gateway (5ms)
      │ │
      │ ├─┬─ Auth Service (15ms)
      │ │ └─── Database (8ms)
      │ │
      │ └─┬─ Product Service (45ms)
      │   ├─── Cache (2ms) [HIT]
      │   └─── Database (40ms)
      │
      └─── Total: 95ms</code></pre>
    </div>

    <h3>Key Metrics to Monitor</h3>
    
    <h4>Golden Signals (Google SRE)</h4>
    <ul>
      <li><strong>Latency:</strong> Time to service requests</li>
      <li><strong>Traffic:</strong> Demand on system (RPS)</li>
      <li><strong>Errors:</strong> Rate of failed requests</li>
      <li><strong>Saturation:</strong> Resource utilization</li>
    </ul>

    <h4>RED Method</h4>
    <ul>
      <li><strong>Rate:</strong> Requests per second</li>
      <li><strong>Errors:</strong> Failed requests per second</li>
      <li><strong>Duration:</strong> Time per request</li>
    </ul>

    <h4>USE Method</h4>
    <ul>
      <li><strong>Utilization:</strong> % of resource busy</li>
      <li><strong>Saturation:</strong> Queue length</li>
      <li><strong>Errors:</strong> Error events</li>
    </ul>

    <h3>Monitoring Tools and Platforms</h3>
    
    <h4>Metrics Collection</h4>
    <ul>
      <li><strong>Prometheus:</strong> Open-source, pull-based metrics</li>
      <li><strong>Graphite:</strong> Time-series database</li>
      <li><strong>InfluxDB:</strong> Purpose-built for metrics</li>
      <li><strong>CloudWatch:</strong> AWS native monitoring</li>
      <li><strong>Datadog:</strong> SaaS monitoring platform</li>
    </ul>

    <h4>Log Management</h4>
    <ul>
      <li><strong>ELK Stack:</strong> Elasticsearch, Logstash, Kibana</li>
      <li><strong>Splunk:</strong> Enterprise log analysis</li>
      <li><strong>Fluentd:</strong> Unified logging layer</li>
      <li><strong>Loki:</strong> Prometheus-like for logs</li>
      <li><strong>CloudWatch Logs:</strong> AWS log management</li>
    </ul>

    <h4>Distributed Tracing</h4>
    <ul>
      <li><strong>Jaeger:</strong> Uber's distributed tracing</li>
      <li><strong>Zipkin:</strong> Twitter's tracing system</li>
      <li><strong>AWS X-Ray:</strong> AWS native tracing</li>
      <li><strong>Google Cloud Trace:</strong> GCP tracing</li>
      <li><strong>Datadog APM:</strong> Application performance monitoring</li>
    </ul>

    <h3>Implementation Best Practices</h3>
    
    <h4>Instrumentation</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// OpenTelemetry Example
const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// Initialize metrics
const meterProvider = new MeterProvider({
  exporter: new PrometheusExporter({ port: 9090 }),
  interval: 1000,
});

// Create metrics
const meter = meterProvider.getMeter('my-service');
const requestCounter = meter.createCounter('http_requests', {
  description: 'Count of HTTP requests',
});

const latencyHistogram = meter.createHistogram('http_latency', {
  description: 'HTTP request latency',
  unit: 'ms',
});

// Use in application
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const labels = {
      method: req.method,
      route: req.route?.path || 'unknown',
      status: res.statusCode,
    };
    
    requestCounter.add(1, labels);
    latencyHistogram.record(Date.now() - start, labels);
  });
  
  next();
});</code></pre>
    </div>

    <h4>Structured Logging</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Winston Logger Configuration
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'user-service',
    version: process.env.VERSION,
  },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Contextual logging
logger.info('User login', {
  userId: user.id,
  email: user.email,
  ip: req.ip,
  userAgent: req.headers['user-agent'],
});</code></pre>
    </div>

    <h3>Alerting Strategies</h3>
    
    <h4>Alert Design Principles</h4>
    <ul>
      <li><strong>Actionable:</strong> Every alert should have a clear action</li>
      <li><strong>Urgent:</strong> Only alert on issues needing immediate attention</li>
      <li><strong>Contextual:</strong> Include relevant information for debugging</li>
      <li><strong>Tested:</strong> Regularly verify alerts work correctly</li>
    </ul>

    <h4>Alert Fatigue Prevention</h4>
    <ul>
      <li><strong>Symptom-based:</strong> Alert on user impact, not every anomaly</li>
      <li><strong>Deduplication:</strong> Group related alerts</li>
      <li><strong>Escalation:</strong> Route to appropriate on-call</li>
      <li><strong>Self-healing:</strong> Automate common fixes</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Prometheus Alert Rules
groups:
  - name: api_alerts
    rules:
    - alert: HighErrorRate
      expr: |
        rate(http_requests_total{status=~"5.."}[5m]) 
        / rate(http_requests_total[5m]) > 0.05
      for: 5m
      labels:
        severity: critical
        team: platform
      annotations:
        summary: "High error rate on {{ $labels.instance }}"
        description: "Error rate is {{ $value | humanizePercentage }}"
        runbook: "https://wiki.company.com/runbooks/high-error-rate"
        
    - alert: HighLatency
      expr: |
        histogram_quantile(0.95, 
          rate(http_request_duration_seconds_bucket[5m])
        ) > 1.0
      for: 10m
      labels:
        severity: warning</code></pre>
    </div>

    <h3>Dashboards and Visualization</h3>
    
    <h4>Dashboard Best Practices</h4>
    <ul>
      <li><strong>Purpose-driven:</strong> Each dashboard serves specific audience</li>
      <li><strong>Information hierarchy:</strong> Most important metrics prominent</li>
      <li><strong>Time consistency:</strong> All panels show same time range</li>
      <li><strong>Annotations:</strong> Mark deployments, incidents</li>
      <li><strong>Mobile-friendly:</strong> Viewable on-call</li>
    </ul>

    <h4>Types of Dashboards</h4>
    <ul>
      <li><strong>Executive:</strong> Business KPIs, SLA compliance</li>
      <li><strong>Service:</strong> Golden signals, dependencies</li>
      <li><strong>Infrastructure:</strong> Resource utilization, capacity</li>
      <li><strong>Debug:</strong> Detailed metrics for troubleshooting</li>
    </ul>

    <h3>SLIs, SLOs, and Error Budgets</h3>
    
    <h4>Service Level Indicators (SLIs)</h4>
    <p>Quantitative measure of service behavior.</p>
    <ul>
      <li><strong>Availability:</strong> % of successful requests</li>
      <li><strong>Latency:</strong> Request duration percentiles</li>
      <li><strong>Throughput:</strong> Requests per second</li>
      <li><strong>Quality:</strong> Data correctness, freshness</li>
    </ul>

    <h4>Service Level Objectives (SLOs)</h4>
    <p>Target values for SLIs.</p>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// SLO Examples
Availability: 99.9% of requests succeed (43.2 min/month downtime)
Latency: 95% of requests complete in < 200ms
Throughput: System handles 10,000 RPS

// Multi-window SLOs
- 99.9% availability over 30 days
- 99.95% availability over 7 days
- 99.99% availability over 1 day</code></pre>
    </div>

    <h4>Error Budgets</h4>
    <p>Allowable unreliability (100% - SLO).</p>
    <ul>
      <li><strong>Purpose:</strong> Balance reliability vs feature velocity</li>
      <li><strong>Usage:</strong> Stop releases when budget exhausted</li>
      <li><strong>Calculation:</strong> (1 - SLO) × time period</li>
    </ul>

    <h3>Observability in Microservices</h3>
    
    <h4>Correlation and Context</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Request Context Propagation
const { trace, context } = require('@opentelemetry/api');

// Middleware to propagate context
app.use((req, res, next) => {
  const span = trace.getActiveSpan();
  
  // Extract trace context from headers
  const traceId = req.headers['x-trace-id'] || generateTraceId();
  const spanId = generateSpanId();
  
  // Set context for logging
  req.context = {
    traceId,
    spanId,
    userId: req.user?.id,
    sessionId: req.session?.id,
  };
  
  // Add to response headers
  res.setHeader('x-trace-id', traceId);
  
  next();
});</code></pre>
    </div>

    <h4>Service Mesh Observability</h4>
    <ul>
      <li><strong>Automatic instrumentation:</strong> Proxy-level metrics</li>
      <li><strong>Traffic routing:</strong> A/B testing, canary metrics</li>
      <li><strong>Security:</strong> mTLS verification metrics</li>
      <li><strong>Examples:</strong> Istio, Linkerd, Consul Connect</li>
    </ul>

    <h3>Performance and Cost Optimization</h3>
    
    <h4>Data Retention Strategies</h4>
    <ul>
      <li><strong>Hot storage:</strong> Recent data (1-7 days) - fast queries</li>
      <li><strong>Warm storage:</strong> Medium-term (1-3 months) - slower</li>
      <li><strong>Cold storage:</strong> Long-term archive - cheapest</li>
      <li><strong>Sampling:</strong> Keep subset of high-volume data</li>
      <li><strong>Aggregation:</strong> Roll up old data to summaries</li>
    </ul>

    <h4>Query Optimization</h4>
    <ul>
      <li><strong>Indexing:</strong> Proper labels and tags</li>
      <li><strong>Time ranges:</strong> Limit query scope</li>
      <li><strong>Cardinality:</strong> Control label combinations</li>
      <li><strong>Caching:</strong> Cache expensive queries</li>
    </ul>

    <h3>Incident Response Integration</h3>
    
    <h4>Automated Workflows</h4>
    <ul>
      <li><strong>Alert → Ticket:</strong> Create incident tickets</li>
      <li><strong>Runbook links:</strong> Context-aware documentation</li>
      <li><strong>Auto-remediation:</strong> Trigger healing actions</li>
      <li><strong>Stakeholder notification:</strong> Status page updates</li>
    </ul>

    <h4>Post-Incident Analysis</h4>
    <ul>
      <li><strong>Timeline reconstruction:</strong> Correlate all signals</li>
      <li><strong>Root cause analysis:</strong> Trace to origin</li>
      <li><strong>Impact assessment:</strong> Affected users/services</li>
      <li><strong>Prevention:</strong> Add monitoring for gaps</li>
    </ul>
`
}; 