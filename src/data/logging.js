export const logging = {
  id: 'logging',
  title: 'Logging',
  content: `
<h2>Definition</h2>
<p>Logging is the practice of recording events, errors, and information during application execution for debugging, monitoring, and auditing purposes.</p>

<h2>Log Levels</h2>
<ul>
  <li><strong>TRACE</strong>: Finest-grained informational events</li>
  <li><strong>DEBUG</strong>: Detailed information for diagnosing problems</li>
  <li><strong>INFO</strong>: General information about application flow</li>
  <li><strong>WARN</strong>: Potentially harmful situations</li>
  <li><strong>ERROR</strong>: Error events that allow application to continue</li>
  <li><strong>FATAL</strong>: Severe errors that may cause application to terminate</li>
</ul>

<h2>Log Components</h2>
<ul>
  <li><strong>Timestamp</strong>: When the event occurred</li>
  <li><strong>Level</strong>: Severity of the log message</li>
  <li><strong>Logger Name</strong>: Source component or class</li>
  <li><strong>Message</strong>: Human-readable description</li>
  <li><strong>Context</strong>: Additional metadata (user ID, request ID)</li>
  <li><strong>Stack Trace</strong>: Error details for exceptions</li>
</ul>

<h2>Structured Logging</h2>
<ul>
  <li><strong>JSON Format</strong>: Machine-readable log format</li>
  <li><strong>Key-Value Pairs</strong>: Structured data fields</li>
  <li><strong>Consistent Schema</strong>: Standardized log structure</li>
  <li><strong>Searchable</strong>: Easy to query and analyze</li>
</ul>

<h2>Log Aggregation</h2>
<ul>
  <li><strong>Centralized Logging</strong>: Collect logs from multiple sources</li>
  <li><strong>ELK Stack</strong>: Elasticsearch, Logstash, Kibana</li>
  <li><strong>Fluentd</strong>: Log collection and forwarding</li>
  <li><strong>Splunk</strong>: Enterprise log management</li>
  <li><strong>Cloud Solutions</strong>: AWS CloudWatch, Google Cloud Logging</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li><strong>Appropriate Log Levels</strong>: Use correct severity levels</li>
  <li><strong>Meaningful Messages</strong>: Clear, actionable information</li>
  <li><strong>Avoid Sensitive Data</strong>: Don't log passwords, tokens</li>
  <li><strong>Performance Impact</strong>: Minimize logging overhead</li>
  <li><strong>Log Rotation</strong>: Manage log file sizes</li>
  <li><strong>Correlation IDs</strong>: Track requests across services</li>
</ul>

<h2>Distributed Tracing</h2>
<ul>
  <li><strong>Trace ID</strong>: Unique identifier for request flow</li>
  <li><strong>Span ID</strong>: Individual operation within trace</li>
  <li><strong>Parent-Child Relationships</strong>: Service call hierarchy</li>
  <li><strong>Sampling</strong>: Reduce trace volume for performance</li>
</ul>

<h2>Security Considerations</h2>
<ul>
  <li><strong>Log Injection</strong>: Sanitize user input in logs</li>
  <li><strong>Access Control</strong>: Restrict log access</li>
  <li><strong>Retention Policies</strong>: Define log storage duration</li>
  <li><strong>Encryption</strong>: Secure log transmission and storage</li>
</ul>

<h2>Common Logging Libraries</h2>
<ul>
  <li><strong>Log4j</strong>: Java logging framework</li>
  <li><strong>Logback</strong>: Java logging with SLF4J</li>
  <li><strong>Winston</strong>: Node.js logging library</li>
  <li><strong>Python Logging</strong>: Built-in Python logging</li>
  <li><strong>Serilog</strong>: .NET structured logging</li>
</ul>

<h2>Monitoring and Alerting</h2>
<ul>
  <li><strong>Error Rate Monitoring</strong>: Track error log frequency</li>
  <li><strong>Log-based Alerts</strong>: Trigger alerts on log patterns</li>
  <li><strong>Anomaly Detection</strong>: Identify unusual log patterns</li>
  <li><strong>Dashboard Creation</strong>: Visualize log metrics</li>
</ul>

<h2>Interview Questions</h2>
<div class="interview-qa">
  <h3>Q: What's the difference between logging and monitoring?</h3>
  <p><strong>A:</strong> Logging records discrete events and messages, while monitoring continuously measures system metrics and performance indicators.</p>
</div>
`
}; 