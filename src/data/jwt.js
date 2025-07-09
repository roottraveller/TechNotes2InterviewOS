export const jwt = {
  id: 'jwt',
  title: 'JWT',
  content: `
<h2>Definition</h2>
<p>JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.</p>

<h2>JWT Structure</h2>
<p>JWT consists of three parts separated by dots (.): <strong>Header.Payload.Signature</strong></p>

<div class="code-block">
  <div class="code-label">Example JWT</div>
  <pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>
</div>

<h2>Header</h2>
<p>Contains metadata about the token:</p>
<ul>
  <li><strong>alg</strong>: Algorithm used for signing</li>
  <li><strong>typ</strong>: Token type (JWT)</li>
  <li><strong>kid</strong>: Key ID for signature verification</li>
</ul>

<h2>Payload Claims</h2>
<p>Contains the actual data and claims about the user or application.</p>

<h2>Common Claims</h2>
<ul>
  <li><strong>iss</strong>: Issuer of the token</li>
  <li><strong>sub</strong>: Subject (user ID)</li>
  <li><strong>aud</strong>: Audience (intended recipient)</li>
  <li><strong>exp</strong>: Expiration time</li>
  <li><strong>iat</strong>: Issued at time</li>
  <li><strong>nbf</strong>: Not before time</li>
</ul>

<h2>Advantages</h2>
<ul>
  <li><strong>Stateless</strong>: No server-side session storage</li>
  <li><strong>Compact</strong>: Smaller than XML-based tokens</li>
  <li><strong>Self-contained</strong>: All info in the token</li>
  <li><strong>Cross-domain</strong>: Works across different domains</li>
</ul>

<h2>Security Considerations</h2>
<ul>
  <li><strong>Secret Management</strong>: Protect signing keys</li>
  <li><strong>Token Expiration</strong>: Use short lifetimes</li>
  <li><strong>Sensitive Data</strong>: Don't store in payload</li>
  <li><strong>HTTPS Only</strong>: Always use secure transmission</li>
</ul>

<h2>Use Cases</h2>
<ul>
  <li><strong>Authentication</strong>: User login sessions</li>
  <li><strong>Authorization</strong>: API access control</li>
  <li><strong>Information Exchange</strong>: Secure data transfer</li>
  <li><strong>Single Sign-On</strong>: Cross-application authentication</li>
</ul>

<h2>Interview Questions</h2>
<div class="interview-qa">
  <h3>Q: What are the main differences between JWT and session-based authentication?</h3>
  <p><strong>A:</strong> JWT is stateless (no server storage), while sessions require server-side storage. JWT is better for scalability and microservices, but sessions offer better security control.</p>
</div>
`
}; 