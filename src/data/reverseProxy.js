export const reverseProxy = {
  id: 'reverse-proxy',
  title: 'Reverse Proxy',
  content: `
    <h2>Reverse Proxy</h2>
    <p>A reverse proxy is a server that sits between clients (users) and backend servers, forwarding client requests to the appropriate backend server and then returning the server's response to the client. Unlike a forward proxy that acts on behalf of clients, a reverse proxy acts on behalf of servers.</p>

    <h3>How Reverse Proxy Works</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Reverse Proxy Architecture
┌────────────┐      ┌────────────────┐      ┌─────────────┐
│   Client   │      │ Reverse Proxy  │      │  Backend    │
│ (Browser)  │─────>│   (Public IP)  │─────>│  Servers    │
│            │<─────│                │<─────│ (Private)   │
└────────────┘      └────────────────┘      └─────────────┘
                            │
                    ┌───────┴────────┐
                    │                │
              ┌─────▼────┐    ┌─────▼────┐
              │ Server 1 │    │ Server 2 │
              └──────────┘    └──────────┘</code></pre>
    </div>

    <h3>Key Functions of Reverse Proxy</h3>
    
    <h4>1. Load Balancing</h4>
    <p>Distributes incoming requests across multiple backend servers.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Nginx Load Balancing Configuration
upstream backend_servers {
    # Round-robin load balancing (default)
    server backend1.example.com:8080;
    server backend2.example.com:8080;
    server backend3.example.com:8080;
    
    # Weighted load balancing
    server backend4.example.com:8080 weight=3;
    server backend5.example.com:8080 weight=1;
    
    # Backup server
    server backup.example.com:8080 backup;
    
    # Health check
    server backend6.example.com:8080 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}</code></pre>
    </div>

    <h4>2. SSL Termination</h4>
    <p>Handles SSL/TLS encryption and decryption, relieving backend servers of this computational burden.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// SSL Termination Configuration
server {
    listen 443 ssl http2;
    server_name secure.example.com;
    
    # SSL Configuration
    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;
    
    # SSL Optimization
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    location / {
        # Backend servers receive HTTP traffic
        proxy_pass http://backend_servers;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}</code></pre>
    </div>

    <h4>3. Caching</h4>
    <p>Stores frequently requested content to reduce backend load.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Caching Configuration
proxy_cache_path /var/cache/nginx levels=1:2 
                 keys_zone=my_cache:10m max_size=10g 
                 inactive=60m use_temp_path=off;

server {
    listen 80;
    server_name cached.example.com;
    
    location / {
        proxy_cache my_cache;
        proxy_cache_key "$scheme$request_method$host$request_uri";
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 1m;
        proxy_cache_valid any 1m;
        
        # Cache bypass conditions
        proxy_cache_bypass $http_pragma $http_authorization;
        
        # Add cache status header
        add_header X-Cache-Status $upstream_cache_status;
        
        proxy_pass http://backend_servers;
    }
    
    # Cache purging endpoint
    location ~ /purge(/.*) {
        allow 127.0.0.1;
        deny all;
        proxy_cache_purge my_cache "$scheme$request_method$host$1";
    }
}</code></pre>
    </div>

    <h4>4. Security and Access Control</h4>
    <p>Acts as a shield, hiding backend server details and implementing security policies.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Security Configuration
server {
    listen 80;
    server_name secure.example.com;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_conn_zone $binary_remote_addr zone=addr:10m;
    
    # IP whitelisting/blacklisting
    geo $blocked_ip {
        default         0;
        192.168.1.0/24  0;  # Whitelist
        10.0.0.0/8      0;  # Whitelist
        123.456.789.0   1;  # Blacklist
    }
    
    location /api {
        # Check if IP is blocked
        if ($blocked_ip) {
            return 403;
        }
        
        # Apply rate limiting
        limit_req zone=api_limit burst=20 nodelay;
        limit_conn addr 10;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";
        add_header X-XSS-Protection "1; mode=block";
        add_header Content-Security-Policy "default-src 'self'";
        
        # Hide backend server info
        proxy_hide_header Server;
        proxy_hide_header X-Powered-By;
        
        proxy_pass http://backend_servers;
    }
}</code></pre>
    </div>

    <h3>Load Balancing Algorithms</h3>
    
    <h4>1. Round Robin</h4>
    <p>Requests are distributed sequentially to each server.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Round Robin Example
Request 1 → Server A
Request 2 → Server B
Request 3 → Server C
Request 4 → Server A  // Cycle repeats
Request 5 → Server B
Request 6 → Server C</code></pre>
    </div>

    <h4>2. Least Connections</h4>
    <p>Routes requests to the server with the fewest active connections.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Nginx Least Connections
upstream backend {
    least_conn;
    server backend1.example.com:8080;
    server backend2.example.com:8080;
    server backend3.example.com:8080;
}</code></pre>
    </div>

    <h4>3. IP Hash</h4>
    <p>Routes requests from the same client IP to the same server (session persistence).</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// IP Hash Configuration
upstream backend {
    ip_hash;
    server backend1.example.com:8080;
    server backend2.example.com:8080;
    server backend3.example.com:8080;
}

// How it works:
// hash(client_ip) % num_servers = server_index
// 192.168.1.100 → always goes to Server 2
// 192.168.1.101 → always goes to Server 1</code></pre>
    </div>

    <h4>4. Weighted Round Robin</h4>
    <p>Distributes more requests to servers with higher weights.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Weighted Distribution
upstream backend {
    server backend1.example.com:8080 weight=5;  # 50% of requests
    server backend2.example.com:8080 weight=3;  # 30% of requests
    server backend3.example.com:8080 weight=2;  # 20% of requests
}</code></pre>
    </div>

    <h3>Advanced Features</h3>
    
    <h4>1. Content-Based Routing</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Route based on URL path
server {
    listen 80;
    
    location /api {
        proxy_pass http://api_servers;
    }
    
    location /images {
        proxy_pass http://image_servers;
    }
    
    location /videos {
        proxy_pass http://video_servers;
    }
    
    location / {
        proxy_pass http://web_servers;
    }
}

// Route based on headers
map $http_accept $backend_pool {
    ~*json    api_servers;
    ~*html    web_servers;
    default   web_servers;
}

server {
    location / {
        proxy_pass http://$backend_pool;
    }
}</code></pre>
    </div>

    <h4>2. Request/Response Modification</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Modify requests and responses
server {
    location / {
        # Add custom headers to request
        proxy_set_header X-Custom-Header "value";
        proxy_set_header Authorization "Bearer $http_x_auth_token";
        
        # Remove sensitive headers from request
        proxy_set_header Cookie "";
        
        # Modify response headers
        proxy_hide_header X-Powered-By;
        add_header X-Served-By "Reverse-Proxy-01";
        
        # Rewrite URLs in response
        sub_filter 'http://backend.internal' 'https://example.com';
        sub_filter_once off;
        
        proxy_pass http://backend;
    }
}</code></pre>
    </div>

    <h4>3. WebSocket Support</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// WebSocket Proxy Configuration
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    
    location /ws {
        proxy_pass http://websocket_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        
        # WebSocket specific timeouts
        proxy_connect_timeout 7d;
        proxy_send_timeout 7d;
        proxy_read_timeout 7d;
    }
}</code></pre>
    </div>

    <h4>4. Health Checks</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Active Health Checks (Nginx Plus)
upstream backend {
    zone backend 64k;
    
    server backend1.example.com:8080;
    server backend2.example.com:8080;
    server backend3.example.com:8080;
    
    # Health check configuration
    health_check interval=5s fails=3 passes=2 uri=/health;
}

// Passive Health Checks (Open Source Nginx)
upstream backend {
    server backend1.example.com:8080 max_fails=3 fail_timeout=30s;
    server backend2.example.com:8080 max_fails=3 fail_timeout=30s;
}

// Custom health check endpoint
location /health {
    access_log off;
    return 200 "healthy\\n";
    add_header Content-Type text/plain;
}</code></pre>
    </div>

    <h3>Implementation Examples</h3>
    
    <h4>1. HAProxy Configuration</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># HAProxy Reverse Proxy Configuration
global
    maxconn 4096
    log /dev/log local0
    chroot /var/lib/haproxy
    user haproxy
    group haproxy
    daemon

defaults
    log     global
    mode    http
    option  httplog
    option  dontlognull
    timeout connect 5000
    timeout client  50000
    timeout server  50000

frontend web_frontend
    bind *:80
    bind *:443 ssl crt /etc/ssl/certs/site.pem
    
    # ACL definitions
    acl is_websocket hdr(Upgrade) -i WebSocket
    acl is_api path_beg /api
    
    # Use different backends
    use_backend websocket_backend if is_websocket
    use_backend api_backend if is_api
    default_backend web_backend

backend web_backend
    balance roundrobin
    option httpchk GET /health
    http-check expect status 200
    
    server web1 192.168.1.10:8080 check
    server web2 192.168.1.11:8080 check
    server web3 192.168.1.12:8080 check backup

backend api_backend
    balance leastconn
    
    # Retry policy
    retry-on all-retryable-errors
    retries 3
    
    # Add custom headers
    http-request set-header X-Forwarded-Port %[dst_port]
    http-request add-header X-Real-IP %[src]
    
    server api1 192.168.2.10:8080 check
    server api2 192.168.2.11:8080 check

backend websocket_backend
    balance source
    
    server ws1 192.168.3.10:8080 check
    server ws2 192.168.3.11:8080 check</code></pre>
    </div>

    <h4>2. Apache mod_proxy</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Apache Reverse Proxy Configuration
<VirtualHost *:80>
    ServerName example.com
    
    # Enable proxy modules
    ProxyRequests Off
    ProxyPreserveHost On
    
    # Load balancing with mod_proxy_balancer
    <Proxy "balancer://mycluster">
        BalancerMember "http://backend1.example.com:8080" route=1
        BalancerMember "http://backend2.example.com:8080" route=2
        BalancerMember "http://backend3.example.com:8080" route=3
        
        # Sticky sessions
        ProxySet stickysession=ROUTEID
    </Proxy>
    
    # Proxy rules
    ProxyPass "/" "balancer://mycluster/"
    ProxyPassReverse "/" "balancer://mycluster/"
    
    # Headers
    RequestHeader set X-Forwarded-Proto "http"
    RequestHeader set X-Forwarded-Port "80"
    
    # Error handling
    ProxyErrorOverride On
    ErrorDocument 503 /maintenance.html
</VirtualHost>

# SSL Virtual Host
<VirtualHost *:443>
    ServerName example.com
    
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/example.crt
    SSLCertificateKeyFile /etc/ssl/private/example.key
    
    # Same proxy configuration as above
    ProxyPass "/" "balancer://mycluster/"
    ProxyPassReverse "/" "balancer://mycluster/"
    
    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-Port "443"
</VirtualHost></code></pre>
    </div>

    <h3>Performance Optimization</h3>
    
    <h4>1. Connection Pooling</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Nginx keepalive connections
upstream backend {
    server backend1.example.com:8080;
    server backend2.example.com:8080;
    
    # Maintain persistent connections
    keepalive 32;
    keepalive_timeout 60s;
    keepalive_requests 100;
}

server {
    location / {
        proxy_pass http://backend;
        
        # Enable keepalive for upstream
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}</code></pre>
    </div>

    <h4>2. Compression</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Enable compression
server {
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss;
    gzip_disable "MSIE [1-6]\\.";
    
    # Brotli compression (if module available)
    brotli on;
    brotli_comp_level 6;
    brotli_types text/plain text/css text/xml text/javascript 
                 application/json application/javascript application/xml+rss;
}</code></pre>
    </div>

    <h4>3. Buffer Optimization</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Buffer settings for better performance
server {
    location / {
        # Buffering settings
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;
        
        # For large responses
        proxy_max_temp_file_size 1024m;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        proxy_pass http://backend;
    }
}</code></pre>
    </div>

    <h3>Monitoring and Logging</h3>
    
    <h4>1. Access Logging</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Custom log format
log_format proxy_log '$remote_addr - $remote_user [$time_local] '
                     '"$request" $status $body_bytes_sent '
                     '"$http_referer" "$http_user_agent" '
                     'rt=$request_time uct="$upstream_connect_time" '
                     'uht="$upstream_header_time" urt="$upstream_response_time" '
                     'us="$upstream_status" cs=$upstream_cache_status';

server {
    access_log /var/log/nginx/proxy_access.log proxy_log;
    
    location / {
        proxy_pass http://backend;
    }
}</code></pre>
    </div>

    <h4>2. Metrics and Monitoring</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Nginx status endpoint
server {
    listen 8080;
    server_name localhost;
    
    location /nginx_status {
        stub_status on;
        access_log off;
        allow 127.0.0.1;
        deny all;
    }
}

// Prometheus metrics (with nginx-prometheus-exporter)
server {
    listen 9113;
    
    location /metrics {
        content_by_lua_block {
            metric_connections:set(ngx.var.connections_active, 
                                 {"active"})
            metric_requests:inc(1, {ngx.var.server_name, 
                                  ngx.var.status})
            prometheus:collect()
        }
    }
}</code></pre>
    </div>

    <h3>Common Use Cases</h3>
    
    <h4>1. Microservices Gateway</h4>
    <ul>
      <li>Single entry point for multiple services</li>
      <li>Service discovery integration</li>
      <li>Request routing based on paths</li>
      <li>Authentication and authorization</li>
    </ul>

    <h4>2. CDN Origin Shield</h4>
    <ul>
      <li>Cache frequently accessed content</li>
      <li>Reduce origin server load</li>
      <li>Geographic distribution</li>
      <li>DDoS protection</li>
    </ul>

    <h4>3. Application Delivery Controller</h4>
    <ul>
      <li>SSL/TLS termination</li>
      <li>Compression and optimization</li>
      <li>Content switching</li>
      <li>Application firewall</li>
    </ul>

    <h3>Reverse Proxy vs Load Balancer</h3>
    
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Reverse Proxy</th>
          <th>Load Balancer</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Primary Purpose</td>
          <td>Request forwarding & caching</td>
          <td>Distribute load</td>
        </tr>
        <tr>
          <td>Layer</td>
          <td>Layer 7 (Application)</td>
          <td>Layer 4 or 7</td>
        </tr>
        <tr>
          <td>Content Awareness</td>
          <td>Yes</td>
          <td>Sometimes</td>
        </tr>
        <tr>
          <td>Caching</td>
          <td>Common feature</td>
          <td>Not typical</td>
        </tr>
        <tr>
          <td>SSL Termination</td>
          <td>Common</td>
          <td>Optional</td>
        </tr>
        <tr>
          <td>URL Rewriting</td>
          <td>Yes</td>
          <td>Limited</td>
        </tr>
      </tbody>
    </table>

    <h3>Best Practices</h3>
    
    <ol>
      <li><strong>Security Headers:</strong> Always add security headers</li>
      <li><strong>Health Checks:</strong> Implement proper health checking</li>
      <li><strong>Logging:</strong> Log enough detail for debugging</li>
      <li><strong>Timeouts:</strong> Set appropriate timeout values</li>
      <li><strong>Caching:</strong> Cache static content aggressively</li>
      <li><strong>Monitoring:</strong> Monitor performance metrics</li>
      <li><strong>Failover:</strong> Plan for backend failures</li>
      <li><strong>Rate Limiting:</strong> Protect against abuse</li>
    </ol>
  `
}; 