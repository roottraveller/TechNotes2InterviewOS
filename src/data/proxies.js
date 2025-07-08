export const proxies = {
  id: 'proxies',
  title: 'Proxies',
  content: `
<p>A proxy server acts as an intermediary between clients and servers, forwarding requests and responses. Proxies provide various benefits including security, performance optimization, access control, and anonymity.</p>

    <h3>Types of Proxies</h3>
    
    <h4>1. Forward Proxy</h4>
    <p>Sits between clients and the internet, forwarding client requests to servers.</p>
    
    <ul>
      <li><strong>Client Configuration:</strong> Clients must be configured to use proxy</li>
      <li><strong>Anonymity:</strong> Hides client IP from servers</li>
      <li><strong>Access Control:</strong> Can restrict client access</li>
      <li><strong>Caching:</strong> Can cache frequently accessed content</li>
      <li><strong>Content Filtering:</strong> Can block unwanted content</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Forward Proxy Flow
┌──────────┐     ┌─────────────┐     ┌──────────┐
│  Client  │────>│Forward Proxy│────>│  Server  │
│          │<────│             │<────│          │
└──────────┘     └─────────────┘     └──────────┘

// Client sees: proxy address
// Server sees: proxy address (not client)</code></pre>
    </div>

    <h4>2. Reverse Proxy</h4>
    <p>Sits between the internet and servers, forwarding client requests to backend servers.</p>
    
    <ul>
      <li><strong>Load Balancing:</strong> Distributes requests across servers</li>
      <li><strong>SSL Termination:</strong> Handles SSL/TLS encryption</li>
      <li><strong>Caching:</strong> Serves cached content</li>
      <li><strong>Security:</strong> Hides backend server details</li>
      <li><strong>Compression:</strong> Compresses responses</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Reverse Proxy Flow
┌──────────┐     ┌──────────────┐     ┌──────────┐
│  Client  │────>│ Reverse Proxy│────>│ Backend  │
│          │<────│              │<────│ Servers  │
└──────────┘     └──────────────┘     └──────────┘

// Client sees: reverse proxy address
// Client doesn't know about backend servers</code></pre>
    </div>

    <h4>3. Transparent Proxy</h4>
    <p>Intercepts connections without client configuration.</p>
    
    <ul>
      <li><strong>No Configuration:</strong> Works without client setup</li>
      <li><strong>Network Level:</strong> Operates at network layer</li>
      <li><strong>Caching:</strong> Can cache transparently</li>
      <li><strong>Monitoring:</strong> Can log all traffic</li>
      <li><strong>Common Use:</strong> ISPs, corporate networks</li>
    </ul>

    <h4>4. SOCKS Proxy</h4>
    <p>Operates at a lower level than HTTP proxies.</p>
    
    <ul>
      <li><strong>Protocol Agnostic:</strong> Works with any protocol</li>
      <li><strong>SOCKS4:</strong> TCP connections only</li>
      <li><strong>SOCKS5:</strong> TCP and UDP, authentication</li>
      <li><strong>Use Cases:</strong> Torrenting, gaming, general TCP/UDP</li>
    </ul>

    <h3>Proxy Implementation Examples</h3>
    
    <h4>1. HTTP Proxy Server (Node.js)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Simple HTTP Proxy Server
const http = require('http');
const httpProxy = require('http-proxy');

// Create proxy instance
const proxy = httpProxy.createProxyServer({});

// Proxy middleware
const proxyServer = http.createServer((req, res) => {
  // Log requests
  console.log(\`Proxying: \${req.method} \${req.url}\`);
  
  // Access control
  if (isBlocked(req.url)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }
  
  // Add proxy headers
  req.headers['X-Forwarded-For'] = req.connection.remoteAddress;
  req.headers['X-Forwarded-Proto'] = 'http';
  
  // Forward request
  proxy.web(req, res, {
    target: 'http://backend-server.com',
    changeOrigin: true
  });
});

// Error handling
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(500);
  res.end('Proxy Error');
});

// Response modification
proxy.on('proxyRes', (proxyRes, req, res) => {
  // Add security headers
  proxyRes.headers['X-Frame-Options'] = 'DENY';
  proxyRes.headers['X-Content-Type-Options'] = 'nosniff';
});

proxyServer.listen(8080);</code></pre>
    </div>

    <h4>2. Reverse Proxy with Nginx</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Nginx Reverse Proxy Configuration
upstream backend {
    least_conn;  # Load balancing method
    server backend1.example.com:8080 weight=3;
    server backend2.example.com:8080 weight=2;
    server backend3.example.com:8080 backup;
    
    # Health checks
    keepalive 32;
    keepalive_timeout 60s;
}

server {
    listen 80;
    server_name example.com;
    
    # SSL termination
    listen 443 ssl http2;
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    
    # Caching
    proxy_cache_path /var/cache/nginx levels=1:2 
                     keys_zone=cache:10m max_size=1g;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    
    location / {
        # Proxy settings
        proxy_pass http://backend;
        proxy_http_version 1.1;
        
        # Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Connection settings
        proxy_set_header Connection "";
        proxy_buffering off;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Cache settings
        proxy_cache cache;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 1m;
    }
    
    # WebSocket support
    location /ws {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}</code></pre>
    </div>

    <h4>3. SOCKS5 Proxy Implementation</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// SOCKS5 Proxy Server (Python)
import socket
import select
import struct
import threading

class SOCKS5Proxy:
    def __init__(self, host='0.0.0.0', port=1080):
        self.host = host
        self.port = port
        self.clients = []
        
    def handle_client(self, client_socket, addr):
        try:
            # SOCKS5 greeting
            greeting = client_socket.recv(2)
            version, nmethods = struct.unpack("!BB", greeting)
            
            if version != 5:
                client_socket.close()
                return
            
            # Get authentication methods
            methods = client_socket.recv(nmethods)
            
            # Reply with no auth required
            client_socket.send(b"\\x05\\x00")
            
            # Get connection request
            version, cmd, _, address_type = struct.unpack(
                "!BBBB", client_socket.recv(4)
            )
            
            if cmd != 1:  # Only support CONNECT
                client_socket.close()
                return
            
            # Parse destination
            if address_type == 1:  # IPv4
                addr = socket.inet_ntoa(client_socket.recv(4))
            elif address_type == 3:  # Domain
                domain_length = client_socket.recv(1)[0]
                addr = client_socket.recv(domain_length).decode()
            
            port = struct.unpack('!H', client_socket.recv(2))[0]
            
            # Connect to destination
            remote_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            remote_socket.connect((addr, port))
            
            # Send success response
            reply = b"\\x05\\x00\\x00\\x01"
            reply += socket.inet_aton("0.0.0.0") + struct.pack("!H", 0)
            client_socket.send(reply)
            
            # Relay data
            self.relay_data(client_socket, remote_socket)
            
        except Exception as e:
            print(f"Error: {e}")
        finally:
            client_socket.close()
    
    def relay_data(self, client, remote):
        while True:
            ready, _, _ = select.select([client, remote], [], [])
            
            if client in ready:
                data = client.recv(4096)
                if not data:
                    break
                remote.send(data)
            
            if remote in ready:
                data = remote.recv(4096)
                if not data:
                    break
                client.send(data)
    
    def start(self):
        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server.bind((self.host, self.port))
        server.listen(5)
        
        print(f"SOCKS5 proxy listening on {self.host}:{self.port}")
        
        while True:
            client, addr = server.accept()
            thread = threading.Thread(
                target=self.handle_client, 
                args=(client, addr)
            )
            thread.start()</code></pre>
    </div>

    <h3>Proxy Use Cases</h3>
    
    <h4>1. Load Balancing</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// HAProxy Load Balancing Configuration
global
    maxconn 4096
    log 127.0.0.1 local0
    
defaults
    mode http
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms
    
frontend web_frontend
    bind *:80
    bind *:443 ssl crt /etc/ssl/certs/site.pem
    
    # ACL rules
    acl is_api path_beg /api
    acl is_static path_beg /static
    
    # Route to different backends
    use_backend api_servers if is_api
    use_backend static_servers if is_static
    default_backend web_servers
    
backend web_servers
    balance roundrobin
    option httpchk GET /health
    server web1 10.0.1.1:8080 check
    server web2 10.0.1.2:8080 check
    server web3 10.0.1.3:8080 check
    
backend api_servers
    balance leastconn
    server api1 10.0.2.1:8080 check
    server api2 10.0.2.2:8080 check
    
backend static_servers
    balance source  # Session persistence
    server cdn1 10.0.3.1:8080 check
    server cdn2 10.0.3.2:8080 check</code></pre>
    </div>

    <h4>2. Caching Proxy</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Varnish Caching Proxy Configuration
vcl 4.0;

backend default {
    .host = "backend.example.com";
    .port = "8080";
    .probe = {
        .url = "/health";
        .interval = 5s;
        .timeout = 1s;
        .window = 5;
        .threshold = 3;
    }
}

sub vcl_recv {
    # Normalize URL
    set req.url = regsub(req.url, "#.*$", "");
    set req.url = regsub(req.url, "\\?.*$", "");
    
    # Remove cookies for static content
    if (req.url ~ "\\.(jpg|jpeg|gif|png|ico|css|js|html)$") {
        unset req.http.Cookie;
    }
    
    # Cache different versions based on device
    if (req.http.User-Agent ~ "Mobile") {
        set req.http.X-Device = "mobile";
    } else {
        set req.http.X-Device = "desktop";
    }
}

sub vcl_backend_response {
    # Set cache TTL based on content type
    if (bereq.url ~ "\\.(jpg|jpeg|gif|png|ico)$") {
        set beresp.ttl = 7d;
    } elsif (bereq.url ~ "\\.(css|js)$") {
        set beresp.ttl = 1d;
    } elsif (bereq.url ~ "\\.html$") {
        set beresp.ttl = 1h;
    }
    
    # Enable ESI processing
    if (beresp.http.Surrogate-Control ~ "ESI/1.0") {
        set beresp.do_esi = true;
    }
}

sub vcl_deliver {
    # Add debug headers
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
        set resp.http.X-Cache-Hits = obj.hits;
    } else {
        set resp.http.X-Cache = "MISS";
    }
}</code></pre>
    </div>

    <h4>3. Security Proxy</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Web Application Firewall (ModSecurity)
# Basic security rules
SecRuleEngine On
SecRequestBodyAccess On
SecResponseBodyAccess On

# Limit request size
SecRequestBodyLimit 13107200
SecRequestBodyNoFilesLimit 131072

# Block SQL injection attempts
SecRule ARGS "@detectSQLi" \\
    "id:1001,\\
    phase:2,\\
    block,\\
    msg:'SQL Injection Attack Detected',\\
    logdata:'Matched Data: %{MATCHED_VAR} found within %{MATCHED_VAR_NAME}',\\
    severity:'CRITICAL'"

# Block XSS attempts
SecRule ARGS|REQUEST_HEADERS "@detectXSS" \\
    "id:1002,\\
    phase:2,\\
    block,\\
    msg:'XSS Attack Detected',\\
    severity:'CRITICAL'"

# Rate limiting
SecRule IP:REQUEST_COUNTER "@gt 100" \\
    "id:1003,\\
    phase:1,\\
    block,\\
    msg:'Rate limit exceeded',\\
    chain"
SecRule REQUEST_LINE ".*" \\
    "setvar:IP.REQUEST_COUNTER=+1,\\
    expirevar:IP.REQUEST_COUNTER=60"

# Block suspicious user agents
SecRule REQUEST_HEADERS:User-Agent "@pmFromFile bad-user-agents.txt" \\
    "id:1004,\\
    phase:1,\\
    block,\\
    msg:'Malicious User-Agent detected'"</code></pre>
    </div>

    <h3>Proxy Chaining</h3>
    
    <p>Multiple proxies can be chained for enhanced functionality:</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Proxy Chain Architecture
┌────────┐   ┌─────────┐   ┌──────────┐   ┌─────────┐   ┌────────┐
│ Client │──>│ Forward │──>│ Caching  │──>│ Reverse │──>│ Server │
│        │   │ Proxy   │   │ Proxy    │   │ Proxy   │   │        │
└────────┘   └─────────┘   └──────────┘   └─────────┘   └────────┘
              ↓              ↓               ↓
           Auth &         Cache           Load Balance
           Filter         Content         & Security</code></pre>
    </div>

    <h3>Performance Considerations</h3>
    
    <h4>1. Connection Pooling</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Connection Pool Implementation
class ProxyConnectionPool {
  constructor(maxConnections = 100) {
    this.pool = new Map();
    this.maxConnections = maxConnections;
  }
  
  getConnection(host, port) {
    const key = \`\${host}:\${port}\`;
    let connections = this.pool.get(key) || [];
    
    // Reuse existing connection
    const available = connections.find(c => !c.inUse);
    if (available) {
      available.inUse = true;
      return available.socket;
    }
    
    // Create new connection if under limit
    if (connections.length < this.maxConnections) {
      const socket = net.connect(port, host);
      connections.push({
        socket,
        inUse: true,
        created: Date.now()
      });
      this.pool.set(key, connections);
      return socket;
    }
    
    throw new Error('Connection pool exhausted');
  }
  
  releaseConnection(host, port, socket) {
    const key = \`\${host}:\${port}\`;
    const connections = this.pool.get(key) || [];
    const conn = connections.find(c => c.socket === socket);
    if (conn) {
      conn.inUse = false;
    }
  }
}</code></pre>
    </div>

    <h4>2. Caching Strategies</h4>
    <ul>
      <li><strong>Cache-Control Headers:</strong> Respect HTTP caching directives</li>
      <li><strong>Vary Headers:</strong> Cache different versions based on headers</li>
      <li><strong>Purging:</strong> Invalidate cached content when updated</li>
      <li><strong>Compression:</strong> Store and serve compressed content</li>
    </ul>

    <h3>Security Best Practices</h3>
    
    <h4>1. Authentication</h4>
    <ul>
      <li><strong>Basic Auth:</strong> Username/password</li>
      <li><strong>Digest Auth:</strong> Hashed credentials</li>
      <li><strong>OAuth:</strong> Token-based authentication</li>
      <li><strong>Client Certificates:</strong> Mutual TLS</li>
    </ul>

    <h4>2. Access Control</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// IP-based Access Control
const allowedIPs = ['192.168.1.0/24', '10.0.0.0/8'];
const blockedDomains = ['malicious.com', 'spam.org'];

function checkAccess(req) {
  // Check IP whitelist
  const clientIP = req.connection.remoteAddress;
  if (!isIPAllowed(clientIP, allowedIPs)) {
    return { allowed: false, reason: 'IP not whitelisted' };
  }
  
  // Check domain blacklist
  const url = new URL(req.url);
  if (blockedDomains.includes(url.hostname)) {
    return { allowed: false, reason: 'Domain blocked' };
  }
  
  // Check rate limits
  if (exceedsRateLimit(clientIP)) {
    return { allowed: false, reason: 'Rate limit exceeded' };
  }
  
  return { allowed: true };
}</code></pre>
    </div>

    <h4>3. Logging and Monitoring</h4>
    <ul>
      <li><strong>Access Logs:</strong> All requests and responses</li>
      <li><strong>Error Logs:</strong> Failed connections, timeouts</li>
      <li><strong>Performance Metrics:</strong> Latency, throughput</li>
      <li><strong>Security Events:</strong> Blocked requests, auth failures</li>
    </ul>

    <h3>Common Proxy Headers</h3>
    
    <table>
      <thead>
        <tr>
          <th>Header</th>
          <th>Purpose</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>X-Forwarded-For</td>
          <td>Original client IP</td>
          <td>203.0.113.195, 70.41.3.18</td>
        </tr>
        <tr>
          <td>X-Forwarded-Proto</td>
          <td>Original protocol</td>
          <td>https</td>
        </tr>
        <tr>
          <td>X-Forwarded-Host</td>
          <td>Original host</td>
          <td>example.com</td>
        </tr>
        <tr>
          <td>X-Real-IP</td>
          <td>Client IP (nginx)</td>
          <td>203.0.113.195</td>
        </tr>
        <tr>
          <td>Via</td>
          <td>Proxy chain</td>
          <td>1.1 proxy1, 1.1 proxy2</td>
        </tr>
        <tr>
          <td>Forwarded</td>
          <td>RFC 7239 standard</td>
          <td>for=192.0.2.60;proto=http</td>
        </tr>
      </tbody>
    </table>
`
}; 