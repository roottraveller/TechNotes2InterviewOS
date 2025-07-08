export const encryption = {
  id: 'encryption',
  title: 'Encryption',
  content: `
    <h2>Encryption</h2>
    <p>Encryption converts readable data (plaintext) into unreadable format (ciphertext) using mathematical algorithms and keys to protect information confidentiality.</p>

    <h3>Encryption Types Comparison</h3>
    <table>
      <tr>
        <th>Type</th>
        <th>Key Usage</th>
        <th>Speed</th>
        <th>Use Case</th>
        <th>Key Size</th>
      </tr>
      <tr>
        <td>Symmetric</td>
        <td>Same key for encrypt/decrypt</td>
        <td>Fast (1000x faster)</td>
        <td>Bulk data encryption</td>
        <td>128-256 bits</td>
      </tr>
      <tr>
        <td>Asymmetric</td>
        <td>Public/private key pairs</td>
        <td>Slow</td>
        <td>Key exchange, digital signatures</td>
        <td>2048-4096 bits</td>
      </tr>
      <tr>
        <td>Hybrid</td>
        <td>Both symmetric + asymmetric</td>
        <td>Balanced</td>
        <td>HTTPS, TLS, secure messaging</td>
        <td>Combined</td>
      </tr>
    </table>

    <h3>Symmetric Encryption Algorithms</h3>
    <div class="code-block">
      <pre><code>Modern Symmetric Algorithms:

1. AES (Advanced Encryption Standard):
├── Key Sizes: 128, 192, 256 bits
├── Block Size: 128 bits
├── Speed: ~1GB/s on modern CPUs
├── Security: Unbroken, NSA approved
└── Use: Industry standard (HTTPS, VPN, disk encryption)

2. ChaCha20:
├── Key Size: 256 bits
├── Type: Stream cipher
├── Speed: Faster than AES on mobile devices
├── Security: Modern, resistant to timing attacks
└── Use: TLS 1.3, mobile applications

3. AES Modes:
├── GCM (Galois/Counter Mode): Authenticated encryption
├── CBC (Cipher Block Chaining): Requires IV
├── CTR (Counter Mode): Parallelizable
├── ECB (Electronic Codebook): NEVER use (insecure)
└── XTS: Disk encryption (BitLocker, FileVault)

Performance Comparison (1GB data):
├── AES-128-GCM: ~1.2 seconds
├── AES-256-GCM: ~1.5 seconds
├── ChaCha20-Poly1305: ~1.0 seconds
└── 3DES: ~45 seconds (deprecated)</code></pre>
    </div>

    <h3>Asymmetric Encryption Algorithms</h3>
    <div class="code-block">
      <pre><code>Public Key Algorithms:

1. RSA (Rivest-Shamir-Adleman):
├── Key Sizes: 2048, 3072, 4096 bits
├── Security: Based on integer factorization
├── Speed: Slow (1000x slower than AES)
├── Use: Digital signatures, key exchange
└── Quantum Resistance: Vulnerable

2. ECC (Elliptic Curve Cryptography):
├── Key Sizes: 256, 384, 521 bits
├── Security: Equivalent to larger RSA keys
├── Speed: Faster than RSA
├── Use: Mobile devices, IoT, modern TLS
└── Quantum Resistance: Vulnerable

3. Post-Quantum Algorithms:
├── CRYSTALS-Kyber: Key encapsulation
├── CRYSTALS-Dilithium: Digital signatures
├── FALCON: Compact signatures
├── SPHINCS+: Hash-based signatures
└── Status: NIST standardized (2022)

Security Equivalence:
├── RSA-2048 ≈ ECC-224 ≈ AES-112
├── RSA-3072 ≈ ECC-256 ≈ AES-128
├── RSA-4096 ≈ ECC-384 ≈ AES-192
└── RSA-15360 ≈ ECC-521 ≈ AES-256</code></pre>
    </div>

    <details>
      <summary><strong>Example: WhatsApp's End-to-End Encryption</strong></summary>
      <div class="info-note">
        WhatsApp uses Signal Protocol for end-to-end encryption, protecting 2+ billion users and 100+ billion messages daily. The system combines Curve25519 (ECDH), AES-256 (GCM), and HMAC-SHA256 for message encryption. Each conversation uses unique encryption keys, messages are encrypted on sender's device and decrypted only on recipient's device, and keys are never stored on servers. The protocol provides perfect forward secrecy, meaning compromised keys don't affect past messages. WhatsApp's implementation processes 65+ billion messages daily with sub-second encryption/decryption times and 99.9% message delivery success rate.
      </div>
    </details>

    <h3>Hashing vs Encryption</h3>
    <div class="code-block">
      <pre><code>Key Differences:

┌─────────────────────────────────────────────────┐
│                 Encryption                      │
│  ┌─────────────────────────────────────────────┐│
│  │  Plaintext → [Algorithm + Key] → Ciphertext││
│  │  Ciphertext → [Algorithm + Key] → Plaintext││
│  │  Reversible: Two-way process               ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│                  Hashing                        │
│  ┌─────────────────────────────────────────────┐│
│  │  Input → [Hash Function] → Fixed-size Hash ││
│  │  Irreversible: One-way process             ││
│  │  Same input = Same hash                    ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Common Hash Functions:
├── SHA-256: 256-bit output, Bitcoin mining
├── SHA-3: Latest standard, different construction
├── bcrypt: Password hashing with salt
├── scrypt: Memory-hard function
├── Argon2: Winner of password hashing competition
└── MD5: Deprecated (collision attacks)

Hash Performance (1GB data):
├── SHA-256: ~2.5 seconds
├── SHA-3: ~4.2 seconds
├── bcrypt: ~10 seconds (intentionally slow)
└── MD5: ~1.8 seconds (insecure)</code></pre>
    </div>

    <h3>Digital Signatures</h3>
    <div class="code-block">
      <pre><code>Digital Signature Process:

Signing Process:
┌─────────────────────────────────────────────────┐
│              Document/Message                   │
│  ┌─────────────────────────────────────────────┐│
│  │  "Transfer $1000 to Alice"                 ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              Hash Function                      │
│  ┌─────────────────────────────────────────────┐│
│  │  SHA-256 → Fixed-size digest               ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              Private Key Signing                │
│  ┌─────────────────────────────────────────────┐│
│  │  RSA/ECDSA → Digital Signature             ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Verification Process:
├── Public key decrypts signature → Original hash
├── Document hashed independently → New hash
├── Compare hashes: Match = Valid signature
└── Provides: Authentication, Integrity, Non-repudiation

Common Signature Algorithms:
├── RSA-PSS: RSA with PSS padding
├── ECDSA: Elliptic Curve Digital Signature
├── EdDSA: Edwards-curve signatures (Ed25519)
├── DSA: Digital Signature Algorithm
└── RSASSA-PKCS1-v1_5: Traditional RSA signatures</code></pre>
    </div>

    <h3>Key Management</h3>
    <div class="code-block">
      <pre><code>Key Lifecycle Management:

1. Key Generation:
├── Cryptographically Secure Random Number Generator (CSPRNG)
├── Entropy Sources: Hardware random, OS entropy
├── Key Derivation: PBKDF2, scrypt, Argon2
├── Key Strength: Sufficient entropy bits
└── Standards: FIPS 140-2, Common Criteria

2. Key Distribution:
├── Key Exchange: Diffie-Hellman, ECDH
├── Key Transport: RSA, Kyber (post-quantum)
├── Key Agreement: Both parties contribute to key
├── Key Wrapping: Encrypt keys with master key
└── Public Key Infrastructure (PKI): Certificate authorities

3. Key Storage:
├── Hardware Security Module (HSM): Tamper-resistant
├── Trusted Platform Module (TPM): On-chip security
├── Key Vaults: Azure Key Vault, AWS KMS
├── Secure Enclaves: Intel SGX, ARM TrustZone
└── Cold Storage: Offline key storage

4. Key Rotation:
├── Regular Rotation: Every 90 days for symmetric keys
├── Automated Rotation: Scheduled key updates
├── Emergency Rotation: Compromise response
├── Backward Compatibility: Gradual transition
└── Key Versioning: Multiple key versions

Key Management Challenges:
├── Scale: Managing millions of keys
├── Performance: Fast key retrieval
├── Availability: High availability requirements
├── Compliance: Regulatory requirements
└── Recovery: Disaster recovery procedures</code></pre>
    </div>

    <details>
      <summary><strong>Example: Google's Encryption at Scale</strong></summary>
      <div class="info-note">
        Google encrypts 100+ exabytes of data using AES-256 with hardware acceleration, processes 40+ billion encrypted searches daily, and manages 1+ billion encryption keys across global infrastructure. Their Titan security chips provide hardware-based key management, envelope encryption reduces key exposure, and automatic key rotation occurs every 90 days. Google's encryption infrastructure handles 3+ billion TLS connections daily, provides perfect forward secrecy for all communications, and achieves 99.99% encryption success rate with sub-millisecond overhead. The system protects Gmail (1.8+ billion users), Google Drive (1+ billion users), and YouTube (2+ billion users) with zero-knowledge architecture.
      </div>
    </details>

    <h3>TLS/SSL Encryption</h3>
    <div class="code-block">
      <pre><code>TLS Handshake Process:

TLS 1.3 Handshake (Simplified):
┌─────────────────────────────────────────────────┐
│                Client Hello                     │
│  ┌─────────────────────────────────────────────┐│
│  │  Supported ciphers, random nonce           ││
│  │  Key share (ECDH public key)               ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│                Server Hello                     │
│  ┌─────────────────────────────────────────────┐│
│  │  Selected cipher, certificate              ││
│  │  Key share, encrypted extensions           ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              Application Data                   │
│  ┌─────────────────────────────────────────────┐│
│  │  Encrypted with shared secret              ││
│  │  Perfect Forward Secrecy                   ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

Modern TLS Cipher Suites:
├── TLS_AES_256_GCM_SHA384: AES-256 with GCM
├── TLS_CHACHA20_POLY1305_SHA256: ChaCha20 stream cipher
├── TLS_AES_128_GCM_SHA256: AES-128 with GCM
├── ECDHE-RSA-AES256-GCM-SHA384: Legacy compatibility
└── DHE-RSA-AES256-GCM-SHA384: Perfect forward secrecy

TLS Performance:
├── TLS 1.3: 1 RTT handshake (vs 2 RTT in TLS 1.2)
├── Session Resumption: 0-RTT for repeated connections
├── Hardware Acceleration: AES-NI, ChaCha20 optimizations
├── Connection Reuse: HTTP/2 multiplexing
└── OCSP Stapling: Faster certificate validation</code></pre>
    </div>

    <h3>Encryption in Practice</h3>
    <div class="code-block">
      <pre><code>Real-World Implementation:

1. Database Encryption:
├── Transparent Data Encryption (TDE): SQL Server, Oracle
├── Column-Level Encryption: Sensitive fields only
├── Application-Level Encryption: Before database storage
├── Key Management: Separate from encrypted data
└── Performance: 5-15% overhead

2. File System Encryption:
├── Full Disk Encryption: BitLocker, FileVault, LUKS
├── File-Level Encryption: EFS, eCryptfs
├── Cloud Storage: Client-side encryption
├── Backup Encryption: Encrypted backups
└── Key Recovery: Escrow mechanisms

3. Communication Encryption:
├── HTTPS: Web traffic encryption
├── VPN: IPsec, OpenVPN, WireGuard
├── Email: S/MIME, PGP/GPG
├── Messaging: Signal Protocol, Matrix
└── API Security: OAuth 2.0, JWT signing

4. Mobile Encryption:
├── iOS: Hardware encryption with Secure Enclave
├── Android: Full disk encryption with TEE
├── App-Level: Keychain/Keystore APIs
├── Biometric: Fingerprint/Face ID encryption
└── Remote Wipe: Secure key deletion

Encryption Performance Impact:
├── CPU Usage: 2-10% additional load
├── Memory: Minimal impact
├── Storage: No size increase (stream ciphers)
├── Network: Minimal overhead (1-3%)
└── Battery: 5-15% additional drain (mobile)</code></pre>
    </div>

    <details>
      <summary><strong>Example: Signal's Double Ratchet Algorithm</strong></summary>
      <div class="info-note">
        Signal's Double Ratchet Algorithm provides perfect forward secrecy and future secrecy for 40+ million users exchanging 1+ billion messages daily. The protocol uses X3DH key agreement, Curve25519 ECDH, and AES-256-GCM encryption with automatic key rotation for every message. Each message uses a unique encryption key, compromised keys don't affect past or future messages, and the system provides protection against key compromise. Signal's implementation handles message encryption/decryption in under 1ms, supports group chats with up to 1000 participants, and maintains 99.9% message delivery with end-to-end encryption.
      </div>
    </details>

    <h3>Common Encryption Vulnerabilities</h3>
    <div class="code-block">
      <pre><code>Security Pitfalls:

1. Implementation Vulnerabilities:
├── Weak Random Number Generation: Predictable keys
├── Side-Channel Attacks: Timing, power analysis
├── Padding Oracle Attacks: CBC mode vulnerabilities
├── Key Reuse: Same key for multiple purposes
└── Improper Key Storage: Hardcoded keys

2. Algorithm Weaknesses:
├── Deprecated Algorithms: DES, 3DES, MD5, SHA-1
├── Weak Key Sizes: RSA < 2048 bits
├── ECB Mode: Reveals patterns in data
├── Custom Crypto: Never roll your own
└── Insufficient Entropy: Weak key generation

3. Protocol Attacks:
├── Man-in-the-Middle: Certificate validation bypass
├── Downgrade Attacks: Force weaker algorithms
├── Replay Attacks: Reuse of encrypted messages
├── Length Extension: Hash function vulnerabilities
└── Timing Attacks: Information leakage

4. Operational Failures:
├── Poor Key Management: Inadequate rotation
├── Misconfiguration: Weak cipher suites
├── Certificate Issues: Expired, self-signed
├── Backup Security: Unencrypted backups
└── Access Control: Unauthorized key access

Mitigation Strategies:
├── Use Established Libraries: OpenSSL, Bouncy Castle
├── Regular Security Audits: Code reviews, penetration testing
├── Proper Key Management: HSM, key rotation
├── Strong Configurations: Disable weak ciphers
└── Continuous Monitoring: Detect anomalies</code></pre>
    </div>

    <h3>Quantum Cryptography Impact</h3>
    <div class="code-block">
      <pre><code>Post-Quantum Cryptography:

Quantum Threat Timeline:
┌─────────────────────────────────────────────────┐
│                Current (2024)                   │
│  ┌─────────────────────────────────────────────┐│
│  │  RSA, ECC secure against classical computers││
│  │  Quantum computers: 50-100 qubits          ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              Near Future (2030s)                │
│  ┌─────────────────────────────────────────────┐│
│  │  Quantum computers: 1000+ qubits           ││
│  │  Threat to RSA-2048, ECC-256               ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│              Future (2040s)                     │
│  ┌─────────────────────────────────────────────┐│
│  │  Large-scale quantum computers             ││
│  │  RSA, ECC completely broken                ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘

NIST Post-Quantum Standards (2022):
├── CRYSTALS-Kyber: Key encapsulation mechanism
├── CRYSTALS-Dilithium: Digital signature scheme
├── FALCON: Compact signature scheme
├── SPHINCS+: Hash-based signature scheme
└── Migration Timeline: 10-15 years for full adoption

Quantum-Safe Algorithms:
├── Lattice-Based: CRYSTALS-Kyber, CRYSTALS-Dilithium
├── Hash-Based: SPHINCS+, XMSS
├── Code-Based: Classic McEliece
├── Multivariate: Rainbow (withdrawn)
└── Isogeny-Based: SIKE (broken in 2022)

Impact on Current Systems:
├── Symmetric Encryption: AES-256 remains secure
├── Hash Functions: SHA-256 requires doubling (SHA-512)
├── Public Key Crypto: Complete replacement needed
├── Digital Signatures: New quantum-safe schemes
└── Key Exchange: Post-quantum key agreement</code></pre>
    </div>

    <h3>Interview Questions & Answers</h3>
    <div class="code-block">
      <pre><code>Common Interview Questions:

Q: When would you use symmetric vs asymmetric encryption?
A: Symmetric for bulk data (1000x faster, AES-256), asymmetric 
   for key exchange and digital signatures (RSA-2048, ECDSA).

Q: What's the difference between AES-128 and AES-256?
A: Key size difference (128 vs 256 bits). AES-256 is more secure
   but ~40% slower. AES-128 sufficient for most applications.

Q: How does TLS encryption work?
A: Hybrid approach: RSA/ECDH for key exchange, AES-GCM for data
   encryption. TLS 1.3 uses 1-RTT handshake with perfect forward secrecy.

Q: What's perfect forward secrecy?
A: Each session uses unique keys. Compromising long-term keys
   doesn't affect past communications. Implemented via ephemeral keys.

Q: How do you securely store passwords?
A: Never store plaintext. Use bcrypt, scrypt, or Argon2 with salt.
   These are slow by design to prevent brute force attacks.

Q: What's the difference between hashing and encryption?
A: Hashing is one-way (SHA-256), encryption is two-way (AES).
   Hashing for integrity, encryption for confidentiality.

Q: How do digital signatures work?
A: Hash document, encrypt hash with private key. Verification:
   decrypt with public key, compare with document hash.

Q: What's a rainbow table attack?
A: Precomputed hash-to-password lookup. Defeated by using
   unique salts for each password hash.

Q: How does key rotation work?
A: Regular key replacement (90 days for symmetric). Maintains
   security if keys are compromised. Automated in modern systems.

Q: What's the quantum threat to encryption?
A: Shor's algorithm breaks RSA/ECC. AES-256 remains secure.
   Post-quantum algorithms (CRYSTALS-Kyber) being adopted.</code></pre>
    </div>

    <h3>Best Practices Summary</h3>
    <ul>
      <li><strong>Algorithm Selection:</strong> AES-256-GCM for symmetric, RSA-2048+ or ECC-256+ for asymmetric</li>
      <li><strong>Key Management:</strong> Use HSM/TPM, rotate keys regularly, never hardcode keys</li>
      <li><strong>Implementation:</strong> Use established libraries (OpenSSL), avoid custom crypto</li>
      <li><strong>Performance:</strong> Hardware acceleration (AES-NI), symmetric for bulk data</li>
      <li><strong>Future-Proofing:</strong> Plan for post-quantum cryptography migration</li>
      <li><strong>Security:</strong> Perfect forward secrecy, proper random number generation</li>
      <li><strong>Compliance:</strong> Follow standards (FIPS 140-2, Common Criteria)</li>
    </ul>

    <h3>References</h3>
    <ul>
      <li><a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf" target="_blank">NIST AES Standard (FIPS 197)</a></li>
      <li><a href="https://tools.ietf.org/html/rfc8446" target="_blank">TLS 1.3 Specification (RFC 8446)</a></li>
      <li><a href="https://csrc.nist.gov/Projects/post-quantum-cryptography" target="_blank">NIST Post-Quantum Cryptography</a></li>
      <li><a href="https://signal.org/docs/specifications/doubleratchet/" target="_blank">Signal Protocol Specification</a></li>
      <li><a href="https://www.openssl.org/docs/" target="_blank">OpenSSL Documentation</a></li>
    </ul>
  `
}; 