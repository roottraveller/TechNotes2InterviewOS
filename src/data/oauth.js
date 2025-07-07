export const oauth = {
  id: 'oauth',
  title: 'OAuth 2.0',
  content: `# OAuth 2.0

## Definition
OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts on behalf of the user.

## Key Roles
- **Resource Owner**: User who owns the data
- **Client**: Application requesting access
- **Resource Server**: API server hosting protected resources
- **Authorization Server**: Issues access tokens

## Grant Types
- **Authorization Code**: Most secure for web apps
- **Implicit**: For browser-based apps (deprecated)
- **Resource Owner Password**: Direct credentials (discouraged)
- **Client Credentials**: Machine-to-machine
- **Refresh Token**: Obtain new access tokens

## Authorization Code Flow
1. Client redirects user to authorization server
2. User authenticates and grants permission
3. Authorization server redirects back with code
4. Client exchanges code for access token
5. Client uses token to access protected resources

## Tokens
- **Access Token**: Short-lived token for API access
- **Refresh Token**: Long-lived token to get new access tokens
- **ID Token**: OpenID Connect identity information

## Scopes
Define the level of access requested:
- read:profile
- write:posts
- admin:users

## Security Best Practices
- Use HTTPS everywhere
- Validate redirect URIs
- Short-lived access tokens
- Secure token storage
- PKCE for public clients

## Common Vulnerabilities
- Authorization code interception
- Redirect URI manipulation
- Token leakage
- CSRF attacks

## OpenID Connect
Extension of OAuth 2.0 for authentication, adds ID tokens

## Interview Questions
**Q: What's the difference between OAuth and OpenID Connect?**
A: OAuth is for authorization (what you can do), while OpenID Connect adds authentication (who you are) on top of OAuth.`
}; 