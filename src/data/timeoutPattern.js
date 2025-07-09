export const timeoutPattern = {
  id: 'timeout-pattern',
  title: 'Timeout Pattern',
  content: `
<h2>Definition</h2>
<p>The Timeout pattern sets a maximum time limit for operations to complete, preventing indefinite blocking and resource exhaustion.</p>

<h2>Types of Timeouts</h2>
<ul>
  <li><strong>Connection Timeout</strong>: Time to establish connection</li>
  <li><strong>Read Timeout</strong>: Time to read response after connection</li>
  <li><strong>Write Timeout</strong>: Time to write request data</li>
  <li><strong>Request Timeout</strong>: Total time for entire request</li>
  <li><strong>Idle Timeout</strong>: Time before closing idle connections</li>
</ul>

<h2>Benefits</h2>
<ul>
  <li><strong>Resource Protection</strong>: Prevent resource exhaustion</li>
  <li><strong>Predictable Behavior</strong>: Known maximum wait times</li>
  <li><strong>Better User Experience</strong>: Avoid hanging operations</li>
  <li><strong>System Stability</strong>: Prevent cascade failures</li>
  <li><strong>Debugging</strong>: Easier to identify slow operations</li>
</ul>

<h2>Implementation Strategies</h2>
<ul>
  <li><strong>Socket Timeouts</strong>: Network-level timeouts</li>
  <li><strong>HTTP Client Timeouts</strong>: Request/response timeouts</li>
  <li><strong>Database Query Timeouts</strong>: SQL execution limits</li>
  <li><strong>Thread Pool Timeouts</strong>: Task execution limits</li>
  <li><strong>Application-level Timeouts</strong>: Business logic timeouts</li>
</ul>

<h2>Timeout Configuration</h2>
<ul>
  <li><strong>Conservative</strong>: Longer timeouts for reliability</li>
  <li><strong>Aggressive</strong>: Shorter timeouts for responsiveness</li>
  <li><strong>Adaptive</strong>: Dynamic timeouts based on conditions</li>
  <li><strong>Layered</strong>: Different timeouts at different levels</li>
</ul>

<h2>Handling Timeout Failures</h2>
<ul>
  <li><strong>Graceful Degradation</strong>: Fallback to cached data</li>
  <li><strong>Retry with Backoff</strong>: Retry with longer timeouts</li>
  <li><strong>Circuit Breaker</strong>: Stop requests after timeouts</li>
  <li><strong>User Notification</strong>: Inform users of delays</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li><strong>Set Appropriate Timeouts</strong>: Balance reliability vs responsiveness</li>
  <li><strong>Hierarchical Timeouts</strong>: Shorter timeouts at lower levels</li>
  <li><strong>Monitoring</strong>: Track timeout occurrences</li>
  <li><strong>Graceful Handling</strong>: Proper cleanup on timeout</li>
  <li><strong>Documentation</strong>: Clear timeout policies</li>
</ul>

<h2>Common Timeout Values</h2>
<ul>
  <li><strong>DNS Resolution</strong>: 5-30 seconds</li>
  <li><strong>HTTP Requests</strong>: 30-60 seconds</li>
  <li><strong>Database Queries</strong>: 30-300 seconds</li>
  <li><strong>File Operations</strong>: 30-120 seconds</li>
  <li><strong>Network Connections</strong>: 5-30 seconds</li>
</ul>

<h2>Related Patterns</h2>
<ul>
  <li><strong>Circuit Breaker</strong>: Fail fast after timeouts</li>
  <li><strong>Retry Pattern</strong>: Retry with adjusted timeouts</li>
  <li><strong>Bulkhead Pattern</strong>: Isolate timeout-prone operations</li>
</ul>

<h2>Monitoring and Alerting</h2>
<ul>
  <li><strong>Timeout Frequency</strong>: Track timeout occurrences</li>
  <li><strong>Operation Duration</strong>: Monitor operation times</li>
  <li><strong>Success Rate</strong>: Measure completion rates</li>
  <li><strong>Performance Trends</strong>: Identify degradation patterns</li>
</ul>

<h2>Interview Questions</h2>
<div class="interview-qa">
  <h3>Q: How do you determine appropriate timeout values?</h3>
  <p><strong>A:</strong> Consider operation complexity, network conditions, user expectations, and system capacity while monitoring actual performance patterns.</p>
</div>
`
}; 