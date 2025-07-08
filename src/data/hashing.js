export const hashing = {
  id: 'hashing',
  title: 'Hashing',
  content: `
## Definition
Hashing is a one-way mathematical function that converts input data of any size into a fixed-size string of characters.

## Key Properties
- **Deterministic**: Same input always produces same output
- **Fixed Output Size**: Hash length is constant
- **Avalanche Effect**: Small input change causes large output change
- **One-way**: Computationally infeasible to reverse
- **Collision Resistant**: Hard to find two inputs with same hash

## Common Hash Functions
- **MD5**: 128-bit (deprecated, cryptographically broken)
- **SHA-1**: 160-bit (deprecated for security)
- **SHA-256**: 256-bit (widely used)
- **SHA-3**: Latest SHA standard
- **BLAKE2**: Fast and secure

## Password Hashing
- **bcrypt**: Adaptive cost parameter
- **scrypt**: Memory-hard function
- **Argon2**: Winner of password hashing competition
- **PBKDF2**: Password-Based Key Derivation Function

## Salt
Random data added to password before hashing to prevent:
- **Rainbow Table Attacks**: Precomputed hash lookups
- **Dictionary Attacks**: Common password hashes

## Use Cases
- **Password Storage**: Secure password verification
- **Data Integrity**: Verify file integrity
- **Digital Signatures**: Message authentication
- **Hash Tables**: Data structure indexing
- **Blockchain**: Proof of work, block linking

## Hash Collisions
When two different inputs produce the same hash:
- **Birthday Paradox**: Probability increases with attempts
- **Cryptographic Attacks**: Finding collisions intentionally

## Message Authentication Code (MAC)
- **HMAC**: Hash-based MAC using secret key
- **CMAC**: Cipher-based MAC

## Best Practices
- Use salt for passwords
- Choose appropriate hash function
- Regular security updates
- Proper key management for HMAC

## Interview Questions
**Q: Why do we salt passwords before hashing?**
A: To prevent rainbow table attacks and ensure unique hashes even for identical passwords.
`
}; 