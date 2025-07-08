export const httpVsHttps = {
  id: 'http-vs-https',
  title: 'HTTP vs HTTPS',
  content: `
<p>HTTP (Hypertext Transfer Protocol) and HTTPS (HTTP Secure) are the foundation of data communication on the World Wide Web. Understanding their differences is crucial for web security and performance.</p>

    <h3>HTTP (Hypertext Transfer Protocol)</h3>
    <p>HTTP requests and responses are typically sent and received over the network as plain text. The content of HTTP messages, including headers and message bodies, is human-readable and not encrypted by default. It typically uses port 80 for communication.</p>

    <h4>HTTP Characteristics</h4>
    <ul>
      <li><strong>Plain Text:</strong> All data transmitted in readable format</li>
      <li><strong>No Encryption:</strong> Vulnerable to eavesdropping</li>
      <li><strong>Port 80:</strong> Default port for HTTP traffic</li>
      <li><strong>Faster:</strong> No encryption overhead</li>
      <li><strong>No Certificate:</strong> No SSL/TLS certificate required</li>
    </ul>

    <h3>HTTPS (HTTP Secure)</h3>
    <p>HTTPS is essentially HTTP, but secure. Before the actual data transfer begins, the client and server perform a TLS handshake. This handshake involves the server sending its SSL certificate to the client to verify the server's identity. The certificate contains the server's public key and is issued by a trusted Certificate Authority (CA). It uses port 443 for communication.</p>

    <h4>HTTPS Characteristics</h4>
    <ul>
      <li><strong>Encrypted:</strong> All data encrypted using TLS/SSL</li>
      <li><strong>Secure:</strong> Protected against eavesdropping and tampering</li>
      <li><strong>Port 443:</strong> Default port for HTTPS traffic</li>
      <li><strong>Certificate Required:</strong> Needs valid SSL/TLS certificate</li>
      <li><strong>SEO Benefits:</strong> Search engines prefer HTTPS sites</li>
    </ul>

    <h3>TLS/SSL Handshake Process</h3>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>1. Client Hello
   - Client sends supported TLS versions
   - Cipher suites it supports
   - Random number (Client Random)

2. Server Hello
   - Server chooses TLS version and cipher suite
   - Sends its certificate
   - Random number (Server Random)

3. Certificate Verification
   - Client verifies server certificate
   - Checks CA signature
   - Validates domain name

4. Key Exchange
   - Client generates pre-master secret
   - Encrypts with server's public key
   - Sends to server

5. Session Keys Generation
   - Both derive session keys from:
     * Client Random
     * Server Random
     * Pre-master Secret

6. Finished Messages
   - Client sends encrypted "finished" message
   - Server sends encrypted "finished" message

7. Secure Communication Established
   - All data encrypted with session keys</code></pre>
    </div>

    <h3>Key Differences</h3>
    
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>HTTP</th>
          <th>HTTPS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Security</strong></td>
          <td>No encryption</td>
          <td>TLS/SSL encryption</td>
        </tr>
        <tr>
          <td><strong>Port</strong></td>
          <td>80</td>
          <td>443</td>
        </tr>
        <tr>
          <td><strong>URL Prefix</strong></td>
          <td>http://</td>
          <td>https://</td>
        </tr>
        <tr>
          <td><strong>Certificate</strong></td>
          <td>Not required</td>
          <td>SSL/TLS certificate required</td>
        </tr>
        <tr>
          <td><strong>Speed</strong></td>
          <td>Faster (no encryption)</td>
          <td>Slightly slower (encryption overhead)</td>
        </tr>
        <tr>
          <td><strong>SEO Ranking</strong></td>
          <td>Lower preference</td>
          <td>Higher preference</td>
        </tr>
        <tr>
          <td><strong>Browser Indicator</strong></td>
          <td>"Not Secure" warning</td>
          <td>Padlock icon</td>
        </tr>
      </tbody>
    </table>

    <h3>Security Benefits of HTTPS</h3>
    
    <h4>Encryption</h4>
    <ul>
      <li>All data encrypted in transit</li>
      <li>Protects sensitive information (passwords, credit cards)</li>
      <li>Prevents packet sniffing</li>
      <li>Guards against man-in-the-middle attacks</li>
    </ul>

    <h4>Authentication</h4>
    <ul>
      <li>Verifies server identity</li>
      <li>Prevents impersonation</li>
      <li>Certificate chain validation</li>
      <li>Domain ownership verification</li>
    </ul>

    <h4>Data Integrity</h4>
    <ul>
      <li>Detects data tampering</li>
      <li>Message authentication codes (MAC)</li>
      <li>Prevents content injection</li>
      <li>Ensures data hasn't been modified</li>
    </ul>

    <h3>Certificate Types</h3>
    
    <h4>Domain Validation (DV)</h4>
    <ul>
      <li>Basic level of validation</li>
      <li>Verifies domain ownership only</li>
      <li>Quick issuance (minutes)</li>
      <li>Suitable for blogs, personal sites</li>
    </ul>

    <h4>Organization Validation (OV)</h4>
    <ul>
      <li>Verifies organization identity</li>
      <li>More thorough vetting process</li>
      <li>Takes days to issue</li>
      <li>Shows organization name in certificate</li>
    </ul>

    <h4>Extended Validation (EV)</h4>
    <ul>
      <li>Highest level of validation</li>
      <li>Extensive verification process</li>
      <li>Green address bar (in older browsers)</li>
      <li>Best for e-commerce, banking</li>
    </ul>

    <h3>Certificate Authorities (CAs)</h3>
    
    <h4>Popular CAs</h4>
    <ul>
      <li><strong>Let's Encrypt:</strong> Free, automated certificates</li>
      <li><strong>DigiCert:</strong> Enterprise-grade certificates</li>
      <li><strong>Comodo/Sectigo:</strong> Wide range of options</li>
      <li><strong>GlobalSign:</strong> International presence</li>
      <li><strong>GoDaddy:</strong> Popular with small businesses</li>
    </ul>

    <h3>HTTPS Implementation Best Practices</h3>
    
    <h4>Certificate Management</h4>
    <ul>
      <li>Use certificates from trusted CAs</li>
      <li>Implement automatic renewal</li>
      <li>Monitor expiration dates</li>
      <li>Use wildcard certificates for subdomains</li>
    </ul>

    <h4>Security Headers</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code># Strict Transport Security
Strict-Transport-Security: max-age=31536000; includeSubDomains

# Content Security Policy
Content-Security-Policy: default-src 'self'

# X-Frame-Options
X-Frame-Options: DENY

# X-Content-Type-Options
X-Content-Type-Options: nosniff</code></pre>
    </div>

    <h4>Performance Optimization</h4>
    <ul>
      <li><strong>HTTP/2:</strong> Multiplexing over single connection</li>
      <li><strong>OCSP Stapling:</strong> Faster certificate validation</li>
      <li><strong>Session Resumption:</strong> Reuse TLS sessions</li>
      <li><strong>TLS 1.3:</strong> Faster handshake (1-RTT or 0-RTT)</li>
    </ul>

    <h3>Common HTTPS Issues</h3>
    
    <h4>Mixed Content</h4>
    <ul>
      <li>HTTPS page loading HTTP resources</li>
      <li>Browsers block or warn about mixed content</li>
      <li>Solution: Use protocol-relative URLs or HTTPS everywhere</li>
    </ul>

    <h4>Certificate Errors</h4>
    <ul>
      <li><strong>Expired Certificate:</strong> Renew immediately</li>
      <li><strong>Self-Signed Certificate:</strong> Not trusted by browsers</li>
      <li><strong>Domain Mismatch:</strong> Certificate doesn't match domain</li>
      <li><strong>Untrusted CA:</strong> Certificate from unknown authority</li>
    </ul>

    <h3>Migration from HTTP to HTTPS</h3>
    
    <ol>
      <li><strong>Obtain SSL Certificate:</strong> Choose appropriate type</li>
      <li><strong>Install Certificate:</strong> Configure web server</li>
      <li><strong>Update Internal Links:</strong> Change to HTTPS</li>
      <li><strong>Set Up Redirects:</strong> 301 redirect HTTP to HTTPS</li>
      <li><strong>Update External Services:</strong> APIs, CDNs, analytics</li>
      <li><strong>Submit to Search Engines:</strong> Update sitemap</li>
      <li><strong>Monitor for Issues:</strong> Check for mixed content</li>
    </ol>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://www.cloudflare.com/learning/ssl/why-is-http-not-secure/" target="_blank">Why is HTTP not secure? - Cloudflare</a></li>
      <li><a href="https://blog.bytebytego.com/p/how-https-works-youtube-diagram-as" target="_blank">How HTTPS Works - ByteByteGo</a></li>
    </ul>
`
}; 