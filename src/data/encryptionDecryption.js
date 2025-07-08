export const encryptionDecryption = {
  id: 'encryption-decryption',
  title: 'Encryption and Decryption',
  content: `
<p>To ensure data security during transmission or storage, encryption can be applied either before or after serialization. Encryption scrambles the data using a cryptographic algorithm and a key, making it unreadable to unauthorized parties. When encrypted data is received or retrieved, it needs to be decrypted before deserialization to restore it to its original form. Decryption requires the appropriate cryptographic key and algorithm to reverse the encryption process.</p>

    <h3>Types of Encryption</h3>
    
    <h4>Symmetric Encryption</h4>
    <p>A single key is used for both encryption and decryption.</p>
    
    <ul>
      <li><strong>Key Management:</strong> Same key must be shared securely</li>
      <li><strong>Speed:</strong> Generally faster than asymmetric</li>
      <li><strong>Use Cases:</strong> Bulk data encryption, session keys</li>
      <li><strong>Examples:</strong> AES, DES, 3DES, Blowfish</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Symmetric Encryption Flow
Plaintext → [Encrypt with Key K] → Ciphertext
Ciphertext → [Decrypt with Key K] → Plaintext

// Both parties use the same key K</code></pre>
    </div>

    <h4>Asymmetric Encryption (Public Key Encryption)</h4>
    <p>A public key for encryption and a private key for decryption is used.</p>
    
    <ul>
      <li><strong>Key Pairs:</strong> Public key (encrypt) + Private key (decrypt)</li>
      <li><strong>No Shared Secret:</strong> Public key can be distributed openly</li>
      <li><strong>Speed:</strong> Slower than symmetric encryption</li>
      <li><strong>Use Cases:</strong> Key exchange, digital signatures, certificates</li>
      <li><strong>Examples:</strong> RSA, ECC, DSA</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Asymmetric Encryption Flow
Plaintext → [Encrypt with Public Key] → Ciphertext
Ciphertext → [Decrypt with Private Key] → Plaintext

// Or for Digital Signatures:
Message → [Sign with Private Key] → Signature
Signature → [Verify with Public Key] → Valid/Invalid</code></pre>
    </div>

    <h3>Encryption Algorithms</h3>
    
    <h4>RSA (Rivest-Shamir-Adleman)</h4>
    <ul>
      <li><strong>Type:</strong> Asymmetric</li>
      <li><strong>Key Size:</strong> 1024, 2048, 4096 bits</li>
      <li><strong>Based on:</strong> Factoring large prime numbers</li>
      <li><strong>Use Cases:</strong> SSL/TLS, email encryption, digital signatures</li>
      <li><strong>Limitations:</strong> Slow for large data, key size requirements growing</li>
    </ul>

    <h4>AES (Advanced Encryption Standard)</h4>
    <ul>
      <li><strong>Type:</strong> Symmetric block cipher</li>
      <li><strong>Key Sizes:</strong> 128, 192, 256 bits</li>
      <li><strong>Block Size:</strong> 128 bits</li>
      <li><strong>Modes:</strong> ECB, CBC, CTR, GCM</li>
      <li><strong>Performance:</strong> Very fast, hardware acceleration available</li>
      <li><strong>Standard:</strong> NIST approved, widely adopted</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// AES Encryption Modes
ECB (Electronic Codebook):
- Each block encrypted independently
- Not recommended (patterns visible)

CBC (Cipher Block Chaining):
- Each block XORed with previous ciphertext
- Requires IV (Initialization Vector)
- Common for file encryption

CTR (Counter):
- Converts block cipher to stream cipher
- Parallelizable
- Good for random access

GCM (Galois/Counter Mode):
- Provides authentication + encryption
- Modern, recommended mode
- Used in TLS 1.3</code></pre>
    </div>

    <h4>Diffie-Hellman</h4>
    <ul>
      <li><strong>Type:</strong> Key exchange algorithm</li>
      <li><strong>Purpose:</strong> Establish shared secret over insecure channel</li>
      <li><strong>Not for:</strong> Direct encryption/decryption</li>
      <li><strong>Variants:</strong> DH, ECDH (Elliptic Curve DH)</li>
      <li><strong>Use Cases:</strong> TLS handshake, VPNs</li>
    </ul>

    <h4>ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)</h4>
    <ul>
      <li><strong>Type:</strong> Key exchange with forward secrecy</li>
      <li><strong>Benefits:</strong> Smaller keys, better performance than RSA</li>
      <li><strong>Ephemeral:</strong> New keys for each session</li>
      <li><strong>Forward Secrecy:</strong> Past sessions secure even if key compromised</li>
    </ul>

    <h3>Practical Implementation</h3>
    
    <h4>Encryption Examples</h4>
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Python - AES Encryption
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

# Generate key
key = get_random_bytes(32)  # 256 bits
cipher = AES.new(key, AES.MODE_GCM)
ciphertext, tag = cipher.encrypt_and_digest(plaintext)

// Node.js - AES Encryption
const crypto = require('crypto');
const algorithm = 'aes-256-gcm';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');

// Java - RSA Encryption
KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
keyGen.initialize(2048);
KeyPair pair = keyGen.generateKeyPair();

Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
cipher.init(Cipher.ENCRYPT_MODE, pair.getPublic());
byte[] cipherText = cipher.doFinal(plainText);</code></pre>
    </div>

    <h3>Hybrid Encryption</h3>
    <p>Combines symmetric and asymmetric encryption for optimal security and performance.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Hybrid Encryption Process
1. Generate random symmetric key (e.g., AES-256)
2. Encrypt data with symmetric key (fast)
3. Encrypt symmetric key with recipient's public key (RSA)
4. Send: encrypted data + encrypted symmetric key

// Decryption
1. Decrypt symmetric key with private key (RSA)
2. Decrypt data with symmetric key (AES)

// Benefits:
- Fast bulk encryption (symmetric)
- Secure key exchange (asymmetric)
- Best of both worlds</code></pre>
    </div>

    <h3>Digital Signatures</h3>
    <p>Provide authentication, integrity, and non-repudiation.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Digital Signature Process
1. Hash the message (SHA-256)
2. Encrypt hash with private key
3. Attach signature to message

// Verification
1. Decrypt signature with public key
2. Hash the received message
3. Compare hashes - if match, signature valid

// Properties:
- Authentication: Proves sender identity
- Integrity: Detects tampering
- Non-repudiation: Sender cannot deny</code></pre>
    </div>

    <h3>Encryption in Practice</h3>
    
    <h4>HTTPS/TLS</h4>
    <ul>
      <li><strong>Handshake:</strong> ECDHE for key exchange</li>
      <li><strong>Certificates:</strong> RSA or ECDSA signatures</li>
      <li><strong>Session:</strong> AES-GCM for data encryption</li>
      <li><strong>Forward Secrecy:</strong> Ephemeral keys</li>
    </ul>

    <h4>Password Storage</h4>
    <ul>
      <li><strong>Never:</strong> Store plain text passwords</li>
      <li><strong>Hash:</strong> One-way function (bcrypt, scrypt, Argon2)</li>
      <li><strong>Salt:</strong> Random data to prevent rainbow tables</li>
      <li><strong>Iterations:</strong> Slow down brute force attacks</li>
    </ul>

    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Password Hashing Best Practices
// Using bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hash password
const hash = await bcrypt.hash(password, saltRounds);

// Verify password
const match = await bcrypt.compare(password, hash);</code></pre>
    </div>

    <h3>Key Management</h3>
    
    <h4>Best Practices</h4>
    <ul>
      <li><strong>Key Generation:</strong> Use cryptographically secure random</li>
      <li><strong>Key Storage:</strong> Hardware security modules (HSM), key vaults</li>
      <li><strong>Key Rotation:</strong> Regular key updates</li>
      <li><strong>Key Escrow:</strong> Backup keys securely</li>
      <li><strong>Access Control:</strong> Limit key access</li>
    </ul>

    <h4>Common Mistakes</h4>
    <ul>
      <li><strong>Hardcoded Keys:</strong> Never in source code</li>
      <li><strong>Weak Keys:</strong> Use proper key generation</li>
      <li><strong>Key Reuse:</strong> Different keys for different purposes</li>
      <li><strong>Poor Storage:</strong> Don't store keys in plain text</li>
    </ul>

    <h3>Security Considerations</h3>
    
    <h4>Common Attacks</h4>
    <ul>
      <li><strong>Brute Force:</strong> Try all possible keys</li>
      <li><strong>Dictionary Attack:</strong> Common passwords/keys</li>
      <li><strong>Side Channel:</strong> Timing, power analysis</li>
      <li><strong>Man-in-the-Middle:</strong> Intercept key exchange</li>
      <li><strong>Padding Oracle:</strong> Exploit padding validation</li>
    </ul>

    <h4>Defense Strategies</h4>
    <ul>
      <li><strong>Strong Keys:</strong> Sufficient entropy</li>
      <li><strong>Authenticated Encryption:</strong> AES-GCM, ChaCha20-Poly1305</li>
      <li><strong>Certificate Pinning:</strong> Prevent MITM</li>
      <li><strong>Constant Time:</strong> Avoid timing attacks</li>
      <li><strong>Regular Updates:</strong> Patch vulnerabilities</li>
    </ul>

    <h3>Compliance and Standards</h3>
    <ul>
      <li><strong>FIPS 140-2:</strong> US government cryptographic standards</li>
      <li><strong>PCI DSS:</strong> Payment card data encryption</li>
      <li><strong>GDPR:</strong> EU data protection (encryption as safeguard)</li>
      <li><strong>HIPAA:</strong> Healthcare data encryption requirements</li>
    </ul>

    <h3>Future Considerations</h3>
    
    <h4>Quantum Computing Threat</h4>
    <ul>
      <li><strong>Risk:</strong> Breaks current public key cryptography</li>
      <li><strong>Timeline:</strong> 10-20 years estimate</li>
      <li><strong>Post-Quantum:</strong> New algorithms being developed</li>
      <li><strong>Hybrid Approach:</strong> Combine classical and post-quantum</li>
    </ul>
`
}; 