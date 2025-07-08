export const websockets = {
  id: 'websockets',
  title: 'WebSockets',
  content: `
    <h2>WebSockets</h2>
    <p>WebSockets provide full-duplex communication channels over a single TCP connection, enabling real-time bidirectional data exchange between client and server with minimal overhead.</p>

    <h3>Core Characteristics</h3>
    <table>
      <tr>
        <th>Property</th>
        <th>WebSocket</th>
        <th>HTTP</th>
        <th>Impact</th>
      </tr>
      <tr>
        <td>Connection Type</td>
        <td>Persistent</td>
        <td>Request-Response</td>
        <td>Reduced connection overhead</td>
      </tr>
      <tr>
        <td>Communication</td>
        <td>Full-duplex</td>
        <td>Half-duplex</td>
        <td>Simultaneous bidirectional data flow</td>
      </tr>
      <tr>
        <td>Protocol Overhead</td>
        <td>2-4 bytes per frame</td>
        <td>~500-800 bytes per request</td>
        <td>99% reduction in overhead</td>
      </tr>
      <tr>
        <td>Latency</td>
        <td>~1-5ms</td>
        <td>~50-200ms</td>
        <td>Real-time communication</td>
      </tr>
      <tr>
        <td>Server Push</td>
        <td>Native support</td>
        <td>Requires polling/SSE</td>
        <td>Instant updates</td>
      </tr>
    </table>

    <h3>WebSocket Handshake Process</h3>
    <div class="code-block">
      <pre><code>WebSocket Handshake Flow:

1. Client HTTP Upgrade Request:
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Origin: https://example.com

2. Server Response:
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

3. Connection Established:
├── TCP connection remains open
├── HTTP protocol switches to WebSocket
├── Bidirectional communication begins
└── Frame-based data exchange

Frame Structure:
┌─────────────────────────────────────────────────────────────┐
│  FIN │ RSV │ Opcode │ MASK │ Payload Length │ Masking Key │
│  1bit│3bit │  4bit  │ 1bit │    7/16/64     │   32bit     │
└─────────────────────────────────────────────────────────────┘
│                    Payload Data                             │
└─────────────────────────────────────────────────────────────┘

Frame Types:
├── 0x0: Continuation frame
├── 0x1: Text frame (UTF-8)
├── 0x2: Binary frame
├── 0x8: Close frame
├── 0x9: Ping frame
└── 0xA: Pong frame

Security Features:
├── Origin validation
├── Sec-WebSocket-Key validation
├── Same-origin policy enforcement
├── CSRF protection through handshake
└── TLS support (wss://)

Performance Characteristics:
├── Handshake: One-time HTTP overhead
├── Frame overhead: 2-14 bytes vs 500+ bytes HTTP
├── No connection reestablishment
├── Reduced CPU usage on server
└── Lower network bandwidth consumption</code></pre>
    </div>

    <details>
      <summary><strong>Example: WhatsApp Real-time Messaging</strong></summary>
      <div class="info-note">
        WhatsApp uses WebSockets to handle 100+ billion messages daily across 2+ billion users. Their WebSocket implementation maintains persistent connections for instant message delivery, typing indicators, and presence status. The system handles 10+ million concurrent connections per server, with average message latency under 100ms globally. WhatsApp's WebSocket infrastructure includes automatic reconnection, message queuing during disconnections, and efficient binary protocol for media sharing. The platform achieves 99.9% message delivery reliability through WebSocket connection pooling and geographic distribution across 50+ data centers.
      </div>
    </details>

    <h3>WebSocket vs Alternative Technologies</h3>
    <table>
      <tr>
        <th>Technology</th>
        <th>Latency</th>
        <th>Overhead</th>
        <th>Complexity</th>
        <th>Use Case</th>
        <th>Limitations</th>
      </tr>
      <tr>
        <td>WebSocket</td>
        <td>1-5ms</td>
        <td>Very Low</td>
        <td>Medium</td>
        <td>Real-time bidirectional</td>
        <td>Firewall issues, scaling</td>
      </tr>
      <tr>
        <td>HTTP Polling</td>
        <td>1-30s</td>
        <td>Very High</td>
        <td>Low</td>
        <td>Periodic updates</td>
        <td>Resource waste, delays</td>
      </tr>
      <tr>
        <td>Server-Sent Events</td>
        <td>50-200ms</td>
        <td>Medium</td>
        <td>Low</td>
        <td>Server-to-client push</td>
        <td>Unidirectional only</td>
      </tr>
      <tr>
        <td>Long Polling</td>
        <td>100-500ms</td>
        <td>High</td>
        <td>Medium</td>
        <td>Near real-time</td>
        <td>Connection timeouts</td>
      </tr>
      <tr>
        <td>gRPC Streaming</td>
        <td>1-10ms</td>
        <td>Low</td>
        <td>High</td>
        <td>Service-to-service</td>
        <td>HTTP/2 dependency</td>
      </tr>
    </table>

    <h3>Implementation Patterns</h3>
    <div class="code-block">
      <pre><code>Client-Side Implementation:

// Basic WebSocket Connection
const socket = new WebSocket('wss://api.example.com/ws');

// Connection Management
socket.onopen = (event) => {
  console.log('Connected to WebSocket');
  socket.send(JSON.stringify({ type: 'auth', token: 'jwt_token' }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  handleMessage(data);
};

socket.onclose = (event) => {
  console.log('Connection closed:', event.code, event.reason);
  if (event.code !== 1000) {
    reconnect();
  }
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Reconnection Logic
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

function reconnect() {
  if (reconnectAttempts < maxReconnectAttempts) {
    const delay = Math.pow(2, reconnectAttempts) * 1000; // Exponential backoff
    setTimeout(() => {
      reconnectAttempts++;
      connectWebSocket();
    }, delay);
  }
}

// Message Queuing
const messageQueue = [];
let isConnected = false;

function sendMessage(message) {
  if (isConnected) {
    socket.send(JSON.stringify(message));
  } else {
    messageQueue.push(message);
  }
}

// Heartbeat/Ping-Pong
setInterval(() => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'ping' }));
  }
}, 30000);

Server-Side Implementation (Node.js):

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Connection handling
wss.on('connection', (ws, req) => {
  const clientId = generateClientId();
  
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    handleMessage(ws, message, clientId);
  });

  ws.on('close', () => {
    removeClient(clientId);
  });

  ws.on('pong', () => {
    ws.isAlive = true;
  });
});

// Heartbeat mechanism
setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      ws.terminate();
      return;
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

// Broadcasting
function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// Room-based messaging
const rooms = new Map();

function joinRoom(ws, roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId).add(ws);
  ws.roomId = roomId;
}

function broadcastToRoom(roomId, message) {
  const room = rooms.get(roomId);
  if (room) {
    room.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}</code></pre>
    </div>

    <h3>Scaling WebSocket Architecture</h3>
    <div class="code-block">
      <pre><code>Horizontal Scaling Challenges:

1. Connection Stickiness:
├── Problem: WebSocket connections are stateful
├── Solution: Sticky sessions or connection routing
├── Implementation: Load balancer IP hash
└── Alternative: Connection state externalization

2. Cross-Server Communication:
├── Problem: Clients on different servers
├── Solution: Message broker (Redis, RabbitMQ)
├── Implementation: Pub/Sub pattern
└── Performance: <10ms inter-server latency

3. Load Balancing Strategies:
├── Round Robin: Poor for WebSockets
├── Least Connections: Better for persistent connections
├── IP Hash: Ensures sticky sessions
└── Custom: Based on room/channel distribution

Architecture Patterns:

1. Single Server (Up to 10K connections):
┌─────────────────────────────────────────────────┐
│                 Web Server                      │
│  ┌─────────────────────────────────────────────┐│
│  │        WebSocket Handler                    ││
│  │  ┌─────────────────────────────────────────┐││
│  │  │    Connection Pool (10K)                │││
│  │  │  ┌─────────────────────────────────────┐│││
│  │  │  │      Message Router                 ││││
│  │  │  └─────────────────────────────────────┘│││
│  │  └─────────────────────────────────────────┘││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

2. Multi-Server with Message Broker (100K+ connections):
┌─────────────────────────────────────────────────┐
│                Load Balancer                    │
│              (IP Hash/Sticky)                   │
└─────────────────────────────────────────────────┘
         │                    │
┌─────────────────┐  ┌─────────────────┐
│   Server 1      │  │   Server 2      │
│  (50K conns)    │  │  (50K conns)    │
└─────────────────┘  └─────────────────┘
         │                    │
┌─────────────────────────────────────────────────┐
│            Message Broker (Redis)               │
│         Pub/Sub + Connection Registry           │
└─────────────────────────────────────────────────┘

3. Microservices Architecture:
┌─────────────────────────────────────────────────┐
│              API Gateway                        │
│           (WebSocket Proxy)                     │
└─────────────────────────────────────────────────┘
         │                    │
┌─────────────────┐  ┌─────────────────┐
│  Chat Service   │  │  Notification   │
│   WebSocket     │  │    Service      │
│    Server       │  │   WebSocket     │
└─────────────────┘  └─────────────────┘
         │                    │
┌─────────────────────────────────────────────────┐
│         Event Streaming (Kafka/Redis)          │
└─────────────────────────────────────────────────┘

Performance Optimizations:
├── Connection pooling: Reuse TCP connections
├── Message batching: Combine small messages
├── Compression: Enable per-message deflate
├── Binary protocol: Reduce serialization overhead
├── Memory management: Efficient buffer handling
└── CPU optimization: Minimize JSON parsing

Monitoring Metrics:
├── Active connections: Current WebSocket connections
├── Messages/second: Throughput measurement
├── Connection duration: Average session length
├── Error rates: Connection failures, timeouts
├── Memory usage: Per-connection overhead
└── Latency: Message round-trip time</code></pre>
    </div>

    <details>
      <summary><strong>Example: Discord's Real-time Communication</strong></summary>
      <div class="info-note">
        Discord handles 4+ billion messages daily across 150+ million active users using WebSockets for real-time chat, voice coordination, and presence updates. Their WebSocket gateway maintains 2.5+ million concurrent connections per server cluster, with message latency under 125ms globally. Discord's architecture uses connection sharding across multiple gateway servers, with automatic failover and reconnection handling. The platform processes 40,000+ messages per second during peak hours, utilizing custom binary protocol for voice data and JSON for text messages. Discord achieves 99.95% uptime through geographic distribution, connection load balancing, and efficient message routing via their custom Elixir-based infrastructure.
      </div>
    </details>

    <h3>Common Use Cases & Implementations</h3>
    <div class="code-block">
      <pre><code>1. Real-time Chat Applications:
├── Message delivery: Instant text/media sharing
├── Typing indicators: Live typing status
├── Presence system: Online/offline status
├── Message history: Scroll-back functionality
└── Read receipts: Message acknowledgment

Implementation:
- Connection per user
- Room-based message routing
- Message persistence (database)
- Offline message queuing
- Push notifications fallback

2. Live Collaborative Editing:
├── Operational Transform: Conflict resolution
├── Cursor tracking: Real-time cursor positions
├── Change synchronization: Document updates
├── Version control: Change history
└── Conflict resolution: Merge strategies

Technical Challenges:
- Eventual consistency
- Network partition handling
- Concurrent edit conflicts
- Large document performance
- Undo/redo operations

3. Real-time Gaming:
├── Player actions: Movement, interactions
├── Game state sync: World updates
├── Latency compensation: Prediction algorithms
├── Cheat prevention: Server validation
└── Spectator mode: Broadcast game state

Performance Requirements:
- <50ms latency for competitive games
- 60+ updates per second
- Efficient binary protocols
- Anti-cheat integration
- Scalable matchmaking

4. Financial Trading Platforms:
├── Price feeds: Real-time market data
├── Order updates: Trade execution status
├── Portfolio changes: Balance updates
├── Market alerts: Price notifications
└── Risk management: Real-time monitoring

Compliance Requirements:
- Audit trails: All messages logged
- Encryption: End-to-end security
- Latency SLAs: <10ms for HFT
- Regulatory reporting: Trade records
- Disaster recovery: Failover systems

5. IoT Device Communication:
├── Sensor data: Real-time telemetry
├── Device control: Remote commands
├── Status updates: Device health
├── Alerts: Threshold notifications
└── Firmware updates: OTA deployment

Architecture Considerations:
- Device authentication
- Message queuing for offline devices
- Bandwidth optimization
- Battery life impact
- Scalable device management

6. Live Sports/Event Updates:
├── Score updates: Real-time scoring
├── Commentary: Live text updates
├── Statistics: Player/team stats
├── Video streaming: Live feeds
└── Social features: Fan interactions

Performance Metrics:
- Millions of concurrent viewers
- Sub-second update latency
- Geographic content distribution
- Bandwidth optimization
- Mobile-first design</code></pre>
    </div>

    <h3>Security Considerations</h3>
    <div class="code-block">
      <pre><code>WebSocket Security Threats:

1. Cross-Site WebSocket Hijacking:
├── Attack: Malicious site opens WebSocket to victim site
├── Prevention: Origin header validation
├── Implementation: Check Origin against whitelist
└── Additional: CSRF tokens in handshake

2. Man-in-the-Middle Attacks:
├── Attack: Intercept/modify WebSocket traffic
├── Prevention: Use WSS (WebSocket Secure)
├── Implementation: TLS 1.2+ encryption
└── Certificate: Proper SSL certificate validation

3. Denial of Service (DoS):
├── Attack: Excessive connection attempts
├── Prevention: Rate limiting, connection limits
├── Implementation: Per-IP connection quotas
└── Monitoring: Real-time attack detection

4. Message Injection:
├── Attack: Send malicious messages
├── Prevention: Input validation, sanitization
├── Implementation: Schema validation
└── Authorization: Message-level permissions

Security Best Practices:

1. Authentication & Authorization:
├── JWT tokens in handshake
├── Session validation per message
├── Role-based access control
├── Token refresh mechanisms
└── Secure token storage

2. Input Validation:
├── Message schema validation
├── Size limits per message
├── Rate limiting per connection
├── Content sanitization
└── SQL injection prevention

3. Network Security:
├── WSS (TLS encryption) only
├── Certificate pinning
├── Firewall configuration
├── VPN for internal communication
└── DDoS protection

4. Monitoring & Logging:
├── Connection audit trails
├── Message logging (compliance)
├── Anomaly detection
├── Performance monitoring
└── Security event alerts

Implementation Example:
// Authentication middleware
function authenticate(ws, request) {
  const token = extractToken(request);
  if (!validateJWT(token)) {
    ws.close(1008, 'Invalid authentication');
    return false;
  }
  ws.userId = getUserId(token);
  return true;
}

// Rate limiting
const rateLimiter = new Map();
function checkRateLimit(userId) {
  const now = Date.now();
  const userLimit = rateLimiter.get(userId) || { count: 0, resetTime: now + 60000 };
  
  if (now > userLimit.resetTime) {
    userLimit.count = 0;
    userLimit.resetTime = now + 60000;
  }
  
  if (userLimit.count >= 100) { // 100 messages per minute
    return false;
  }
  
  userLimit.count++;
  rateLimiter.set(userId, userLimit);
  return true;
}</code></pre>
    </div>

    <details>
      <summary><strong>Example: Slack's Enterprise WebSocket Security</strong></summary>
      <div class="info-note">
        Slack processes 10+ billion messages daily across 500,000+ organizations using enterprise-grade WebSocket security. Their implementation includes end-to-end encryption, certificate pinning, and comprehensive audit logging for compliance with SOC 2, GDPR, and HIPAA requirements. Slack's WebSocket security includes real-time threat detection, DDoS protection handling 100+ Gbps attacks, and zero-trust architecture with per-message authorization. The platform maintains 99.99% uptime while processing 200,000+ security events per second, with automatic threat response and incident management. Slack's security infrastructure includes geographic data residency, advanced encryption at rest and in transit, and comprehensive penetration testing across their WebSocket infrastructure.
      </div>
    </details>

    <h3>Performance Optimization</h3>
    <div class="code-block">
      <pre><code>WebSocket Performance Tuning:

1. Connection Management:
├── Connection pooling: Reuse connections
├── Keep-alive: Heartbeat mechanisms
├── Graceful shutdown: Proper close handshake
├── Timeout handling: Connection cleanup
└── Resource limits: Memory/CPU constraints

2. Message Optimization:
├── Compression: Enable permessage-deflate
├── Binary protocol: Reduce serialization overhead
├── Message batching: Combine small messages
├── Selective updates: Send only changes
└── Efficient serialization: Protocol Buffers, MessagePack

3. Memory Management:
├── Buffer pooling: Reuse memory buffers
├── Garbage collection: Minimize GC pressure
├── Memory leaks: Proper cleanup
├── Connection limits: Prevent memory exhaustion
└── Efficient data structures: Optimized collections

4. CPU Optimization:
├── Async processing: Non-blocking operations
├── Worker threads: Parallel message processing
├── Efficient parsing: Minimize JSON overhead
├── Caching: Reduce computation
└── Algorithm optimization: Efficient routing

Performance Metrics:

Connection Metrics:
├── Concurrent connections: 10K-1M per server
├── Connection setup time: <100ms
├── Memory per connection: 2-8KB
├── CPU per connection: 0.1-1% per 1000 connections
└── Network bandwidth: 1-100 Mbps per server

Message Metrics:
├── Message throughput: 100K-1M messages/second
├── Message latency: 1-50ms end-to-end
├── Message size: 1KB-1MB typical
├── Compression ratio: 60-80% reduction
└── Serialization time: <1ms per message

Benchmarking Results:

Single Server Performance:
├── Node.js: 10K connections, 50K msg/sec
├── Go: 100K connections, 500K msg/sec
├── Rust: 1M connections, 2M msg/sec
├── Java: 50K connections, 200K msg/sec
└── C++: 1M+ connections, 5M+ msg/sec

Memory Usage:
├── Node.js: 8KB per connection
├── Go: 4KB per connection
├── Rust: 2KB per connection
├── Java: 12KB per connection
└── C++: 1KB per connection

Optimization Techniques:

1. Protocol-Level Optimizations:
├── Custom binary protocol
├── Message compression
├── Header reduction
├── Frame aggregation
└── Selective acknowledgment

2. Application-Level Optimizations:
├── Message deduplication
├── Delta compression
├── Lazy loading
├── Caching strategies
└── Batch operations

3. Infrastructure Optimizations:
├── CDN for static content
├── Edge computing
├── Load balancing
├── Database optimization
└── Network tuning

Monitoring & Profiling:
├── Connection metrics: Active, total, failed
├── Message metrics: Rate, size, latency
├── Resource usage: CPU, memory, network
├── Error rates: Connection failures, timeouts
└── Performance trends: Historical analysis</code></pre>
    </div>

    <h3>Interview Questions & Answers</h3>
    <div class="code-block">
      <pre><code>Common Interview Questions:

Q: When would you choose WebSockets over HTTP?
A: Use WebSockets for real-time bidirectional communication like chat apps, 
   live updates, collaborative editing, or gaming. HTTP is better for 
   traditional request-response patterns, caching, and stateless operations.

Q: How do you handle WebSocket scaling across multiple servers?
A: Use sticky sessions for connection affinity, message brokers (Redis) for 
   cross-server communication, and load balancers with IP hash routing. 
   Implement connection state externalization for better fault tolerance.

Q: What are the main challenges with WebSocket connections?
A: Connection management (reconnection, heartbeats), scaling across servers, 
   firewall/proxy issues, message ordering, and handling network partitions. 
   Also security concerns like CSRF and proper authentication.

Q: How do you implement WebSocket authentication?
A: Send JWT tokens during handshake, validate tokens per connection, 
   implement token refresh mechanisms, and use secure token storage. 
   Consider per-message authorization for sensitive operations.

Q: What's the difference between WebSocket and Server-Sent Events?
A: WebSocket provides full-duplex communication, while SSE is unidirectional 
   (server-to-client). SSE is simpler, works over HTTP, and has automatic 
   reconnection. WebSocket offers lower latency and bidirectional messaging.

Q: How do you handle WebSocket connection failures?
A: Implement exponential backoff for reconnection, queue messages during 
   disconnection, use heartbeat/ping-pong for connection health, and provide 
   fallback mechanisms like HTTP polling for critical operations.

Q: What are WebSocket subprotocols?
A: Subprotocols define application-specific protocols over WebSocket. 
   Examples include STOMP for messaging, WAMP for RPC, or custom protocols. 
   Negotiated during handshake via Sec-WebSocket-Protocol header.

Q: How do you optimize WebSocket performance?
A: Enable compression, use binary protocols, implement message batching, 
   optimize serialization, use connection pooling, and implement efficient 
   message routing. Monitor connection metrics and resource usage.

Q: What security considerations apply to WebSockets?
A: Validate Origin header, use WSS encryption, implement proper authentication, 
   validate all input, use rate limiting, and monitor for attacks. Consider 
   CSRF protection and proper error handling.

Q: How do you test WebSocket applications?
A: Use WebSocket testing libraries, implement connection stress tests, 
   test reconnection scenarios, validate message ordering, and perform 
   security testing. Use tools like Artillery, WebSocket King, or custom scripts.</code></pre>
    </div>

    <h3>Key Takeaways</h3>
    <ul>
      <li><strong>Real-time Communication:</strong> Full-duplex, persistent connections for instant messaging</li>
      <li><strong>Low Overhead:</strong> 99% reduction in protocol overhead compared to HTTP polling</li>
      <li><strong>Scaling Challenges:</strong> Stateful connections require sticky sessions and message brokers</li>
      <li><strong>Security:</strong> Origin validation, WSS encryption, and proper authentication essential</li>
      <li><strong>Performance:</strong> 10K-1M connections per server, sub-50ms latency achievable</li>
      <li><strong>Use Cases:</strong> Chat, gaming, collaboration, trading, IoT, live updates</li>
      <li><strong>Alternatives:</strong> Consider SSE for unidirectional, HTTP/2 for modern browsers</li>
    </ul>

    <h3>References</h3>
    <ul>
      <li><a href="https://tools.ietf.org/html/rfc6455" target="_blank">RFC 6455: WebSocket Protocol</a></li>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank">MDN WebSockets API</a></li>
      <li><a href="https://github.com/websockets/ws" target="_blank">WebSocket Node.js Library</a></li>
      <li><a href="https://websocket.org/" target="_blank">WebSocket.org</a></li>
      <li><a href="https://tools.ietf.org/html/rfc7692" target="_blank">RFC 7692: WebSocket Compression</a></li>
      <li><a href="https://owasp.org/www-community/attacks/WebSocket_security" target="_blank">OWASP WebSocket Security</a></li>
    </ul>
  `
}; 