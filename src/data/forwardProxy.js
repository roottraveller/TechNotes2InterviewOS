export const forwardProxy = {
  id: 'forward-proxy',
  title: 'Forward Proxy',
  content: `
    <h2>Forward Proxy</h2>
    <p>A forward proxy, often simply called a "proxy," is an intermediary server that sits between client computers and the internet. It acts on behalf of clients, forwarding their requests to web servers and returning the responses. The forward proxy hides the client's identity from the destination server.</p>

    <h3>How Forward Proxy Works</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Forward Proxy Flow
┌──────────┐     ┌─────────────┐     ┌──────────────┐
│  Client  │────>│Forward Proxy│────>│ Web Server   │
│ (Hidden) │<────│             │<────│(Sees Proxy)  │
└──────────┘     └─────────────┘     └──────────────┘
     │                  │                    │
     │   Request to     │    Forward         │
     │   example.com    │    Request         │
     │                  │                    │
     │   Response       │    Return          │
     │   from proxy     │    Response        │
     └──────────────────┴────────────────────┘</code></pre>
    </div>

    <h3>Key Characteristics</h3>
    
    <h4>1. Client-Side Configuration</h4>
    <ul>
      <li><strong>Explicit Configuration:</strong> Clients must be configured to use the proxy</li>
      <li><strong>Proxy Settings:</strong> Browser or system-level proxy configuration</li>
      <li><strong>PAC Files:</strong> Proxy Auto-Configuration for dynamic routing</li>
      <li><strong>Transparent Proxy:</strong> No client configuration needed (network-level)</li>
    </ul>

    <h4>2. Anonymity and Privacy</h4>
    <ul>
      <li><strong>IP Masking:</strong> Hides client's real IP address</li>
      <li><strong>Location Spoofing:</strong> Appear to browse from proxy's location</li>
      <li><strong>Identity Protection:</strong> Prevents tracking by destination servers</li>
      <li><strong>Request Filtering:</strong> Can remove identifying headers</li>
    </ul>

    <h3>Types of Forward Proxies</h3>
    
    <h4>1. HTTP/HTTPS Proxy</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// HTTP Proxy Configuration Example
// Browser settings
{
  "http_proxy": "http://proxy.company.com:8080",
  "https_proxy": "http://proxy.company.com:8080",
  "no_proxy": "localhost,127.0.0.1,*.internal.company.com"
}

// Environment variables (Linux/Mac)
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NO_PROXY=localhost,127.0.0.1,internal.company.com

// PAC file example
function FindProxyForURL(url, host) {
  // Direct connection for internal sites
  if (isInNet(host, "10.0.0.0", "255.0.0.0")) {
    return "DIRECT";
  }
  
  // Use proxy for external sites
  return "PROXY proxy.company.com:8080";
}</code></pre>
    </div>

    <h4>2. SOCKS Proxy</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// SOCKS5 Proxy Client Configuration
import socks
import socket
import requests

# Configure SOCKS5 proxy
socks.set_default_proxy(
    socks.SOCKS5, 
    "proxy.example.com", 
    1080,
    username="user",
    password="pass"
)
socket.socket = socks.socksocket

# Now all connections go through SOCKS proxy
response = requests.get('https://api.example.com/data')

// SSH as SOCKS proxy
// Create SOCKS proxy through SSH tunnel
ssh -D 1080 -f -C -q -N user@remote-server.com

// Configure application to use localhost:1080 as SOCKS proxy</code></pre>
    </div>

    <h4>3. Transparent Proxy</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Transparent Proxy Setup (iptables)
# Redirect all HTTP traffic to proxy
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 \
  -j REDIRECT --to-port 3128

# Redirect HTTPS traffic
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 \
  -j REDIRECT --to-port 3129

// Squid Transparent Proxy Configuration
http_port 3128 transparent
https_port 3129 transparent ssl-bump \
  cert=/etc/squid/ssl_cert/myCA.pem

# SSL Bump for HTTPS inspection
ssl_bump peek all
ssl_bump bump all</code></pre>
    </div>

    <h3>Common Use Cases</h3>
    
    <h4>1. Corporate Internet Access Control</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Squid Proxy Access Control
# Define ACLs
acl company_network src 192.168.0.0/16
acl business_hours time MTWHF 08:00-18:00
acl blocked_sites dstdomain .facebook.com .youtube.com
acl allowed_categories urlpath_regex -i \
  business education technology

# Apply rules
http_access deny blocked_sites
http_access allow company_network business_hours
http_access deny all

# Bandwidth management
delay_pools 1
delay_class 1 2
delay_parameters 1 -1/-1 100000/100000  # 100KB/s per user
delay_access 1 allow company_network</code></pre>
    </div>

    <h4>2. Content Filtering and Security</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Content Filtering Implementation
class ContentFilterProxy:
    def __init__(self):
        self.blocked_keywords = [
            'gambling', 'adult', 'malware'
        ]
        self.blocked_domains = set()
        self.load_blocklist()
    
    def filter_request(self, request):
        url = request.url
        
        # Check domain blocklist
        if self.is_blocked_domain(url):
            return self.block_response("Domain blocked")
        
        # Check URL keywords
        if self.contains_blocked_keyword(url):
            return self.block_response("Content filtered")
        
        # Check content type
        if self.is_dangerous_file(request):
            return self.block_response("File type blocked")
        
        # Scan for malware (integrate with AV)
        if self.scan_for_malware(request):
            return self.block_response("Malware detected")
        
        return None  # Allow request
    
    def filter_response(self, response):
        # Remove ads
        response = self.remove_ads(response)
        
        # Filter inappropriate content
        response = self.filter_content(response)
        
        # Add security headers
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        
        return response</code></pre>
    </div>

    <h4>3. Caching for Performance</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Squid Caching Configuration
# Cache directory (10GB cache)
cache_dir ufs /var/cache/squid 10000 16 256

# Memory cache
cache_mem 256 MB
maximum_object_size_in_memory 512 KB

# Disk cache object size
maximum_object_size 100 MB
minimum_object_size 0 KB

# Cache replacement policy
cache_replacement_policy lru

# Refresh patterns
refresh_pattern ^ftp:       1440    20%     10080
refresh_pattern ^gopher:    1440    0%      1440
refresh_pattern -i (/cgi-bin/|\\?) 0 0% 0
refresh_pattern \\.(jpg|jpeg|png|gif|ico)$ 10080 90% 43200
refresh_pattern \\.(css|js)$ 1440 40% 40320
refresh_pattern .           0       20%     4320

# Cache peer (parent proxy)
cache_peer parent.proxy.com parent 8080 0 \
  no-query default login=user:pass</code></pre>
    </div>

    <h4>4. Bypassing Geo-Restrictions</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Proxy Chaining for Geo-Bypass
// Client → Proxy1 (US) → Proxy2 (UK) → Target

// ProxyChains Configuration
# proxychains.conf
strict_chain
proxy_dns
tcp_read_time_out 15000
tcp_connect_time_out 8000

[ProxyList]
# US Proxy
http 192.168.1.100 8080 user pass
# UK Proxy  
socks5 10.10.10.10 1080 user pass

// Python implementation
import requests

proxies = {
    'http': 'http://us-proxy.example.com:8080',
    'https': 'https://us-proxy.example.com:8080'
}

# Access geo-restricted content
response = requests.get(
    'https://uk-only-service.com/content',
    proxies=proxies
)</code></pre>
    </div>

    <h3>Implementation Examples</h3>
    
    <h4>1. Simple HTTP Proxy Server (Node.js)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>const http = require('http');
const https = require('https');
const url = require('url');

class ForwardProxy {
  constructor(port = 8080) {
    this.port = port;
    this.server = http.createServer(this.handleRequest.bind(this));
    this.server.on('connect', this.handleConnect.bind(this));
  }
  
  // Handle HTTP requests
  handleRequest(clientReq, clientRes) {
    console.log(\`Proxying: \${clientReq.url}\`);
    
    const parsedUrl = url.parse(clientReq.url);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 80,
      path: parsedUrl.path,
      method: clientReq.method,
      headers: clientReq.headers
    };
    
    // Forward request
    const proxyReq = http.request(options, (proxyRes) => {
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(clientRes);
    });
    
    proxyReq.on('error', (err) => {
      clientRes.writeHead(500);
      clientRes.end('Proxy Error: ' + err.message);
    });
    
    clientReq.pipe(proxyReq);
  }
  
  // Handle HTTPS CONNECT method
  handleConnect(req, clientSocket, head) {
    const [hostname, port] = req.url.split(':');
    console.log(\`CONNECT \${hostname}:\${port}\`);
    
    const serverSocket = net.connect(port || 443, hostname, () => {
      clientSocket.write('HTTP/1.1 200 Connection Established\\r\\n\\r\\n');
      serverSocket.write(head);
      serverSocket.pipe(clientSocket);
      clientSocket.pipe(serverSocket);
    });
    
    serverSocket.on('error', (err) => {
      clientSocket.end('HTTP/1.1 500 Internal Server Error\\r\\n\\r\\n');
    });
  }
  
  start() {
    this.server.listen(this.port, () => {
      console.log(\`Forward proxy listening on port \${this.port}\`);
    });
  }
}

// Usage
const proxy = new ForwardProxy(8080);
proxy.start();</code></pre>
    </div>

    <h4>2. Authenticated Proxy</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Proxy with Authentication
class AuthenticatedProxy extends ForwardProxy {
  constructor(port, users) {
    super(port);
    this.users = users; // { username: password }
  }
  
  authenticate(req) {
    const auth = req.headers['proxy-authorization'];
    if (!auth) return false;
    
    const [type, credentials] = auth.split(' ');
    if (type !== 'Basic') return false;
    
    const [username, password] = Buffer.from(credentials, 'base64')
      .toString().split(':');
    
    return this.users[username] === password;
  }
  
  handleRequest(clientReq, clientRes) {
    // Check authentication
    if (!this.authenticate(clientReq)) {
      clientRes.writeHead(407, {
        'Proxy-Authenticate': 'Basic realm="Proxy Authentication"'
      });
      clientRes.end('Proxy Authentication Required');
      return;
    }
    
    // Continue with proxying
    super.handleRequest(clientReq, clientRes);
  }
}

// Usage with authentication
const proxy = new AuthenticatedProxy(8080, {
  'user1': 'password1',
  'user2': 'password2'
});
proxy.start();</code></pre>
    </div>

    <h3>Security Considerations</h3>
    
    <h4>1. SSL/TLS Interception</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// SSL Bumping Configuration (Squid)
# Generate CA certificate
openssl req -new -newkey rsa:2048 -days 365 -nodes \
  -x509 -keyout myCA.pem -out myCA.pem

# Configure SSL bumping
https_port 3129 intercept ssl-bump \
  cert=/etc/squid/ssl_cert/myCA.pem \
  generate-host-certificates=on \
  dynamic_cert_mem_cache_size=4MB

# SSL bump rules
acl step1 at_step SslBump1
ssl_bump peek step1
ssl_bump bump all

# Splice financial sites (don't decrypt)
acl banks ssl::server_name .bank.com .paypal.com
ssl_bump splice banks</code></pre>
    </div>

    <h4>2. Logging and Privacy</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Privacy-Conscious Logging
class PrivacyProxy {
  logRequest(req) {
    // Hash IP addresses for privacy
    const hashedIp = crypto.createHash('sha256')
      .update(req.connection.remoteAddress)
      .digest('hex').substring(0, 16);
    
    // Log without sensitive data
    const logEntry = {
      timestamp: new Date().toISOString(),
      clientId: hashedIp,
      method: req.method,
      domain: new URL(req.url).hostname,
      // Don't log full URLs or parameters
      statusCode: null,
      responseTime: null
    };
    
    // Rotate logs daily
    this.writeToRotatingLog(logEntry);
  }
  
  // Implement log rotation
  writeToRotatingLog(entry) {
    const date = new Date().toISOString().split('T')[0];
    const logFile = \`proxy-\${date}.log\`;
    fs.appendFileSync(logFile, JSON.stringify(entry) + '\\n');
  }
}</code></pre>
    </div>

    <h3>Performance Optimization</h3>
    
    <h4>1. Connection Pooling</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// HTTP Agent with Keep-Alive
const http = require('http');
const https = require('https');

// Create agents with connection pooling
const httpAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000
});

// Use in proxy
function proxyRequest(targetUrl, options) {
  const agent = targetUrl.startsWith('https') 
    ? httpsAgent 
    : httpAgent;
  
  return fetch(targetUrl, {
    ...options,
    agent: agent
  });
}</code></pre>
    </div>

    <h4>2. Caching Implementation</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// In-Memory Cache for Proxy
class CachingProxy {
  constructor() {
    this.cache = new Map();
    this.cacheStats = {
      hits: 0,
      misses: 0,
      size: 0
    };
  }
  
  getCacheKey(req) {
    return \`\${req.method}:\${req.url}\`;
  }
  
  isCacheable(req, res) {
    // Only cache GET requests
    if (req.method !== 'GET') return false;
    
    // Check response headers
    const cacheControl = res.headers['cache-control'];
    if (cacheControl && cacheControl.includes('no-cache')) {
      return false;
    }
    
    // Only cache successful responses
    return res.statusCode === 200;
  }
  
  async handleRequest(req, res) {
    const key = this.getCacheKey(req);
    
    // Check cache
    if (this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (cached.expires > Date.now()) {
        this.cacheStats.hits++;
        return this.serveCached(res, cached);
      }
      this.cache.delete(key);
    }
    
    this.cacheStats.misses++;
    
    // Proxy request
    const response = await this.forwardRequest(req);
    
    // Cache if appropriate
    if (this.isCacheable(req, response)) {
      this.cacheResponse(key, response);
    }
    
    return response;
  }
}</code></pre>
    </div>

    <h3>Proxy vs VPN Comparison</h3>
    
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Forward Proxy</th>
          <th>VPN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Protocol Level</td>
          <td>Application (HTTP/HTTPS)</td>
          <td>Network (All traffic)</td>
        </tr>
        <tr>
          <td>Encryption</td>
          <td>Optional</td>
          <td>Always encrypted</td>
        </tr>
        <tr>
          <td>Configuration</td>
          <td>Per-application</td>
          <td>System-wide</td>
        </tr>
        <tr>
          <td>Performance</td>
          <td>Generally faster</td>
          <td>More overhead</td>
        </tr>
        <tr>
          <td>Anonymity</td>
          <td>IP masking only</td>
          <td>Full tunnel encryption</td>
        </tr>
        <tr>
          <td>Use Case</td>
          <td>Web browsing, API calls</td>
          <td>All network traffic</td>
        </tr>
      </tbody>
    </table>

    <h3>Best Practices</h3>
    
    <ol>
      <li><strong>Authentication:</strong> Always use authentication in production</li>
      <li><strong>Encryption:</strong> Use HTTPS between client and proxy</li>
      <li><strong>Logging:</strong> Log appropriately, respecting privacy</li>
      <li><strong>Access Control:</strong> Implement proper ACLs</li>
      <li><strong>Rate Limiting:</strong> Prevent abuse and ensure fair usage</li>
      <li><strong>Monitoring:</strong> Track performance and usage metrics</li>
      <li><strong>Updates:</strong> Keep proxy software updated</li>
      <li><strong>Fail-Safe:</strong> Have bypass mechanisms for critical services</li>
    </ol>

    <h3>Common Issues and Solutions</h3>
    
    <h4>1. Proxy Detection and Blocking</h4>
    <ul>
      <li><strong>Issue:</strong> Some websites detect and block proxy usage</li>
      <li><strong>Solution:</strong> Use residential proxies, rotate IPs, modify headers</li>
    </ul>

    <h4>2. Performance Degradation</h4>
    <ul>
      <li><strong>Issue:</strong> Proxy becomes bottleneck</li>
      <li><strong>Solution:</strong> Implement caching, connection pooling, load balancing</li>
    </ul>

    <h4>3. SSL Certificate Issues</h4>
    <ul>
      <li><strong>Issue:</strong> Certificate warnings with SSL interception</li>
      <li><strong>Solution:</strong> Properly deploy CA certificates, use certificate pinning exceptions</li>
    </ul>
  `
}; 