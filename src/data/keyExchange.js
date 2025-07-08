export const keyExchange = {
  id: 'key-exchange',
  title: 'Key Exchange Algorithms',
  content: `
<p>Key exchange is the process by which cryptographic keys (private key) are securely exchanged between parties to enable secure communication and establish a shared secret key for encryption and decryption over an insecure communication channel.</p>

    <h3>Diffie-Hellman Key Exchange</h3>
    <ul>
      <li>First published public key algorithm (1976)</li>
      <li>Allows two parties to establish a shared secret over an insecure channel</li>
      <li>Based on the difficulty of computing discrete logarithms</li>
      <li>Vulnerable to man-in-the-middle attacks without authentication</li>
      <li>Forms the basis for many modern key exchange protocols</li>
    </ul>

    <h4>How Diffie-Hellman Works</h4>
    <ol>
      <li>Alice and Bob agree on public parameters (prime p and generator g)</li>
      <li>Alice chooses private key a, computes A = g^a mod p, sends A to Bob</li>
      <li>Bob chooses private key b, computes B = g^b mod p, sends B to Alice</li>
      <li>Alice computes shared secret: s = B^a mod p</li>
      <li>Bob computes shared secret: s = A^b mod p</li>
      <li>Both arrive at the same shared secret: g^(ab) mod p</li>
    </ol>

    <h3>RSA Key Exchange</h3>
    <ul>
      <li>Based on the difficulty of factoring large prime numbers</li>
      <li>Can be used for both encryption and digital signatures</li>
      <li>Slower than symmetric encryption</li>
      <li>Typically used to exchange symmetric keys</li>
      <li>Provides authentication when used with certificates</li>
    </ul>

    <h4>RSA Process</h4>
    <ol>
      <li>Generate two large prime numbers (p and q)</li>
      <li>Compute n = p × q</li>
      <li>Calculate Euler's totient: φ(n) = (p-1)(q-1)</li>
      <li>Choose public exponent e (commonly 65537)</li>
      <li>Compute private exponent d such that e × d ≡ 1 (mod φ(n))</li>
      <li>Public key: (n, e), Private key: (n, d)</li>
    </ol>

    <h3>Modern Key Exchange Protocols</h3>
    
    <h4>ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)</h4>
    <ul>
      <li>Uses elliptic curve cryptography</li>
      <li>Provides same security with smaller key sizes</li>
      <li>Ephemeral keys provide forward secrecy</li>
      <li>Widely used in TLS 1.3</li>
      <li>More efficient than traditional DH</li>
    </ul>

    <h4>Key Exchange in TLS/SSL</h4>
    <ul>
      <li>Combines multiple cryptographic techniques</li>
      <li>Server authentication using certificates</li>
      <li>Key exchange for session keys</li>
      <li>Forward secrecy with ephemeral keys</li>
      <li>Protection against various attacks</li>
    </ul>

    <h3>Security Considerations</h3>
    
    <h4>Man-in-the-Middle (MITM) Attacks</h4>
    <ul>
      <li>Attacker intercepts key exchange</li>
      <li>Establishes separate keys with each party</li>
      <li>Can decrypt and modify all communications</li>
      <li>Prevented by authentication mechanisms</li>
    </ul>

    <h4>Forward Secrecy</h4>
    <ul>
      <li>Past communications remain secure if keys are compromised</li>
      <li>Achieved using ephemeral keys</li>
      <li>New keys generated for each session</li>
      <li>Critical for long-term security</li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li><strong>Use Authenticated Key Exchange:</strong> Combine with digital signatures or certificates</li>
      <li><strong>Implement Forward Secrecy:</strong> Use ephemeral key exchange methods</li>
      <li><strong>Choose Appropriate Key Sizes:</strong> Balance security and performance</li>
      <li><strong>Regular Key Rotation:</strong> Limit exposure if keys are compromised</li>
      <li><strong>Use Standard Protocols:</strong> Avoid custom implementations</li>
      <li><strong>Consider Quantum Resistance:</strong> Plan for post-quantum cryptography</li>
    </ul>

    <h3>Applications</h3>
    <ul>
      <li><strong>HTTPS/TLS:</strong> Secure web communications</li>
      <li><strong>VPNs:</strong> Secure tunnel establishment</li>
      <li><strong>SSH:</strong> Secure shell connections</li>
      <li><strong>IPSec:</strong> Network layer security</li>
      <li><strong>Signal Protocol:</strong> End-to-end encrypted messaging</li>
      <li><strong>Cryptocurrency:</strong> Wallet and transaction security</li>
    </ul>

    <h3>Related Links</h3>
    <ul>
      <li><a href="https://www.vskills.in/certification/tutorial/private-and-public-key-exchange-3/" target="_blank">Private and Public Key Exchange</a></li>
    </ul>
`
}; 