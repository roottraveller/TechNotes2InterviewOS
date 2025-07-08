export const cors = {
  id: 'cors',
  title: 'CORS (Cross-Origin Resource Sharing)',
  content: `
<p>Web browsers enforce a security policy known as the Same-Origin Policy, which restricts web pages from making requests to resources (e.g., APIs, images, scripts) on domains other than the one that served the web page.</p>

    <h3>Same-Origin Policy</h3>
    <p>Two URLs have the same origin if they have identical:</p>
    <ul>
      <li><strong>Protocol:</strong> http vs https</li>
      <li><strong>Domain:</strong> example.com vs api.example.com</li>
      <li><strong>Port:</strong> :80 vs :8080</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>Origin: https://example.com:443

Same Origin:
✓ https://example.com/page1
✓ https://example.com/api/data

Different Origin:
✗ http://example.com         (different protocol)
✗ https://api.example.com    (different subdomain)
✗ https://example.com:8080   (different port)
✗ https://another.com        (different domain)</code></pre>
    </div>

    <h3>How CORS Works</h3>
    <p>To enable cross-origin (i.e., CDN) requests, the server must include specific CORS headers in its response to indicate which origins are allowed to access the requested resource.</p>

    <h4>Simple Requests</h4>
    <p>Requests that meet all these criteria:</p>
    <ul>
      <li>Methods: GET, HEAD, POST</li>
      <li>Headers: Only simple headers (Accept, Accept-Language, Content-Language, Content-Type)</li>
      <li>Content-Type: application/x-www-form-urlencoded, multipart/form-data, or text/plain</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Simple CORS Request Flow

1. Browser sends request with Origin header:
   GET /api/data HTTP/1.1
   Host: api.example.com
   Origin: https://app.example.com

2. Server responds with CORS headers:
   HTTP/1.1 200 OK
   Access-Control-Allow-Origin: https://app.example.com
   Content-Type: application/json
   
   {"data": "response"}</code></pre>
    </div>

    <h4>Preflight Requests</h4>
    <p>For complex requests, browsers send a preflight OPTIONS request first:</p>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Preflight Request Flow

1. Browser sends preflight request:
   OPTIONS /api/data HTTP/1.1
   Host: api.example.com
   Origin: https://app.example.com
   Access-Control-Request-Method: PUT
   Access-Control-Request-Headers: Content-Type, X-Custom-Header

2. Server responds with allowed methods/headers:
   HTTP/1.1 204 No Content
   Access-Control-Allow-Origin: https://app.example.com
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
   Access-Control-Allow-Headers: Content-Type, X-Custom-Header
   Access-Control-Max-Age: 86400

3. If allowed, browser sends actual request:
   PUT /api/data HTTP/1.1
   Host: api.example.com
   Origin: https://app.example.com
   Content-Type: application/json
   X-Custom-Header: value</code></pre>
    </div>

    <h3>CORS Headers</h3>
    
    <h4>Response Headers (Server to Client)</h4>
    <table>
      <thead>
        <tr>
          <th>Header</th>
          <th>Description</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Access-Control-Allow-Origin</strong></td>
          <td>Specifies allowed origins</td>
          <td>https://example.com or *</td>
        </tr>
        <tr>
          <td><strong>Access-Control-Allow-Methods</strong></td>
          <td>Allowed HTTP methods</td>
          <td>GET, POST, PUT, DELETE</td>
        </tr>
        <tr>
          <td><strong>Access-Control-Allow-Headers</strong></td>
          <td>Allowed request headers</td>
          <td>Content-Type, Authorization</td>
        </tr>
        <tr>
          <td><strong>Access-Control-Allow-Credentials</strong></td>
          <td>Allow cookies/auth headers</td>
          <td>true</td>
        </tr>
        <tr>
          <td><strong>Access-Control-Max-Age</strong></td>
          <td>Cache preflight response (seconds)</td>
          <td>86400</td>
        </tr>
        <tr>
          <td><strong>Access-Control-Expose-Headers</strong></td>
          <td>Headers exposed to client</td>
          <td>X-Total-Count, X-Page</td>
        </tr>
      </tbody>
    </table>

    <h4>Request Headers (Client to Server)</h4>
    <ul>
      <li><strong>Origin:</strong> The origin of the request</li>
      <li><strong>Access-Control-Request-Method:</strong> Method for preflight</li>
      <li><strong>Access-Control-Request-Headers:</strong> Headers for preflight</li>
    </ul>

    <h3>Server Implementation Examples</h3>
    
    <h4>Node.js/Express</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Simple CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://app.example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  
  next();
});

// Using cors package
const cors = require('cors');
app.use(cors({
  origin: ['https://app.example.com', 'https://beta.example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));</code></pre>
    </div>

    <h4>Python/Flask</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# Enable CORS globally
CORS(app, origins=['https://app.example.com'])

# Or per route
@app.route('/api/data')
@cross_origin(origins=['https://app.example.com'])
def get_data():
    return jsonify({'data': 'response'})</code></pre>
    </div>

    <h3>Common CORS Scenarios</h3>
    
    <h4>1. Public API (Allow All Origins)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// ⚠️ Use with caution - allows any website
Access-Control-Allow-Origin: *

// Note: Cannot use * with credentials
// This will NOT work:
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true</code></pre>
    </div>

    <h4>2. Multiple Allowed Origins</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Dynamic origin checking
const allowedOrigins = [
  'https://app.example.com',
  'https://beta.example.com',
  'http://localhost:3000'  // Development
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});</code></pre>
    </div>

    <h4>3. Credentials (Cookies/Auth)</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Server must explicitly allow credentials
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://app.example.com

// Client must include credentials
fetch('https://api.example.com/data', {
  credentials: 'include'  // Send cookies
});</code></pre>
    </div>

    <h3>Security Considerations</h3>
    
    <h4>Common Mistakes</h4>
    <ul>
      <li><strong>Using * with credentials:</strong> Not allowed by specification</li>
      <li><strong>Reflecting any Origin:</strong> Security vulnerability</li>
      <li><strong>Allowing all headers:</strong> Can expose sensitive data</li>
      <li><strong>Long cache times:</strong> Makes policy changes difficult</li>
    </ul>

    <h4>Best Practices</h4>
    <ul>
      <li><strong>Whitelist origins:</strong> Only allow known, trusted origins</li>
      <li><strong>Validate origin:</strong> Don't blindly reflect the Origin header</li>
      <li><strong>Limit methods:</strong> Only allow necessary HTTP methods</li>
      <li><strong>Restrict headers:</strong> Only expose required headers</li>
      <li><strong>Short cache times:</strong> For preflight responses during development</li>
      <li><strong>HTTPS only:</strong> Use secure connections for sensitive data</li>
    </ul>

    <h3>Debugging CORS Issues</h3>
    
    <h4>Common Errors</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Browser Console Errors

1. No CORS headers:
   "Access to fetch at 'api.example.com' from origin 
   'app.example.com' has been blocked by CORS policy: 
   No 'Access-Control-Allow-Origin' header is present"

2. Origin not allowed:
   "The CORS protocol does not allow specifying a 
   wildcard (any) origin and credentials at the same time"

3. Method not allowed:
   "Method PUT is not allowed by 
   Access-Control-Allow-Methods in preflight response"</code></pre>
    </div>

    <h4>Debugging Steps</h4>
    <ol>
      <li>Check browser DevTools Network tab</li>
      <li>Look for OPTIONS preflight request</li>
      <li>Verify response headers</li>
      <li>Check server logs</li>
      <li>Test with curl to bypass CORS</li>
    </ol>

    <h3>Alternatives to CORS</h3>
    <ul>
      <li><strong>JSONP:</strong> Only for GET requests, security risks</li>
      <li><strong>Proxy Server:</strong> Route through same origin</li>
      <li><strong>WebSockets:</strong> Not subject to CORS</li>
      <li><strong>Server-Side Requests:</strong> Make API calls from backend</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank">MDN - Cross-Origin Resource Sharing (CORS)</a></li>
    </ul>
`
}; 