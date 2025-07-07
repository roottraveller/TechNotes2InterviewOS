export const httpVersions = {
  id: 'http-versions',
  title: 'HTTP Versions (HTTP/1.0 to HTTP/3.0)',
  content: `
    <h2>HTTP Versions Evolution</h2>
    <p>The evolution of HTTP from version 1.0 to 3.0 represents significant improvements in web performance, addressing issues like connection overhead, head-of-line blocking, and latency.</p>

    <h3>HTTP 1.0 (1996)</h3>
    <p>Each request to the server required a new TCP connection. No persistent connections were allowed, resulting in increased latency and overhead due to repeated connection establishment.</p>

    <h4>HTTP 1.0 Characteristics</h4>
    <ul>
      <li><strong>One Request per Connection:</strong> TCP connection closed after each request</li>
      <li><strong>No Persistent Connections:</strong> High overhead from repeated handshakes</li>
      <li><strong>No Host Header:</strong> One IP address could only serve one website</li>
      <li><strong>Simple:</strong> Easy to implement but inefficient</li>
    </ul>

    <h3>HTTP 1.1 (1997)</h3>
    <p>Introduced persistent connections, allowing a single TCP connection to be reused for multiple requests. However, it did not fully address HOL (Head-of-Line) blocking issues, as subsequent requests still had to wait for earlier ones to complete on the same connection. HTTP is primarily unidirectional with workarounds for bidirectional communication.</p>

    <h4>HTTP 1.1 Improvements</h4>
    <ul>
      <li><strong>Persistent Connections:</strong> Keep-Alive by default</li>
      <li><strong>Pipelining:</strong> Send multiple requests without waiting (rarely used)</li>
      <li><strong>Host Header:</strong> Virtual hosting support</li>
      <li><strong>Chunked Transfer:</strong> Stream responses without knowing size</li>
      <li><strong>Cache Control:</strong> Better caching mechanisms</li>
    </ul>

    <h4>HTTP 1.1 Problems</h4>
    <ul>
      <li><strong>Head-of-Line Blocking:</strong> Requests must complete in order</li>
      <li><strong>Limited Parallelism:</strong> Browsers open multiple connections (6-8)</li>
      <li><strong>Redundant Headers:</strong> Headers sent with every request</li>
      <li><strong>Text Protocol:</strong> Inefficient parsing</li>
    </ul>

    <h3>HTTP 2.0 (2015)</h3>
    <p>Addressed HOL blocking through request multiplexing, allowing multiple HTTP exchanges (streams) to be multiplexed onto a single TCP connection. This eliminated HOL blocking at the application layer by enabling parallel processing of requests within the same connection. However, HOL blocking still persisted at the transport (TCP) layer, as a single slow request could delay the transmission of other requests on the same connection. HTTP/2 is designed to support native bidirectional communication.</p>

    <h4>HTTP/2 Key Features</h4>
    <ul>
      <li><strong>Binary Protocol:</strong> More efficient parsing and less error-prone</li>
      <li><strong>Multiplexing:</strong> Multiple streams over single connection</li>
      <li><strong>Header Compression:</strong> HPACK compression reduces overhead</li>
      <li><strong>Server Push:</strong> Proactively send resources to client</li>
      <li><strong>Stream Prioritization:</strong> Control resource delivery order</li>
    </ul>

    <h4>Multiplexing in HTTP/2</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>HTTP/1.1 (Sequential):
Connection 1: [Request A]---->[Response A]---->[Request B]---->[Response B]
Connection 2: [Request C]---->[Response C]---->[Request D]---->[Response D]

HTTP/2 (Multiplexed):
Connection 1: [Req A][Req B][Req C]---->[Res B][Res A][Res C]
              All requests can be sent immediately
              Responses can arrive in any order</code></pre>
    </div>

    <h3>HTTP 3.0 (2020, draft)</h3>
    <p>Proposed successor to HTTP 2.0, aiming to further improve performance and address HOL blocking issues. Utilizes QUIC (Quick UDP Internet Connections) instead of TCP as the underlying transport protocol. QUIC operates at the transport layer and is designed to provide better performance, particularly for connections with high latency or packet loss.</p>

    <h4>HTTP/3 Key Features</h4>
    <ul>
      <li><strong>QUIC Protocol:</strong> Built on UDP instead of TCP</li>
      <li><strong>0-RTT Connection:</strong> Resume connections instantly</li>
      <li><strong>No TCP HOL Blocking:</strong> Packet loss affects only one stream</li>
      <li><strong>Connection Migration:</strong> Survive network changes (WiFi to cellular)</li>
      <li><strong>Built-in Encryption:</strong> TLS 1.3 mandatory</li>
    </ul>

    <h3>Head-of-Line (HOL) Blocking</h3>
    
    <h4>Application Layer HOL (HTTP/1.1)</h4>
    <ul>
      <li>Requests must be processed in order sent</li>
      <li>Slow response blocks all subsequent responses</li>
      <li>Browsers work around with multiple connections</li>
    </ul>

    <h4>Transport Layer HOL (HTTP/2)</h4>
    <ul>
      <li>TCP ensures in-order delivery</li>
      <li>Lost packet blocks all streams</li>
      <li>Even unrelated streams are affected</li>
    </ul>

    <h4>Solution in HTTP/3</h4>
    <ul>
      <li>QUIC handles streams independently</li>
      <li>Lost packet only affects its stream</li>
      <li>Other streams continue unaffected</li>
    </ul>

    <h3>Performance Comparison</h3>
    
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>HTTP/1.1</th>
          <th>HTTP/2</th>
          <th>HTTP/3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Protocol</strong></td>
          <td>Text</td>
          <td>Binary</td>
          <td>Binary</td>
        </tr>
        <tr>
          <td><strong>Transport</strong></td>
          <td>TCP</td>
          <td>TCP</td>
          <td>QUIC (UDP)</td>
        </tr>
        <tr>
          <td><strong>Multiplexing</strong></td>
          <td>No</td>
          <td>Yes</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td><strong>Header Compression</strong></td>
          <td>No</td>
          <td>HPACK</td>
          <td>QPACK</td>
        </tr>
        <tr>
          <td><strong>Server Push</strong></td>
          <td>No</td>
          <td>Yes</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td><strong>HOL Blocking</strong></td>
          <td>Application</td>
          <td>Transport</td>
          <td>None</td>
        </tr>
        <tr>
          <td><strong>Connection Setup</strong></td>
          <td>1.5 RTT</td>
          <td>1.5 RTT</td>
          <td>0-1 RTT</td>
        </tr>
      </tbody>
    </table>

    <h3>QUIC Protocol Features</h3>
    
    <h4>Connection Establishment</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>TCP + TLS (HTTP/2):
1. TCP SYN
2. TCP SYN-ACK
3. TCP ACK
4. TLS ClientHello
5. TLS ServerHello
6. TLS Finished
Total: 3 RTT for new connection

QUIC (HTTP/3):
1. QUIC Initial (includes TLS ClientHello)
2. QUIC Handshake (includes TLS ServerHello)
Total: 1 RTT for new connection
      0 RTT for resumed connection</code></pre>
    </div>

    <h4>Stream Management</h4>
    <ul>
      <li><strong>Independent Streams:</strong> No inter-stream dependencies</li>
      <li><strong>Bidirectional:</strong> Client and server initiated streams</li>
      <li><strong>Flow Control:</strong> Per-stream and connection level</li>
      <li><strong>Lightweight:</strong> Minimal overhead for new streams</li>
    </ul>

    <h3>Migration Considerations</h3>
    
    <h4>HTTP/1.1 to HTTP/2</h4>
    <ul>
      <li>Transparent to applications</li>
      <li>Same URL structure</li>
      <li>Negotiate via ALPN</li>
      <li>Fallback to HTTP/1.1 if needed</li>
    </ul>

    <h4>HTTP/2 to HTTP/3</h4>
    <ul>
      <li>Alt-Svc header announces HTTP/3 support</li>
      <li>Client tries QUIC on next connection</li>
      <li>Fallback to HTTP/2 if QUIC fails</li>
      <li>May require firewall configuration (UDP)</li>
    </ul>

    <h3>Best Practices</h3>
    
    <h4>For HTTP/2</h4>
    <ul>
      <li><strong>Reduce Connections:</strong> Use single connection per origin</li>
      <li><strong>Avoid Domain Sharding:</strong> No longer beneficial</li>
      <li><strong>Use Server Push Wisely:</strong> Only for critical resources</li>
      <li><strong>Optimize for Multiplexing:</strong> Many small requests are fine</li>
    </ul>

    <h4>For HTTP/3</h4>
    <ul>
      <li><strong>Enable Fallback:</strong> Support HTTP/2 as backup</li>
      <li><strong>Monitor UDP:</strong> Ensure firewalls allow QUIC</li>
      <li><strong>Test Thoroughly:</strong> New protocol may have issues</li>
      <li><strong>Use 0-RTT Carefully:</strong> Replay attack considerations</li>
    </ul>

    <h3>Browser and Server Support</h3>
    
    <h4>HTTP/2 Support</h4>
    <ul>
      <li>All modern browsers</li>
      <li>Nginx, Apache, IIS</li>
      <li>CDNs: Cloudflare, Akamai, Fastly</li>
      <li>~95% of web traffic capable</li>
    </ul>

    <h4>HTTP/3 Support</h4>
    <ul>
      <li>Chrome, Firefox, Safari (recent versions)</li>
      <li>Nginx (with patches), LiteSpeed</li>
      <li>Cloudflare, Google, Facebook</li>
      <li>Growing adoption (~25% of web traffic)</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://blog.bytebytego.com/p/http1-vs-http2-vs-http3-a-deep-dive" target="_blank">HTTP/1 vs HTTP/2 vs HTTP/3 - ByteByteGo</a></li>
    </ul>
  `
}; 