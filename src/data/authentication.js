export const authentication = {
  id: 'authentication',
  title: 'Authentication',
  content: `
## Definition
Authentication is the process of verifying the identity of a user, device, or system attempting to access a resource.

## Authentication Factors
- **Something you know**: Passwords, PINs
- **Something you have**: Tokens, smart cards, phones
- **Something you are**: Biometrics (fingerprint, face, voice)
- **Something you do**: Behavioral patterns
- **Somewhere you are**: Location-based authentication

## Authentication Methods
- **Password-based**: Traditional username/password
- **Token-based**: JWT, OAuth tokens
- **Certificate-based**: Digital certificates
- **Biometric**: Fingerprint, facial recognition
- **Multi-factor (MFA)**: Combination of factors

## Session Management
- **Session Tokens**: Server-side session storage
- **JWT**: Stateless token-based authentication
- **Session Timeout**: Automatic logout after inactivity
- **Session Fixation**: Regenerate session IDs

## OAuth 2.0 Flow
1. Authorization request
2. User grants permission
3. Authorization code returned
4. Exchange code for access token
5. Use token to access resources

## Security Considerations
- **Password Hashing**: bcrypt, Argon2
- **Salt**: Random data to prevent rainbow tables
- **Rate Limiting**: Prevent brute force attacks
- **Account Lockout**: Temporary disable after failed attempts
- **Secure Transmission**: HTTPS only

## Common Vulnerabilities
- Weak passwords
- Session hijacking
- Credential stuffing
- Password spraying
- Session fixation

## Interview Questions
**Q: What's the difference between authentication and authorization?**
A: Authentication verifies who you are, while authorization determines what you're allowed to do.
`
}; 