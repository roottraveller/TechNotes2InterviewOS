export const unixEpoch = {
  id: 'unix-epoch',
  title: 'Unix Epoch',
  content: `
<p>The Unix epoch is the starting point for Unix time measurement, representing <strong>00:00:00 Coordinated Universal Time (UTC) on 1 January 1970</strong>. It serves as the foundation for time representation in most computer systems and is crucial for system design interviews.</p>
    
    <h3>Key Definitions</h3>
    <ul>
      <li><strong>Unix Epoch:</strong> 00:00:00 UTC on January 1, 1970</li>
      <li><strong>Unix Timestamp:</strong> Number of seconds elapsed since the Unix epoch</li>
      <li><strong>Also known as:</strong> POSIX time, Unix time, epoch time, or seconds since epoch</li>
      <li><strong>Representation:</strong> Typically stored as a signed integer (32-bit or 64-bit)</li>
    </ul>

    <h3>Technical Implementation</h3>
    
    <h4>Data Types and Storage</h4>
    <ul>
      <li><strong>32-bit signed integer:</strong> Range from December 13, 1901 to January 19, 2038</li>
      <li><strong>64-bit signed integer:</strong> Range extends to approximately 292 billion years</li>
      <li><strong>Precision:</strong> Standard Unix time has 1-second precision</li>
      <li><strong>Microseconds:</strong> Some systems extend to microsecond precision</li>
    </ul>

    <h4>Code Examples</h4>
    <div class="code-block">
      <h5>JavaScript</h5>
      <pre><code>// Get current Unix timestamp
const timestamp = Math.floor(Date.now() / 1000);
console.log(timestamp); // e.g., 1700000000

// Convert Unix timestamp to Date
const date = new Date(timestamp * 1000);
console.log(date.toISOString()); // 2023-11-14T22:13:20.000Z

// Convert Date to Unix timestamp
const unixTime = Math.floor(new Date().getTime() / 1000);</code></pre>
    </div>

    <div class="code-block">
      <h5>Python</h5>
      <pre><code>import time
from datetime import datetime

# Get current Unix timestamp
timestamp = int(time.time())
print(timestamp)  # e.g., 1700000000

# Convert Unix timestamp to datetime
dt = datetime.fromtimestamp(timestamp)
print(dt)  # 2023-11-14 22:13:20

# Convert datetime to Unix timestamp
unix_time = int(datetime.now().timestamp())</code></pre>
    </div>

    <div class="code-block">
      <h5>Java</h5>
      <pre><code>import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

// Get current Unix timestamp
long timestamp = Instant.now().getEpochSecond();
System.out.println(timestamp); // e.g., 1700000000

// Convert Unix timestamp to LocalDateTime
LocalDateTime dateTime = LocalDateTime.ofEpochSecond(
    timestamp, 0, ZoneOffset.UTC);
System.out.println(dateTime); // 2023-11-14T22:13:20</code></pre>
    </div>

    <h3>System Applications</h3>
    
    <h4>Operating Systems</h4>
    <ul>
      <li><strong>File Systems:</strong> File creation, modification, and access timestamps</li>
      <li><strong>Process Management:</strong> Process start times and CPU usage tracking</li>
      <li><strong>System Logs:</strong> Event timestamps in system and application logs</li>
      <li><strong>Scheduling:</strong> Cron jobs and task scheduling based on Unix time</li>
    </ul>

    <h4>Database Systems</h4>
    <ul>
      <li><strong>Timestamp Columns:</strong> Storing event times and record creation dates</li>
      <li><strong>Time-based Partitioning:</strong> Partitioning data by time ranges</li>
      <li><strong>TTL (Time To Live):</strong> Automatic data expiration based on timestamps</li>
      <li><strong>Replication:</strong> Ordering events in distributed database systems</li>
    </ul>

    <h4>Distributed Systems</h4>
    <ul>
      <li><strong>Event Ordering:</strong> Establishing chronological order of events</li>
      <li><strong>Cache Expiration:</strong> TTL-based cache invalidation</li>
      <li><strong>Rate Limiting:</strong> Time window-based request throttling</li>
      <li><strong>Monitoring:</strong> Metrics collection and time-series data</li>
    </ul>

    <h3>Critical Issues and Considerations</h3>
    
    <h4>Y2038 Problem (Year 2038 Bug)</h4>
    <div class="warning-note">
      <strong>⚠️ Critical Issue:</strong>
      <p>32-bit signed integers will overflow on <strong>January 19, 2038, at 03:14:07 UTC</strong>. After this point, timestamps will wrap around to negative values, causing system failures.</p>
      
      <h5>Impact:</h5>
      <ul>
        <li>Legacy systems using 32-bit time_t will fail</li>
        <li>Embedded systems and IoT devices at risk</li>
        <li>Financial systems and critical infrastructure affected</li>
        <li>Applications may crash or produce incorrect results</li>
      </ul>
      
      <h5>Solutions:</h5>
      <ul>
        <li>Migrate to 64-bit time_t (already done in most modern systems)</li>
        <li>Use alternative time representations for future dates</li>
        <li>Update legacy systems and embedded devices</li>
        <li>Implement proper testing for year 2038 scenarios</li>
      </ul>
    </div>

    <h4>Leap Seconds</h4>
    <ul>
      <li><strong>Issue:</strong> Unix time doesn't account for leap seconds</li>
      <li><strong>Impact:</strong> Can cause synchronization issues in distributed systems</li>
      <li><strong>Solution:</strong> Use UTC with leap second handling or GPS time</li>
    </ul>

    <h4>Time Zone Considerations</h4>
    <ul>
      <li><strong>Storage:</strong> Always store timestamps in UTC (Unix time is UTC-based)</li>
      <li><strong>Display:</strong> Convert to local time zones for user interfaces</li>
      <li><strong>DST:</strong> Handle Daylight Saving Time transitions properly</li>
      <li><strong>APIs:</strong> Use ISO 8601 format for human-readable timestamps</li>
    </ul>

    <h3>Best Practices for System Design</h3>
    
    <h4>Storage Recommendations</h4>
    <ul>
      <li><strong>Use 64-bit integers:</strong> Future-proof against Y2038 problem</li>
      <li><strong>Store in UTC:</strong> Avoid time zone complications</li>
      <li><strong>Include precision:</strong> Consider microseconds for high-precision needs</li>
      <li><strong>Indexing:</strong> Create indexes on timestamp columns for efficient queries</li>
    </ul>

    <h4>API Design</h4>
    <ul>
      <li><strong>Accept multiple formats:</strong> Unix timestamps and ISO 8601</li>
      <li><strong>Return consistent format:</strong> Standardize on one format for responses</li>
      <li><strong>Include timezone info:</strong> When returning human-readable times</li>
      <li><strong>Validation:</strong> Check for reasonable timestamp ranges</li>
    </ul>

    <h3>Common Interview Questions</h3>
    <div class="interview-questions">
      <h4>Q: Why was January 1, 1970 chosen as the Unix epoch?</h4>
      <p><strong>A:</strong> It was chosen as a "nice round number" that was recent enough to be relevant for computer systems at the time Unix was developed (late 1960s/early 1970s), but not so recent as to cause issues with representing earlier dates.</p>
      
      <h4>Q: How would you handle timestamps in a global distributed system?</h4>
      <p><strong>A:</strong> Store all timestamps in UTC using Unix time, use NTP for clock synchronization, implement logical clocks (vector clocks) for event ordering, and handle time zone conversion at the application layer for user display.</p>
      
      <h4>Q: What's the maximum date that can be represented with 32-bit Unix time?</h4>
      <p><strong>A:</strong> January 19, 2038, 03:14:07 UTC (2^31 - 1 seconds after the epoch).</p>
    </div>

    <h3>Notable Timestamps</h3>
    <div class="code-block">
      <pre><code>0          - January 1, 1970, 00:00:00 UTC (The Epoch)
86400      - January 2, 1970, 00:00:00 UTC (One day later)
1000000000 - September 9, 2001, 01:46:40 UTC (Billion seconds)
1234567890 - February 13, 2009, 23:31:30 UTC (Memorable number)
1500000000 - July 14, 2017, 02:40:00 UTC
1600000000 - September 13, 2020, 12:26:40 UTC
1700000000 - November 14, 2023, 22:13:20 UTC
2147483647 - January 19, 2038, 03:14:07 UTC (32-bit limit)</code></pre>
    </div>

    <h3>Tools and Utilities</h3>
    <ul>
      <li><strong>date command:</strong> Unix/Linux command for date/time operations</li>
      <li><strong>Online converters:</strong> epochconverter.com, unixtimestamp.com</li>
      <li><strong>Programming libraries:</strong> moment.js, datetime, java.time</li>
      <li><strong>Database functions:</strong> UNIX_TIMESTAMP(), FROM_UNIXTIME() in MySQL</li>
    </ul>

    <div class="reference-links">
      <h4>🔗 Learn More:</h4>
      <ul>
        <li><a href="https://en.wikipedia.org/wiki/Unix_time" target="_blank">Unix Time - Wikipedia</a></li>
        <li><a href="https://www.epochconverter.com/" target="_blank">Epoch Converter Tool</a></li>
        <li><a href="https://tools.ietf.org/html/rfc3339" target="_blank">RFC 3339 - Date and Time on the Internet</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Year_2038_problem" target="_blank">Year 2038 Problem - Wikipedia</a></li>
      </ul>
    </div>
`
}; 