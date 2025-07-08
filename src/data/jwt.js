export const jwt = {
  id: 'jwt',
  title: 'JWT (JSON Web Token)',
  content: `
## Definition
JWT is a compact, URL-safe token format for securely transmitting information between parties as a JSON object.

## JWT Structure
Three parts separated by dots (.):
1. **Header**: Algorithm and token type
2. **Payload**: Claims (data)
3. **Signature**: Verify integrity

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
\`\`\`

## Header
\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

## Payload Claims
- **Registered**: iss, exp, sub, aud, iat
- **Public**: Defined in IANA registry
- **Private**: Custom claims

## Common Claims
- **iss**: Issuer
- **exp**: Expiration time
- **sub**: Subject
- **aud**: Audience
- **iat**: Issued at
- **nbf**: Not before

## Advantages
- **Stateless**: No server-side storage needed
- **Self-contained**: All info in token
- **Compact**: URL-safe encoding
- **Secure**: Cryptographically signed

## Security Considerations
- Use HTTPS only
- Short expiration times
- Secure storage (httpOnly cookies)
- Validate signatures
- Check expiration

## Use Cases
- **Authentication**: User login tokens
- **Authorization**: Access control
- **Information Exchange**: Secure data transfer
- **Single Sign-On**: Cross-domain authentication

## Interview Questions
**Q: What are the security risks of using JWT?**
A: Token theft, no server-side revocation, payload visibility, and potential for replay attacks if not properly secured.
`
}; 