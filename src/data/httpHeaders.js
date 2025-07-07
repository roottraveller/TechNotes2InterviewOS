export const httpHeaders = {
  id: 'http-headers',
  title: 'HTTP Headers',
  content: `
    <h2>HTTP Headers</h2>
    <p>HTTP headers are key-value pairs sent between client and server that provide essential information about the request or response. They control caching, authentication, content negotiation, and many other aspects of HTTP communication.</p>

    <h3>ETag (Entity Tag) HTTP Header</h3>
    <p>ETag header is used by web servers and browsers to determine whether a resource (e.g., web pages, images, CSS files) has changed since it was last requested or cached.</p>
    
    <h4>Example</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>ETag: "686897696a7c876b7e"</code></pre>
    </div>

    <h4>How ETags Work</h4>
    <ol>
      <li>Server generates unique ETag for each resource version</li>
      <li>Client stores ETag with cached resource</li>
      <li>On subsequent requests, client sends If-None-Match header with ETag</li>
      <li>Server compares ETags:
        <ul>
          <li>If match: Returns 304 Not Modified (no body)</li>
          <li>If different: Returns 200 OK with new content and new ETag</li>
        </ul>
      </li>
    </ol>

    <h3>Authorization HTTP Header</h3>
    <p>The Authorization header contains credentials for authenticating the client with the server.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Authorization: &lt;scheme&gt; &lt;credentials&gt;</code></pre>
    </div>
    
    <p>&lt;scheme&gt; specifies the authentication scheme being used e.g., "Basic", "Bearer", "Digest".</p>

    <h4>Basic Authentication</h4>
    <p>In Basic Authentication, the &lt;credentials&gt; consist of the base64-encoded(username:password).</p>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==</code></pre>
    </div>

    <h4>Bearer Authentication</h4>
    <p>In Bearer Authentication, the &lt;credentials&gt; consist of a token (JWT) provided by the client.</p>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>
    </div>

    <h4>Digest Authentication</h4>
    <p>In Digest Authentication, the &lt;credentials&gt; contain various pieces of information, including the username, realm, nonce, URI, response, and other parameters.</p>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Authorization: Digest username="username", realm="example", nonce="abc123", uri="/resource", response="d41d8cd98f00b204e9800998ecf8427e"</code></pre>
    </div>

    <h3>Common Request Headers</h3>
    
    <h4>General Headers</h4>
    <ul>
      <li><strong>Host:</strong> Domain name of the server (required in HTTP/1.1)</li>
      <li><strong>User-Agent:</strong> Client software information</li>
      <li><strong>Accept:</strong> Content types client can process</li>
      <li><strong>Accept-Language:</strong> Preferred languages</li>
      <li><strong>Accept-Encoding:</strong> Supported compression methods</li>
      <li><strong>Connection:</strong> Connection management (keep-alive, close)</li>
    </ul>

    <h4>Content Headers</h4>
    <ul>
      <li><strong>Content-Type:</strong> Media type of the body</li>
      <li><strong>Content-Length:</strong> Size of the body in bytes</li>
      <li><strong>Content-Encoding:</strong> Compression applied to body</li>
    </ul>

    <h4>Conditional Headers</h4>
    <ul>
      <li><strong>If-Modified-Since:</strong> Return resource only if modified</li>
      <li><strong>If-None-Match:</strong> Return resource only if ETag doesn't match</li>
      <li><strong>If-Match:</strong> Perform action only if ETag matches</li>
    </ul>

    <h3>Common Response Headers</h3>
    
    <h4>Caching Headers</h4>
    <ul>
      <li><strong>Cache-Control:</strong> Caching directives</li>
      <li><strong>Expires:</strong> Expiration date/time</li>
      <li><strong>Last-Modified:</strong> Last modification date</li>
      <li><strong>ETag:</strong> Entity tag for cache validation</li>
    </ul>

    <h4>Security Headers</h4>
    <ul>
      <li><strong>Strict-Transport-Security:</strong> Force HTTPS connections</li>
      <li><strong>Content-Security-Policy:</strong> Control resource loading</li>
      <li><strong>X-Frame-Options:</strong> Clickjacking protection</li>
      <li><strong>X-Content-Type-Options:</strong> Prevent MIME sniffing</li>
      <li><strong>X-XSS-Protection:</strong> XSS filter control</li>
    </ul>

    <h4>CORS Headers</h4>
    <ul>
      <li><strong>Access-Control-Allow-Origin:</strong> Allowed origins</li>
      <li><strong>Access-Control-Allow-Methods:</strong> Allowed HTTP methods</li>
      <li><strong>Access-Control-Allow-Headers:</strong> Allowed request headers</li>
      <li><strong>Access-Control-Max-Age:</strong> Preflight cache duration</li>
    </ul>

    <h3>Header Examples</h3>
    
    <h4>Request Example</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>GET /api/users HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Cache-Control: no-cache
Connection: keep-alive</code></pre>
    </div>

    <h4>Response Example</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>HTTP/1.1 200 OK
Date: Mon, 23 May 2023 22:38:34 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 1234
Content-Encoding: gzip
Cache-Control: public, max-age=3600
ETag: "686897696a7c876b7e"
Last-Modified: Mon, 23 May 2023 20:00:00 GMT
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1684882734</code></pre>
    </div>

    <h3>Custom Headers</h3>
    
    <h4>Naming Conventions</h4>
    <ul>
      <li>Previously prefixed with X- (deprecated)</li>
      <li>Now use descriptive names without prefix</li>
      <li>Use hyphens, not underscores</li>
      <li>Case-insensitive but use Title-Case</li>
    </ul>

    <h4>Common Custom Headers</h4>
    <ul>
      <li><strong>X-Request-ID:</strong> Trace requests through systems</li>
      <li><strong>X-API-Key:</strong> API authentication</li>
      <li><strong>X-RateLimit-*:</strong> Rate limiting information</li>
      <li><strong>X-Forwarded-For:</strong> Original client IP through proxies</li>
      <li><strong>X-Real-IP:</strong> Real client IP address</li>
    </ul>

    <h3>Header Size Limits</h3>
    <ul>
      <li><strong>Apache:</strong> 8KB default</li>
      <li><strong>Nginx:</strong> 4KB-8KB default</li>
      <li><strong>IIS:</strong> 16KB default</li>
      <li><strong>Node.js:</strong> 80KB default</li>
      <li><strong>Recommendation:</strong> Keep total headers under 8KB</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>Minimize Header Size:</strong> Remove unnecessary headers</li>
      <li><strong>Use Standard Headers:</strong> Prefer standard over custom</li>
      <li><strong>Security Headers:</strong> Always include security headers</li>
      <li><strong>Compression:</strong> Enable for text content</li>
      <li><strong>Caching:</strong> Set appropriate cache headers</li>
      <li><strong>CORS:</strong> Configure correctly for APIs</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers" target="_blank">HTTP Headers - MDN</a></li>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag" target="_blank">ETag - MDN</a></li>
      <li><a href="https://www.educative.io/answers/what-is-an-etag-in-http" target="_blank">What is an ETag in HTTP - Educative</a></li>
    </ul>
  `
}; 