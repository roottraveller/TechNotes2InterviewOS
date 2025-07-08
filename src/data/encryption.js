export const encryption = {
  id: 'encryption',
  title: 'Encryption',
  content: `
## Definition
Encryption is the process of converting readable data (plaintext) into an unreadable format (ciphertext) to protect information from unauthorized access.

## Types of Encryption
- **Symmetric**: Same key for encryption and decryption
- **Asymmetric**: Different keys (public/private key pairs)
- **Hybrid**: Combination of symmetric and asymmetric

## Symmetric Encryption
- **AES**: Advanced Encryption Standard
- **DES**: Data Encryption Standard (deprecated)
- **3DES**: Triple DES
- **ChaCha20**: Modern stream cipher

## Asymmetric Encryption
- **RSA**: Rivest-Shamir-Adleman
- **ECC**: Elliptic Curve Cryptography
- **Diffie-Hellman**: Key exchange protocol

## Encryption Modes
- **ECB**: Electronic Codebook (insecure)
- **CBC**: Cipher Block Chaining
- **GCM**: Galois/Counter Mode
- **CTR**: Counter Mode

## Key Management
- **Key Generation**: Cryptographically secure random numbers
- **Key Distribution**: Secure key exchange
- **Key Storage**: Hardware security modules (HSM)
- **Key Rotation**: Regular key updates

## Hashing vs Encryption
- **Hashing**: One-way function (SHA-256, bcrypt)
- **Encryption**: Two-way process (can be decrypted)

## Digital Signatures
Verify authenticity and integrity using private key signing

## Use Cases
- **Data at Rest**: Database encryption, file encryption
- **Data in Transit**: HTTPS, VPN, secure messaging
- **Authentication**: Password hashing, digital certificates

## Best Practices
- Use established algorithms
- Proper key management
- Regular security audits
- Keep libraries updated

## Interview Questions
**Q: When would you use symmetric vs asymmetric encryption?**
A: Symmetric for bulk data encryption (faster), asymmetric for key exchange and digital signatures (more secure but slower).
`
}; 