export const https = {
  id: 'https',
  title: 'HTTPS (HTTP Secure)',
  content: `# HTTPS (HTTP Secure)

## Definition
HTTPS is HTTP over TLS/SSL, providing encrypted communication between web browsers and servers.

## Key Features
- **Encryption**: Data is encrypted in transit
- **Authentication**: Verifies server identity
- **Integrity**: Prevents data tampering
- **Trust**: Uses certificate authorities

## TLS/SSL Handshake
1. Client Hello (supported ciphers)
2. Server Hello (chosen cipher, certificate)
3. Key exchange and verification
4. Encrypted communication begins

## Certificates
- **SSL Certificate**: Digital certificate for authentication
- **Certificate Authority (CA)**: Trusted third party
- **Public Key Infrastructure (PKI)**: Certificate management
- **Certificate Chain**: Root, intermediate, and end-entity certificates

## Benefits
- Data protection
- SEO advantages
- User trust
- Compliance requirements

## Performance Considerations
- Initial handshake overhead
- Encryption/decryption processing
- Certificate validation

## Interview Questions
**Q: What happens during the TLS handshake?**
A: Client and server negotiate encryption parameters, exchange certificates, and establish a secure connection.`
}; 