export const monitoring = {
  id: 'monitoring',
  title: 'System Monitoring',
  content: `
    <h2>System Monitoring & Observability</h2>
    <p><strong>System monitoring is the continuous observation, measurement, and analysis of system performance, health, and behavior to ensure optimal operation, detect issues proactively, and maintain service reliability.</strong></p>

    <h3>Core Monitoring Components & Impact</h3>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Component</th>
        <th style="padding: 12px; text-align: left;">Purpose</th>
        <th style="padding: 12px; text-align: left;">Business Impact</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Metrics Collection</strong></td>
        <td style="padding: 10px;">Quantitative measurements over time</td>
        <td style="padding: 10px;">Prevents 80% of performance issues</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Log Aggregation</strong></td>
        <td style="padding: 10px;">Centralized event tracking</td>
        <td style="padding: 10px;">Reduces debugging time by 70%</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Distributed Tracing</strong></td>
        <td style="padding: 10px;">Request flow visualization</td>
        <td style="padding: 10px;">Identifies bottlenecks in 90% of cases</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Alerting System</strong></td>
        <td style="padding: 10px;">Proactive issue notification</td>
        <td style="padding: 10px;">Reduces MTTR by 60%</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Dashboards</strong></td>
        <td style="padding: 10px;">Real-time visualization</td>
        <td style="padding: 10px;">Improves decision-making speed</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Anomaly Detection</strong></td>
        <td style="padding: 10px;">Automatic pattern recognition</td>
        <td style="padding: 10px;">Catches 95% of unusual patterns</td>
      </tr>
    </table>

    <h3>The Four Pillars of Observability</h3>
    
    <h4>1. Metrics - Quantitative Measurements</h4>
    <div class="code-block">
      <div class="code-label">METRICS ARCHITECTURE</div>
      <pre><code>
Time Series Data Structure:
metric_name{label1="value1", label2="value2"} value timestamp

Examples:
http_requests_total{method="GET", status="200"} 1547
cpu_usage_percent{host="web-01", core="0"} 75.2
memory_usage_bytes{process="java", heap="old"} 2147483648

Metric Types:
• Counter: Monotonically increasing (requests, errors)
• Gauge: Point-in-time values (CPU usage, memory)
• Histogram: Distribution of values (response times)
• Summary: Similar to histogram with quantiles

Storage Patterns:
• Retention: High-resolution (1s) for 1 day, low-resolution (1m) for 1 year
• Compression: Time-series compression reduces storage by 90%
• Aggregation: Pre-computed rollups for faster queries
      </code></pre>
    </div>

    <h4>2. Logs - Discrete Event Records</h4>
    <div class="code-block">
      <div class="code-label">LOG STRUCTURE</div>
      <pre><code>
Structured Logging Format (JSON):
{
  "timestamp": "2024-01-15T10:30:00.123Z",
  "level": "ERROR",
  "service": "user-service",
  "trace_id": "abc123def456",
  "span_id": "789ghi012",
  "message": "Database connection failed",
  "error": {
    "type": "ConnectionTimeout",
    "details": "Connection timeout after 30s"
  },
  "context": {
    "user_id": "user_12345",
    "request_id": "req_67890",
    "endpoint": "/api/users/profile"
  }
}

Log Levels & Usage:
• TRACE: Detailed execution flow (development only)
• DEBUG: Diagnostic information (development/staging)
• INFO: General operational messages
• WARN: Potentially harmful situations
• ERROR: Error events that don't stop execution
• FATAL: Critical errors that may cause termination

Log Processing Pipeline:
Application → Log Agent → Message Queue → Processing → Storage → Analysis
      </code></pre>
    </div>

    <h4>3. Traces - Request Journey Tracking</h4>
    <div class="code-block">
      <div class="code-label">DISTRIBUTED TRACING</div>
      <pre><code>
Trace Structure:
Trace (end-to-end request)
├── Span 1: HTTP Request (100ms)
│   ├── Span 2: Authentication (10ms)
│   ├── Span 3: Database Query (60ms)
│   │   ├── Span 4: Connection Pool (5ms)
│   │   └── Span 5: SQL Execution (50ms)
│   └── Span 6: Response Serialization (20ms)

Span Attributes:
• span_id: Unique identifier
• trace_id: Groups related spans
• parent_span_id: Hierarchy relationship
• operation_name: What the span represents
• start_time/end_time: Timing information
• tags: Key-value metadata
• logs: Timestamped events within span

Sampling Strategies:
• Head-based: Sample at trace start (1% of all traces)
• Tail-based: Sample after trace completion (all errors + 0.1% success)
• Adaptive: Dynamic sampling based on service load
      </code></pre>
    </div>

    <h4>4. Profiles - Code-Level Performance</h4>
    <div class="code-block">
      <div class="code-label">PROFILING DATA</div>
      <pre><code>
CPU Profiling:
• Flame graphs: Visual representation of call stacks
• Hot paths: Most CPU-intensive code paths
• Sampling: Statistical profiling (every 10ms)
• Instrumentation: Exact measurement with overhead

Memory Profiling:
• Heap dumps: Memory allocation patterns
• Garbage collection: GC pause times and frequency
• Memory leaks: Objects not being released
• Allocation tracking: Where memory is allocated

Profiling Tools:
• pprof (Go): Built-in profiling
• Java Flight Recorder: Low-overhead Java profiling
• perf: Linux system profiling
• Pyflame: Python flame graph generation
      </code></pre>
    </div>

    <h3>Essential Monitoring Metrics</h3>
    
    <h4>Golden Signals (Google SRE)</h4>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Signal</th>
        <th style="padding: 12px; text-align: left;">Definition</th>
        <th style="padding: 12px; text-align: left;">Typical Thresholds</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Latency</strong></td>
        <td style="padding: 10px;">Time to process requests</td>
        <td style="padding: 10px;">P95 < 100ms, P99 < 500ms</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Traffic</strong></td>
        <td style="padding: 10px;">Rate of requests</td>
        <td style="padding: 10px;">RPS within capacity limits</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Errors</strong></td>
        <td style="padding: 10px;">Rate of failed requests</td>
        <td style="padding: 10px;">Error rate < 0.1%</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Saturation</strong></td>
        <td style="padding: 10px;">Resource utilization</td>
        <td style="padding: 10px;">CPU < 80%, Memory < 85%</td>
      </tr>
    </table>

    <h4>RED Metrics (Rate, Errors, Duration)</h4>
    <div class="code-block">
      <div class="code-label">RED METRICS IMPLEMENTATION</div>
      <pre><code>
// Prometheus metrics example
const promClient = require('prom-client');

// Rate: Requests per second
const requestRate = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'endpoint', 'status']
});

// Errors: Error rate
const errorRate = new promClient.Counter({
  name: 'http_errors_total',
  help: 'Total HTTP errors',
  labelNames: ['method', 'endpoint', 'error_type']
});

// Duration: Response time distribution
const requestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'endpoint'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

// Usage in middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    requestRate.inc({
      method: req.method,
      endpoint: req.route?.path || 'unknown',
      status: res.statusCode
    });
    
    if (res.statusCode >= 400) {
      errorRate.inc({
        method: req.method,
        endpoint: req.route?.path || 'unknown',
        error_type: res.statusCode >= 500 ? 'server' : 'client'
      });
    }
    
    requestDuration.observe({
      method: req.method,
      endpoint: req.route?.path || 'unknown'
    }, duration);
  });
  
  next();
});
      </code></pre>
    </div>

    <h4>USE Metrics (Utilization, Saturation, Errors)</h4>
    <div class="code-block">
      <div class="code-label">USE METRICS FOR RESOURCES</div>
      <pre><code>
System Resources Monitoring:

CPU:
• Utilization: % of time CPU is busy
• Saturation: Run queue length, load average
• Errors: CPU temperature, thermal throttling

Memory:
• Utilization: % of memory used
• Saturation: Swap usage, page faults
• Errors: Memory parity errors, ECC corrections

Disk:
• Utilization: % of time disk is busy
• Saturation: Disk queue length, I/O wait
• Errors: Disk read/write errors, bad sectors

Network:
• Utilization: % of bandwidth used
• Saturation: Network buffer drops, retransmissions
• Errors: Network packet errors, collisions

Monitoring Commands:
• CPU: top, htop, sar -u
• Memory: free, vmstat, sar -r
• Disk: iostat, iotop, sar -d
• Network: netstat, ss, sar -n DEV
      </code></pre>
    </div>

    <h3>Monitoring Architecture Patterns</h3>
    
    <h4>1. Push vs Pull Models</h4>
    <div class="code-block">
      <div class="code-label">COLLECTION MODELS</div>
      <pre><code>
Push Model (StatsD, DataDog):
Application → Metrics Agent → Monitoring System

Advantages:
• Real-time data delivery
• Applications control when to send
• Good for ephemeral workloads
• Simpler firewall configuration

Disadvantages:
• Potential data loss if agent unavailable
• Higher network overhead
• Harder to debug connectivity issues

Pull Model (Prometheus):
Monitoring System → HTTP Endpoint → Application

Advantages:
• Monitoring system controls collection
• Built-in health checking
• Easier to debug (can manually check endpoints)
• Better for batch jobs

Disadvantages:
• Applications must expose endpoints
• Firewall configuration complexity
• Not ideal for short-lived processes

Hybrid Approach:
• Use push for ephemeral workloads
• Use pull for long-running services
• Gateway for batch jobs (Prometheus Pushgateway)
      </code></pre>
    </div>

    <h4>2. Monitoring Stack Architecture</h4>
    <div class="code-block">
      <div class="code-label">MONITORING STACK</div>
      <pre><code>
                    ┌─────────────────┐
                    │   Dashboards    │
                    │ (Grafana/Kibana)│
                    └─────────────────┘
                            │
                    ┌─────────────────┐
                    │   Query Layer   │
                    │ (PromQL/Lucene) │
                    └─────────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Metrics DB    │ │    Logs DB      │ │   Traces DB     │
│ (Prometheus)    │ │ (Elasticsearch) │ │   (Jaeger)      │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                  │                  │
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Metrics Agent  │ │   Log Agent     │ │  Trace Agent    │
│ (Node Exporter) │ │  (Fluentd)      │ │ (Jaeger Agent)  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                  │                  │
         └──────────────────┼──────────────────┘
                            │
                    ┌─────────────────┐
                    │   Application   │
                    │    Services     │
                    └─────────────────┘

Data Flow:
1. Applications emit telemetry data
2. Agents collect and forward data
3. Storage systems persist data
4. Query layer provides unified access
5. Dashboards visualize data
      </code></pre>
    </div>

    <h3>Alerting Strategy & Implementation</h3>
    
    <h4>Alert Severity Levels</h4>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Severity</th>
        <th style="padding: 12px; text-align: left;">Definition</th>
        <th style="padding: 12px; text-align: left;">Response Time</th>
        <th style="padding: 12px; text-align: left;">Escalation</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Critical</strong></td>
        <td style="padding: 10px;">Service down, data loss</td>
        <td style="padding: 10px;">Immediate (< 5 min)</td>
        <td style="padding: 10px;">Page on-call, wake up</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>High</strong></td>
        <td style="padding: 10px;">Performance degradation</td>
        <td style="padding: 10px;">< 15 minutes</td>
        <td style="padding: 10px;">Slack/email notification</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Medium</strong></td>
        <td style="padding: 10px;">Potential issues</td>
        <td style="padding: 10px;">< 1 hour</td>
        <td style="padding: 10px;">Email notification</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Low</strong></td>
        <td style="padding: 10px;">Informational</td>
        <td style="padding: 10px;">Next business day</td>
        <td style="padding: 10px;">Dashboard/ticket</td>
      </tr>
    </table>

    <h4>Alert Rule Design</h4>
    <div class="code-block">
      <div class="code-label">PROMETHEUS ALERTING RULES</div>
      <pre><code>
# High error rate alert
groups:
- name: api_alerts
  rules:
  - alert: HighErrorRate
    expr: |
      (
        rate(http_requests_total{status=~"5.."}[5m]) /
        rate(http_requests_total[5m])
      ) > 0.05
    for: 5m
    labels:
      severity: critical
      service: api
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value | humanizePercentage }} for service {{ $labels.service }}"
      runbook_url: "https://wiki.company.com/runbooks/high-error-rate"

  - alert: HighLatency
    expr: |
      histogram_quantile(0.95,
        rate(http_request_duration_seconds_bucket[5m])
      ) > 0.5
    for: 10m
    labels:
      severity: warning
      service: api
    annotations:
      summary: "High latency detected"
      description: "95th percentile latency is {{ $value }}s"

  - alert: LowDiskSpace
    expr: |
      (
        node_filesystem_avail_bytes{fstype!="tmpfs"} /
        node_filesystem_size_bytes{fstype!="tmpfs"}
      ) < 0.1
    for: 5m
    labels:
      severity: warning
      team: infrastructure
    annotations:
      summary: "Low disk space on {{ $labels.instance }}"
      description: "Disk usage is above 90% on {{ $labels.device }}"

Alert Rule Best Practices:
• Use appropriate time windows (5m for errors, 10m for latency)
• Set meaningful thresholds based on SLOs
• Include context in annotations
• Link to runbooks for resolution steps
• Avoid alert storms with proper grouping
      </code></pre>
    </div>

    <h3>Service Level Objectives (SLOs)</h3>
    
    <h4>SLO Framework</h4>
    <div class="code-block">
      <div class="code-label">SLO DEFINITION</div>
      <pre><code>
SLO Components:
• SLI (Service Level Indicator): Quantitative measure
• SLO (Service Level Objective): Target value for SLI
• SLA (Service Level Agreement): Business contract
• Error Budget: Acceptable failure rate

Example SLOs:
Service: E-commerce API
• Availability: 99.9% uptime (43.2 minutes downtime/month)
• Latency: 95% of requests < 200ms
• Error Rate: < 0.1% of requests result in 5xx errors
• Throughput: Handle 10,000 RPS during peak hours

Error Budget Calculation:
Monthly Error Budget = (1 - SLO) × Total Requests
• 99.9% availability = 0.1% error budget
• 1M requests/month = 1,000 allowed errors
• Error budget consumed = Actual errors / Allowed errors

Burn Rate Alerts:
• Fast burn: 2% of monthly budget in 1 hour
• Medium burn: 5% of monthly budget in 6 hours
• Slow burn: 10% of monthly budget in 3 days

Multi-window alerting:
if (
  error_rate_1h > 14.4 * slo_target and
  error_rate_5m > 14.4 * slo_target
) then alert("fast burn")
      </code></pre>
    </div>

    <h3>Popular Monitoring Tools & Platforms</h3>
    
    <h4>Open Source Stack</h4>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Tool</th>
        <th style="padding: 12px; text-align: left;">Purpose</th>
        <th style="padding: 12px; text-align: left;">Strengths</th>
        <th style="padding: 12px; text-align: left;">Scale</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Prometheus</strong></td>
        <td style="padding: 10px;">Metrics collection & storage</td>
        <td style="padding: 10px;">Pull model, powerful queries</td>
        <td style="padding: 10px;">Millions of metrics</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Grafana</strong></td>
        <td style="padding: 10px;">Visualization & dashboards</td>
        <td style="padding: 10px;">Beautiful dashboards, multi-source</td>
        <td style="padding: 10px;">Thousands of dashboards</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Elasticsearch</strong></td>
        <td style="padding: 10px;">Log storage & search</td>
        <td style="padding: 10px;">Full-text search, scalable</td>
        <td style="padding: 10px;">Petabytes of logs</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Jaeger</strong></td>
        <td style="padding: 10px;">Distributed tracing</td>
        <td style="padding: 10px;">OpenTracing compatible</td>
        <td style="padding: 10px;">Millions of spans/day</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>AlertManager</strong></td>
        <td style="padding: 10px;">Alert routing & management</td>
        <td style="padding: 10px;">Deduplication, grouping</td>
        <td style="padding: 10px;">Thousands of alerts</td>
      </tr>
    </table>

    <h4>Commercial Platforms</h4>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Platform</th>
        <th style="padding: 12px; text-align: left;">Strengths</th>
        <th style="padding: 12px; text-align: left;">Use Cases</th>
        <th style="padding: 12px; text-align: left;">Pricing Model</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>DataDog</strong></td>
        <td style="padding: 10px;">All-in-one, easy setup</td>
        <td style="padding: 10px;">Full-stack monitoring</td>
        <td style="padding: 10px;">Per host/metric</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>New Relic</strong></td>
        <td style="padding: 10px;">APM, code-level insights</td>
        <td style="padding: 10px;">Application performance</td>
        <td style="padding: 10px;">Per host/user</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Splunk</strong></td>
        <td style="padding: 10px;">Log analysis, SIEM</td>
        <td style="padding: 10px;">Security, compliance</td>
        <td style="padding: 10px;">Per GB ingested</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Dynatrace</strong></td>
        <td style="padding: 10px;">AI-powered, auto-discovery</td>
        <td style="padding: 10px;">Enterprise monitoring</td>
        <td style="padding: 10px;">Per host/user</td>
      </tr>
    </table>

    <h3>Real-World Monitoring Examples</h3>
    
    <h4>High-Scale Production Systems</h4>
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="background-color: #f5f5f5;">
        <th style="padding: 12px; text-align: left;">Company</th>
        <th style="padding: 12px; text-align: left;">Scale</th>
        <th style="padding: 12px; text-align: left;">Monitoring Strategy</th>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Netflix</strong></td>
        <td style="padding: 10px;">15+ petabytes/month streaming</td>
        <td style="padding: 10px;">Custom tools (Atlas), real-time anomaly detection</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Google</strong></td>
        <td style="padding: 10px;">8.5B searches/day</td>
        <td style="padding: 10px;">Borgmon → Monarch, SRE practices</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Amazon</strong></td>
        <td style="padding: 10px;">Millions of servers</td>
        <td style="padding: 10px;">CloudWatch, X-Ray, custom solutions</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Uber</strong></td>
        <td style="padding: 10px;">15M trips/day</td>
        <td style="padding: 10px;">M3 (metrics), Jaeger (tracing)</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>Airbnb</strong></td>
        <td style="padding: 10px;">4M listings globally</td>
        <td style="padding: 10px;">DataDog, custom dashboards</td>
      </tr>
    </table>

    <h4>Monitoring Cost Optimization</h4>
    <div class="code-block">
      <div class="code-label">COST OPTIMIZATION STRATEGIES</div>
      <pre><code>
Data Retention Policies:
• High-resolution (1s): 24 hours
• Medium-resolution (1m): 7 days
• Low-resolution (5m): 30 days
• Archive (1h): 1 year

Metric Cardinality Management:
• Limit label values (user_id → user_type)
• Use recording rules for expensive queries
• Drop unnecessary metrics at ingestion
• Implement metric quotas per service

Log Volume Reduction:
• Sampling: 10% of debug logs, 100% of errors
• Filtering: Drop health check logs
• Compression: Use structured logging
• Aggregation: Pre-aggregate common queries

Storage Optimization:
• Prometheus: 1-2 bytes per sample
• Elasticsearch: 500-1000 bytes per log entry
• Jaeger: 1KB per span average
• Use compression and retention policies

Cost Examples:
• DataDog: $15/host/month + $0.10/100 custom metrics
• New Relic: $25/host/month for infrastructure
• Splunk: $150/GB/month for log ingestion
• Self-hosted: $5-10/host/month (infrastructure only)
      </code></pre>
    </div>

    <h3>Monitoring Best Practices</h3>
    
    <h4>Implementation Guidelines</h4>
    <ul>
      <li><strong>Start with Golden Signals:</strong> Focus on latency, traffic, errors, saturation</li>
      <li><strong>Instrument Early:</strong> Add monitoring during development, not after issues</li>
      <li><strong>Use Consistent Naming:</strong> Standardize metric and label names across services</li>
      <li><strong>Monitor the Monitoring:</strong> Ensure monitoring infrastructure is reliable</li>
      <li><strong>Actionable Alerts Only:</strong> Every alert should require human action</li>
      <li><strong>Documentation:</strong> Maintain runbooks for all alerts</li>
      <li><strong>Regular Review:</strong> Periodically review and tune alerts</li>
    </ul>

    <h4>Common Anti-Patterns</h4>
    <ul>
      <li><strong>Alert Fatigue:</strong> Too many non-actionable alerts</li>
      <li><strong>Monitoring Everything:</strong> Collecting metrics without purpose</li>
      <li><strong>No Context:</strong> Alerts without enough information to act</li>
      <li><strong>Single Point of Failure:</strong> Monitoring system not redundant</li>
      <li><strong>Ignoring Costs:</strong> Unlimited metric collection</li>
      <li><strong>Tool Sprawl:</strong> Too many monitoring tools without integration</li>
    </ul>

    <h3>Interview Questions & Answers</h3>
    
    <h4>Fundamental Questions</h4>
    <div class="qa-section">
      <div class="question">
        <strong>Q: What are the four golden signals of monitoring?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> The four golden signals are:
        <br>1. <strong>Latency:</strong> Time to process requests (P95, P99 percentiles)
        <br>2. <strong>Traffic:</strong> Rate of requests (RPS, QPS)
        <br>3. <strong>Errors:</strong> Rate of failed requests (4xx, 5xx errors)
        <br>4. <strong>Saturation:</strong> Resource utilization (CPU, memory, disk, network)
        <br>These provide comprehensive coverage of system health and user experience.
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: Explain the difference between monitoring and observability.</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Key differences:
        <br>• <strong>Monitoring:</strong> Watching known failure modes, predefined dashboards
        <br>• <strong>Observability:</strong> Understanding system behavior from outputs, exploratory analysis
        <br>• <strong>Monitoring:</strong> "Is the system working?" (known unknowns)
        <br>• <strong>Observability:</strong> "Why is the system not working?" (unknown unknowns)
        <br>• <strong>Tools:</strong> Monitoring uses dashboards/alerts, observability uses traces/logs/metrics together
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: How would you design a monitoring system for a microservices architecture?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Key components:
        <br>• <strong>Service Mesh:</strong> Automatic metrics collection (Istio, Linkerd)
        <br>• <strong>Distributed Tracing:</strong> Request flow across services (Jaeger, Zipkin)
        <br>• <strong>Centralized Logging:</strong> Structured logs with correlation IDs
        <br>• <strong>Service Discovery:</strong> Dynamic service registration and health checks
        <br>• <strong>Circuit Breakers:</strong> Prevent cascade failures
        <br>• <strong>SLOs per Service:</strong> Individual service reliability targets
        <br>• <strong>Dependency Mapping:</strong> Understand service relationships
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: What is the difference between push and pull monitoring models?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Comparison:
        <br>• <strong>Push Model:</strong> Applications send metrics to monitoring system
        <br>• <strong>Pull Model:</strong> Monitoring system scrapes metrics from applications
        <br>• <strong>Push Pros:</strong> Real-time, good for ephemeral workloads, simpler networking
        <br>• <strong>Pull Pros:</strong> Better health checking, easier debugging, monitoring system controls rate
        <br>• <strong>Examples:</strong> StatsD/DataDog (push), Prometheus (pull)
        <br>• <strong>Hybrid:</strong> Use both based on workload characteristics
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: How do you prevent alert fatigue?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Strategies:
        <br>• <strong>Actionable Alerts:</strong> Only alert on issues requiring human intervention
        <br>• <strong>Proper Thresholds:</strong> Set thresholds based on SLOs, not arbitrary values
        <br>• <strong>Alert Grouping:</strong> Group related alerts to reduce noise
        <br>• <strong>Escalation Policies:</strong> Different severity levels with appropriate response times
        <br>• <strong>Regular Review:</strong> Periodically review and tune alert rules
        <br>• <strong>Runbooks:</strong> Clear documentation for alert resolution
        <br>• <strong>Suppress Known Issues:</strong> Temporarily silence alerts during maintenance
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: What are SLIs, SLOs, and SLAs?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Definitions:
        <br>• <strong>SLI (Service Level Indicator):</strong> Quantitative measure of service performance
        <br>• <strong>SLO (Service Level Objective):</strong> Target value for SLI (internal goal)
        <br>• <strong>SLA (Service Level Agreement):</strong> Contract with consequences (external promise)
        <br>• <strong>Example:</strong> SLI=response time, SLO=95% < 200ms, SLA=99% uptime or refund
        <br>• <strong>Error Budget:</strong> Acceptable failure rate = (1 - SLO)
        <br>• <strong>Relationship:</strong> SLA ≤ SLO (internal targets stricter than external promises)
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: How would you monitor a database system?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Key metrics:
        <br>• <strong>Query Performance:</strong> Query execution time, slow query log
        <br>• <strong>Connection Pool:</strong> Active connections, connection wait time
        <br>• <strong>Resource Usage:</strong> CPU, memory, disk I/O, network
        <br>• <strong>Replication Lag:</strong> Master-slave delay, replication errors
        <br>• <strong>Lock Contention:</strong> Lock wait time, deadlocks
        <br>• <strong>Cache Hit Ratio:</strong> Buffer pool efficiency
        <br>• <strong>Backup Status:</strong> Backup success/failure, recovery time
        <br>• <strong>Disk Space:</strong> Data file growth, log file size
      </div>
    </div>

    <div class="qa-section">
      <div class="question">
        <strong>Q: What is distributed tracing and why is it important?</strong>
      </div>
      <div class="answer">
        <strong>A:</strong> Distributed tracing:
        <br>• <strong>Definition:</strong> Tracks requests across multiple services
        <br>• <strong>Components:</strong> Traces (requests), spans (operations), trace ID (correlation)
        <br>• <strong>Benefits:</strong> Identify bottlenecks, understand dependencies, debug failures
        <br>• <strong>Challenges:</strong> Performance overhead, sampling strategy, data volume
        <br>• <strong>Tools:</strong> Jaeger, Zipkin, AWS X-Ray, Google Cloud Trace
        <br>• <strong>Implementation:</strong> Instrument code, propagate trace context, visualize traces
        <br>• <strong>Best Practices:</strong> Use sampling, add semantic tags, correlate with logs
      </div>
    </div>

    <h3>Related Concepts</h3>
    <ul>
      <li><strong>Site Reliability Engineering (SRE):</strong> Google's approach to monitoring and reliability</li>
      <li><strong>Chaos Engineering:</strong> Proactive failure testing to improve monitoring</li>
      <li><strong>Performance Testing:</strong> Load testing to understand system limits</li>
      <li><strong>Incident Response:</strong> Structured approach to handling alerts and outages</li>
      <li><strong>Capacity Planning:</strong> Using monitoring data to predict resource needs</li>
      <li><strong>DevOps:</strong> Monitoring as part of development and operations integration</li>
    </ul>
  `
}; 