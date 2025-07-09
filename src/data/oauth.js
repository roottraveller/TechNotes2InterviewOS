export const oauth = {
  id: 'oauth',
  title: 'OAuth',
  content: `
<h2>Definition</h2>
<p>OAuth is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service.</p>

<h2>Key Roles</h2>
<ul>
  <li><strong>Resource Owner</strong>: User who owns the data</li>
  <li><strong>Client</strong>: Application requesting access</li>
  <li><strong>Authorization Server</strong>: Issues access tokens</li>
  <li><strong>Resource Server</strong>: Hosts protected resources</li>
</ul>

<h2>Grant Types</h2>
<ul>
  <li><strong>Authorization Code</strong>: Most secure, for web apps</li>
  <li><strong>Implicit</strong>: For single-page applications</li>
  <li><strong>Resource Owner Password</strong>: For trusted applications</li>
  <li><strong>Client Credentials</strong>: For server-to-server</li>
</ul>

<h2>Authorization Code Flow</h2>
<ol>
  <li>Client redirects user to authorization server</li>
  <li>User authenticates and grants permission</li>
  <li>Authorization server redirects back with code</li>
  <li>Client exchanges code for access token</li>
  <li>Client uses token to access protected resources</li>
</ol>

<h2>Tokens</h2>
<ul>
  <li><strong>Access Token</strong>: Short-lived, grants access</li>
  <li><strong>Refresh Token</strong>: Long-lived, gets new access tokens</li>
  <li><strong>Bearer Token</strong>: Most common token type</li>
</ul>

<h2>Scopes</h2>
<ul>
  <li><strong>Read</strong>: View user data</li>
  <li><strong>Write</strong>: Modify user data</li>
  <li><strong>Profile</strong>: Access basic profile information</li>
  <li><strong>Email</strong>: Access email address</li>
</ul>

<h2>Security Best Practices</h2>
<ul>
  <li><strong>HTTPS Only</strong>: All OAuth communications</li>
  <li><strong>State Parameter</strong>: Prevent CSRF attacks</li>
  <li><strong>Validate Redirect URIs</strong>: Prevent authorization code interception</li>
  <li><strong>Short Token Lifetimes</strong>: Minimize exposure window</li>
</ul>

<h2>Common Vulnerabilities</h2>
<ul>
  <li><strong>Authorization Code Interception</strong>: Insecure redirect URIs</li>
  <li><strong>CSRF Attacks</strong>: Missing state parameter</li>
  <li><strong>Token Leakage</strong>: Insecure token storage</li>
</ul>

<h2>OpenID Connect</h2>
<p>Extension of OAuth 2.0 that adds identity layer with ID tokens for authentication.</p>

<h2>Interview Questions</h2>
<div class="interview-qa">
  <h3>Q: What's the difference between OAuth and OpenID Connect?</h3>
  <p><strong>A:</strong> OAuth is for authorization (what you can do), while OpenID Connect adds authentication (who you are) on top of OAuth.</p>
</div>
`
}; 